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
    fontFamily: 'WorkSans',
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
    fontFamily: 'WorkSans',
    fontSize: 16,
    color: '#687368',
  },
  V_botao: {
    marginTop: '30%',

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
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
    fontFamily: 'WorkSans',
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
    marginTop: '15%',
    height: 60,
    width: 330,
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#142850',
  },
  labelInput: {
    fontSize: 20,
    fontFamily: 'WorkSans',
    marginLeft: '2%',
    width: '88%',
    height: 60,
  },
});

export default estilo;
