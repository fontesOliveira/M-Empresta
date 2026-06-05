import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import BackButton from '@/components/backbutton';
import CardsHistory from '@/components/cardsHistory';

import ManipularJSON from "@/model/manipularjson";

export default function Historico() {
    const manipularJSON = new ManipularJSON();
    const dados = manipularJSON.lerJSON();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Empréstimos</Text>
            <View style={styles.cards}>
                <FlatList
                    data={dados.exemplo}
                    keyExtractor={(item, index) => index.toString()}
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
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 100,
        textAlign: 'center'
    },
    cards: {
        width: '95%',
        height: '66%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingTop: 20,
        marginTop: 10
    }
})