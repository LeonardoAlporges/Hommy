import { StyleSheet } from 'react-native';

const Estilo = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0,
  },
  flatList: {
    backgroundColor: '#f2f2f2f2',
    padding: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  V_externa: {
    height: '100%',
    width: '100%',
  },
  V_interna1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  V_Interna2: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagemError: {
    height: 200,
    width: 200,
  },
  textError: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  textError2: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
    width: '80%',
  },
  V_modalExterno: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  V_modalInterno: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    marginTop: 150,
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
  textList: {
    alignSelf: 'stretch',
    paddingHorizontal: 15,
  },
  itemStyle: {
    width: 100,
    borderBottomColor: '#27496d',
  },
  inputStyle: {
    alignSelf: 'stretch',
  },
  pickerStyle: {
    marginLeft: 50,
    marginRight: 50,
  },
  modalBtn: {
    alignSelf: 'center',
    backgroundColor: '#57A773',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 45,
    width: 170,
  },
  textBtn: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
  },
  FABStyle: {
    backgroundColor: '#27496d',
    position: 'absolute',
  },
  FabBTN: {
    backgroundColor: '#27496d',
  },
  FabIcon: {
    color: '#ffffff',
  },
});

export default Estilo;
