import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  Divisao: {
    paddingHorizontal: 16,
    marginHorizontal: 20,
    fontSize: 10,
    width: '80%',
    borderBottomWidth: 1,
  },
  Text: {
    paddingBottom: 10,
    fontSize: 20
  },
  Cards: {
    marginVertical: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  Nome: { paddingLeft: 10, width: '50%', fontFamily: 'Roboto', fontSize: 16 },
  Numero: {
    textAlign: 'right',
    width: '42%',
    fontFamily: 'Roboto',
    fontSize: 16,
    paddingRight: 10,
  },
  Icone: {
    width: '100%',
    fontSize: 20,
  },
  Botao: {
    width: '8%',
  },
  V_Load: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  V_republicas: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
    backgroundColor: '#f8f8f8',
  },
});

export default style;
