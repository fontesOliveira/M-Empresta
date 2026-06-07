import {
    View,
    Text,
    Image
} from 'react-native';

import { styles } from './styles';

type CardsProps = {
    name: string;
    autor: string | null;
    emprestado: string | null;
    devolvido: string | null;
}

export default function Cards({ name, autor, emprestado, devolvido }: CardsProps) {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../assets/img/card.png')}
                    style={{ width: 250, height: 250, marginTop: 30, borderRadius: 10 }} />
            </View>
            <View style={{ marginTop: 50, marginLeft: -50}}>
                <Text style={styles.textTitle}>{name}</Text>
                <Text style={styles.text}>{autor || 'Autor não especificado'}</Text>
                <Text style={styles.text}>{devolvido || 'Devolver até: dd/mm/aaaa'}</Text>
            </View>
        </View>
    )
}