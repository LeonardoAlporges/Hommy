import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    paddingBottom: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    height: 200,
    width: 200,
  },
  V_Titutlo: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  V_mensagem: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    width: '80%',
    textAlign: 'center',
    fontFamily: 'WorkSans',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#142850',

    marginBottom: 10,
  },
  mensage: {
    width: 300,
    textAlign: 'center',
    color: '#1458',
    fontFamily: 'WorkSans',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default styles;
