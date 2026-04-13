import { forwardRef } from 'react';

import {
    View,
    Text,
    Image,
    Pressable
} from 'react-native';

import Perfil from '../perfil';
import { styles } from './styles';

export default function Menu() {
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', left: 20 }}>
                <Pressable onPress={() => console.log('Menu')}>
                    <Image source={require('../../assets/img/menu.png')}
                        style={{ width: 50, height: 50, borderRadius: 25 }} />
                </Pressable>
            </View>
            <View>
                <Text style={styles.titulo}>M'Empresta</Text>
            </View>
            <View style={{ position: 'absolute', right: 20, marginTop: 60 }}>
                <Perfil width={50} height={50} />
            </View>
        </View>
    )
}