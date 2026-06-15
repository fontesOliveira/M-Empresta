import UserSession from "./usersession";
import { useDatabaseService, Usuario } from "@/bancoDeDados/useDatabase";
import { supabase } from './servidor.js'
import * as Network from 'expo-network'

export function useAuthentication() {
  const dbService = useDatabaseService();
  const userSession = UserSession.getInstance();
  var userName: string = "";

  async function isOnline(): Promise<boolean> {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected ?? false;
  }

  async function loginAuto(usuario: Usuario): Promise<boolean> {
    try {
      const online = await isOnline();
  
      if (online) {
        console.log("Conectado à internet, usando Supabase...");
        return await loginSupabase(usuario);
      } else {
        console.log("Sem internet, usando login local...");
        return await login(usuario);
      }
    } catch (error) {
      console.log("Deu algum erro na função de LoginAuto(): ", error);
      return false;
    }
  }

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
      userSession.setCodigo(u.codigo)
      setUserName(usuario.nome);
      return true;
    } else {
      return false;
    }
  }

  async function loginSupabase(usuario: Usuario): Promise<boolean> {
    const userSession = UserSession.getInstance();
    let userName: string = "";

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("codigo", usuario.codigo)
        .maybeSingle(); // retorna só um usuário

      console.log(data)

      if (error) {
        console.error("Erro na busca do usuário:", error);
        return false;
      }

      if (data && data.senha === usuario.senha) {
        userSession.setConta(usuario.codigo.charAt(0).toUpperCase());
        userSession.setNome(data.nome);
        userSession.setCodigo(data.codigo);
        userName = data.nome.toUpperCase();
        return true; // isso já é Promise<boolean> por estar dentro de async
      } else {
        return false;
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
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
    isAuthenticated,
    getAccountType,
    logout,
    setUserName,
    getUserName,
    loginAuto
  };
}
