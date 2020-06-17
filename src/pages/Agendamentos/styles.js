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
});
export default style;
