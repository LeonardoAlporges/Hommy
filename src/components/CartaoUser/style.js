import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  card: {
    marginHorizontal: '2%',
    marginVertical: '2%',
    width: '96%',
    height: 60,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  V_imagem: {
    marginLeft: 5,
    width: 60,
    height: 50,
  },
  Imagem: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  V_nome: {
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  nome: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  V_nota: {
    flexDirection: 'row',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nota: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  icon: { fontSize: 14, color: '#142850' },
  iconAceite: {
    backgroundColor: '#142850',
    color: '#ffffff',
    padding: 5,
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
  },
  iconRejeite: {
    backgroundColor: '#f2f2f2',
    color: '#142850',
    padding: 5,
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2e2e2e',
  },
  V_Icon: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 80,
    height: 50,
  },
});

export default style;
