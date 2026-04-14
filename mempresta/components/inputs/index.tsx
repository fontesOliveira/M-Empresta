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


// import { TextInput, TextInputProps, StyleSheet } from "react-native";

// interface InputProps extends TextInputProps {
//   // você pode adicionar outras props personalizadas aqui
// }

// export const Input: React.FC<InputProps> = (props) => {
//   return (
//     <TextInput
//       style={styles.input}
//       {...props} // repassa todas as props, incluindo onChangeText
//     />
//   );
// };



export const Input = forwardRef(({ placeholder, setfunction }: InputProps) => {
    return (
        <View >
            <TextInput placeholder={placeholder} style={styles.inputs} onChangeText={setfunction}/>      
        </View>
    )
})