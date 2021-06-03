import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #00000080;
  justify-content: center;
  align-items: center;
`;

export const Iconefechar = styled(Icon)`
  font-size: 18px;
  color: #212c50;
`;

export const BotaoFechar = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  width: 30px;
  height: 30px;
  right: 10px;
  justify-content:center;
  align-items: center;
`;

export const ViewTitulo = styled.View`
 justify-content: flex-end;
 align-items: flex-start;
  flex: 1;
  max-height: 20%;
  padding-left: 5%;
  border-bottom-width:0.5px;
  padding-bottom :5px;
  border-color: #adadad;
`;

export const Titulo = styled.Text`
  text-align: center;
  font-family: WorkSans-SemiBold;
  font-size: 20px;
  color: #212c50;
`;

export const ViewModal = styled.View`
  min-height: 250px;
  min-width: 320px;
  background-color: white;
  border-radius: 5px;
  max-height: 250px;
  max-width: 320px;
`;

export const Topico = styled.Text`
width: 100%;
margin-top: 5%;
padding-left: 5%;
font-family: WorkSans-SemiBold;
font-size: 18px;
color: #212c50;
`;

export const Valor = styled.Text`
width: 100%;
padding-left: 8%;
font-family: WorkSans;
font-size: 16px;
color: #212c50;
`;

export const BotaoExcluir = styled.TouchableOpacity`
  width:30px;
  position: absolute;
  top: 10px;
  right: 60px;
  height: 30px;
  border-radius: 30px;
  align-self: center;
  background-color: #212c50;
  justify-content:center;
  align-items: center;
`;

