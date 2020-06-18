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
  titulo: {
    width: '55%',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#142850',
    marginBottom: 10,
  },
  mensage: {
    width: '70%',
    textAlign: 'center',
    color: '#1458',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
  },
});

export default styles;
