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
  V_republicas: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#ffffff',
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
    height: 500,
    marginTop: 125,
    marginHorizontal: 50,
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
  textFiltro: {
    alignSelf: 'stretch',
    paddingHorizontal: 15,
  },
  itemInput: {
    width: 100,
    borderBottomColor: '#27496d',
  },
  botaoModal: {
    alignSelf: 'center',
    backgroundColor: '#57A773',
    borderRadius: 20,
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
    backgroundColor: '#27496d',
    position: 'absolute',
    bottom: 10,
  },
  corFAB: {
    backgroundColor: '#27496d',
  },
  corIconFab: {
    color: '#ffffff',
  },
});

export default estilosRepublica;
