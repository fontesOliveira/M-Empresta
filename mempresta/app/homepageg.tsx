import {
  Pressable,
  Text,
  View,
  BackHandler,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';

import Menu from '../components/menu';
import Cards from '../components/cards';

export default function HomepageG() {
  const router = useRouter();

  const handleCadastroItem = () => {
    router.push('/record');
  };

  const handleCadastroUsuário = () => {
    router.push('/cadastroUsuario');
  };

  const handleCadastrados = () => {
    router.push('/cadastrados');
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Bloqueia o botão físico/gesto de voltar
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      // Cleanup quando a tela perde o foco
      return () => subscription.remove();
    }, [])
  );

  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', flex: 1 }}>
      <Menu />
      {/* <Cards /> */}
      {/* <Pressable
        style={{
          width: "100%",
          height: 250,
          backgroundColor: '#eed80e',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20
        }}
        onPress={handleCadastroItem}
      >
        <Text>Cadastro de Item</Text>
      </Pressable> */}
      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCadastroUsuário}>
        <Text style={styles.text}>Novo Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastroItem}>
        <Text style={styles.text}>Novo Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCadastrados}>
        <Text style={styles.text}>Cadastrados</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  button: {
    backgroundColor: '#4CAF50', // verde
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 3, // sombra no Android
    width: 300,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
