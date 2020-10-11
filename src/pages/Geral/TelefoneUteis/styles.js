import styled from 'styled-components/native';
import { Button } from 'native-base';

export const V_Categoria = styled.View`
  padding: 0 16px 0 16px;
  margin: 10px 20px 10px 20px;
  width: 70%;
  border-bottom-width: 1px;
  border-bottom-color: #adadad;
`;

export const Categoria = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 20px;
  color: #142850;
`;
export const V_Card = styled.View`
  padding: 0 20px 0 20px;
  margin: 0px 0px 10px 0px;
`;
export const Card = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin: 0px 5px 0px 5px;
`;

export const Nome = styled.Text`
  padding-left: 10px;
  width: 50%;
  font-family: WorkSans;
  font-size: 14px;
  color: #142850;
`;
export const Numero = styled.Text`
  padding-right: 10px;
  text-align: right;
  width: 42%;
  font-family: WorkSans;
  font-size: 14px;
  color: #142850;
`;
export const IconeSeta = styled.View`
  width: 8%;
`;
