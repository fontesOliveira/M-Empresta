import {
    View,
    Text,
    TextInput,
} from 'react-native';

import styles from './styles';

type InputProps = {
    placeholder: string;
    setfunction: (text: string) => void;
    value?: string;
    inputType?: string;
    maxLength?: number | undefined;
}

export default function InputRecord({ placeholder, setfunction, value, inputType, maxLength }: InputProps) {
    

    return (
        <View >
            <Text style={styles.text}>{placeholder}:</Text>
            <TextInput
                style={styles.inputs}
                onChangeText={setfunction}
                value={value}
                keyboardType={inputType === 'number' ? 'numeric' : 'default'}
                maxLength={maxLength}
            />
        </View>
    )
}
