import { StyleSheet } from 'react-native';

const Estilo = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0,
  },
  flatList: {
    backgroundColor: '#f2f2f2',
    padding: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  V_externa: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  V_internaLoad: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#fff',
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
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    flex: 1,
  },
  V_modalInterno: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    marginTop: 120,
    marginHorizontal: 40,
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
  listStyle: {
    alignItems: 'stretch',
    marginBottom: 10,
  },
  listStyle2: {
    alignItems: 'stretch',
  },
  textList: {
    alignSelf: 'stretch',
    paddingHorizontal: 15,
  },
  textValor:{
    color: '#2e2e2e',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 16,
    width: 50,
    paddingBottom:8
  },
  ViewLabel:{
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemStyle: {  
    width: 100,
    height: 30,
    borderBottomColor: '#142850',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#142850',
    borderRadius: 8,
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
    backgroundColor: '#142850',
    position: 'absolute',
  },
  FabBTN: {
    backgroundColor: '#142850',
  },
  FabIcon: {
    color: '#ffffff',
  },
});

export default Estilo;
