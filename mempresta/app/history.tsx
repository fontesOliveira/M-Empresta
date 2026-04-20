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
            <Text style={styles.title}>Histórico de Empréstimos</Text>
            <View style={styles.cards}>
                <CardsHistory name="O Senhor dos Anéis" emprestado="15/06/2023" devolvido="20/07/2023" />
                <CardsHistory name="1984" emprestado="20/07/2023" devolvido="25/08/2023" />
                <CardsHistory name="O Pequeno Príncipe" emprestado="05/08/2023" devolvido="10/09/2023" />
                <CardsHistory name="Dom Quixote" emprestado="10/09/2023" devolvido="15/10/2023" />
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