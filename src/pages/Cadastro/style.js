import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#00909e',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  campos: {
    marginTop: 20,
  },
  camposAmb: {
    marginTop: 50,
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 6,
    backgroundColor: '#142850',
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginLeft: '5%',
  },
  txtLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#586880',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  V_Conteudo: {
    height: '100%',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
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
    fontFamily: 'Roboto',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#142850',
    borderRadius: 6,
  },
  iconeBtn: {
    margin: 0,
    color: '#68c0e8',
  },
  botaoEnv: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    color: '#142850',
  },
});

export default estilo;
