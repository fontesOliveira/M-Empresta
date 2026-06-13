// useManipularJSON.tsx
import { useDatabaseService, Emprestimo } from "@/bancoDeDados/useDatabase";

export function useManipularJSON() {
  const dbService = useDatabaseService();

  async function lerJSON(codigoUsuario: string) {
    try {
      // Busca todos os empréstimos do usuário
      const emprestimos: Emprestimo[] = await dbService.searchEmprestimo(codigoUsuario);

      // Retorna todos os empréstimos em JSON (mesmo que seja lista vazia)
      return JSON.stringify(emprestimos, null, 2);
    } catch (error) {
      console.error("Erro ao ler empréstimos:", error);
      return JSON.stringify([]);
    }
  }

  return { lerJSON };
}
