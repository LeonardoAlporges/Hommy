import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flex: 1,
  },
  V_botao: {
    marginTop: 20,
    marginBottom: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  V_Detalhes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitulo: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#687368',
    marginHorizontal: 20,
  },
  iconWhatsapp: {
    color: '#ffffff',
    fontSize: 30,
  },
  txtWhatsapp: {
    color: '#FFFFFF',
    marginLeft: 15,
  },
  viewData: {
    marginTop: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 40,
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
    marginVertical: 10,
  },
  V_Detalhes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewData2: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '45%',
    borderRadius: 50,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },    
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
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
  Rejeitado: {
    width: '30%',
    borderRadius: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataRej: {
    fontSize: 16,
    fontFamily: 'WorkSans',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default style;
