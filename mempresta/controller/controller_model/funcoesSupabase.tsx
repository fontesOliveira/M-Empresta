import { supabase } from '@/controller/context/servidor.js'
import { Biblioteca, Item } from '@/bancoDeDados/useDatabase'
// IMPORTAÇÃO CORRIGIDA: Agora importa uma função executável, não um componente
import { baixarQRCode } from './qrcodeGenerator.js'

export function funcoesSupabase() {

    async function getBibliotecas(): Promise<Biblioteca[]> {
        return getBibliotecasSupabase();
    }

    async function getBibliotecasSupabase(): Promise<Biblioteca[]> {
        try {
            const { data, error } = await supabase
                .from("bibliotecas")
                .select("*");

            if (error) {
                console.error("Erro ao buscar bibliotecas:", error.message);
                return [];
            }

            return data as Biblioteca[];
        } catch (err) {
            console.error("Erro inesperado:", err);
            return [];
        }
    }

    async function getUltimoItem(): Promise<Item | null> {
        const { data, error } = await supabase
            .from("itens")
            .select("*")
            .order("codigo", { ascending: false })
            .limit(1);

        if (error) {
            console.error("Erro ao buscar último item:", error);
            return null;
        }

        if (!data || data.length === 0) {
            return null;
        }

        const novoItem: Item = {
            codigo: data[0].codigo,
            nome: data[0].nome,
            autor: data[0].autor,
            codigoQRCode: data[0].codigoQRCode ?? undefined,
            codigoBiblioteca: data[0].codigoBiblioteca,
        };

        return novoItem;
    }

    async function gerarNovoCodigoItem(ultimoItem: Item | null): Promise<string> {
        if (!ultimoItem) {
            return "LIV00000001";
        }

        const codigoAntigo = ultimoItem.codigo;
        const prefixo = codigoAntigo.substring(0, 3);
        const numeroStr = codigoAntigo.substring(3);

        const numero = parseInt(numeroStr, 10);
        const novoNumero = numero + 1;

        const novoNumeroStr = novoNumero.toString().padStart(numeroStr.length, "0");
        const novoCodigo = prefixo + novoNumeroStr;

        return novoCodigo;
    }

    async function gerarNovoCodigoQRCode(ultimoItem: Item | null): Promise<string> {
        if (!ultimoItem || !ultimoItem.codigoQRCode) {
            return "QRC00000001";
        }

        const codigoAntigo = ultimoItem.codigoQRCode;
        const prefixo = codigoAntigo.substring(0, 3);
        const numeroStr = codigoAntigo.substring(3);

        const numero = parseInt(numeroStr, 10);
        const novoNumero = numero + 1;

        const novoNumeroStr = novoNumero.toString().padStart(numeroStr.length, "0");
        const novoCodigoQRCode = prefixo + novoNumeroStr;

        return novoCodigoQRCode;
    }

    async function getNovoCodigoItemEQRCode(): Promise<[string, string]> {
        const ultimoItem = await getUltimoItem();

        const novoCodigo = await gerarNovoCodigoItem(ultimoItem);
        const novoQRCode = await gerarNovoCodigoQRCode(ultimoItem);

        return [novoCodigo, novoQRCode];
    }

    async function verificarLivroExistente(
        nome: string,
        autor: string,
        codigoBiblioteca: string
    ): Promise<boolean> {
        const { data, error } = await supabase
            .from("itens")
            .select("codigo")
            .eq("nome", nome)
            .eq("autor", autor)
            .eq("codigoBiblioteca", codigoBiblioteca)
            .limit(1);

        if (error) {
            console.error("Erro ao verificar livro existente:", error);
            return false;
        }

        return data !== null && data.length > 0;
    }

    async function cadastrarNovoItem(
        nome: string,
        autor: string,
        codigoBiblioteca: string
    ): Promise<boolean> {
        try {
            const existe = await verificarLivroExistente(nome, autor, codigoBiblioteca);
            if (existe) {
                alert("Livro já cadastrado para a biblioteca selecionada.");
                return false;
            }

            const [novoCodigo, novoCodigoQRCode] = await getNovoCodigoItemEQRCode();

            const novoItem: Item = {
                codigo: novoCodigo,
                nome,
                autor,
                codigoBiblioteca,
                codigoQRCode: novoCodigoQRCode,
            };

            const { error } = await supabase.from("itens").insert([novoItem]);

            if (error) {
                console.log("Erro ao inserir item:", error);
                return false;
            }

            // AJUSTE: Dispara a função geradora passando o objeto de forma correta e assíncrona
            await gerarQRCode(novoItem);

            console.log("Item cadastrado com sucesso:", novoItem);
            return true;
        } catch (err) {
            console.error("Erro inesperado ao cadastrar item:", err);
            return false;
        }
    }

    // AJUSTE: Chama diretamente a função utilitária do arquivo sem tags do React
    async function gerarQRCode(item: Item) {
        await baixarQRCode(item);
    }

    async function buscarItemEspecifico(itemMarcado: Item): Promise<Item | null> {
        try {
            // Busca na tabela "itens" onde o código E o código da biblioteca batem com o item recebido
            const { data, error } = await supabase
                .from("itens")
                .select("*")
                .eq("codigo", itemMarcado.codigo)
                .maybeSingle(); // O .single() garante que traga apenas 1 objeto direto, em vez de uma lista []

            if (error) {
                console.log("Erro ao buscar o item específico:", error.message);
                return null;
            }

            // Se não encontrar nenhum dado correspondente
            if (!data) {
                return null;
            }

            // Transforma o retorno do banco para o tipo estruturado 'Item' do seu app
            const livroAchado: Item = {
                codigo: data.codigo,
                nome: data.nome,
                autor: data.autor,
                codigoQRCode: data.codigoQRCode ?? undefined,
                codigoBiblioteca: data.codigoBiblioteca,
            };

            return livroAchado;

        } catch (err) {
            console.error("Erro inesperado ao buscar item:", err);
            return null;
        }
    }

    return {
        getBibliotecas,
        cadastrarNovoItem,
        gerarQRCode,
        buscarItemEspecifico,
    }
}