import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#142850',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#142850',
  },
  Lista: {
    backgroundColor: '#f9f9f9',
    padding: 6,
  },
  flatList: {
    padding: 0,
  },
  titleCategoria: {
    marginHorizontal: '5%',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#2e2e2e',
  },
  V_title: {
    height: 16,
    width: '100%',
    marginVertical: '3%',
  },
  barra: {
    width: '90%',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#adadad',
  },
});

export default style;
