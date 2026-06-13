// import ManipularJSON from '@/model/manipularjson';

// const manipularJSON = new ManipularJSON();

// export default class ControllerModel { // fazer a analise do QRCode e chamar as funções de consulta e comparação, ou adição, ou atualização

//     nome: string = "";
//     letra: string = "";

//     constructor() {

//     }

//     consultarUsuario(codigo: string, senha: string) {
//         try {
//             const tamanho = codigo.length === 9;
//             if (!tamanho) {
//                 console.warn("Usuário inválido.");
//                 throw new Error();
//             }

//             const r: boolean = manipularJSON.consultarUsuario(codigo, senha);
//             this.nome = manipularJSON.pegarNomeUsuario(codigo, senha);
//             this.nome = this.nome.toUpperCase();
//             return r;
//         } catch (error) {
//             console.warn("Erro ao consultar usuário:", error);
//             return false;
//         }
//     }

//     getNome(){
//         return this.nome;
//     }

//     getLetra(){
//         return this.letra;
//     }

//     analizandoQRCode(data: JSON) {
//         console.log("Analisando o QRCode no controller: ", data);
//     }

import { useDatabaseService, Emprestimo } from "@/bancoDeDados/useDatabase";
import { DeviceEventEmitter } from "react-native";
import UserSession from "../context/usersession";
import { Alert } from "react-native";

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

  async function analizandoQRCode(data: any) {
    try {
      const codigoItem = data?.codigo;
      const codigoUsuario = user.getCodigo();

      if (!codigoItem || !codigoUsuario) {
        Alert.alert("QR Code inválido", "Dados incompletos no QR Code.");
        return;
      }

      // 1. Verifica se o item existe
      const itens = await dbService.searchItem(codigoItem);
      if (!itens || itens.length === 0) {
        Alert.alert("Livro não cadastrado", "Livro não cadastrado no seu banco de dados ainda.");
        return;
      }

      const livro = itens[0];

      // 2. Verifica se já há empréstimo ativo
      const emprestimos = await dbService.searchEmprestimo(codigoUsuario);
      const emprestimoAtivo = emprestimos.find(
        (e) => e.codigoItem === codigoItem && e.devolvido == null
      );

      if (emprestimoAtivo) {
        // Se já está ativo, pergunta se deseja devolver
        Alert.alert(
          "Livro já emprestado",
          `Você já possui "${livro.nome}" emprestado. Deseja devolver agora?`,
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

      // 3. Caso não esteja ativo, pergunta se deseja emprestar
      Alert.alert(
        "Livro disponível",
        `Livro não encontrado nos empréstimos ativos. Gostaria de pegar "${livro.nome}" emprestado?`,
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
      console.error("Erro ao analisar QRCode:", error);
      Alert.alert("Erro", "Não foi possível processar o QR Code.");
    }
  }

  return { analizandoQRCode };
}
