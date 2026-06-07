import {
    View,
    Image,
    Pressable
} from 'react-native';

import { useRouter } from 'expo-router';

import style from './style';


type Props = {
    width?: number,
    height?: number
}

export default function Perfil({ width, height }: Props) {
    const router = useRouter();

    const handlePerfil = () => {
        router.push('/perfilpage');
    };

    return (
        <View style={style.container}>
            <Pressable onPress={handlePerfil}>
                <Image source={require('../../assets/img/avatar.png')}
                    style={[style.img, { width, height }]} />
            </Pressable>
        </View>
    )
}