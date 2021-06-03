import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #00000080;
  justify-content: center;
  align-items: center;
  padding: 5%;
`;

export const Iconefechar = styled(Icon)`
  font-size: 18px;
  color: #212c50;
`;

export const BotaoFechar = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
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
  background-color: white;
  border-radius: 5px;
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


export const FieldSet = styled.View`
  width: 45%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const FieldSetLarge = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const LabelFielSet = styled.Text`
  position: absolute;
  top: -13px;
  left: 10px;
  font-family: WorkSans;
  font-size: 16px;
  color: #022250;
  background-color: #ffffff;
  padding: 0 5px 0 5px;
`;
export const Linha = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 25px;
`;

export const ViewErro = styled.View`
  height: 12px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
`;

export const Botao = styled.TouchableOpacity`
  align-self: center;
  background-color: #142850;
  border-radius: 5px;
  padding: 10px;
  justify-content: center;
  height: 50px;
  width: 150px;
`;
export const LabelBotao = styled.Text`
  text-align: center;
  font-family: WorkSans;
  font-size: 18px;
  color: #fff;
`;
export const InputHora = styled.TouchableOpacity`
  height: 50px;
  width: 130px;
  justify-content: center;
  align-items: center;
`;
export const LabelErro = styled.Text`
  text-align: left;
  font-family: WorkSans;
  font-size: 10px;
  color: red;

`;