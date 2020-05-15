import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#68c0e8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  campos: {
    marginTop: 20,
  },
  iconHeader: {
    fontSize: 26,
    color: '#009ddb',
    marginHorizontal: '5%',
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
    color: '#006fa9',
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
});
export default estilo;
