import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const BotaoFooter = styled(Button)`
  background: white;
  border-radius:0;
  border-bottom-width: ${props => (props.active ? '2px' : '0px')};
  border-bottom-color: ${props => (props.active ? '#142850' : 'white')};
  box-shadow: 10px 5px 5px #000;
`;
export const Icone = styled(Icon)`
  font-size: ${props => (props.active ? 26 : 22 )};
  color: ${props => (props.active ? '#142850' : '#193264')};
`;
export const Label = styled.Text`
  font-size: 14;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props => (props.active ? '#142850' : '#193264')};
`;

const estilo = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  card: {
    marginTop: 55
  },
  tabs: {
    width: 100,
    height: 100
  },
  tabs_TextStyle: {
    color: '#142850',
    fontFamily: 'WorkSans',
    fontSize: 15
  },
  tabs_ActiveTextStyle: {
    color: '#142850',
    fontFamily: 'WorkSans-Bold',
    fontWeight: '700',
    fontSize: 16
  },
  tabs_ActiveTabs: {
    backgroundColor: '#ffffff'
  },
  tabs_style: {
    backgroundColor: '#ffffff'
  },
  empty: {
    marginBottom: '8%',
    display: 'flex',
    alignItems: 'center',
    marginTop: '30%'
  },
  content: {
    flex: 1,
    display: 'flex'
  },
  empty_titulo: {
    color: '#687368',
    fontFamily: 'WorkSans',
    fontWeight: '800',
    fontSize: 22
  },
  empty_sub: {
    textAlign: 'center',
    marginTop: '5%',
    height: '20%',
    width: '50%',
    color: '#687368',
    fontFamily: 'WorkSans-Bold',
    fontWeight: 'normal',
    fontSize: 16
  }
});

export default estilo;
