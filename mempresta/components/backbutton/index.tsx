import {
    View, 
    TouchableOpacity,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import style from './style';

export default function BackButton() {
    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.button} onPress={() => {navigation.goBack()}}>
                <Image source={require('../../assets/img/backbutton.png')} style={{ width: 50, height: 40 }} />
            </TouchableOpacity>
        </View>
    );
}