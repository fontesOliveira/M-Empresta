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

// Importação de componentes personalizados
import Input from '@/components/inputs';
import Perfil from '@/components/perfil';

// Importação do controlador de autenticação
import Authentication from '../controller/context/authentication';

// Hooks do React e do Expo Router
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  // Estados locais para armazenar usuário e senha digitados
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  // Hook para navegação entre telas
  const router = useRouter();

  // Instância do controlador de autenticação
  const auth = new Authentication();

  // Função chamada ao clicar no botão "Entrar"
  const handleEnviar = () => {
    // Verifica se login é válido
    if (auth.login(nome, senha)) {
      console.log('Login bem-sucedido!');

      // Redireciona para a homepage de acordo com o tipo de conta
      if (auth.getAccountType() === 'U') {
        router.replace('/homepageu');
      } else if (auth.getAccountType() === 'G') {
        router.replace('/homepageg');
      }
    } else {
      // Caso login falhe, exibe mensagem de erro
      console.log('Credenciais inválidas. Tente novamente.');
      alert('Credenciais inválidas. Tente novamente.');
    }

    // Limpa os campos após tentativa de login
    setNome('');
    setSenha('');
  };

  return (
    // Componente que ajusta a tela quando o teclado aparece
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* ScrollView para permitir rolagem em telas menores */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          {/* Componente de perfil (imagem ou ícone) */}
          <Perfil width={250} height={250} />

          {/* Campos de entrada para usuário e senha */}
          <Input placeholder='Usuário' setfunction={setNome} value={nome} />
          <Input placeholder='Senha' setfunction={setSenha} value={senha} />

          {/* Botão de login */}
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
