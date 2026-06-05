import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: '93%',
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
    containercard:{
        justifyContent: 'center',
        left: 10,
        padding: 5,
    },
    text: {
        fontSize: 20,
        marginBottom: 5,
        color: '#000',
        fontWeight: 'bold',
        left: 3
    },
    textautor: {
        fontSize: 17,
        marginBottom: 5,
        color: '#000',
        fontWeight: 'bold'
    },
    texts: {
        fontSize: 14,
        marginBottom: 5,
        color: '#000',
        fontWeight: 'bold',
        left: 5
    },
    imagem: {
        width: 100,
        height: 100,
        marginTop: -0.5,
        borderRadius: 10
    }
})