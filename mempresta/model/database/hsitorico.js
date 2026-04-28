// historico.js
const db = require('./banco');

// Inserir novo histórico
function inserirHistorico(emprestado, devolvido = null, idItem) {
  return new Promise((resolve, reject) => {
    const tabela = `historico${db.idUsers}`;
    const sql = `INSERT INTO ${tabela} (Emprestado, Devolvido, idItem) VALUES (?, ?, ?)`;
    db.run(sql, [emprestado, devolvido, idItem], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
}

// Listar históricos
function listarHistoricos() {
  return new Promise((resolve, reject) => {
    const tabela = `historico${db.idUsers}`;
    const sql = `
      SELECT h.Codigo, h.Emprestado, h.Devolvido, i.Nome AS ItemNome
      FROM ${tabela} h
      JOIN Item i ON h.idItem = i.Codigo
    `;
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Atualizar histórico
function atualizarHistorico( codigo, emprestado, devolvido = null) {
  return new Promise((resolve, reject) => {
    const tabela = `historico${db.idUsers}`;
    const sql = `UPDATE ${tabela} SET Emprestado = ?, Devolvido = ? WHERE Codigo = ?`;
    db.run(sql, [emprestado, devolvido, codigo], function(err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
}

module.exports = { inserirHistorico, listarHistoricos, atualizarHistorico };
