import react from 'react';
import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    paddingTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },

  view_CamposLogin: {
    height: '8%',
    width: '80%',
    marginTop: '8%',
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: 'rgba(29,161,242,1)',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },
  icon_send: {
    fontSize: 25,
    margin: 5,
    color: 'rgba(29,161,242,1)',
  },
  view_BotaoEntar: {
    marginTop: '5%',
    height: 60,
    width: 100,
  },

  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100,
    backgroundColor: 'rgba(29,161,242,1)',
    borderRadius: 15,
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(29,161,242,1)',
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
});

export default estilo;
