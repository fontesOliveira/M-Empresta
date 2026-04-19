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
        padding: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
        fontWeight: 'bold'
    },
    imagem: {
        width: 100,
        height: 100,
        marginTop: -0.5,
        borderRadius: 10
    }
})