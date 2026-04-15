import { forwardRef } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import styles from './styles';

type InputProps = {
    placeholder: string;
    setfunction: (text: string) => void;
}

export default function Input ({placeholder, setfunction}: InputProps) {
    return (
        <View >
            <TextInput placeholder={placeholder} style={styles.inputs} onChangeText={setfunction}/>      
        </View>
    )
}
