import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import BackButton from '@/components/backbutton';
import { useState, useEffect } from 'react';
import { Biblioteca } from "@/bancoDeDados/useDatabase";
import { useFuncoesSupabase } from "@/controller/controller_model/funcoesSupabase";
import { useRouter } from 'expo-router';

export default function Record() {
  const router = useRouter();
  const funcoesSupa = useFuncoesSupabase();
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [bibliotecaTexto, setBibliotecaTexto] = useState('');
  const [bibliotecaSelecionada, setBibliotecaSelecionada] = useState<Biblioteca | null>(null);
  const [bibliotecas, setBibliotecas] = useState<Biblioteca[]>([]);
  const [filtered, setFiltered] = useState<Biblioteca[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await funcoesSupa.getBibliotecas();
      setBibliotecas(data);
    };
    fetchData();
  }, []);

  const handleInputCadastro = async () => {
    if (nome.trim() === '' || autor.trim() === '' || !bibliotecaSelecionada) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    console.log("Item cadastrado 'handleInputCadastro':", { 
      nome, 
      autor, 
      biblioteca: bibliotecaSelecionada // aqui vai o objeto completo
    });

    const resposta = await funcoesSupa.cadastrarNovoItem(nome, autor, bibliotecaSelecionada.codigo);

    if(resposta){
      console.info("Livro cadastrado com sucesso --- Resposta final");
    }else{
      console.info("Livro não cadastrado --- Respota final");
    }

    setNome('');
    setAutor('');
    setBibliotecaTexto('');
    setBibliotecaSelecionada(null);
    router.navigate('/homepageg')
  };

  const handleBibliotecaChange = (text: string) => {
    setBibliotecaTexto(text);
    setBibliotecaSelecionada(null); // limpa seleção se o usuário digitar manualmente

    if (text.length > 0) {
      const results = bibliotecas
        .filter(b => b.nome.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 3); // mostra no máximo 3 opções
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: 150 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Cadastro de item</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.input}
            placeholder="Nome do item"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Biblioteca"
            value={bibliotecaTexto}
            onChangeText={handleBibliotecaChange}
          />

          {filtered.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {filtered.map((item) => (
                <TouchableOpacity
                  key={item.codigo}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setBibliotecaSelecionada(item);   // guarda objeto completo
                    setBibliotecaTexto(item.nome);    // mostra só o nome no input
                    setFiltered([]);
                  }}
                >
                  <Text style={styles.suggestionText}>{item.nome}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Pressable onPress={handleInputCadastro} style={{ marginTop: 20 }}>
            <View style={styles.button}>
              <Text style={styles.textbutton}>Cadastrar</Text>
            </View>
          </Pressable>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center'
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 10,
    borderRadius: 5,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbutton: {
    color: '#fff',
    fontSize: 23,
  },
  suggestionsContainer: {
    maxHeight: 150,
    width: 300,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  suggestionItem: {
    padding: 10,
  },
  suggestionText: {
    fontSize: 16,
  },
});
