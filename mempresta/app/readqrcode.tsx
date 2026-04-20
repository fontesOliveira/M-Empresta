import {
    View,
    Text
} from 'react-native';

import BackButton from '@/components/backbutton';

import {
    Camera,
    CameraView,
    useCameraPermissions,
} from 'expo-camera';

import { useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

export default function ReadQRCode() {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Solicitando permissão...</Text>;
        requestPermission();
    }
    if (hasPermission === false) {
        return <Text>Permissão negada para usar a câmera</Text>;
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{
                width: 320,   // largura
                height: 550,  // altura igual à largura → quadrado
                marginTop: -50,
                backgroundColor: '#c6b0b0', // cor de fundo
                borderRadius: 20, // bordas arredondadas
            }}>
                <CameraView style={styles.camera} />
            </View>
            <BackButton />
        </View>
    );
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