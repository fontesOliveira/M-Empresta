import {
    View,
    TextInput,
} from 'react-native';

import styles from './styles';

type InputProps = {
    placeholder: string;
    setfunction: (text: string) => void;
    value ?: string;
}

export default function Input ({placeholder, setfunction, value}: InputProps) {
    return (
        <View >
            <TextInput placeholder={placeholder} style={styles.inputs} onChangeText={setfunction} value={value}/>      
        </View>
    )
}
