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
                    style={{ width: 250, height: 250, marginTop: 20, borderRadius: 10 }} />
            </View>
            <View style={{ marginTop: 20, marginLeft: -50 }}>
                <Text style={styles.text}>Nome do Livro</Text>
                <Text style={styles.text}>Autor do Livro</Text>
                <Text style={styles.text}>Devolver até: dd/mm/aaaa</Text>
            </View>
        </View>
    )
}