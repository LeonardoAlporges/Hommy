import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

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
    paddingTop: '4%',
  },
  V_imagem: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
  V_TituloDesc: {
    paddingLeft: 10,
    width: '70%',
    flexDirection: 'column',
  },
  V_titulo: {
    justifyContent: 'center',
    width: '100%',
    height: 30,
    paddingTop: 5,
  },
  txtTitulo: {
    fontSize: 26,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    color: '#586880',
  },
  V_desc: {
    width: '100%',
    height: '50%',
    paddingVertical: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: 0,
  },
  txtDesc: {
    marginHorizontal: 5,
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#1982C3',
    fontWeight: 'bold',
  },
  txtIcon: {
    padding: 0,
    marginHorizontal: 2,
    fontSize: 22,
    color: '#1982C3',
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
