import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;
export const V_Subtitulo = styled.View`
  width: 100%;
  height: 40px;
  padding: 0 20px 0 20px;
`;
export const Subtitulo = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
`;
export const V_Label = styled.View`
  width: 100%;
  padding: 8px 0px 8px 0px;
`;
export const Label = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color: #142850;
  margin-left: 6%;
`;
export const BarraSeparacao = styled.View`
  width: 90%;
  margin: 0 5% 0 5%;
  border-bottom-width: 1px;
  border-bottom-color: #adadad;
`;
export const ViewOpcoes = styled.View`
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  height: 40px;
  justify-content: space-evenly;
  align-items: flex-end;
`;
export const BotaoDelete = styled(Button)`
  border-radius: 5px;
  height: 34px;
  width: 34px;
  background-color: #142850;
  justify-content: center;
  align-items: center;
  color: #fff;
`;
export const BotaoEditar = styled(Button)`
  border-radius: 5px;
  height: 34px;
  width: 100px;
  background-color: #142850;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #fff;
`;
export const LabelBotaoEditar = styled.Text`
  font-family: WorkSans;
  font-size: 16px;
  color: #fff;
`;
export const BotaoInteressado = styled(Button)`
  border-radius: 5px;
  height: 34px;
  width: 200px;
  background-color: #142850;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  color: #fff;
`;
