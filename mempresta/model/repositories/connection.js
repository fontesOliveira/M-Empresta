import Historico from "../database/hsitorico";
import Item from "../database/item";
import Autentication from "../../controller/context/authentication";

class Connection {
  constructor() {
    this.historico = new Historico(Autentication.getUserName());
    this.item = new Item();
  }

  comando = (Comando) => {
    if (Comando.tabela === "H") {
      switch (Comando.acao) {
        case "inserir":
          this.historico.inserir(Comando.emprestado, Comando.devolvido, Comando.idItem);
          break;
        case "atualizar":
          this.historico.atualizar(Comando.codigo, Comando.devolvido);
          break;
        case "excluir":
          this.historico.excluir(Comando.codigo);
          break;
        case "selecionar":
          return this.historico.selecionar(Comando.codigo);
          break;
        case "listar":
          return this.historico.listar();
          break;
      }
    } else if (Comando.tabela === "I") {
      switch (Comando.acao) {
        case "inserir":
          this.item.inserir(Comando.nome, Comando.autor, Comando.biblioteca);
          break;
        case "atualizar":
          this.item.atualizar(Comando.codigo, Comando.nome, Comando.autor, Comando.biblioteca);
          break;
        case "excluir":
          this.item.excluir(Comando.codigo);
          break;
        case "selecionar":
          return this.item.selecionar(Comando.codigo);
          break;
        case "listar":
          return this.item.listar();
          break;
      }
    }
  }

}

export default Connection;