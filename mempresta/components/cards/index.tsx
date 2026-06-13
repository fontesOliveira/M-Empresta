import {
    View,
    Text,
    Image
} from 'react-native';

import { styles } from './styles';

type CardsProps = {
    name: string;
    autor: string | null;
    emprestado: string | null;
    devolvido: string | null;
}

export default function Cards({ name, autor, emprestado, devolvido }: CardsProps) {
    function adicionarDuasSemanas(dataEmprestimo: string | null): string {
  if (!dataEmprestimo) {
    return "Data inválida";
  }

  try {
    // dataEmprestimo vem no formato "DD-MM-YYYY HH-MM-SS" ou "DD-MM-YYYY HH:MM:SS"
    const [data, hora] = dataEmprestimo.split(" ");
    const [dia, mes, ano] = data.split("-").map(Number);

    // Normaliza hora para sempre usar ":"
    const horaNormalizada = hora.replace(/-/g, ":");
    const [hh, mm, ss] = horaNormalizada.split(":").map(Number);

    // Cria objeto Date corretamente
    const emprestimoDate = new Date(ano, mes - 1, dia, hh, mm, ss);

    // Se o Date não for válido, retorna mensagem
    if (isNaN(emprestimoDate.getTime())) {
      return "Data inválida";
    }

    // Soma 14 dias
    emprestimoDate.setDate(emprestimoDate.getDate() + 14);

    // Formata de volta
    const dd = String(emprestimoDate.getDate()).padStart(2, "0");
    const mm2 = String(emprestimoDate.getMonth() + 1).padStart(2, "0");
    const yyyy = emprestimoDate.getFullYear();

    return `${dd}-${mm2}-${yyyy}`;
  } catch {
    return "Data inválida";
  }
}



    console.log(adicionarDuasSemanas("13-06-2026 11-09-00"));
    // Saída: "27-06-2026"

    console.log(adicionarDuasSemanas("14-06-2026 11:09:00"));
    // Saída: "27-06-2026"



    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/img/card.png')}
                    style={{ width: 250, height: 250, marginTop: 30, borderRadius: 10 }}
                />
            </View>
            <View style={{ marginTop: 50, marginLeft: -50 }}>
                <Text style={styles.textTitle}>{name}</Text>
                <Text style={styles.text}>{autor || 'Autor não especificado'}</Text>

                {/* Data de empréstimo */}
                <Text style={styles.text}>
                    {"Emprestado em: " + (emprestado ? emprestado.substring(0, 10) : "Data inválida")}
                </Text>

                {/* Se já devolvido, mostra devolvido; senão, previsão */}
                <Text style={styles.text}>
                    {devolvido
                        ? "Devolvido em: " + devolvido.substring(0, 10)
                        : "Devolver até: " + adicionarDuasSemanas(emprestado)}
                </Text>
            </View>
        </View>
    );
}
