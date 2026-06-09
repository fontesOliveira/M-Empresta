// Importações principais do React Native
import {
  Pressable,
  Text,
  View,
  BackHandler,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

// Hooks do Expo Router e React
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';

// Componentes personalizados
import Menu from '../components/menu';
import Cards from '../components/cards';

// Manipulação de dados JSON
import ManipularJSON from "@/model/manipularjson";

// Pega a largura da tela para ajustar os cards
const { width } = Dimensions.get("window");

export default function HomepageU() {
  // Instância para manipular dados
  const manipularJSON = new ManipularJSON();
  const dados = manipularJSON.lerJSON();

  // Filtra apenas os livros que ainda não foram devolvidos
  const naoDevolvidos = dados.exemplo.filter((item: any) => item.devolvido === null);

  // Hook de navegação
  const router = useRouter();

  // Função para navegar até a tela de leitura de QRCode
  const handleLerQRCode = () => {
    router.push('/readqrcode');
  };

  // Bloqueia o botão físico de "voltar" no Android
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true; // retorna true para impedir ação padrão

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      // Remove o listener quando a tela perde o foco
      return () => subscription.remove();
    }, [])
  );

  console.log("Pagina principal")
  return (
    <View style={{ alignItems: 'center', flexDirection: 'column'}}>
      {/* Menu superior */}
      <Menu />

      {/* Lista de cards com livros não devolvidos */}
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

      {/* Botão para leitura de QRCode (atualmente comentado) */}
      {/* <Pressable
        style={styles.qrButton}
        onPress={handleLerQRCode}
      >
        <Text style={styles.title}>Ler QRCode</Text>
      </Pressable> */}
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  cards: {
    height: "85%",
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
  qrButton: {
    width: "100%",
    height: 250,
    backgroundColor: '#0fc865',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
});
