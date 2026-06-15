import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Platform,
  TextInput,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackButton from '@/components/backbutton';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from "@/controller/context/servidor.js";

export default function CadastroUsuario() {
  const router = useRouter();
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastroUsuario = async () => {
    if (codigo.trim() === '' || nome.trim() === '' || senha.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Inserir usuário no Supabase
      const { error } = await supabase.from("usuarios").insert([
        {
          codigo,
          nome,
          senha, // ⚠️ senha em texto puro, conforme seu modelo
        }
      ]);

      if (error) {
        console.error("Erro ao cadastrar usuário:", error.message);
        alert("Erro ao cadastrar usuário.");
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      setCodigo('');
      setNome('');
      setSenha('');
      router.navigate('/homepageg');
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro inesperado ao cadastrar usuário.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingTop: 150 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Cadastro de Usuário</Text>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            style={styles.input}
            placeholder="Código (ex: A06170571)"
            value={codigo}
            onChangeText={setCodigo}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Pressable onPress={handleCadastroUsuario} style={{ marginTop: 20 }}>
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
});
