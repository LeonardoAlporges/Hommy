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
export const Imagem = styled.Image`
  height: 300px;
  width: 100%;
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
export const ItemDuploLink = styled.TouchableOpacity`
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
export const ItemUnicoLink = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const ViewIcone = styled.View`
  margin: 0 5% 0 5%;
`;
export const LabelItem = styled.Text`
  width: 75%;
  color: #142850;
  font-family: WorkSans;
  font-size: 14px;
`;

export const ViewBotao = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const BotaoContato = styled(Button)`
  width: 88%;
  height: 60px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  background-color: #142850;
`;
export const LabelBotao = styled.Text`
  text-align: center;
  width: 75%;
  color: #142850;
  font-family: WorkSans;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ffffff;
`;
