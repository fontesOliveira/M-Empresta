import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import BackButton from '@/components/backbutton';
import CardsHistory from '@/components/cardsHistory';

export default function Historico() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Itens Cadastrados</Text>
            <View style={styles.cards}>
                <CardsHistory name="O Senhor dos Anéis" emprestado={null} devolvido={null} />
                <CardsHistory name="1984" emprestado={null} devolvido={null} />
                <CardsHistory name="O Pequeno Príncipe" emprestado={null} devolvido={null} />
                <CardsHistory name="Dom Quixote" emprestado={null} devolvido={null} />
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
        textAlign: 'center' },
    cards: {
        // backgroundColor: '#9d2a2a',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingTop: 20,
    }
})