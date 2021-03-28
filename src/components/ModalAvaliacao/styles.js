import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #00000080;
  justify-content: center;
  align-items: center;
`;

export const Avalie = styled.Text`
  padding:0px 20px 0px 20px;
  flex-wrap:wrap;  
  flex:1;
  max-height:65;
  text-align: center;
  justify-content: center;
  font-family: WorkSans-SemiBold;
  font-size: 18px;
  color:#142850;
`;
export const Avaliacao = styled.View`
  flex-direction:row;
  justify-content:space-around;
`;
export const TipoAvaliacao = styled.Text`
  flex:1;
  max-height:30;
  text-align: center;
  justify-content: center;
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color:#142850;
`;
export const Icones = styled.View`
flex:1;
width:250;
max-height:50;
flex-direction:row;
justify-content:space-around;
`;
export const Start = styled(Icon)`
  font-size:30;
  color:  ${props => (props.active ? "#142850" : 'gray')};
`;
export const Toque = styled.TouchableOpacity`
  width:40;
  height:40;
`;
export const Botao = styled.TouchableOpacity`
  align-self: center;
  background-color: #142850;
  border-radius: 5px;
  padding: 10px;
  justify-content: center;
  height: 50px;
  width: 170px;
`;
export const LabelBotao = styled.Text`
  text-align: center;
  font-family: WorkSans;
  font-size: 18px;
  color: #fff;
`;

const Estilos = StyleSheet.create({
  ViewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 250,
    minWidth:300,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default Estilos;
