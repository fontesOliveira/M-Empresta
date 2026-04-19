import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: '#d2d2d2',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        borderRadius: 100,
        flexDirection: 'row',
        paddingHorizontal: 20

    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdown: {
        position: "absolute",   // mantém fixo
        left: -10,              // distância da esquerda
        top: 50,                // distância abaixo do ícone
        backgroundColor: "#eee",
        borderRadius: 8,
        padding: 10,
        elevation: 5,           // sombra no Android
        shadowColor: "#000",    // sombra no iOS
        shadowOpacity: 0.2,
        shadowRadius: 4,
        minWidth: 150,             // largura do menu
        zIndex: 999, 
    },
    item: {
        paddingVertical: 8,
        height: 40,
    },
    itemText: {
        fontSize: 20, // 👈 aumenta o tamanho da letra
        fontWeight: "500",
    },
})