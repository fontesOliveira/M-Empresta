import { dbRun, dbGet } from "./banco";

class Item {
  constructor() {
    this.criar();
  }

  criar() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Item (
        Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
        Nome VARCHAR(100) NOT NULL,
        Autor VARCHAR(100) NOT NULL,
        Biblioteca VARCHAR(9) NOT NULL
      )
    `;
    dbRun(sql);
  }

  inserir(nome, autor, biblioteca) {
    const sql = `
      INSERT INTO Item (Nome, Autor, Biblioteca) VALUES (${nome}, ${autor}, ${biblioteca})
    `;
    return dbRun(sql);
  }

  selecionar(codigo) {
    const sql = `SELECT * FROM Item WHERE Codigo = ${codigo}`;
    return dbGet(sql);
  }

  listar() {
    const sql = `SELECT * FROM Item`;
    return dbGet(sql);
  }

  atualizar(codigo, nome, autor, biblioteca) {
    const sql = `
      UPDATE Item SET Nome = ${nome}, Autor = ${autor}, Biblioteca = ${biblioteca} WHERE Codigo = ${codigo}
    `;
    return dbRun(sql);
  }

  excluir(codigo) {
    const sql = `DELETE FROM Item WHERE Codigo = ${codigo}`;
    return dbRun(sql);
  }
}

export default Item;
