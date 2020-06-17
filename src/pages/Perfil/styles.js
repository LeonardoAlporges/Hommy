import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#142850',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginHorizontal: '3%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  V_profile: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  V_imagem: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
  imagem: {
    marginTop: 100,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  V_Title: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
  },
  V_nome: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  nome: {
    fontSize: 18,
    fontFamily: 'Roboto',

    color: '#142850',
  },
  V_nota: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nota: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#142850',
  },
  V_contatos: {
    marginTop: '5%',
    paddingLeft: '25%',
    justifyContent: 'space-around',
    width: '100%',
    height: 150,
  },
  botoes: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    borderRadius: 5,
  },
  barra: {
    width: '90%',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
  label: {
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#142850',
  },
  labelbotao: {
    color: '#ffffff',
  },
  V_botaoEditar: {
    marginTop: '5%',
    paddingLeft: '25%',
    justifyContent: 'space-around',
    width: '100%',
    height: 150,
  },
});

export default style;
