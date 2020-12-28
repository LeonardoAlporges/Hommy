import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ViewFundo = styled.View`
  background-color: #00000080;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const Titulo = styled.Text`
  margin: 0 3% 0 3%;
  margin-bottom: 15;
  text-align: center;
  justify-content: center;
  font-family: WorkSans;
  font-size: 22;
  font-weight: bold;
`;
export const Descricao = styled.Text`
  margin-bottom: 3%;
  text-align: center;
  justify-content: center;
  font-family: WorkSans;
  font-size: 15;
`;
export const BotaoTxt = styled.Text`
  color: #ffffff;
  font-family: WorkSans;
  text-align: center;
  font-size: 20;
`;

export const BotaoTxtCancelar = styled.Text`
  color: #142850;
  font-family: WorkSans;
  text-align: center;
  font-size: 20;
`;
export const ViewBotoes = styled.View`
  margin-top: 5%;
  flex-direction: row;
  height: 70;
  width: 300;
  justify-content: space-around;
  align-items: center;
`;

const style = StyleSheet.create({
  botao: {
    alignSelf: 'center',
    backgroundColor: '#142850',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 50,
    width: '40%'
  },
  botaoCancelar: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 50,
    width: '40%'
  },
  viewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10
  }
});

export default style;
