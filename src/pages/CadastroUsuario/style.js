import react from 'react';
import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    paddingTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },

  view_CamposLogin: {
    height: 40,
    width: 330,
    marginTop: 20,
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#27496d',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },
  icon_send: {
    fontSize: 25,
    margin: 5,
    color: '#27496d',
  },
  view_BotaoEntar: {
    marginTop: '10%',
    height: 60,
    width: 150,
  },

  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    backgroundColor: '#27496d',
    borderRadius: 8,
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#27496d',
  },
  txtErro: {
    fontFamily: 'Roboto-light',
    fontSize: 10,
    color: 'red',
  },
  V_Erro: {
    marginTop: 5,
    width: '80%',
    height: 20,
  },
  imagemStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  V_Btn: {
    display: 'flex',
    width: '100%',
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoLabel: {
    fontFamily: 'Roboto Bold',
    fontSize: 13,
    color: '#ffffff',
  },
});

export default estilo;
