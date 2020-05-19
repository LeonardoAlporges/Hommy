import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  ViewCabeca: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  touch_Icon: {
    marginLeft: 10,
    marginRight: 40,
  },
  Titulo: {
    marginRight: 30,
  },
  txt: {
    fontFamily: 'Roboto',
    fontSize: 23,
    fontWeight: '600',
    color: '#142850',
  },
  icon2: {
    color: '#142850',
    fontSize: 22,
  },
  bgModal: {
    backgroundColor: '#f8f8f8',
    flex: 1,
  },
  modal: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    flex: 1,
  },
  voltar: {
    height: 55,
    width: '100%',
    marginTop: '3%',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconModal: {
    marginTop: 8,
    fontSize: 20,
    color: '#27496d'
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: '2%',
  },
  viewNome: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNome: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#27496d',
  },
  textCPF: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#00909e',
  },
  viewDivisor: {
    marginTop: '8%',
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#27496d',
  },
  viewBotoes: {
    color: '#27496d',
    width: '100%',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    height: 325,
    marginTop: '10%',
  },
  botoes: {
    width: '100%',
    height: 55,
    backgroundColor: '#27496d',
    justifyContent: 'flex-start',
    borderRadius: 5,
    paddingLeft: '6%',
    color: '#dae1e7',
  },
  iconBotoes: {
    fontSize: 18,
    color: '#dae1e7'
  },
  iconBotoesArrow: {
    paddingLeft: '2%',
    fontSize: 18,
    color: '#dae1e7'
  },
  textBotoes: {
    width: '75%',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginLeft: '6%',
    color: '#ffff',
  },
  viewFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '70%',
    color: '#fff',
  }
});

export default Estilos;
