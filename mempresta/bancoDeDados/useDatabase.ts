import { useSQLiteContext } from "expo-sqlite";

// ---------- TIPOS ----------
export type Usuario = {
  codigo: string; // VARCHAR(9)
  nome: string;
  senha: string;
};

export type Biblioteca = {
  codigo: number; // INT
  nome: string;
};

export type Item = {
  codigo: number; // INT
  nome: string;
  autor: string;
  codigoQRCode?: string;
  codigoBiblioteca: number; // INT
};

export type Emprestimo = {
  codigo: number; // INT
  emprestado: string; // TIMESTAMP em formato ISO
  devolvido?: string | null; // TIMESTAMP ou null
  codigoItem: number; // INT
  codigoUsuario: string; // VARCHAR(9)
};

// Novo tipo para retorno combinado
export type EmprestimoComItem = Emprestimo & {
  nomeLivro: string;
  autorLivro: string;
};

// ---------- HOOK ----------
export function useDatabaseService() {
  const db = useSQLiteContext();

  // Dentro do useDatabaseService
  async function clearAllTables() {
    try {
      await db.execAsync(`
      DELETE FROM emprestimos;
      DELETE FROM itens;
      DELETE FROM bibliotecas;
      DELETE FROM usuarios;
    `);
      console.log("Todas as tabelas foram limpas com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar tabelas:", error);
    }
  }


  // ---------- USUÁRIOS ----------
  async function createUsuario(data: Usuario) {
    const stmt = await db.prepareAsync(
      "INSERT INTO usuarios (codigo, nome, senha) VALUES ($codigo, $nome, $senha)"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
        $senha: data.senha,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function updateUsuario(data: Usuario) {
    const stmt = await db.prepareAsync(
      "UPDATE usuarios SET nome = $nome, senha = $senha WHERE codigo = $codigo"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
        $senha: data.senha,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function searchUsuario(codigo: string) {
    if (codigo.length === 9) {
      const usuarios = await db.getAllAsync<Usuario>(
        "SELECT * FROM usuarios WHERE codigo LIKE ?",
        [`%${codigo}%`]
      );
      return usuarios[0];
    }
    return { codigo: "", nome: "", senha: "" };
  }

  // ---------- BIBLIOTECAS ----------
  async function createBiblioteca(data: Biblioteca) {
    const stmt = await db.prepareAsync(
      "INSERT INTO bibliotecas (codigo, nome) VALUES ($codigo, $nome)"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function updateBiblioteca(data: Biblioteca) {
    const stmt = await db.prepareAsync(
      "UPDATE bibliotecas SET nome = $nome WHERE codigo = $codigo"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function searchBiblioteca(codigo: number) {
    return await db.getAllAsync<Biblioteca>(
      "SELECT * FROM bibliotecas WHERE codigo LIKE ?",
      [`%${codigo}%`]
    );
  }

  // ---------- ITENS ----------
  async function createItem(data: Item) {
    const stmt = await db.prepareAsync(
      "INSERT INTO itens (codigo, nome, autor, codigoQRCode, codigoBiblioteca) VALUES ($codigo, $nome, $autor, $codigoQRCode, $codigoBiblioteca)"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
        $autor: data.autor,
        $codigoQRCode: data.codigoQRCode ?? null,
        $codigoBiblioteca: data.codigoBiblioteca,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function updateItem(data: Item) {
    const stmt = await db.prepareAsync(
      "UPDATE itens SET nome = $nome, autor = $autor, codigoQRCode = $codigoQRCode, codigoBiblioteca = $codigoBiblioteca WHERE codigo = $codigo"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $nome: data.nome,
        $autor: data.autor,
        $codigoQRCode: data.codigoQRCode ?? null,
        $codigoBiblioteca: data.codigoBiblioteca,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function searchItem(codigo: number) {
    return await db.getAllAsync<Item>(
      "SELECT * FROM itens WHERE codigo = ?",
      [codigo]
    );
  }

  async function searchAllItems() {
  return await db.getAllAsync<Item>("SELECT * FROM itens");
}


  // ---------- EMPRÉSTIMOS ----------
  async function createEmprestimo(data: Emprestimo) {
    const stmt = await db.prepareAsync(
      "INSERT INTO emprestimos (codigo, emprestado, devolvido, codigoItem, codigoUsuario) VALUES ($codigo, $emprestado, $devolvido, $codigoItem, $codigoUsuario)"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $emprestado: data.emprestado,
        $devolvido: data.devolvido ?? null,
        $codigoItem: data.codigoItem,
        $codigoUsuario: data.codigoUsuario,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function updateEmprestimo(data: Emprestimo) {
    const stmt = await db.prepareAsync(
      "UPDATE emprestimos SET emprestado = $emprestado, devolvido = $devolvido, codigoItem = $codigoItem, codigoUsuario = $codigoUsuario WHERE codigo = $codigo"
    );
    try {
      await stmt.executeAsync({
        $codigo: data.codigo,
        $emprestado: data.emprestado,
        $devolvido: data.devolvido ?? null,
        $codigoItem: data.codigoItem,
        $codigoUsuario: data.codigoUsuario,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async function searchEmprestimo(codigoUsuario: string): Promise<Emprestimo[]> {
    return await db.getAllAsync<Emprestimo>(
      "SELECT * FROM emprestimos WHERE codigoUsuario = ?",
      [codigoUsuario]
    );
  }

  async function searchEmprestimosComItens(codigoUsuario: string): Promise<EmprestimoComItem[]> {
    return await db.getAllAsync<EmprestimoComItem>(
      `
    SELECT e.codigo, e.emprestado, e.devolvido, e.codigoItem, e.codigoUsuario,
           i.nome AS nomeLivro, i.autor AS autorLivro
    FROM emprestimos e
    JOIN itens i ON e.codigoItem = i.codigo
    WHERE e.codigoUsuario = ?
    ORDER BY e.emprestado DESC
    `,
      [codigoUsuario]
    );
  }

  async function devolverEmprestimo(codigo: number) {
    const devolucao = getDataHoraAtual();
    const stmt = await db.prepareAsync(
      "UPDATE emprestimos SET devolvido = $devolvido WHERE codigo = $codigo"
    );
    try {
      await stmt.executeAsync({
        $codigo: codigo,
        $devolvido: devolucao,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  // ---------- UTIL ----------
  function getDataHoraAtual(): string {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");
    const segundo = String(agora.getSeconds()).padStart(2, "0");

    // Formato ISO compatível com TIMESTAMP: YYYY-MM-DD HH:MM:SS
    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  return {
    createUsuario,
    updateUsuario,
    searchUsuario,
    createBiblioteca,
    updateBiblioteca,
    searchBiblioteca,
    createItem,
    updateItem,
    searchItem,
    createEmprestimo,
    updateEmprestimo,
    searchEmprestimo,
    searchEmprestimosComItens,
    devolverEmprestimo,
    clearAllTables,
    searchAllItems,
  };
}
