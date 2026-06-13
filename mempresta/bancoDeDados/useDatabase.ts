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
  emprestado: string; // formato ISO: "DD-MM-YYYY HH-MM-SS"
  devolvido?: string | null;
  codigoItem: string;
  codigoUsuario: string;
};

// Novo tipo para retorno combinado
export type EmprestimoComItem = Emprestimo & {
  nomeLivro: string;
  autorLivro: string;
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
        ('LIV00000003', 'O Primo Basílio', 'Eça de Queirós', 'QRC00000003', 'B00000001'),
        ('LIV00000004', 'O Senhor dos Anéis', 'J. R. R. Tolkien', 'QRC00000004', 'B00000001'),
        ('LIV00000005', 'O Hobbit', 'J. R. R. Tolkien', 'QRC00000005', 'B00000001'),
        ('LIV00000006', 'Orgulho e Preconceito', 'Jane Austen', 'QRC00000006', 'B00000001'),
        ('LIV00000007', 'Crime e Castigo', 'Fiódor Dostoiévski', 'QRC00000007', 'B00000001');

        `);
      // DELETE FROM emprestimos;
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

  async function devolverEmprestimo(codigo: string) {
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


  function getDataHoraAtual(): string {
    const agora = new Date();
    const dataHoraLocal = agora.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const [data, hora] = dataHoraLocal.split(" ");
    const [dia, mes, ano] = data.split("/");

    return `${dia}-${mes}-${ano} ${hora.replace(/:/g, "-")}`;
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
    searchEmprestimosComItens,
    devolverEmprestimo, // novo método
  };

}
