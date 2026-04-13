import { forwardRef } from 'react';

import {
    View,
    Text,
    TextInput,
} from 'react-native';

import styles from './styles';

type InputProps = {
    placeholder: string;
}

export const Input = forwardRef(({ placeholder }: InputProps) => {
    return (
        <View >
            <TextInput placeholder={placeholder} style={styles.inputs}/>      
        </View>
    )
})