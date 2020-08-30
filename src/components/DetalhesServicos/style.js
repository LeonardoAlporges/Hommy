import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  image: {
    height: 300,
    width: 420,
  },
  V_titulo: {
    height: 20,
    marginTop: '3%',
    width: '100%',
    paddingLeft: '6%',
  },
  titulo: {
    color: '#000',
    fontFamily: 'WorkSans-bold',
    fontSize: 26,
    fontWeight: 'bold',
  },
  V_descricao: {
    height: 90,
    marginTop: '4%',
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
  },
  descricao: {
    color: '#000',
    fontFamily: 'WorkSans',
    fontSize: 16,
  },
  barra: {
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
  V_tipo: {
    marginVertical: '2%',
    height: 70,
    width: '100%',
    alignItems: 'center',
    alignItems: 'center',
  },
  V_tituloTipo: {
    height: 35,
    width: '80%',
  },
  fontTitulo: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'WorkSans',
  },
  conteudo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 35,
    width: '80%',
    paddingHorizontal: '10%',
    justifyContent: 'flex-start',
  },
  botao: {
    backgroundColor: '#2E2E2E',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contato: {
    color: 'rgba(29,161,242,1)'
  }
});

export default estilo;
