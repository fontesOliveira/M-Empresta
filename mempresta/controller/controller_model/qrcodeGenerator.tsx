import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing"; // Importa o módulo de compartilhamento
import { Item } from "@/bancoDeDados/useDatabase";

export async function baixarQRCode(item: Item): Promise<void> {
  try {
    // 1. Transforma o objeto Item inteiro em uma string de texto JSON
    const qrContent = JSON.stringify(item);

    // 2. Descobre o diretório de cache de forma segura
    let cacheDir = "";
    if (FileSystem && (FileSystem as any).cacheDirectory) {
      cacheDir = (FileSystem as any).cacheDirectory;
    } else if (FileSystem && (FileSystem as any).directory?.cache) {
      cacheDir = (FileSystem as any).directory.cache;
    } else {
      cacheDir = "file:///data/user/0/" + "cache/"; 
    }

    if (!cacheDir.endsWith("/")) {
      cacheDir += "/";
    }

    // Limpa o nome do arquivo removendo espaços e caracteres especiais
    const nomeFormatado = item.nome.replace(/[^a-zA-Z0-9]/g, "_");
    const fileUri = `${cacheDir}QRCode_${nomeFormatado}.png`;

    // 3. Gera os dados Base64 da imagem programaticamente
    const base64Data = await new Promise<string>((resolve, reject) => {
      const QRCodeSvg = require('react-native-qrcode-svg/src/index').default;
      
      const instance = new QRCodeSvg({
        value: qrContent,
        size: 200,
      });

      instance.toDataURL((data: string) => {
        if (data) resolve(data);
        else reject("Erro ao converter QR Code para string.");
      });
    });

    // 4. Salva o arquivo de imagem na pasta de cache do app
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: "base64" as any, 
    });

    // 5. Verifica se o compartilhamento está disponível no aparelho
    const disponivel = await Sharing.isAvailableAsync();
    if (disponivel) {
      // Abre a janela nativa para o usuário Salvar no Aparelho, enviar por WhatsApp, etc.
      await Sharing.shareAsync(fileUri, {
        dialogTitle: `QR Code - ${item.nome}`,
        mimeType: "image/png",
      });
    } else {
      Alert.alert("Erro", "O compartilhamento não está disponível neste aparelho.");
    }

  } catch (error) {
    console.error("Erro no gerador de QRCode:", error);
    Alert.alert("Erro", "Não foi possível gerar o QR Code.");
  }
}