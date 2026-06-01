// manipula.js
const fs = require('fs');
const path = require('path');

class ManipulaItens {
    constructor() {
        this.filePath = path.join(__dirname, 'itens.json');
    }

    // Método para ler o arquivo
    lerItens() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    // Método para salvar no arquivo
    salvarItens(json) {
        fs.writeFileSync(this.filePath, JSON.stringify(json, null, 2), 'utf8');
    }

    // Método para adicionar ou atualizar item
    adicionarItem(novoItem) {
        try {
            const dados = this.lerItens();

            if (!dados.itens || dados.itens.length === 0) {
                throw new Error("O arquivo de itens está vazio ou não contém a estrutura esperada.");
            } else {
                const index = dados.itens.findIndex(item => item.codigo === novoItem.codigo);
    
                // função para verificar conexão com internet aqui, se ok -> adicionar no servidor; se não, consultar localmente.

                if (index === -1) {
                    dados.itens.push(novoItem);
                    console.info("Item adicionado com sucesso!");
                } else {
                    dados.itens[index] = { ...dados.itens[index], ...novoItem };
                    console.info("Item atualizado com sucesso!");
                }
                this.salvarItens(dados);
            }
        } catch (erro) {
            console.error("Erro ao adicionar/atualizar item:", erro.message);
        }
    }


    // Método para consultar e comparar item pelo QRCode
    consultarItem(qrItem) { // adequar essa função para receber e passar os dados para outras funções e chamados 
        try {
            const dados = this.lerItens();

            const itemEncontrado = dados.itens.find(item => item.codigo === qrItem.codigo);

            if (itemEncontrado) {
                const iguais = Object.keys(qrItem).every(
                    chave => itemEncontrado[chave] === qrItem[chave]
                );

                if (iguais) {
                    console.log("✅ Item encontrado e os dados conferem!");
                } else {
                    console.log("⚠️ Item encontrado, mas os dados diferem:");
                    console.log("No arquivo:", itemEncontrado);
                    console.log("No QRCode:", qrItem);

                    // Atualiza automaticamente se houver divergência
                    this.adicionarItem(qrItem);
                    console.log("🔄 Item atualizado com os dados do QRCode!");
                }
            } else {
                console.log("Item não encontrado na lista. Adicionando...");
                this.adicionarItem(qrItem);
            }
        } catch (erro) {
            console.error("Erro ao consultar/comparar item:", erro.message);
        }
    }

}
