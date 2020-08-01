import react from 'react';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  txt_Titulo: {
    fontFamily: 'Roboto Bold',
    fontSize: 35,
    color: '#142850',
  },

  txt_FormaDeLogin: {
    fontFamily: 'Roboto Light',
    fontSize: 20,
    marginTop: '2%',
  },

  view_OutrosLogin: {
    height: '8%',
    marginTop: '2%',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  icons_OutroLogin: {
    fontSize: 40,
    color: '#142850',
  },

  view_CamposLogin: {
    height: '8%',
    width: '80%',
    marginTop: '5%',
  },

  icons_CamposLogin: {
    fontSize: 35,
    margin: 5,
    color: '#142850',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },

  V_botoes: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 150,
    width: '50%',
    marginTop: 30,
    alignItems: 'center',
  },
  V_cadastrar: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: '7%',
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
    backgroundColor: '#142850',
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
  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center',
  },
});

export default style;
