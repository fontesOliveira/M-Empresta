import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Perfil from '@/components/perfil';
import backbutton from '@/components/backbutton'

import UserSession from "@/controller/context/usersession"
import BackButton from '@/components/backbutton';

export default function Perfilpage() {
    const u = UserSession.getInstance();

    let c = u.getTipoDaConta() === "G" ? "GESTOR" : "USUÁRIO";

    return (
        <View style={styles.container} >
            <Perfil width={250} height={250} />
            <Text style={styles.title}>{c}: {u.getNome()}</Text>
            <BackButton></BackButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginVertical: 20,
        marginTop: -50,
        width: 300,
        textAlign: 'center'
    }
})