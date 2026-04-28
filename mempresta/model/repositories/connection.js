const criarBanco = require('./banco');
const item = require('./item');
const historico = require('./historico');

class Connection {

  // ---------- ITEM ----------
  async inserirItem(nome, autor, biblioteca) {
    return await item.inserirItem(nome, autor, biblioteca);
  }

  async listarItens() {
    return await item.listarItens();
  }

  async atualizarItem(codigo, nome, autor, biblioteca) {
    return await item.atualizarItem(codigo, nome, autor, biblioteca);
  }

  // ---------- HISTORICO ----------
  async inserirHistorico(emprestado, devolvido, idItem) {
    return await historico.inserirHistorico(emprestado, devolvido, idItem);
  }

  async listarHistoricos() {
    return await historico.listarHistoricos();
  }

  async atualizarHistorico(codigo, emprestado, devolvido) {
    return await historico.atualizarHistorico( codigo, emprestado, devolvido);
  }
}

module.exports = Connection;
