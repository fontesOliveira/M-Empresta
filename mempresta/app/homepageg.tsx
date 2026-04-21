import {
  Pressable,
  Text,
  View,
  BackHandler
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
    <View style={{ alignItems: 'center', flexDirection: 'column' }}>
      <Menu />
      <Cards />
      <Pressable
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
      </Pressable>
    </View>
  );
}
