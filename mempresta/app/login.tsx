// Importações principais do React Native
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';

// Hooks do React
import { useEffect, useState } from 'react';

// Importação de componentes personalizados
import Input from '@/components/inputs';
import Perfil from '@/components/perfil';

// Importação do hook de autenticação
import { useAuthentication } from '../controller/context/authentication';
import { useRouter } from 'expo-router';
import { Usuario } from '@/bancoDeDados/useDatabase';

export default function LoginScreen() {
  const [codigo, setCodigo] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  // Hook de autenticação
  const auth = useAuthentication();

  const usuario: Usuario = { codigo, nome: "", senha };

  const handleEnviar = async () => {
    const ok = await auth.loginAuto(usuario);

    setCodigo('');
    setSenha('');
    
    if (ok) {
      console.log('Login bem-sucedido!');
      if (auth.getAccountType() === 'A') {
        router.replace('/homepageu');
      } else if (auth.getAccountType() === 'G') {
        router.replace('/homepageg');
      }
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Perfil width={250} height={250} />
          <Input placeholder='Usuário' setfunction={setCodigo} value={codigo} />
          <Input placeholder='Senha' setfunction={setSenha} value={senha} />
          <Pressable style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


// Estilos da tela
const styles = StyleSheet.create({
  container: {
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
});
