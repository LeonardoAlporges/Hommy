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
  txtnome: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 12,
    color: '#00909e',
  },
  V_imagem: {
    height: 70,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  imagem: {
    borderRadius: 50,
    height: 60,
    width: 60,
  },
  V_local: {
    width: '50%',
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
    padding: 5,
    width: '21%',
    height: '100%',
  },
  Data: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Valor: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtIcon: {
    padding: 0,
    marginHorizontal: 5,
    fontSize: 18,
    color: '#00909e',
  },
  txtdeslc: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  iconDesCh: {
    fontSize: 12,
    marginHorizontal: 6,
  },
  iconDesSa: {
    fontSize: 12,
    marginHorizontal: 6,
  },
  txtdeslcSaHora: {
    paddingTop: 13,
    fontSize: 18,
    width: '30%',
    height: '100%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  txtdeslcSa: {
    paddingTop: 12,
    fontSize: 18,
    width: '55%',
    height: '100%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  txtdeslcCh: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#142850',
  },
  txtData: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#142850',
  },
  txtvalor: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#142850',
  },
});

export default Estilos;
