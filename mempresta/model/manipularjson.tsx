// Importando o JSON tipado
import { dado } from './dados';

// Classe com tipagem
export default class ManipularJSON {

    constructor() {
    }

    // Retorna todos os dados
    public lerJSON() {
        return dado;
    }

    // Consulta usuário por código e senha
    public consultarUsuario(codigo: string, senha: string) {
        const dados = this.lerJSON();
        const usuario = dados.usuarios.find((u) => u.codigo === codigo && u.senha === senha);
        if (usuario) {
            return true;
        }else {
            console.warn(`Usuário com código ${codigo} e senha ${senha} não encontrado.`);
            return false;
        }
    }

    public pegarNomeUsuario(codigo: string, senha: string) {
        const dados = this.lerJSON();
        const usuario = dados.usuarios.find((u) => u.codigo === codigo && u.senha === senha);
        return usuario?.nome || "";
    }
}
