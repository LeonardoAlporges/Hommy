import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  padding: 20px;
  height: 50px;
  justify-content: center;
  align-items: flex-start;
  background-color: #142850;
`;

export const HeaderUser = styled.View`
  width: 100%;
  padding: 20px;
  height: 30%;
  justify-content: center;
  align-items: center;
  background-color: #142850;
`;
export const Imagem = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;
export const InformacaoPerfil = styled.View`
  margin-top: 3%;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 60px;
`;
export const Nome = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 18px;
  color: #ffffff;
`;
export const ViewNotas = styled.View`
  padding: 3px;
  flex-direction: row;
  margin: 0 3px 0 3px;
`;
export const Nota = styled.Text`
  font-family: WorkSans;
  font-size: 16px;
  color: #ffffff;
`;
export const ContainerIformacao = styled.View`
  padding: 10px 30px 10px 30px;

  width: 100%;
  height: 37%;
`;
export const ViewData = styled.View`
  justify-content: space-between;
  margin-top: 2%;
  width: 100%;
  height: 30px;
  flex-direction: row;
`;
export const Data = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 24px;
  color: #00909e;
`;
export const ViewPartida = styled.View`
  justify-content: space-between;
  margin-top: 4%;
  width: 100%;
  height: 20px;
`;
export const Partida = styled.Text`
  font-family: WorkSans;
  font-size: 16px;
  color: #142850;
`;
export const ViewHora = styled.View`
  width: 100%;
  height: 28px;
`;
export const Hora = styled.Text`
  font-family: WorkSans;
  color: #142850;
  font-size: 22;
`;
export const ViewValor = styled.View`
  margin-top: 10%;
  flex-direction: row;
  width: 100%;
  height: 30px;
`;
export const LabelValor = styled.Text`
  font-family: WorkSans;
  color: #142850;
  font-size: 18;
  padding-right: 30;
`;
export const Valor = styled.Text`
  font-family: WorkSans-SemiBold;
  color: #00909e;
  font-size: 22;
  padding-right: 30;
`;
export const BarraSeparadora = styled.View`
  margin: 0px 0px 0px 4%;
  border-bottom-width: 1px;
  border-bottom-color: #adadad;
  width: 88%;
`;
export const ViewPontos = styled.View`
  padding: 10px;
  width: 100%;
  height: 20%;
  margin-bottom: 10%;
  padding: 0px 30px 0px 30px;
`;
export const ViewPontoEmbarque = styled.View`
  width: 100%;
  height: 20px;
  margin-top: 10px;
`;
export const LabelPontoEmbarque = styled.Text`
  font-family: WorkSans;
  color: #142850;
  font-size: 18;
`;
export const ViewLabel = styled.View`
  width: 100%;
  height: 20px;
  margin-top: 10px;
`;
export const TextoLabel = styled.Text`
  font-family: WorkSans-SemiBold;
  color: #142850;
  font-size: 20;
`;
export const ViewBotao = styled.View`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
`;
export const Botao = styled(Button)`
  align-items:center;
  justify-content:center;
  width:100%;
  height:50px;
  border-radius:5px;
  background-color:#142850;
`;
export const LabelBotao = styled.Text`
  font-family: WorkSans-SemiBold;
  color: #fff;
  font-size: 20;
`;

