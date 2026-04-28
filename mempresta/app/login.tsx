import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';

import  Input from '@/components/inputs';
import Perfil from '@/components/perfil';
import Authentication from '../controller/context/authentication';


import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  const auth = new Authentication();

  const handleEnviar = () => {
    if (auth.login(nome, senha)) {
      console.log('Login bem-sucedido!');
      if (auth.getAccountType() === 'U') {
        router.replace('/homepageu');
      }else if (auth.getAccountType() === 'G') {
        router.replace('/homepageg');
      }
    } else {
      console.log('Credenciais inválidas. Tente novamente.');
      alert('Credenciais inválidas. Tente novamente.');
    }

    setNome('');
    setSenha('');
  }

  return (
    // Container principal da tela de login
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container} >
          <Perfil width={250} height={250} />
          <Input placeholder='Usuário' setfunction={setNome} value={nome} />
          <Input placeholder='Senha' setfunction={setSenha} value={senha} />
          <Pressable style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#b20fc8',
        width: 220,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
})