// Importações principais do React Native
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

// Componentes personalizados
import BackButton from '@/components/backbutton';
import CardsHistory from '@/components/cardsHistory';

// Manipulação de dados JSON
import ManipularJSON from "@/model/manipularjson";

export default function Historico() {
  // Instância para manipular dados
  const manipularJSON = new ManipularJSON();
  const dados = manipularJSON.lerJSON();

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Histórico de Empréstimos</Text>

      {/* Lista de cards com histórico de empréstimos */}
      <View style={styles.cards}>
        <FlatList
          data={dados.exemplo} // dados vindos do JSON
          keyExtractor={(item, index) => index.toString()} // chave única por índice
          renderItem={({ item }) => (
            <CardsHistory
              name={item.name}
              autor={item.autor}
              emprestado={item.emprestado}
              devolvido={item.devolvido}
            />
          )}
        />
      </View>

      {/* Botão de voltar */}
      <BackButton />
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 100,
    textAlign: 'center',
  },
  cards: {
    width: '95%',
    height: '66%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingTop: 20,
    marginTop: 10,
  },
});
