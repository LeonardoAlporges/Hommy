import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
flex:1;
background-color:#ffffff;
`;
export const V_Subtitulo = styled.View`
width:100%;
height:40px;
padding:0 20px 0 20px;
`;
export const Subtitulo = styled.Text`
font-family:WorkSans;
font-size:14px;
`;
export const V_Label = styled.View`
width:100%;
padding:8px 0px 8px 0px;
`;
export const Label = styled.Text`
font-family:WorkSans-SemiBold;
font-size:16px;
color:#142850;
margin-left:6%;
`;
export const BarraSeparacao = styled.View`
width:90%;
margin:0 5% 0 5%;
border-bottom-width:1px;
border-bottom-color:#adadad;
`;
export const V_StatusInteresse = styled.View`
margin:10px 0px 0px 0px;
`;

export const BotaoAnalise = styled.View`
justify-content:center;
align-items:center;
margin-left:16px;
width:100px;
background-color:yellow;
height:30px;
border-radius:5px;
`;
export const BotaoRejeitado = styled.View`
justify-content:center;
align-items:center;
margin-left:16px;
width:100px;
background-color:red;
height:30px;
border-radius:5px;
`;
export const BotaoConfirmado = styled.View`
justify-content:center;
align-items:center;
margin-left:16px;
width:100px;
background-color:green;
height:30px;
border-radius:5px;
`;
export const LabelAnalise = styled.Text`
font-family:WorkSans;
font-size:16px;
color:#000;
`;
export const LabelConfirmado = styled.Text`
font-family:WorkSans;
font-size:16px;
color:#ffffff;
`;
export const LabelRejeitado= styled.Text`
font-family:WorkSans;
font-size:16px;
color:#ffffff;
`;

