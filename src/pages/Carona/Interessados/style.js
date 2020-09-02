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
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'WorkSans',
    fontWeight: 'bold',
    color: '#142850',
  },
  subtitulo: {
    fontSize: 14,
    fontFamily: 'WorkSans',
  },
  barra: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
  label: {
    marginLeft: '6%',
    fontFamily: 'WorkSans Bold',
    fontSize: 16,
    color: '#142850',
  },
  V_label: {
    width: '100%',
    marginVertical: 8,
  },
  Lista: {
    backgroundColor: 'green',
  },
  Analise: {
    width: '30%',
    borderRadius: 20,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Confirmado: {
    width: '30%',
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#142850',
    fontWeight: 'bold',
  },
  dataConf: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoStatusConf: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    width: 100,
    backgroundColor: 'green',
    height: 30,
    borderRadius: 5,
  },
  textStatusConf: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#ffffff',
  },
  botaoStatusAna: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    width: 100,
    backgroundColor: 'yellow',
    height: 30,
    borderRadius: 5,
  },
  textStatusAna: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#000',
  },
  botaoStatusRej: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    width: 100,
    backgroundColor: 'red',
    height: 30,
    borderRadius: 5,
  },
  textStatusRej: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#fff',
  },

  flatList: {
    padding: 0,
  },
  titleCategoria: {
    marginHorizontal: '5%',
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#2e2e2e',
  },
  V_title: {
    height: 16,
    width: '100%',
    marginVertical: '3%',
  },
  barra: {
    width: '90%',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
});

export default style;
