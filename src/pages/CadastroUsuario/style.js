import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  container: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    justifyContent: 'center',
  },

  view_CamposLogin: {
    height: 40,
    width: 330,
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#142850',
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%',
  },
  icon_send: {
    fontSize: 25,
    margin: 5,
    color: '#142850',
  },
  view_BotaoEntar: {
    marginTop: '10%',
    marginBottom: '5%',
    height: 60,
    width: 150,
  },

  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    backgroundColor: '#142850',
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
    backgroundColor: '#142850',
    flexDirection: "row"
  },
  txtErro: {
    fontFamily: 'Roboto-light',
    fontSize: 10,
    color: 'red',
  },
  V_ErroSem: {
    height: 15,
  },
  V_Erro: {
    marginBottom: 20,
    width: '80%',
    height: 15,
  },
  imagemStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  V_Btn: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"
  },
  textoLabel: {
    fontFamily: 'Roboto Bold',
    fontSize: 13,
    color: '#ffffff',
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
  labelInput: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: '2%',
    width: '88%',
    height: 40,
    color: '#142850',
  },
});

export default estilo;
