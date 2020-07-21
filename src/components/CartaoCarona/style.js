import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

const Estilos = StyleSheet.create({
  touch_card: {
    flex: 1,
    height: 125,
    padding: 3,
    marginTop: 4,
    backgroundColor: '#ffff',
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CFD3D6',
    marginBottom: 8
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
    height: '100%',
    width: 85,
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
    width: '24%',
    height: '100%',
  },
  Data: {
    marginHorizontal: 5,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Valor: {
    flexDirection: 'row',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtIcon: {
    padding: 0,
    marginHorizontal: '2%',
    fontSize: 18,
    color: '#00909e',
  },
  txtdeslc: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',    
    backgroundColor: "blue"
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
    width: '28%',
    justifyContent: 'center',
    height: '100%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  V_TxtSaida: {
    justifyContent: 'center',
    marginLeft: '2%',
    width: '65%',
    height: '100%',
  },
  txtdeslcSa: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },

  txtdeslcChHora: {
    width: '28%',
    height: '100%',
    paddingTop: 13,

    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#142850',
  },

  txtdeslcCh: {
    width: '60%',
    height: '100%',
    paddingTop: 13,
    marginLeft: '2%',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#142850',  
  },
  txtData: {
    marginLeft: 5,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#142850',
  },
  txtvalor: {
    marginLeft: 5,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#142850',
  },
});

export default Estilos;
