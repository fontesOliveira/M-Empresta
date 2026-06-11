import UserSession from "./usersession";
import { useDatabaseService, Usuario } from "@/bancoDeDados/useDatabase";

export function useAuthentication() {
  const dbService = useDatabaseService();
  const userSession = UserSession.getInstance();
  var userName: string = "";

  async function login(usuario: Usuario): Promise<boolean> {
    let u: Usuario = { codigo: "", nome: "", senha: "" };

    try {
      await dbService.init(); // inicializa banco
      u = await dbService.searchUsuario(usuario.codigo);
      console.info("Usuario recebido:", u.codigo, u.nome);
    } catch (error) {
      console.log("Erro na busca do usuário:", error);
    }

    if (u.senha === usuario.senha) {
      userSession.setConta(usuario.codigo.charAt(0).toUpperCase());
      userSession.setNome(u.nome);
      setUserName(usuario.nome);
      return true;
    } else {
      return false;
    }
  }

  function isAuthenticated(): boolean {
    return userSession.getTipoDaConta() !== null;
  }

  function getAccountType(): string | null {
    return isAuthenticated() ? userSession.getTipoDaConta() : null;
  }

  function logout() {
    userSession.reset();
  }

  function setUserName(username: string) {
    userName = username.toUpperCase();
  }

  function getUserName(): string {
    return userName;
  }

  return {
    login,
    isAuthenticated,
    getAccountType,
    logout,
    setUserName,
    getUserName,
  };
}
