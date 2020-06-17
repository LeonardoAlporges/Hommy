import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posicao: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  imagem: { width: 150, height: 150 },
  img: { width: 150, height: 150 },
  texto: {
    width: '80%',
    height: 130,

    justifyContent: 'space-around',
    alignItems: 'center',
  },
  descricao: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#142850',
    fontSize: 18,
  },
  titulo: {
    fontFamily: 'Roboto Bold',
    color: '#142850',
    fontSize: 24,
  },
  V_Botoes: {
    width: '80%',
    height: 50,
    position: 'absolute',
    bottom: 30,
  },
  botao: {
    borderRadius: 6,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelButon: {
    fontFamily: 'Roboto Bold',
    color: '#ffffff',
    fontSize: 20,
  },

  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center',
  },
});

export default style;
