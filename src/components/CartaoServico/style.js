import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  touch_card: {
    flex: 1,
    height: 125,
    justifyContent: 'center',
    padding: 3,
    marginTop: 8,
    backgroundColor: '#ffff',
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CFD3D6',
  },
  V_cartao: {
    display: 'flex',
    flexDirection: 'row',
  },
  V_imagem: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  V_TituloDesc: {
    width: '53%',
    flexDirection: 'column',
    padding: 5,
  },
  V_titulo: {
    width: '100%',
    height: '45%',
    padding: 5,
  },
  txtTitulo: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  V_desc: {
    width: '100%',
    height: '50%',
    padding: 10,
  },
  txtDesc: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  V_notasImg: {
    borderRadius: 10,
    width: '17%',
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgNota: {
    height: 15,
    width: 15,
  },
});

export default Estilos;
