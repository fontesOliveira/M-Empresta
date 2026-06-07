// Importações principais do React Native
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';

// Componentes personalizados
import InputRecord from '@/components/inputsRecord';
import BackButton from '@/components/backbutton';

// Hook do React para estados locais
import { useState } from 'react';

export default function Record() {
  // Estados para armazenar os valores dos campos
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [biblioteca, setBiblioteca] = useState('');

  // Função chamada ao clicar em "Cadastrar"
  const handleInputCadastro = () => {
    // Validação simples: todos os campos devem estar preenchidos
    if (nome.trim() === '' || autor.trim() === '' || biblioteca.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // TODO: Implementar lógica de cadastro (salvar em JSON, enviar para backend, etc.)
    console.log("Item cadastrado:", { nome, autor, biblioteca });

    // Limpa os campos após cadastro
    setNome('');
    setAutor('');
    setBiblioteca('');
  };

  return (
    // Ajusta a tela quando o teclado aparece
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          {/* Título da tela */}
          <Text style={styles.title}>Cadastro de item</Text>

          {/* Campos de entrada */}
          <InputRecord placeholder="Nome do item" setfunction={setNome} value={nome} maxLength={100} />
          <InputRecord placeholder="Autor" setfunction={setAutor} value={autor} maxLength={100} />
          <InputRecord placeholder="Biblioteca" setfunction={setBiblioteca} value={biblioteca} maxLength={9} />

          {/* Botão de cadastro */}
          <Pressable onPress={handleInputCadastro} style={{ marginTop: 20 }}>
            <View style={styles.button}>
              <Text style={styles.textbutton}>Cadastrar</Text>
            </View>
          </Pressable>
        </View>

        {/* Botão de voltar */}
        <BackButton />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 70,
  },
  button: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
});
