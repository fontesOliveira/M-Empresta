// Importações principais do React Native
import { View, StyleSheet } from 'react-native';

// Componentes personalizados
import BackButton from '@/components/backbutton';

// Navegação
import { useRouter } from 'expo-router';

// Expo Camera para leitura de QRCode
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';

// Hooks do React
import { useEffect, useState } from 'react';

// Controller responsável por analisar os dados do QRCode
import ControllerModel from '@/controller/controller_model/controllermodel';

// Instância do controller
const controller = new ControllerModel();

export default function ReadQRCode() {
  // Estado da permissão da câmera
  const [permission, requestPermission] = useCameraPermissions();

  // Estado para controlar se já foi escaneado
  const [scanned, setScanned] = useState(false);

  // Hook de navegação
  const router = useRouter();

  // Solicita permissão para usar a câmera
  async function handleAllow() {
    await requestPermission();
    console.log(permission);
  }

  // Executa a solicitação de permissão ao montar o componente
  useEffect(() => {
    handleAllow();
  }, []);

  // Função chamada ao escanear um QRCode
  const handleBarcodeScanned = ({ data }: { data: string }) => {
    let toggle = true;

    if (!scanned) {
      console.log("QR Code escaneado: ", data);
      setScanned(true);
      toggle = false;

      // Tenta converter os dados do QRCode para JSON
      const parsedData = handleJSONParse(data);

      if (parsedData) {
        // Analisa os dados via controller
        controller.analizandoQRCode();

        // Redireciona para homepage do usuário
        router.push('/homepageu');
      }
    } else {
      // Caso já tenha escaneado, reseta o estado
      if (!toggle) {
        setScanned(false);
        toggle = true;
      }
    }

    // TODO: Construir o controller para processar os dados do JSON
    // - Operações online e offline
    // - Redirecionar para homepageu com dados do usuário
  };

  // Função para validar e converter string em JSON
  const handleJSONParse = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      console.log("Dados JSON parseados: ", parsedData);
      return parsedData;
    } catch (error) {
      console.warn("Erro ao parsear JSON: ", error);
      alert("O QR Code lido não contém um formato JSON válido. Por favor, tente novamente.");
      return null;
    }
  };

  // Estilos da tela
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#eee",
      justifyContent: "center",
      alignItems: "center",
    },
    camera: {
      width: 320,
      height: 550,
      borderRadius: 20,
      overflow: "hidden",
    },
    cameraWrapper: {
      width: 320,
      height: 550,
      marginTop: -50,
      backgroundColor: '#c6b0b0',
      borderRadius: 20,
    }
  });

  try {
    // Renderiza a câmera apenas se a permissão foi concedida
    if (permission?.granted) {
      console.log("Ler QRCode")
      return (
        <View style={styles.container}>
          <View style={styles.cameraWrapper}>
            <CameraView
              style={styles.camera}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </View>
          <BackButton />
        </View>
      );
    }
  } catch (error) {
    console.error("Erro ao acessar a câmera: ", error);
    alert("Ocorreu um erro ao acessar a câmera. Por favor, confira se a permissão está concedida e tente novamente.");
  }
}
