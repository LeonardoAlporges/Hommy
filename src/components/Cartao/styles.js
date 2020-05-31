import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const Estilos = StyleSheet.create({
  touch_card: {
    flex: 1,

    justifyContent: 'center',
    margin: 0,
  },
  V_cartao: {
    backgroundColor: '#ffffff',
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    height: '90%',
    borderRadius: 6,
    width: '100%',
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
    height: 120,
    width: 120,
    borderRadius: 4,
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
    color: '#27496d',
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
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#27496d',
    fontWeight: '500',
  },
  txtIcon: {
    padding: 0,

    fontSize: 18,
    color: '#00909e',
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
  V_obs: {
    paddingTop: 10,
    width: '90%',
    height: 45,
    maxHeight: 45,
  },
  V_valor: {
    paddingLeft: '2%',
    flexDirection: 'row',
    width: '45%',
    height: 40,
    marginRight: 10,
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  V_vagas: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
});

export default Estilos;
