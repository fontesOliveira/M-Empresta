import {
    View,
    Text,
    Image
} from 'react-native';

import style from './style';

type CardsHistoryProps = {
    name: string;
    autor: string | null;
    emprestado: string | null;
    devolvido: string | null;
}

export default function CardsHistory({ name, autor, emprestado, devolvido}: CardsHistoryProps) {
    return (
        <View style={style.container}>
            <View style={style.containercard}>
                <Text style={style.text}>{name}</Text>
                {autor && <Text style={style.textautor}> {autor}</Text>}
                {emprestado && <Text style={style.texts}>Emprestado em: {emprestado}</Text>}
                {devolvido && <Text style={style.texts}>Devolvido em: {devolvido}</Text>}
            </View>
            <Image source={require('../../assets/img/card.png')}
                style={style.imagem} />
        </View>
    );
}