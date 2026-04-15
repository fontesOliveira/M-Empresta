import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { Input } from '@/components/inputs';
import Perfil from '@/components/perfil';
import styles from './styles';


import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  const handleEnviar = () => {
    if ((nome === 'pedro') && senha === '123') {
      console.log('Login bem-sucedido!');
      alert('Login bem-sucedido!');
      router.push('/homepageu');
    } else if ((nome === 'yan') && senha === '123') {
      console.log('Login bem-sucedido!');
      alert('Login bem-sucedido!');
      router.push('/homepageg');
    } else {
      console.log('Credenciais inválidas. Tente novamente.');
      alert('Credenciais inválidas. Tente novamente.');
    }
  }

  return (
    // Container principal da tela de login
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container} >
          <Perfil width={250} height={250} />
          <Input placeholder='Usuário' setfunction={setNome} />
          <Input placeholder='Senha' setfunction={setSenha} />
          <Pressable style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text>
                Não tem uma conta? {' '}
                <Link href="/homepageu" style={{ color: '#b20fc8' }}>
                  Cadastre-se
                </Link>
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <Text>
                Esqueceu a senha? {' '}
                <Link href="../app/web/index.html" style={{ color: '#b20fc8' }}>
                  Recuperar Senha
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
