import react from 'react';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },

  txt_Titulo: {
    fontFamily: 'Roboto',
    fontSize: 35,
    color: 'rgba(29,161,242,1)',
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
    color: 'rgba(29,161,242,1)',
  },

  view_CamposLogin: {
    height: '8%',
    width: '80%',
    marginTop: '5%',
  },

  icons_CamposLogin: {
    fontSize: 35,
    margin: 5,
    color: 'rgba(29,161,242,1)',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },

  V_botoes: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '15%',
    paddingTop: '10%',
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

  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 15,
    backgroundColor: 'rgba(29,161,242,1)',
  },
});

export default style;
