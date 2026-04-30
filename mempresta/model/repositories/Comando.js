class Comando {
    constructor(builder) {
        this.tabela = builder.tabela;
        this.acao = builder.acao;
        this.idHistorico = builder.idHistorico;
        this.nome = builder.nome;
        this.autor = builder.autor;
        this.biblioteca = builder.biblioteca;
        this.emprestado = builder.emprestado;
        this.devolvido = builder.devolvido;
        this.idItem = builder.idItem;
    }

    // Classe interna Builder
    static get Builder() {
        class Builder {
            setTabela(tabela) {
                this.tabela = tabela;
                return this;
            }
            setAcao(acao) {
                this.acao = acao;
                return this;
            }
            setIdHistorico(idHistorico) {
                this.idHistorico = idHistorico;
                return this;
            }
            setNome(nome) {
                this.nome = nome;
                return this;
            }
            setAutor(autor) {
                this.autor = autor;
                return this;
            }
            setBiblioteca(biblioteca) {
                this.biblioteca = biblioteca;
                return this;
            }
            setEmprestado(emprestado) {
                this.emprestado = emprestado;
                return this;
            }
            setDevolvido(devolvido) {
                this.devolvido = devolvido;
                return this;
            }
            setIdItem(idItem) {
                this.idItem = idItem;
                return this;
            }
            build() {
                return new Comando(this);
            }
        }
        return Builder;
    }
}
