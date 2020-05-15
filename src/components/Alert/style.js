import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  ViewFundo: {
    backgroundColor: '#00000080',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 370,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
    backgroundColor: '#142850',
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
