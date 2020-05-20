import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#00909e',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  campos: {
    marginTop: 20,
  },
  V_geral: {
    flexWrap: 'nowrap',
    marginTop: 100,
    width: '100%',
    height: '100%',
    flex: 1,
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginHorizontal: '5%',
  },
  V_interna2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20%',
  },
  imagemError: {
    height: 200,
    width: 200,
  },
  textError: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',

    width: '80%',
  },
  textError2: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
    width: '80%',
  },
  txtLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#586880',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  barra: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
  label: {
    marginLeft: '6%',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  V_label: {
    marginTop: '3%',
  },
  card: {
    marginTop: 0,
    marginBottom: 0,
    paddingVertical: '3%',
    paddingHorizontal: '1%',
  },
  flatList: {
    padding: 1,
    marginBottom: 0,
    paddingBottom: 0,
  },
  V_edit: {
    marginTop: '0%',
    width: '100%',
    height: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  edit: {
    borderRadius: 7,
    height: 34,
    width: 100,
    backgroundColor: '#009ddb',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#ffffff',
  },
  TxtEdit: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  icon: {
    fontSize: 25,
    marginRight: '2%',
    color: '#ffffff',
  },
});
export default estilo;
