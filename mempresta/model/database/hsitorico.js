import { dbRun, dbGet } from "./banco";

class Historico {

  constructor(idUser) {
    this.idUser = idUser;
    this.criar();
  }

  criar() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Historico${this.idUser} (
        Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
        Emprestado DATETIME NOT NULL,
        Devolvido DATETIME,
        idItem INTEGER,
        FOREIGN KEY (idItem) REFERENCES Item(Codigo)
      )
    `;
    dbRun(sql);
  }

  inserir(emprestado, devolvido = null, idItem) {
    const sql = `
      INSERT INTO Historico${this.idUser} (Emprestado, Devolvido, idItem) VALUES ($emprestado, $devolvido, $idItem)
    `;
    dbRun(sql);
  }

  selecionar(codigo) {
    const sql = `SELECT * FROM Historico${this.idUser} WHERE Codigo = $codigo`;
    return dbGet(sql, { $codigo });
  }

  listar() {
    const sql = `SELECT * FROM Historico${this.idUser}`;
    return dbGet(sql);
  }

  excluir(codigo) {
    const sql = `DELETE FROM Historico${this.idUser} WHERE Codigo = $codigo`;
    dbRun(sql);
  }

  atualizar(codigo, devolvido){
    const sql = `UPDATE Historico${this.idUser} SET Devolvido = $devolvido WHERE Codigo = $codigo`;
    dbRun(sql);
  }
}

export default Historico;
