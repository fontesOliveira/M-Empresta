import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  DeviceEventEmitter,
} from "react-native";

import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import Menu from "../components/menu";
import Cards from "../components/cards";

import { useDatabaseService } from "@/bancoDeDados/useDatabase";

const { width } = Dimensions.get("window");

export default function HomepageU() {
  const dbService = useDatabaseService();
  const [naoDevolvidos, setNaoDevolvidos] = useState<any[]>([]);

  async function carregar() {
    const dados = await dbService.searchEmprestimosComItens("A06170571");
    const filtrados = dados
      .filter((item) => item.devolvido == null)
      .map((item) => ({
        ...item,
        emprestado: item.emprestado?.replaceAll(/-/g, "/") ?? null
      }));
    setNaoDevolvidos(filtrados);

  }

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener("emprestimoAtualizado", () => {
      carregar();
    });
    return () => sub.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  return (
    <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
      <Menu />

      <View style={styles.cards}>
        {naoDevolvidos.length > 0 ? (
          <FlatList
            data={naoDevolvidos}
            keyExtractor={(item) => item.codigo}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width, alignItems: "center", flex: 0.2 }}>
                <Cards
                  name={item.nomeLivro}   // vem do JOIN
                  autor={item.autorLivro} // vem do JOIN
                  emprestado={item.emprestado}
                  devolvido={item.devolvido}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Você não possui empréstimos ativos.</Text>
            <Text style={styles.emptySubtitle}>
              Quando você pegar livros emprestados, eles aparecerão aqui.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: -55,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
