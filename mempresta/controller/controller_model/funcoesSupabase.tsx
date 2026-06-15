import { supabase } from '@/controller/context/servidor.js'
import { Biblioteca, Item } from '@/bancoDeDados/useDatabase'
import { baixarQRCode } from './qrcodeGenerator.js'
import { useSQLiteContext } from "expo-sqlite";

export function useFuncoesSupabase() {
    const db = useSQLiteContext(); // ✅ agora é válido dentro de um hook customizado

    // ---------- BIBLIOTECAS ----------
    async function getBibliotecas(): Promise<Biblioteca[]> {
        return getBibliotecasSupabase();
    }

    async function getBibliotecasSupabase(): Promise<Biblioteca[]> {
        try {
            const { data, error } = await supabase.from("bibliotecas").select("*");
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

    // 🔄 Sincronizar bibliotecas Supabase → Local
    async function syncBibliotecas(): Promise<boolean> {
        try {
            const { data, error } = await supabase.from("bibliotecas").select("*");
            if (error) {
                console.error("Erro ao buscar bibliotecas no Supabase:", error.message);
                return false;
            }
            if (!data || data.length === 0) {
                console.warn("Nenhuma biblioteca encontrada no Supabase.");
                return false;
            }

            // Limpa tabela local
            await db.execAsync("DELETE FROM bibliotecas;");

            // Insere todas as bibliotecas no banco local (com OR REPLACE para evitar UNIQUE constraint)
            for (const b of data as Biblioteca[]) {
                const stmt = await db.prepareAsync(
                    "INSERT OR REPLACE INTO bibliotecas (codigo, nome) VALUES ($codigo, $nome)"
                );
                try {
                    await stmt.executeAsync({
                        $codigo: b.codigo,
                        $nome: b.nome,
                    });
                } finally {
                    await stmt.finalizeAsync();
                }
            }

            console.log("Bibliotecas sincronizadas com sucesso!");
            return true;
        } catch (err) {
            console.error("Erro inesperado ao sincronizar bibliotecas:", err);
            return false;
        }
    }

    // ---------- ITENS ----------
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

        return {
            codigo: Number(data[0].codigo),
            nome: data[0].nome,
            autor: data[0].autor,
            codigoQRCode: data[0].codigoQRCode ?? undefined,
            codigoBiblioteca: Number(data[0].codigoBiblioteca),
        };
    }

    async function gerarNovoCodigoItem(ultimoItem: Item | null): Promise<number> {
        return ultimoItem ? ultimoItem.codigo + 1 : 1;
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
        return prefixo + novoNumeroStr;
    }

    async function getNovoCodigoItemEQRCode(): Promise<[number, string]> {
        const ultimoItem = await getUltimoItem();
        const novoCodigo = await gerarNovoCodigoItem(ultimoItem);
        const novoQRCode = await gerarNovoCodigoQRCode(ultimoItem);
        return [novoCodigo, novoQRCode];
    }

    async function verificarLivroExistente(
        nome: string,
        autor: string,
        codigoBiblioteca: number
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
        codigoBiblioteca: number
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

            await gerarQRCode(novoItem);
            console.log("Item cadastrado com sucesso:", novoItem);
            return true;
        } catch (err) {
            console.error("Erro inesperado ao cadastrar item:", err);
            return false;
        }
    }

    async function gerarQRCode(item: Item) {
        await baixarQRCode(item);
    }

    async function buscarItemEspecifico(itemMarcado: Item): Promise<Item | null> {
        try {
            const { data, error } = await supabase
                .from("itens")
                .select("*")
                .eq("codigo", itemMarcado.codigo)
                .maybeSingle();

            if (error) {
                console.log("Erro ao buscar o item específico:", error.message);
                return null;
            }
            if (!data) {
                return null;
            }

            return {
                codigo: Number(data.codigo),
                nome: data.nome,
                autor: data.autor,
                codigoQRCode: data.codigoQRCode ?? undefined,
                codigoBiblioteca: Number(data.codigoBiblioteca),
            };
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
        syncBibliotecas,
    };
}
