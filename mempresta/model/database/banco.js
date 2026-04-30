const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mempresta.db');

const dbRun = (sql) => {
  db.serialize(() => {
    db.run(sql);
  });
  db.close();
};

const dbGet = (sql) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(sql, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    db.close();
  });
};

module.exports = { dbRun, dbGet };