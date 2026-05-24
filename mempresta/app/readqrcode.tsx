import {
    View,
    Text,
    Linking
} from 'react-native';

import BackButton from '@/components/backbutton';

import {
    Camera,
    CameraView,
    useCameraPermissions,
} from 'expo-camera';

import { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ReadQRCode() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    async function handleAllow() {
        await requestPermission();
        console.log(permission);
    }

    useEffect(() => {
        handleAllow();
    }, []);

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (scanned) return;

        setScanned(true);

        console.log("QR Code escaneado: ", data);
        Linking.openURL(data);

        setScanned(false)
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