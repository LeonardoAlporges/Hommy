import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
  ViewCabeca: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff'
  },
  touch_Icon: {
    position: 'absolute',
    left: 15
  },
  touch_Fake: {
    position: 'absolute',
    right: 10
  },
  Titulo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 26,
    color: '#142850'
  },
  icon2: {
    color: '#142850',
    fontSize: 30
  },
  bgModal: {
    backgroundColor: '#f8f8f8',
    flex: 1
  },
  modal: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    flex: 1
  },
  voltar: {
    height: 30,
    width: '100%',
    marginTop: '3%',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  iconModal: {
    marginTop: 8,
    fontSize: 20,
    color: '#142850'
  },
  fotodeperfil: {
    width: 120,
    height: 130
  },
  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: '2%'
  },
  editFoto: {
    position: 'absolute',
    borderRadius: 10,
    top: 90,
    left: 85,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  viewNome: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNome: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#142850'
  },
  textCPF: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#00909e'
  },
  viewDivisor: {
    marginTop: '2%',
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#142850'
  },
  viewBotoes: {
    color: '#142850',
    width: '100%',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '10%',
    paddingBottom: '10%'
  },
  botoes: {
    width: '100%',
    height: 50,
    backgroundColor: '#142850',
    justifyContent: 'flex-start',
    borderRadius: 5,
    paddingLeft: '6%',
    color: '#dae1e7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20
  },
  iconBotoes: {
    fontSize: 18,
    color: '#dae1e7'
  },
  iconBotoesArrow: {
    paddingLeft: '2%',
    fontSize: 18,
    color: '#dae1e7'
  },
  textBotoes: {
    width: '75%',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginLeft: '6%',
    color: '#ffff'
  },
  viewFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '70%',
    color: '#fff'
  }
});

export default Estilos;
