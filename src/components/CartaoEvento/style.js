import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.TouchableHighlight`
  flex: 1;
  padding: 10px 10px 10px 10px;
  margin-top:10px;
`;
export const Image = styled.Image`
  width:100%;
  height:100px;
  border-radius:4;
`;
export const ViewImgaem = styled.View`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
export const ViewInformacoes = styled.View`
 padding-left: 5%;
  width: 100%;
  height: 90px;
  flex-direction: column;

`;
export const ViewTitulo = styled.View`
  min-height: 40px;
  flex-direction: row;
`;
export const Titulo = styled.Text`
  font-family: WorkSans;
  font-size: 18px;
  color: #203258;
`;
export const ViewDataHora = styled.View`
  height: 30px;
  flex-direction: row;
`;
export const Icone = styled(Icon)`
  font-size: 20px;
  color: #203258;
  margin:0 0 0 5px;
`;
export const Data = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #203258;
`;
export const Hora = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #203258;
`;
export const ViewLocal = styled.View`
  height: 30px;
  flex-direction: row;
`;
export const Local = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #203258;
`;


const styles = StyleSheet.create({
  V_cartao: {
    backgroundColor: '#fff',
    display: 'flex',
    height: 190,
    borderRadius: 4,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },

});

export default styles;

