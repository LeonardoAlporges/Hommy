import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'native-base';

export const Container = styled.View`
  flex: 1;
`;

export const ViewDoTitulo = styled.View`
  height: 40px;
  margin-top: 3%;
  margin-bottom: 1%;
  width: 100%;
  padding-left: 6%;
`;

export const Titulo = styled.Text`
  color: #142850;
  font-family: WorkSans-SemiBold;
  font-size: 26px;
`;
export const ViewDescricao = styled.View`
  height: 70px;
  margin-top: 1%;
  width: 100%;
  padding: 0 16px 0 16px;
`;
export const Descricao = styled.Text`
  color: #142850;
  font-family: WorkSans-SemiBold;
  font-size: 16px;
`;
export const BarraSeparacao = styled.View`
  height: 1px;
  width: 88%;
  margin: 5px 3% 5px 3%;
  border-bottom-width: 1px;
  border-bottom-color: #adadad;
`;

export const ViewSubTitle = styled.View`
  height: 30px;
  width: 100%;
  padding-left: 7%;
  flex-direction: row;
`;
export const SubTitle = styled.Text`
  width: 100%;
  color: #142850;
  font-family: WorkSans-SemiBold;
  font-size: 18px;
`;
export const LinhaDupla = styled.View`
  height: 60px;
  width: 100%;
  margin: 0 0 2% 0;
  padding: 0px 16px 0 16px;
  justify-content: space-around;
  flex-direction: row;
`;
export const LinhaUnica = styled.View`
  height: 60px;
  width: 100%;
  margin: 0px 0 2% 0;
  padding: 0px 25px 0 25px;
  flex-direction: row;
`;
export const ItemDuplo = styled.View`
  height: 60px;
  width: 45%;
  flex-direction: row;
  align-items: center;
`;
export const ItemUnico = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const ViewIcone = styled.View`
  height: 60px;
  width: 40px;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
`;
export const LabelItem = styled.Text`
  width: 75%;
  color: #142850;
  font-family: WorkSans;
  font-size: 14px;
`;
export const ViewBotao = styled.View`
  margin-top: 5%;
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
`;
export const BotaoContato = styled(Button)`
  width: 55%;
  height: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
  justify-content: space-around;
  border-radius: 5px;
  background-color: #142850;
`;
export const LabelBotao = styled.Text`
  width: 75%;
  color: #142850;
  font-family: WorkSans;
  font-size: 14px;
  color: #ffffff;
`;
