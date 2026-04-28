import sqlite3 from 'sqlite3';
import Autentication from '../controller/context/authentication';

// banco.js
const sqlite3 = require('sqlite3').verbose();

const id = Autentication.getInstance().getUserName();

// Cria/abre o banco
const db = new sqlite3.Database('./meprestacliente.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Criação das tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Item (
      Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
      Nome VARCHAR(100) NOT NULL,
      Autor VARCHAR(100) NOT NULL,
      Biblioteca VARCHAR(8) NOT NULL,
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Historico${this.id} (
      Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
      Emprestado DATETIME NOT NULL,
      Devolvido DATETIME,
      idItem INTEGER NOT NULL,
      FOREIGN KEY (idItem) REFERENCES Item(Codigo)
    )
  `);
});


module.exports = db;
