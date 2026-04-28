// item.js
const db = require('./banco');

// Inserir novo item
function inserirItem(nome, autor, biblioteca) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Item (Nome, Autor, Biblioteca) VALUES (?, ?, ?)`;
    db.run(sql, [nome, autor, biblioteca], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

// Buscar todos os itens
function listarItens() {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM Item`;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}


// Atualizar item
function atualizarItem(codigo, nome, autor, biblioteca) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE Item SET Nome = ?, Autor = ?, Biblioteca = ? WHERE Codigo = ?`;
    db.run(sql, [nome, autor, biblioteca, codigo], function(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
}

module.exports = { inserirItem, listarItens, atualizarItem };
