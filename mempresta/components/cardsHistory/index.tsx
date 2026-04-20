import {
    View,
    Text,
    Image
} from 'react-native';

import style from './style';

type CardsHistoryProps = {
    name: string;
    emprestado: string;
    devolvido: string;
}

export default function CardsHistory({ name, emprestado, devolvido }: CardsHistoryProps) {
    return (
        <View style={style.container}>
            <View style={style.containercard}>
                <Text style={style.text}>{name}</Text>
                <Text style={style.texts}>Emprestado em: {emprestado}</Text>
                <Text style={style.texts}>Devolvido em: {devolvido}</Text>
            </View>
            <Image source={require('../../assets/img/card.png')}
                style={style.imagem} />
        </View>
    );
}