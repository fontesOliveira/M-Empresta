import dado from './itens.json';

export default class ManipularJSON {
    constructor() {
        console.info("ManipularJSON criado");
        this.dados = dado;
    }

    lerJSON() {
        console.info("Lendo: " + JSON.stringify(this.dados));
        return this.dados;
    }
}