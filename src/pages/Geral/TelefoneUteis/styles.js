import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  Divisao: {
    marginTop: 10,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    fontSize: 10,
    width: '80%',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  Text: {
    paddingBottom: 10,
    fontSize: 20,
  },
  Cards: {
    marginVertical: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
    height: 50,
  },
  Nome: { paddingLeft: 10, width: '50%', fontFamily: 'WorkSans', fontSize: 16 },
  Numero: {
    textAlign: 'right',
    width: '42%',
    fontFamily: 'WorkSans',
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
