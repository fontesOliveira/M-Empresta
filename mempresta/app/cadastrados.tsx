// Importações principais do React Native
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

// Componentes personalizados
import BackButton from '@/components/backbutton';
import CardsHistory from '@/components/cardsHistory';

import { useDatabaseService } from '@/bancoDeDados/useDatabase';
import { Item } from '@/bancoDeDados/useDatabase';

export default function Historico() {
  const { searchAllItems } = useDatabaseService();
  const [livros, setLivros] = useState<Item[]>([]);

  // Carregar todos os livros ao montar a tela
  useEffect(() => {
    async function carregarLivros() {
      try {
        const resultado = await searchAllItems(); // busca todos
        setLivros(resultado);
      } catch (error) {
        console.log("Erro ao buscar livros:", error);
      }
    }
    carregarLivros();
  }, []);

  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Livros Cadastrados</Text>

      {/* Lista de cards com livros */}
      <View style={styles.cards}>
        <FlatList
          data={livros}
          keyExtractor={(item) => item.codigo.toString()} // ✅ agora retorna string
          renderItem={({ item }) => (
            <CardsHistory
              name={item.nome}
              autor={item.autor}
              emprestado={null}   // se não houver empréstimo, pode deixar vazio
              devolvido={null}
            />
          )}
        />
        {/* <FlatList
          data={livros}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => (
            <CardsHistory
              name={item.nome}
              autor={item.autor}
              emprestado={null}   // se não houver empréstimo, pode deixar vazio
              devolvido={null}
            />
          )}
        /> */}
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
