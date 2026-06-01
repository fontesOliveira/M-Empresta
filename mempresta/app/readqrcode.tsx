import {
    View
} from 'react-native';

import BackButton from '@/components/backbutton';

import { useRouter } from 'expo-router';

import {
    CameraView,
    useCameraPermissions,
} from 'expo-camera';

import { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import ControllerModel from '@/controller/controller_model/controllermodel';

const controller = new ControllerModel();

export default function ReadQRCode() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const router = useRouter();

    async function handleAllow() {
        await requestPermission();
        console.log(permission);
    }

    useEffect(() => {
        handleAllow();
    }, []);

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        var s = true;
        if (!scanned) {
            console.log("QR Code já escaneando: ", data);
            setScanned(true);
            s = false;
            const parsedData = handleJSONParse(data);
            if (parsedData) {
                controller.analizandoQRCode(parsedData);
                router.push('/homepageu');
            }
        } else {
            if (!s) {
                setScanned(false);
                s = true;
            }
        } // falta construir o controller para pegar o json lido pelo qrcode e analisa-lo no model para efetuar as 
        // operações disponiveis - com internet e sem internet - e depois redirecionar para a tela de homepageu 
        // passando os dados do json para exibir as informações do usuário e as opções de ações disponiveis
    }

    const handleJSONParse = (data: string) => {
        try {
            const parsedData = JSON.parse(data);
            console.log("Dados JSON parseados: ", parsedData);
            return parsedData;
        } catch (error) {
            console.error("Erro ao parsear JSON: ", error);
            alert("O QR Code lido não contém um formato JSON válido. Por favor, tente novamente.");
            return null;
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#eee",
            justifyContent: "center",
            alignItems: "center",
        },
        camera: {
            width: 320,   // largura do quadrado
            height: 550,  // altura do quadrado
            borderRadius: 20,
            overflow: "hidden",
        },
    });

    try {
        if (permission?.granted) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={{
                        width: 320,   // largura
                        height: 550,  // altura igual à largura → quadrado
                        marginTop: -50,
                        backgroundColor: '#c6b0b0', // cor de fundo
                        borderRadius: 20, // bordas arredondadas
                    }}>
                        <CameraView
                            style={styles.camera}
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr"]
                            }}
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