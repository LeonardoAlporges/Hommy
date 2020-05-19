import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  V_titulo: {
    height: 20,
    marginTop: '3%',
    width: '100%',
    paddingLeft: '6%',
  },
  titulo: {
    color: '#142850',
    fontFamily: 'Roboto-bold',
    fontSize: 28,
    fontWeight: 'bold',
  },
  V_descricao: {
    height: 60,
    marginTop: '4%',
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
  },
  descricao: {
    color: '#27496d',
    fontFamily: 'Roboto',
    fontSize: 18,
  },
  barra: {
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#142850',
  },
  V_caracteristicaTitle: {
    height: 30,
    marginTop: '4%',
    width: '100%',
    paddingLeft: '10%',
  },
  caracteristicaTitle: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '600',
    color: '#142850',
  },
  V_tipo: {
    height: 30,
    marginTop: '2%',
    width: '100%',
    paddingLeft: '10%',
  },
  tipo: {
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  V_caracteristicaItens: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    marginTop: '2%',
    width: '85%',
    marginLeft: '11%',
    marginRight: '5%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    width: '38%',
  },

  txtlabel: {
    paddingLeft: 20,
    color: '#00909e',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  icone: {
    justifyContent: 'flex-start',
    fontSize: 28,
    fontFamily: 'Roboto',
    color: '#27496d',
    marginRight: 5,
    fontWeight: '600',
  },
  itemAcomodacao: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '5%',
    height: 40,
    width: '90%',
  },
  V_caracteristicaAcomodacao: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    marginTop: '1%',
    width: '85%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  V_vagas: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    marginTop: '1%',
    width: '85%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  vagas: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '5%',
    height: 40,
    width: '90%',
  },
  V_mapa: {
    display: 'flex',
    width: '100%',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMapa: {
    height: 300,
    width: 300,
  },
  V_botao: {
    marginTop: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  V_Detalhes: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWhatsapp: {
    color: '#ffffff',
    fontSize: 30
  },
  txtWhatsapp: {
    color: '#FFFFFF',
    marginLeft: 15
  }
});

export default estilo;
