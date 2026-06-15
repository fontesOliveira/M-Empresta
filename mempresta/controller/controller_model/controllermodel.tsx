import { useDatabaseService, Emprestimo, Item } from "@/bancoDeDados/useDatabase";
import { DeviceEventEmitter, Alert } from "react-native";
import UserSession from "../context/usersession";
import { useFuncoesSupabase } from "./funcoesSupabase";
import { supabase } from "@/controller/context/servidor.js";

// Função utilitária para gerar data/hora no formato ISO compatível com TIMESTAMP
function getDataHoraAtual(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const hora = String(agora.getHours()).padStart(2, "0");
  const minuto = String(agora.getMinutes()).padStart(2, "0");
  const segundo = String(agora.getSeconds()).padStart(2, "0");

  return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}

export function useControllerModel() {
  const dbService = useDatabaseService();
  const user = UserSession.getInstance();
  const funcaosupa = useFuncoesSupabase();

  async function analizandoQRCode(data: any) {
    try {
      const codigoItem: number = Number(data?.codigo);
      const codigoUsuario: string = user.getCodigo();

      let livroValido: Item | null = null;

      if (!codigoItem || !codigoUsuario) {
        Alert.alert("QR Code inválido", "Dados incompletos no QR Code.");
        return;
      }

      // 1. Verifica se o item existe no banco local
      const itens = await dbService.searchItem(codigoItem);

      if (itens && itens.length > 0) {
        livroValido = itens[0];
        console.log("Livro pego no banco local");
      } else {
        // Se não achou localmente, tenta buscar no Supabase
        try {
          const itemSupabase = await funcaosupa.buscarItemEspecifico(data);

          if (!itemSupabase) {
            Alert.alert("Livro não cadastrado", "Livro não cadastrado no seu banco de dados ainda.");
            return;
          }

          livroValido = Array.isArray(itemSupabase) ? itemSupabase[0] : itemSupabase;
          console.log("Livro pego no Supabase");
        } catch (error) {
          console.error("Erro ao buscar no Supabase:", error);
          Alert.alert("Erro", "Não foi possível verificar o livro no servidor remoto.");
          return;
        }
      }

      if (!livroValido) {
        Alert.alert("Erro", "Não foi possível processar os dados deste livro.");
        return;
      }

      // 2. Verifica se já há empréstimo ativo (Supabase primeiro, depois local)
      let emprestimoAtivo: any = null;

      const { data: emprestimosRemotos, error: erroRemoto } = await supabase
        .from("emprestimos")
        .select("*")
        .eq("codigoUsuario", codigoUsuario)
        .eq("codigoItem", codigoItem)
        .is("devolvido", null);

      if (erroRemoto) {
        console.error("Erro ao buscar empréstimos no Supabase:", erroRemoto);
      }

      if (emprestimosRemotos && emprestimosRemotos.length > 0) {
        emprestimoAtivo = emprestimosRemotos[0];
      } else {
        const emprestimosLocais = await dbService.searchEmprestimo(codigoUsuario);
        emprestimoAtivo = emprestimosLocais.find(
          (e) => e.codigoItem === codigoItem && e.devolvido == null
        );
      }

      if (emprestimoAtivo) {
        Alert.alert(
          "Livro já emprestado",
          `Você já possui "${livroValido.nome}" emprestado. Deseja devolver agora?`,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Sim",
              onPress: async () => {
                const devolucao = getDataHoraAtual();

                // Atualiza no Supabase e pega o registro atualizado
                const { data: emprestimoAtualizado, error } = await supabase
                  .from("emprestimos")
                  .update({ devolvido: devolucao })
                  .eq("codigo", emprestimoAtivo.codigo)
                  .select();

                if (error) {
                  console.error("Erro ao atualizar devolução no Supabase:", error);
                  Alert.alert("Erro", "Não foi possível registrar a devolução no servidor.");
                  return;
                }

                if (emprestimoAtualizado && emprestimoAtualizado.length > 0) {
                  // Atualiza no banco local com os dados retornados do Supabase
                  await dbService.updateEmprestimo({
                    ...emprestimoAtualizado[0],
                  });
                }
                DeviceEventEmitter.emit("emprestimoAtualizado");
              },
            },
          ]
        );
        return;
      }

      // 3. Caso não esteja ativo, pergunta se deseja emprestar
      Alert.alert(
        "Livro disponível",
        `Livro não encontrado nos empréstimos ativos. Gostaria de pegar "${livroValido.nome}" emprestado?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              try {
                // Se o livro veio do Supabase e não existe localmente, insere no banco local
                const itensLocais = await dbService.searchItem(codigoItem);
                if (!itensLocais || itensLocais.length === 0) {
                  await dbService.createItem(livroValido);
                  console.log("Livro inserido no banco local:", livroValido);
                }

                const novoEmprestimo: Emprestimo = {
                  codigo: 0, // será gerado automaticamente no banco local
                  emprestado: getDataHoraAtual(),
                  devolvido: null,
                  codigoItem,
                  codigoUsuario,
                };

                // 1. Salva no Supabase primeiro
                const { data: emprestimoCriado, error } = await supabase.from("emprestimos").insert([{
                  emprestado: novoEmprestimo.emprestado,
                  devolvido: novoEmprestimo.devolvido,
                  codigoItem: novoEmprestimo.codigoItem,
                  codigoUsuario: novoEmprestimo.codigoUsuario,
                }]).select();

                if (error) {
                  console.error("Erro ao salvar empréstimo no Supabase:", error);
                  Alert.alert("Erro", "Não foi possível registrar o empréstimo no servidor.");
                  return;
                }

                // 2. Depois salva no banco local com o mesmo código do Supabase
                if (emprestimoCriado && emprestimoCriado.length > 0) {
                  novoEmprestimo.codigo = emprestimoCriado[0].codigo;
                }
                await dbService.createEmprestimo(novoEmprestimo);

                Alert.alert("Sucesso", "Livro emprestado com sucesso!");
                DeviceEventEmitter.emit("emprestimoAtualizado");
                console.log("Livro pego com sucesso: ", novoEmprestimo);
              } catch (err) {
                console.error("Erro ao registrar empréstimo:", err);
                Alert.alert("Erro", "Não foi possível registrar o empréstimo.");
              }
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
