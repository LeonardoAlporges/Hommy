import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 55px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #142850;
  align-items: center;
  justify-content: flex-start;
`;
export const ViewIcon = styled.TouchableOpacity`
  width: 18%;
  align-items: center;
  height: 55px;
  justify-content: center;
`;
export const Icone = styled(Icon)`
  font-size: 28px;
  color: #142850;
`;
export const ViewTitulo = styled.View`
  width: 70%;
  height: 40px;
  justify-content: center;
  align-items: flex-start;
`;
export const Titulo = styled.Text`
  font-size: 20px;
  color: #142850;
  font-family: WorkSans-Bold;
`;
