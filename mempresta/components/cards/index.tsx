import {
    View,
    Text,
    Image
} from 'react-native';

import { styles } from './styles';

export default function Cards() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/img/card.png')}
                    style={{ width: 300, height: 250, marginTop: 20, borderRadius: 10 }} />
            </View>
            <View style={{ marginTop: 20, marginLeft: -135 }}>
                <Text>Nome do Livro</Text>
                <Text>Autor do Livro</Text>
                <Text>Devolver até: dd/mm/aaaa</Text>
            </View>
        </View>
    )
}