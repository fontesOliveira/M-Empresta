import { Alert } from "react-native";
// Importamos a API antiga (legacy) para o download e o StorageAccessFramework para salvar
import * as FileSystem from "expo-file-system/legacy";

/**
 * Baixa o QR Code da API e salva diretamente na pasta escolhida pelo usuário.
 * @param {Object} item - O objeto Item completo do seu banco de dados
 */
export async function baixarQRCode(item) {
  try {
    // 1. Validação básica
    if (!item || !item.nome) {
      Alert.alert("Erro", "Dados do item inválidos.");
      return;
    }

    // 2. Transforma o objeto Item inteiro em texto para o QR Code
    const qrContent = encodeURIComponent(JSON.stringify(item));

    // 3. URL da API Gratuita
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrContent}`;

    // 4. Define a pasta de cache temporária do celular
    const cacheDir = FileSystem.cacheDirectory || "file:///data/user/0/cache/";
    const pastaValida = cacheDir.endsWith("/") ? cacheDir : `${cacheDir}/`;
    
    // 5. Formata o nome do arquivo exatamente como você pediu
    const nomeFormatado = item.nome.replace(/[^a-zA-Z0-9]/g, "_");
    const nomeArquivoFinal = `QRCode_${nomeFormatado}.png`;
    const fileUri = `${pastaValida}${nomeArquivoFinal}`;

    // 6. Faz o download do arquivo da API para a pasta temporária de cache
    await FileSystem.downloadAsync(apiUrl, fileUri);

    // 7. Pede permissão ao usuário para escolher ONDE salvar no celular (Downloads, Galeria, etc.)
    // Isso evita o bug do ExpoMediaLibrary pedir permissão de Áudio!
    const permissoesPasta = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
    if (!permissoesPasta.granted) {
      Alert.alert("Permissão negada", "Precisamos de permissão para salvar o arquivo no seu dispositivo.");
      return;
    }

    // 8. Lê o arquivo que baixamos em cache no formato Base64
    const arquivoBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    });

    // 9. Cria o arquivo definitivo na pasta escolhida pelo usuário com o nome perfeito!
    const novoArquivoUri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissoesPasta.directoryUri,
      nomeArquivoFinal,
      "image/png"
    );

    // 10. Grava os dados da imagem dentro do novo arquivo criado
    await FileSystem.writeAsStringAsync(novoArquivoUri, arquivoBase64, {
      encoding: "base64",
    });
    
    Alert.alert("Sucesso!", `O arquivo "${nomeArquivoFinal}" foi baixado com sucesso!`);

  } catch (error) {
    console.log("Erro no download automático do QRCode:", error);
    Alert.alert("Erro", "Não foi possível baixar o QR Code.");
  }
}