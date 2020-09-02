import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
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
  campos: {
    marginTop: 20,
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginHorizontal: '5%',
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  V_interna1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.1)',
  },
  txtLabel: {
    fontFamily: 'WorkSans',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#586880',
  },
  title: {
    fontSize: 24,
    fontFamily: 'WorkSans',
    fontWeight: 'bold',
    color: '#142850',
  },
  V_Conteudo: {
    height: '100%',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ruaNum: {
    display: 'flex',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  Valores: {
    display: 'flex',
    height: 30,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#f8f2',
    justifyContent: 'space-between',
  },
  campos2: {
    marginTop: 20,
  },
  place: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#989898',
  },
  enviar: {
    alignItems: 'center',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btnProximo: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#142850',
  },
  iconeBtn: {
    margin: 0,
    color: '#68c0e8',
  },
  botaoEnv: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    color: '#fff',
  },
  txtCarona: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#687368',
    marginHorizontal: 20,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  campoStyle: {
    width: '43%',
  },
  V_erro: {
    height: 15,
  },
  textError: {
    fontSize: 10,
    color: 'red',
  },
  V_btn: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    paddingLeft: '20%',
    marginTop: '10%',
  },
  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  InputHora: {
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default estilo;
