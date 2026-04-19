import {
    View,
    Text,
    Image
} from 'react-native';

import style from './style';

type CardsHistoryProps = {
    name: string;
    date: string;
}

export default function CardsHistory({ name, date }: CardsHistoryProps) {
    return (
        <View style={style.container}>
            <View style={style.containercard}>
                <Text style={style.text}>{name}</Text>
                <Text style={style.text}>Devolvido em: {date}</Text>
            </View>
            <Image source={require('../../assets/img/card.png')}
                style={style.imagem} />
        </View>
    );
}