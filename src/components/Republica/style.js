import { StyleSheet } from 'react-native';

const estilosRepublica = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0,
    height: '100%',
    width: '50%',
  },
  flatList: {
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
    height: '50%',
    paddingHorizontal: 0,
  },
  V_completa: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  V_Load: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  V_republicas: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#f8f8f8',
  },
  imageModal: {
    height: 200,
    width: 200,
  },
  txtModal: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  txtErr: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
    width: '80%',
  },
  V_filtroExterno: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  V_filtroInterno: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 480,
    width: 350,
    marginTop: 120,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listStyle: {
    alignItems: 'stretch',
    marginBottom: 10,
  },
  listStyleInput: {
    alignItems: 'stretch',
    marginBottom: 10,

    height: 60,
  },
  textFiltro: {
    alignSelf: 'stretch',
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  textFiltroValor: {
    color: '#2e2e2e',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 16,
  },
  ViewLabel: {
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemInput: {
    width: 100,
    backgroundColor: 'red',
    borderBottomColor: '#142850',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  botaoModal: {
    alignSelf: 'center',
    backgroundColor: '#142850',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 45,
    width: 170,
  },
  textBotaoModal: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
  },
  S_FAB: {
    backgroundColor: '#142850',
    position: 'absolute',
    bottom: 10,
  },
  corFAB: {
    backgroundColor: '#142850',
  },
  corIconFab: {
    color: '#ffffff',
  },
});

export default estilosRepublica;
