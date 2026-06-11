

class UserSession {
    private static instance: UserSession;

    private nome: string = "";
    private conta: string = "";

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
        this.conta = tipo;
    };

    setNome(nome: string){
        nome = nome.toUpperCase();
        this.nome = nome;
    }

    getNome(){
        return this.nome;
    }

    getTipoDaConta() {
        return this.conta || null;
    }

    reset() {
        this.conta = "";
        console.log("Sessão encerrada");
        UserSession.instance = undefined as any;
    }

}

export default UserSession;