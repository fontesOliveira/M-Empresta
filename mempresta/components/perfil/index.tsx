import {
    View,
    Image
} from 'react-native';

type Props = {
    width?: number,
    height?: number
}

import style from './style';

export default function Perfil({ width, height }: Props) {
    return (
        <View style={style.container}>
            <Image source={require('../../assets/img/avatar.png')} 
                   style={[style.img, { width, height }]} />
        </View>
    )
}