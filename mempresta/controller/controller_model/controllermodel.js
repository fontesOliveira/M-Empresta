import Comando from "../../model/repositories/Comando";
import Connection from "../../model/repositories/connection";

class ControllerModel {
    constructor() {
        this.connection = new Connection();
    }

    executarComando = (comando) => {
        try {
            con = this.connection.comando(this.construirComando(comando));
            con.then(resultados => {
                console.log("Histórico listado:", resultados);
            })
        } catch (error) {
            console.error("Erro ao executar comando:", error);
        }
    }

    construirComando(tabela,
        acao,
        idHistorico,
        nome,
        autor,
        biblioteca,
        emprestado,
        devolvido,
        idItem) {
        try {
            if (tabela === null) {
                throw new Error("Tabela é obrigatória");
            } else if (tabela === "H") {
                if (acao === null && idHistorico === null && emprestado === null && idItem === null) {
                    throw new Error("Todos os campos são obrigatórios para a tabela H (Exceto Devolvido)");
                } else {
                    return new Comando.Builder()
                        .setTabela(tabela)
                        .setAcao(acao)
                        .setIdHistorico(idHistorico)
                        .setEmprestado(emprestado)
                        .setDevolvido(devolvido)
                        .setIdItem(idItem)
                        .build();
                }
            } else if (tabela === "I") {
                if (acao === null && nome === null && autor === null && biblioteca === null) {
                    throw new Error("Todos os campos são obrigatórios para a tabela I");
                } else {
                    return new Comando.Builder()
                        .setTabela(tabela)
                        .setAcao(acao)
                        .setNome(nome)
                        .setAutor(autor)
                        .setBiblioteca(biblioteca)
                        .build();
                }
            }
        } catch (error) {
            console.error("Erro ao construir comando:", error);
        }
    }
}

export default ControllerModel;