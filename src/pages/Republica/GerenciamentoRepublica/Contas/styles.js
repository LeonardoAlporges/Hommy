import { Button, Item, Picker } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

export const Card = styled.View`
  margin:5% 5% 5% 5%;
  height:350px;
  background-color:white;
  padding:10px 10px 10px 10px;
  border-radius:3px;
  flex-wrap:wrap;
`;
export const Apresentacao = styled.View`
  flex:1;
  max-height:12%;
  min-height:12%;
  justify-content:center;
  align-items:center;
  flex-direction:row;
  margin-top:10px;
`;
export const DadosView = styled.View`
  flex:1;
  max-height:40%;
  min-height:40%;
  flex-wrap:nowrap;
  justify-content:space-between;
  background-color:#f9f9f9;
  padding-left:8%;
  padding-right:8%;
`;
export const IconeView = styled.View`
  flex:2;
  align-items:center;
`;

export const Icone = styled(Icon)`
 font-size:35px;
  color:#142850;
  align-self:flex-end;
  padding-right:20px;
`;
export const LabelView = styled.View`
  flex: 7;
  height:40px;
  justify-content:center;
`;

export const Titulo = styled.Text`
  height:24px;
  font-size:16px;
  font-family:WorkSans-SemiBold;
  color:#142850;
`;

export const SubTitulo = styled.Text`
  height:20;
  font-size:14px;
  font-family:Work-Sans;
  color:#142850;
`;

export const Linha = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 33px;
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
  color: #142850;
  background-color: #f9f9f9;
  padding: 0 5px 0 5px;
`;
export const Botao = styled(Button)`
  width:40%;
  height:40px;
  justify-content:center;
  align-items:center;
  background-color:white;
      border-radius: 2;
      border-color: #ddd;
      border-bottom-width: 0;
      shadow-color: #000;
      shadow-offset: {width: 10, height: 10};
      shadow-opacity:5;
      shadow-radius: 2;
      elevation: 8;  
 
`;
export const BotaoView = styled.View`
  flex: 1;
  margin-top:3%;
  height:40px;
`;

export const LabelBotao = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 14px;
  color: #142850;
`;

export const ItemPicker = styled(Item)`
  width:40%;
  height:20px;
  margin:5px 0 5px 0;
`;
export const Adicionar = styled(Button)`
align-self:center;
align-content:center;
justify-content:center;
  height:30px !important;
  width:30px !important;
  background-color:white;
      border-radius: 2;
      border-color: #ddd;
      border-bottom-width: 0;
      shadow-color: #000;
      shadow-offset: {width: 10, height: 10};
      shadow-opacity:5;
      shadow-radius: 2;
      elevation: 8;  
`;
export const ListContas = styled.View`
  flex: 1;
  border-radius:3px;
  margin:5px 0 5px 0;
  flex-direction:row;
  height:30px;
  background-color:#DAE1E7;
  justify-content:center;
  align-items:center;
`;

export const LabelTitulo = styled.Text`
  flex: 2;
padding-left:5%;
color: #142850;
font-family: WorkSans-SemiBold;
`;

export const LabelDescricao = styled.Text`
  flex: 4;
  color: #142850;
  font-family: WorkSans;
`;

export const LabelValor = styled.Text`
  flex: 1;
  color: #142850;
  font-family: WorkSans-SemiBold;
  padding-right:5%;
`;

export const TotalView = styled.View`
  flex: 1;
  position:absolute;
  bottom:30px;
  max-height:30px;
  margin-top:15px;
  flex-direction:row;
  align-items:center;
  
`;
export const LabelTotal = styled.Text`
  flex: 1;
  color: #142850;
  font-family: WorkSans;
  padding-left:7%;
  padding-right:3%;
`;
export const Linhas = styled.View`
  flex: 4;
  color: #142850;
  border-width:0.2px;
`;
export const Total = styled.Text`
  font-size:15px;
  color: #142850;
  font-family: WorkSans-SemiBold;
`;
export const ViewValoraTotal = styled.Text`
  flex: 3;
  height:30px;
  border-radius:3px;
  background-color:#DAE1E7;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding-top:1.5%;
`;

