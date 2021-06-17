import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const CadastroView = styled.View`
  flex:1;
  justify-content:center;
`;
export const EntraCodigoView = styled.View`
  flex:1;
  justify-content:center;
`;
export const Separador = styled.View`
  flex:1;
  justify-content:space-evenly;
`;

export const Apresentacao = styled.View`
  flex:1;
  max-height:20%;
  min-height:20%;
  justify-content:center;
  align-items:center;
  flex-direction:row;
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

`;
export const LabelView = styled.View`
  flex: 7;
  height:75px;
`;

export const Titulo = styled.Text`
  height:45px;
  font-size:16px;
  font-family:WorkSans-SemiBold;
  color:#142850;
`;

export const SubTitulo = styled.Text`
  height:30px;
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


