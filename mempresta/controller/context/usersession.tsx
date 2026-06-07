class UserSession {
    private static instance: UserSession;

    conta: {tipo: string} | null = null;
    nome: {nome: string} | null = null;

    private constructor() {}

    public static getInstance(): UserSession {
        if (!UserSession.instance) {
            UserSession.instance = new UserSession();
            console.log("Nova sessão criada");
        }
        return UserSession.instance;
    }

    setConta(tipo: string) {
        tipo = tipo[0].toUpperCase();
        this.conta = {tipo: tipo};
    };

    setNome(nome: string){
        nome = nome.toUpperCase();
        this.nome = {nome: nome};
    }

    getNome(){
        return this.nome?.nome;
    }

    getTipoDaConta() {
        return this.conta?.tipo || null;
    }

    reset() {
        this.conta = null;
        console.log("Sessão encerrada");
        UserSession.instance = undefined as any;
    }

}

export default UserSession;