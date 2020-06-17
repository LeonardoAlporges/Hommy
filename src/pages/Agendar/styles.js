import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  V_descr: {
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
  },
  textDescrição: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#687368',
    marginBottom: 25,
  },
  V_Inputs: {
    marginTop: 20,
    width: '90%',
    height: 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  V_botaoCalendar: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botaoCalendar: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconCaledar: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  IconCaledarA: {
    color: '#142850',
    fontSize: 22,
  },
});
export default style;
