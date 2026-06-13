import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import BackButton from "@/components/backbutton";
import CardsHistory from "@/components/cardsHistory";

import { useManipularJSON } from "@/controller/controller_model/useManipularJSON";
import { Emprestimo, useDatabaseService } from "@/bancoDeDados/useDatabase";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Historico() {
  const { lerJSON } = useManipularJSON();
  const [emprestimos, setEmprestimos] = useState<any[]>([]);
  const dbService = useDatabaseService();

  // Carrega os dados ao montar
  useEffect(() => {
    async function carregar() {
      const dados = await dbService.searchEmprestimosComItens("A06170571");
      setEmprestimos(dados.map((item) => ({
        ...item,
        emprestado: item.emprestado?.substring(0, 10).replaceAll(/-/g, "/") ?? null,
        devolvido: item.devolvido?.substring(0, 10).replaceAll(/-/g, "/") ?? null,
      })));
    }
    carregar();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const dados = await dbService.searchEmprestimosComItens("A06170571");
        setEmprestimos(dados);
      }
      carregar();
    }, [])
  );


  return (
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Histórico de Empréstimos</Text>

      {/* Lista de cards com histórico de empréstimos */}
      <View style={styles.cards}>
        {emprestimos.length > 0 ? (
          <FlatList
            data={emprestimos}
            keyExtractor={(item) => item.codigo}
            renderItem={({ item }) => (
              <CardsHistory
                name={item.nomeLivro}
                autor={item.autorLivro}
                emprestado={item.emprestado}
                devolvido={item.devolvido}
              />
            )}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum empréstimo encontrado.
          </Text>
        )}
      </View>

      {/* Botão de voltar */}
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 100,
    textAlign: "center",
  },
  cards: {
    width: "95%",
    height: "66%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingTop: 20,
    marginTop: 10,
  },
});
