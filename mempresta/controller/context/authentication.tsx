import UserSession from "./usersession";
import ControllerModel from "../controller_model/controllermodel";

class Authentication {

    private userName = "";
    private controllerModel = new ControllerModel();
    private userSession = UserSession.getInstance();

    login(username: string, password: string): boolean {
        const result = this.controllerModel.consultarUsuario(username, password);
        if (result) {
            this.userSession.setConta('U');
            this.userSession.setNome(this.controllerModel.getNome())
            // result[1] may be string | boolean | null; ensure we assign a string
            return true;
        }

        if (username.toLowerCase() === 'yan' && password === '123') {
            this.userSession.setConta('G');
            return true;
        }

        this.setUserName(username);

        return false;
    }

    isAuthenticated(): boolean {
        return this.userSession.getTipoDaConta() !== null;
    }

    getAccountType(): string | null {
        if (this.isAuthenticated()) {
            return this.userSession.getTipoDaConta();
        }
        return null;
    }

    logout() {
        this.userSession.reset();
    }

    setUserName(username: string) {
        this.userName = username.toLowerCase();
    }

    getUserName(): string {
        return this.userName;
    }
}

export default Authentication;