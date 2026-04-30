import UserSession from "./usersession";

class Authentication {

    private userName = "";

    login(username: string, password: string): boolean {
        if (username.toLowerCase() === 'a06170571' && password === '123') {
            const userSession = UserSession.getInstance();
            userSession.setConta('U');
            return true;
        }

        if (username.toLowerCase() === 'a07152289' && password === '123') {
            const userSession = UserSession.getInstance();
            userSession.setConta('G');
            return true;
        }

        this.setUserName(username);

        return false;

    }

    isAuthenticated(): boolean {
        const userSession = UserSession.getInstance();
        return userSession.getTipoDaConta() !== null;
    }

    getAccountType(): string | null {
        if (this.isAuthenticated()) {
            const userSession = UserSession.getInstance();
            return userSession.getTipoDaConta();
        }
        return null;
    }

    logout() {
        const userSession = UserSession.getInstance();
        userSession.reset();
    }

    setUserName(username: string) {
        this.userName = username.toLowerCase().substring(0, 8);
    }

    getUserName(): string {
        return this.userName;
    }
}

export default Authentication;