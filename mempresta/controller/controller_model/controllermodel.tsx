import { useDatabaseService, Emprestimo, Item } from "@/bancoDeDados/useDatabase";
import { DeviceEventEmitter } from "react-native";
import UserSession from "../context/usersession";
import { Alert } from "react-native";
import { funcoesSupabase } from "./funcoesSupabase";
import { supabase } from "../context/servidor";

// Função utilitária para gerar data/hora no formato certo
function getDataHoraAtual(): string {
  const agora = new Date();
  const dataHoraLocal = agora.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [data, hora] = dataHoraLocal.split(" ");
  const [dia, mes, ano] = data.split("/");

  return `${dia}-${mes}-${ano} ${hora.replace(/:/g, "-")}`;
}

export function useControllerModel() {
  const dbService = useDatabaseService();
  const user = UserSession.getInstance();
  const funcaosupa = funcoesSupabase();

  async function analizandoQRCode(data: any) {
    try {
      const codigoItem = data?.codigo;
      const codigoUsuario = user.getCodigo();
      
      // Criamos uma variável que guardará o livro final, vindo de onde vier
      let livroValido: Item | null = null;

      if (!codigoItem || !codigoUsuario) {
        Alert.alert("QR Code inválido", "Dados incompletos no QR Code.");
        return;
      }

      // 1. Verifica se o item existe no banco local
      const itens = await dbService.searchItem(codigoItem);
      
      if (itens && itens.length > 0) {
        // Se achou localmente, usamos ele
        livroValido = itens[0];
      } else {
        // Se não achou localmente, tenta buscar no Supabase
        try {
          const itemSupabase = await funcaosupa.buscarItemEspecifico(data);

          // Se o Supabase também não retornar nada
          if (!itemSupabase) {
            Alert.alert("Livro não cadastrado", "Livro não cadastrado no seu banco de dados ainda.");
            return;
          }

          // Se o seu Supabase retornar um array, pegamos a primeira posição. 
          // Se retornar o objeto direto, usamos ele próprio.
          livroValido = Array.isArray(itemSupabase) ? itemSupabase[0] : itemSupabase;

        } catch (error) {
          console.error("Erro ao buscar no Supabase:", error);
          Alert.alert("Erro", "Não foi possível verificar o livro no servidor remoto.");
          return;
        }
      }

      // Segurança Extra: Garante que temos um livro válido antes de prosseguir
      if (!livroValido) {
        Alert.alert("Erro", "Não foi possível processar os dados deste livro.");
        return;
      }

      // 2. Verifica se já há empréstimo ativo
      const emprestimos = await dbService.searchEmprestimo(codigoUsuario);
      const emprestimoAtivo = emprestimos.find(
        (e) => e.codigoItem === codigoItem && e.devolvido == null
      );

      if (emprestimoAtivo) {
        // Se já está ativo, pergunta se deseja devolver (Usando agora livroValido)
        Alert.alert(
          "Livro já emprestado",
          `Você já possui "${livroValido.nome}" emprestado. Deseja devolver agora?`,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Sim",
              onPress: async () => {
                const devolucao = getDataHoraAtual();
                await dbService.updateEmprestimo({
                  ...emprestimoAtivo,
                  devolvido: devolucao,
                });
                Alert.alert("Sucesso", "Livro devolvido com sucesso!");
                DeviceEventEmitter.emit("emprestimoAtualizado");
                console.log("Livro devolvido: ", emprestimoAtivo.codigo, devolucao);
              },
            },
          ]
        );
        return;
      }

      // 3. Caso não esteja ativo, pergunta se deseja emprestar (Usando agora livroValido)
      Alert.alert(
        "Livro disponível",
        `Livro não encontrado nos empréstimos ativos. Gostaria de pegar "${livroValido.nome}" emprestado?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              const novoEmprestimo: Emprestimo = {
                codigo: `EMP${Date.now()}`,
                emprestado: getDataHoraAtual(),
                devolvido: null,
                codigoItem,
                codigoUsuario,
              };
              await dbService.createEmprestimo(novoEmprestimo);
              Alert.alert("Sucesso", "Livro emprestado com sucesso!");
              DeviceEventEmitter.emit("emprestimoAtualizado");
              console.log("Livro pego com sucesso: ", novoEmprestimo);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar o QR Code.");
      console.error("Erro ao analisar QRCode:", error);
    }
  }

  return { analizandoQRCode };
}