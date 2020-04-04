import react from 'react';
import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
    container: {
        paddingTop:'40%',
        display: 'flex',
        flexDirection: "column",
        flex: 1,
        alignItems: 'center',
        height: '100%',
        justifyContent: "center"
    },

    view_CamposLogin: {
        height: '8%',
        width: '80%',
        marginTop: '8%'
    },

    icons_CamposLogin: {
        fontSize: 25,
        margin: 5,
        color: 'rgba(29,161,242,1)',
    },

    esqueciSenha: {
        color: '#000',
        marginTop: '2%'
    },

    view_BotaoEntar: {
       marginTop:'15%',
        height: '40%',
        width: '20%',
    },

    botao_login: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        borderRadius: 25,
        backgroundColor: 'rgba(29,161,242,1)'
    },
    txtErro:{
        fontFamily:'Roboto-light',
        fontSize: 15,
        color: 'red' 
    },
    V_Erro:{
        marginTop:30,
        width:'80%',
        height:20,
    }






});

export default estilo;