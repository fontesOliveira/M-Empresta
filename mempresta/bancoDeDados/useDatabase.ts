import { useSQLiteContext } from "expo-sqlite";

export type Usuario = {
  codigo: string;
  nome: string;
  senha: string;
};

export type Biblioteca = {
  codigo: string;
  nome: string;
};

export type Item = {
  codigo: string;
  nome: string;
  autor: string;
  codigoQRCode?: string;
  codigoBiblioteca: string;
};

export type Emprestimo = {
  codigo: string;
  emprestado: string; // formato ISO: "YYYY-MM-DD HH:MM:SS"
  devolvido?: string;
  codigoItem: string;
  codigoUsuario: string;
};

// Hook customizado
export function useDatabaseService() {
  const db = useSQLiteContext();

  async function init() {
    try {
      await db.execAsync(`
        INSERT OR IGNORE INTO usuarios (codigo, nome, senha) VALUES
        ('A06170571', 'Pedro Henrique de Oliveira Fontes', '123'),
        ('A06170152', 'Yan Moreira Lourenço', '123'),
        ('G06170571', 'Pedro Henrique de Oliveira Fontes', '123'),
        ('G06170152', 'Yan Moreira Lourenço', '123');

        INSERT OR IGNORE INTO bibliotecas (codigo, nome) VALUES
        ('B00000001', 'Biblioteca do Unileste - Fabriciano'),
        ('B00000002', 'Biblioteca do Unileste - Ipatinga'),
        ('B00000003', 'Biblioteca Municipal de Timóteo');

        INSERT OR IGNORE INTO itens (codigo, nome, autor, codigoQRCode, codigoBiblioteca) VALUES
        ('LIV00000001', 'Dom Casmurro', 'Machado de Assis', 'QRC00000001', 'B00000001'),
        ('LIV00000002', 'Memórias Póstumas de Brás Cubas', 'Machado de Assis', 'QRC00000002', 'B00000001'),
        ('LIV00000003', 'O Primo Basílio', 'Eça de Queirós', 'QRC00000003', 'B00000001');
      `);
      console.log("Inserção inicial concluída.");
    } catch (error) {
      console.log("Erro na inserção inicial:", error);
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

  async function searchBiblioteca(codigo: string) {
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

  async function searchItem(codigo: string) {
    return await db.getAllAsync<Item>(
      "SELECT * FROM itens WHERE codigo LIKE ?",
      [`%${codigo}%`]
    );
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

  async function searchEmprestimo(codigoUsuario: string) {
    return await db.getAllAsync<Emprestimo>(
      "SELECT * FROM emprestimos WHERE codigoUsuario = ?",
      [codigoUsuario]
    );
  }

  return {
    init,
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
  };
}
