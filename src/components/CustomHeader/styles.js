import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(20, 40, 80,0.0)',
    borderBottomWidth: 1,
    borderBottomColor: '#142850',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconHeader: {
    fontSize: 28,
    color: '#142850'
  },
  title: {
    fontSize: 24,
    fontFamily: 'WorkSans',
    fontWeight: 'bold',
    color: '#142850'
  },
  V_headerBack: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc'
  },
  Touch: {
    width: '18%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center'
  },
  V_Title: {
    width: '82%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  txt_title: {
    fontSize: 20,
    fontFamily: 'WorkSans-Bold',

    color: '#142850'
  }
});

export default style;
