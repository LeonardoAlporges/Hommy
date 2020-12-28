import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
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
export const V_Status = styled.View`
  width: 100%;
  padding: 0px 5px 0px 5px;
  flex-direction: row;
  height: 45;
`;
export const V_Confirmado = styled.View`
  margin-left: 16px;
  margin-top: 8px;
  width: 30%;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: green;
`;
export const V_Analise = styled.View`
  margin-left: 16px;
  margin-top: 8px;
  width: 30%;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: yellow;
`;
export const V_Rejeitado = styled.View`
  margin-left: 16px;
  margin-top: 8px;
  width: 30%;
  border-radius: 10;
  justify-content: center;
  align-items: center;
  background-color: red;
`;
export const LabelConfirmado = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color: #fff;
`;
export const LabelAnalise = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color: #000;
`;
export const LabelRejeitado = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color: #fff;
`;
export const V_Close = styled.TouchableOpacity`
  margin-left: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: flex-end;
`;
