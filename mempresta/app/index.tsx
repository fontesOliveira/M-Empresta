import {
  View,
  Text,
  Pressable
} from 'react-native';

import { Input } from '@/components/inputs';
import styles from './styles';
import Perfil from '@/components/perfil';

import { useState } from 'react';
import { Link } from 'expo-router';

export default function LoginScreen() {

  return (
    <View style={styles.container} >
      <Perfil width={250} height={250} />
      <Input placeholder='Usuário' />
      <Input placeholder='Senha' />
      <Pressable style={styles.button} onPress={() => console.log('Login')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <View style={{flexDirection: 'row', marginTop: 5 }}>
          <Text>
            Não tem uma conta? {' '}
            <Link href="/homepageu" style={{ color: '#b20fc8' }}>
              Cadastre-se
            </Link>
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5 }}>
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
