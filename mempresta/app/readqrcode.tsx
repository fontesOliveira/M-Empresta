import {
    View,
    Text
} from 'react-native';

import BackButton from '@/components/backbutton';

export default function ReadQRCode() {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{
                width: 320,   // largura
                height: 550,  // altura igual à largura → quadrado
                marginTop: -50,
                backgroundColor: '#c6b0b0', // cor de fundo
                borderRadius: 20, // bordas arredondadas
            }}></View>
            <BackButton />
            </View>
            );
}