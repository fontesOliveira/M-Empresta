import {
    View,
    StyleSheet,
    Pressable,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';

import InputRecord from '@/components/inputsRecord';
import BackButton from '@/components/backbutton';
import { useState } from 'react';

export default function Record() {
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [biblioteca, setBiblioteca] = useState('');

  const handleInputCadastro = () => {
    if (nome.trim() === '' || autor.trim() === '' || biblioteca.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastro de item</Text>
                    <InputRecord placeholder="Nome do item" setfunction={setNome} maxLength={100} />
                    <InputRecord placeholder="Autor" setfunction={setAutor} maxLength={100} />
                    <InputRecord placeholder="Biblioteca" setfunction={setBiblioteca} maxLength={9} />
                    <Pressable onPress={handleInputCadastro} style={{ marginTop: 20 }}>
                        <View style={styles.button}>
                            <Text style={styles.textbutton}>Cadastrar</Text>
                        </View>
                    </Pressable>
                </View>
                <BackButton />
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 70,
    },
    button: {
        backgroundColor: '#2e2e2e',
        color: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textbutton: {
        color: '#fff',
        fontSize: 23,
    }
});
