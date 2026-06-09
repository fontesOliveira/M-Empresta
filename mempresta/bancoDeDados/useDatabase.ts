import { useSQLiteContext } from "expo-sqlite"

export type Usuario = {
    codigo: string
    nome: string
    senha: string
}

export type Biblioteca = {
    codigo: string
    nome: string
}

export type Item = {
    codigo: string
    nome: string
    autor: string
    codigoQRCode?: string
    codigoBiblioteca: string
}

export type Emprestimo = {
    codigo: string
    emprestado: string // formato ISO: "YYYY-MM-DD HH:MM:SS"
    devolvido?: string
    codigoItem: string
    codigoUsuario: string
}

export class DatabaseService {
    private database = useSQLiteContext()

    // ---------- USUÁRIOS ----------
    async createUsuario(data: Usuario) {
        const stmt = await this.database.prepareAsync(
            "INSERT INTO usuarios (codigo, nome, senha) VALUES ($codigo, $nome, $senha)"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
                $senha: data.senha,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async updateUsuario(data: Usuario) {
        const stmt = await this.database.prepareAsync(
            "UPDATE usuarios SET nome = $nome, senha = $senha WHERE codigo = $codigo"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
                $senha: data.senha,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async searchUsuario(nome: string) {
        return await this.database.getAllAsync<Usuario>(
            "SELECT * FROM usuarios WHERE nome LIKE ?",
            [`%${nome}%`]
        )
    }

    // ---------- BIBLIOTECAS ----------
    async createBiblioteca(data: Biblioteca) {
        const stmt = await this.database.prepareAsync(
            "INSERT INTO bibliotecas (codigo, nome) VALUES ($codigo, $nome)"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async updateBiblioteca(data: Biblioteca) {
        const stmt = await this.database.prepareAsync(
            "UPDATE bibliotecas SET nome = $nome WHERE codigo = $codigo"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async searchBiblioteca(nome: string) {
        return await this.database.getAllAsync<Biblioteca>(
            "SELECT * FROM bibliotecas WHERE nome LIKE ?",
            [`%${nome}%`]
        )
    }

    // ---------- ITENS ----------
    async createItem(data: Item) {
        const stmt = await this.database.prepareAsync(
            "INSERT INTO itens (codigo, nome, autor, codigoQRCode, codigoBiblioteca) VALUES ($codigo, $nome, $autor, $codigoQRCode, $codigoBiblioteca)"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
                $autor: data.autor,
                $codigoQRCode: data.codigoQRCode ?? null,   // <-- corrigido
                $codigoBiblioteca: data.codigoBiblioteca,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async updateItem(data: Item) {
        const stmt = await this.database.prepareAsync(
            "UPDATE itens SET nome = $nome, autor = $autor, codigoQRCode = $codigoQRCode, codigoBiblioteca = $codigoBiblioteca WHERE codigo = $codigo"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $nome: data.nome,
                $autor: data.autor,
                $codigoQRCode: data.codigoQRCode ?? null,   // <-- corrigido
                $codigoBiblioteca: data.codigoBiblioteca,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async searchItem(nome: string) {
        return await this.database.getAllAsync<Item>(
            "SELECT * FROM itens WHERE nome LIKE ?",
            [`%${nome}%`]
        )
    }

    // ---------- EMPRÉSTIMOS ----------
    async createEmprestimo(data: Emprestimo) {
        const stmt = await this.database.prepareAsync(
            "INSERT INTO emprestimos (codigo, emprestado, devolvido, codigoItem, codigoUsuario) VALUES ($codigo, $emprestado, $devolvido, $codigoItem, $codigoUsuario)"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $emprestado: data.emprestado,
                $devolvido: data.devolvido ?? null,   // <-- corrigido
                $codigoItem: data.codigoItem,
                $codigoUsuario: data.codigoUsuario,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async updateEmprestimo(data: Emprestimo) {
        const stmt = await this.database.prepareAsync(
            "UPDATE emprestimos SET emprestado = $emprestado, devolvido = $devolvido, codigoItem = $codigoItem, codigoUsuario = $codigoUsuario WHERE codigo = $codigo"
        )
        try {
            await stmt.executeAsync({
                $codigo: data.codigo,
                $emprestado: data.emprestado,
                $devolvido: data.devolvido ?? null,   // <-- corrigido
                $codigoItem: data.codigoItem,
                $codigoUsuario: data.codigoUsuario,
            })
        } finally {
            await stmt.finalizeAsync()
        }
    }

    async searchEmprestimo(codigoUsuario: string) {
        return await this.database.getAllAsync<Emprestimo>(
            "SELECT * FROM emprestimos WHERE codigoUsuario = ?",
            [codigoUsuario]
        )
    }
}
