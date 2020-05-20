import react from 'react';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },

  txt_Titulo: {
    fontFamily: 'Roboto Bold',
    fontSize: 35,
    color: '#27496d',
  },

  txt_FormaDeLogin: {
    fontFamily: 'Roboto Light',
    fontSize: 20,
    marginTop: '10%',
  },

  view_OutrosLogin: {
    height: '8%',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  icons_OutroLogin: {
    fontSize: 40,
    color: '#27496d',
  },

  view_CamposLogin: {
    height: '8%',
    width: '80%',
    marginTop: '5%',
  },

  icons_CamposLogin: {
    fontSize: 35,
    margin: 5,
    color: '#27496d',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },

  V_botoes: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    width: '60%',
    marginTop: '10%',
    alignItems: 'center',
  },
  V_cadastrar: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  touchTx: {},
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#27496d',
  },
  imgStyle: {
    width: 70,
    height: 70,
    marginTop: '5%',
  },
  labelBotao: {
    fontFamily: 'Roboto Bold',
    fontSize: 20,
    color: '#ffffff',
  },
  botao_cadastro: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#00909e',
  },
  txtError: {
    fontSize: 10,
    color: 'red',
  },
  iconStyle: {
    fontSize: 25,
  },
});

export default style;
