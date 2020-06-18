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
    fontFamily: 'Roboto',
    color: '#142850',
    fontWeight: 'bold',
  },
  dataConf: {
    fontSize: 16,
    fontFamily: 'Roboto',
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
    fontFamily: 'Roboto Bold',
    fontSize: 16,
    color: '#142850',
  },
  V_label: {
    width: '100%',
    marginVertical: 10,
  },
});
export default style;
