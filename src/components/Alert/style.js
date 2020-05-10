import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  ViewFundo: {
    backgroundColor: '#00000080',
    flex: 1,
  },
  ViewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    marginTop: 250,
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Imagem: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    justifyContent: 'center',
  },
  titulo: {
    marginVertical: '3%',
    marginBottom: 15,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 'bold',
  },
  descricao: {
    marginBottom: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  botao: {
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#30C21E',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 50,
    width: 170,
  },
  botaoTxt: {
    color: '#ffffff',
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Estilos;
