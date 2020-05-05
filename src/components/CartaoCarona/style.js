import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const Estilos = StyleSheet.create({
  touch_card: {
    flex: 1,
    height: 120,

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
  V_ImgNome: {
    flexDirection: 'column',
    height: 118,
    justifyContent: 'center',
    alignItems: 'center',
  },
  V_nota: {
    flexDirection: 'row',
    width: 40,
  },
  icon: {
    fontSize: 12,
    color: 'blue',
  },
  V_imagem: {
    height: 70,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  imagem: {
    height: 60,
    width: 60,
  },
  V_local: {
    width: '40%',
    height: '100%',
    paddingLeft: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  V_LocLabel: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  V_DataVal: {
    padding: 10,
    width: '60%',
    height: '100%',
  },
  Data: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  Valor: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  txtdeslc: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  iconDesCh: {
    fontSize: 12,
    color: 'green',
  },
  iconDesSa: {
    fontSize: 12,
    color: 'red',
  },
  txtdeslcSa: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'red',
  },
  txtdeslcCh: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'green',
  },
  txtData: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtvalor: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Estilos;
