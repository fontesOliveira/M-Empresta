import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
        codigo VARCHAR(9) PRIMARY KEY,
        nome VARCHAR(250) NOT NULL,
        senha VARCHAR(30) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS bibliotecas (
        codigo VARCHAR(9) PRIMARY KEY,
        nome VARCHAR(250) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS itens (
        codigo VARCHAR(11) PRIMARY KEY,
        nome VARCHAR(250) NOT NULL,
        autor VARCHAR(250) NOT NULL,
        codigoQRCode VARCHAR(11),
        codigoBiblioteca VARCHAR(9),
        FOREIGN KEY (codigoBiblioteca) REFERENCES bibliotecas(codigo)
        );

        CREATE TABLE IF NOT EXISTS emprestimos (
        codigo VARCHAR(11) PRIMARY KEY,
        emprestado DATETIME NOT NULL,
        devolvido DATETIME,
        codigoItem VARCHAR(11),
        codigoUsuario VARCHAR(9),
        FOREIGN KEY (codigoItem) REFERENCES itens(codigo),
        FOREIGN KEY (codigoUsuario) REFERENCES usuarios(codigo)
        );
  `)
}