import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;
export const Listagem = styled.FlatList`
  width: 100%;
  height: 100%;
`;
export const FundoModal = styled.View`
 flex:1;
 justify-content:center;
 align-items:center;
 background-color: red;
`;
const estilosRepublica = StyleSheet.create({
  card: {
    marginTop: 0,
    marginBottom: 0,
    height: '100%',
    width: '50%'
  },
  flatList: {
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
    height: '50%',
    paddingHorizontal: 0
  },
  V_completa: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  V_Load: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  V_republicas: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#f8f8f8'
  },
  imageModal: {
    height: 200,
    width: 200
  },
  txtModal: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'WorkSans'
  },
  txtErr: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'WorkSans',
    width: '80%'
  },
  V_filtroExterno: {
    flex: 1
  },
  V_filtroInterno: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 120,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  listStyle: {
    alignItems: 'stretch',
    marginBottom: 10
  },
  listStyleInput: {
    alignItems: 'stretch',
    marginBottom: 10,

    height: 60
  },
  textFiltro: {
    alignSelf: 'stretch',
    paddingHorizontal: 8,
    textAlign: 'center'
  },
  textFiltroValor: {
    color: '#2e2e2e',
    fontFamily: 'WorkSans',
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 8
  },
  ViewLabel: {
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemInput: {
    width: 50,
    borderBottomColor: '#142850',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  botaoModal: {
    alignSelf: 'center',
    marginBottom: 15,
    backgroundColor: '#142850',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 45,
    width: 170
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
  S_FAB: {
    backgroundColor: '#142850',
    position: 'absolute',
    bottom: 10
  },
  corFAB: {
    backgroundColor: '#142850'
  },
  corIconFab: {
    color: '#ffffff'
  }
});

export default estilosRepublica;
