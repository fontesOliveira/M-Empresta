import {
  Pressable,
  Text,
  View,
  BackHandler,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';

import Menu from '../components/menu';
import Cards from '../components/cards';

import ManipularJSON from "@/model/manipularjson";

const { width } = Dimensions.get("window");

export default function HomepageU() {
  const manipularJSON = new ManipularJSON();
  const dados = manipularJSON.lerJSON();

  // Filtra apenas os livros não devolvidos
  const naoDevolvidos = dados.exemplo.filter((item: any) => item.devolvido === null);

  const router = useRouter();

  const handleLerQRCode = () => {
    router.push('/readqrcode');
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
    <View style={{ alignItems: 'center', flexDirection: 'column'}}>
      <Menu />
      <View style={styles.cards}>
        <FlatList
          data={naoDevolvidos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width, alignItems: "center", flex: 0.2 }}>
              <Cards
                name={item.name}
                autor={item.autor}
                emprestado={item.emprestado}
                devolvido={item.devolvido}
              />
            </View>
          )}
        />
      </View>
      <Pressable
        style={{
          width: "100%",
          height: 250,
          backgroundColor: '#0fc865',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          borderRadius: 20
        }}
        onPress={handleLerQRCode}
      >
        <Text style={styles.title}>Ler QRCode</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  cards: {
    height: "57%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    marginTop: -50,
  },
});