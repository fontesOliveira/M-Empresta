import ManipularJSON from '@/model/manipularjson';

const manipularJSON = new ManipularJSON();

export default class ControllerModel { // fazer a analise do QRCode e chamar as funções de consulta e comparação, ou adição, ou atualização
    
    nome: string = "";
    letra: string = "";

    constructor() {
        
    }

    consultarUsuario(codigo: string, senha: string) {
        try {
            const tamanho = codigo.length === 9;
            if (!tamanho) {
                console.warn("Usuário inválido.");
                throw new Error();
            }

            const r: boolean = manipularJSON.consultarUsuario(codigo, senha);
            this.nome = manipularJSON.pegarNomeUsuario(codigo, senha);
            this.nome = this.nome.toUpperCase();
            return r;
        } catch (error) {
            console.warn("Erro ao consultar usuário:", error);
            return false;
        }
    }

    getNome(){
        return this.nome;
    }

    getLetra(){
        return this.letra;
    }

    analizandoQRCode(data: JSON) {
        console.log("Analisando o QRCode no controller: ", data);
    }

}