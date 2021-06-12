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
`;
export const Hora = styled.Text`
  font-family: WorkSans;
  color: #142850;
  font-size: 22;
`;
export const ViewValor = styled.View`
margin-top: 10%;
  flex-direction: row;
  width: 90%;
  padding-right: 5%;
  padding-left: 5%;
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
  margin-top: 2%;
  width: 88%;
`;
export const ViewPontos = styled.View`
  padding: 10px;
  width: 100%;
  height: 20%;
  margin-top: 10px;
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
  margin-top: 10px;
`;
export const TextoLabel = styled.Text`
  font-family: WorkSans-SemiBold;
  color: #142850;
  font-size: 20;
`;

export const ViewBotao = styled.View`
  margin-bottom: 20;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;
export const Botao = styled.TouchableOpacity`
  width: 50%;
  height: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: #142850;
  border-radius: 5px;
`;
export const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: WorkSans;
`;
