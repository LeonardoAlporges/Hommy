import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #00000080;
  justify-content: center;
  align-items: center;
`;

export const Imagem = styled.Image`
  align-self: center;
  width: 150px;
  height: 150px;
  justify-content: center;
`;
export const Titulo = styled.Text`
  margin: 3% 0px 10px 0px;
  text-align: center;
  justify-content: center;
  font-family: WorkSans-SemiBold;
  font-size: 22px;
`;
export const Descricao = styled.Text`
  margin: 0px 15px 3% 15px;
  text-align: center;
  justify-content: center;
  font-family: WorkSans;
  font-size: 15px;
`;
export const Botao = styled.TouchableOpacity`
  margin-top: 5%;
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

    height: 370,
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
