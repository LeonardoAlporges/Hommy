import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const Container = styled.TouchableHighlight`
  flex: 1;
  padding: 10px 10px 10px 10px;
`;

const Estilo = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0
  },
  flatList: {
    backgroundColor: '#ffffff',
    padding: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  V_externa: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff'
  },
  botaoReload: {
    position: 'absolute',
    top: 0,
    left: 10,
    borderRadius: 10,
    color: 'red',
    backgroundColor: '#142850',
    justifyContent: 'center',
    height: 45,
    width: 45
  },
  textBotaoModal: {
    color: '#ffffff',
    fontFamily: 'WorkSans',
    textAlign: 'center',
    fontSize: 20
  },
  V_internaLoad: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#fff'
  },
  V_interna1: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%'
  },
  V_Interna2: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagemError: {
    height: 200,
    width: 200
  },
  textError: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'WorkSans'
  },
  textError2: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'WorkSans',
    width: '80%'
  },
  V_modalExterno: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    flex: 1
  },
  modal: {
    backgroundColor: 'rgba(52, 52, 52, 0.3)'
  },
  V_modalInterno: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 120,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  listStyle: {
    alignItems: 'stretch',
    marginBottom: 10
  },
  listStyle: {
    alignItems: 'stretch',
    marginBottom: 10
  },
  textList: {
    alignSelf: 'stretch',
    paddingHorizontal: 15
  },
  textValor: {
    color: '#2e2e2e',
    fontFamily: 'WorkSans',
    textAlign: 'center',
    fontSize: 16,
    width: 50,
    paddingBottom: 8
  },
  ViewLabel: {
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemStyle: {
    width: 70,
    height: 30,
    marginHorizontal: 10,
    borderBottomColor: '#142850',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    alignSelf: 'stretch'
  },
  pickerStyle: {
    marginLeft: 50,
    marginRight: 50
  },
  modalBtn: {
    alignSelf: 'center',
    backgroundColor: '#142850',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 45,
    width: 170
  },
  textBtn: {
    color: '#ffffff',
    fontFamily: 'WorkSans',
    textAlign: 'center',
    fontSize: 20
  },
  FABStyle: {
    backgroundColor: '#142850',
    position: 'absolute'
  },
  FabBTN: {
    backgroundColor: '#142850'
  },
  FabIcon: {
    color: '#ffffff'
  }
});

export default Estilo;
