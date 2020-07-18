import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  V_img: {
    marginTop: '10%',
    width: 150,
    height: 150,
  },
  V_title: {
    marginTop: '5%',
    padding: '10%',
    paddingTop: '0%',
    width: '100%',
    height: 28,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#687368',
  },
  V_Subtitle: {
    width: '80%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#687368',
  },
  V_botao: {
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    flexDirection: "row"
  },
  botao: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    borderRadius: 10,
    flexDirection: "row"
  },
  txtbtn: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    color: '#ffff',
    fontWeight: 'bold',
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_CamposLogin: {
    marginTop: '10%',
    height: 40,
    width: 160,
  },
  view_CamposLoginSenha: {
    marginTop: '10%',
    height: 40,
    width: 300,
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#142850',
  },
  labelInput: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginLeft: '2%',
    width: '88%',
    height: 60,
  },
});

export default estilo;
