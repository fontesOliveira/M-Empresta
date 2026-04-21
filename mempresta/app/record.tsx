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
  const [data, setData] = useState('');

  // Função que formata para dd/mm/aaaa
  const handleDateChange = (text: string) => {
    let cleaned = text.replace(/\D/g, "");
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = cleaned;
    if (cleaned.length >= 5) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4) + "/" + cleaned.slice(4);
    } else if (cleaned.length >= 3) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }

    setData(formatted);
  };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastro de item</Text>
                    <InputRecord placeholder="Nome do item" setfunction={() => { }} maxLength={50} />
                    <InputRecord placeholder="Autor" setfunction={() => { }} maxLength={50} />
                    <InputRecord placeholder="Ano de publicação" setfunction={handleDateChange} inputType="number" maxLength={8} />
                    <InputRecord placeholder="Biblioteca" setfunction={() => { }} maxLength={50} />
                    <Pressable onPress={() => { }} style={{ marginTop: 20 }}>
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
