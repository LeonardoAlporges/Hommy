import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
export const Container = styled.TouchableHighlight`
  width: 100%;
  padding: 0px 16px 0px 16px;
`;
export const ViewImagem = styled.TouchableOpacity`
  margin-left: 5px;
  width: 15%;
  height: 50px;
`;
export const Imagem = styled.Image`
  border-radius: 30px;
  width: 50px;
  height: 50px;
`;
export const ViewNome = styled.View`
  width: 40%;
  height: 50px;
  justify-content: center;
  align-items: flex-start;
`;
export const Nome = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: WorkSans-SemiBold;
`;
export const ViewNota = styled.View`
  width: 15%;
  height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const Nota = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: WorkSans-SemiBold;
  margin-left: 3px;
`;
export const ViewIcones = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 25%;
  height: 50px;
`;
export const AceiteIcon = styled(Icon)`
  background-color: #142850;
  color: #fff;
  padding: 5px;
  font-size: 22px;
  text-align: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-width: 1px;
  border-radius: 5px;
`;
export const RejeiteIcon = styled(Icon)`
  background-color: #f2f2f2;
  color: #142850;
  padding: 5px;
  font-size: 22px;
  text-align: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #2e2e2e;
`;
const style = StyleSheet.create({
  card: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  }
});

export default style;
