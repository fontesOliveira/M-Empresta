import {
  Pressable,
  Text,
  View
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
    if ((nome === 'pedro' || nome === "yan") && senha === '123') {
      console.log('Login bem-sucedido!');
      alert('Login bem-sucedido!'); 
      router.push('/homepageu');

      // redirecionar para a próxima tela ou realizar outras ações necessárias
      // Exemplo: navigation.navigate('Home');
      //navigation.navigate('homepageu');

    } else {
      console.log('Credenciais inválidas. Tente novamente.');
      alert('Credenciais inválidas. Tente novamente.');
    }
  }

  return (
    // Container principal da tela de login
    <View style={styles.container} >
      <Perfil width={250} height={250} />
      <Input placeholder='Usuário' setfunction={setNome} />
      <Input placeholder='Senha' setfunction={setSenha} />
      <Pressable style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

    // Container para os links de cadastro e recuperação de senha
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
            <Link href="https://example.com/forgot-password" style={{ color: '#b20fc8' }}>
              Recuperar Senha
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
