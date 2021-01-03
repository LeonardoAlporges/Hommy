import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const Container = styled.ScrollView`
  width: 100%;
  background-color: red;
`;

export const ViewTitulo = styled.View`
  margin-top: 3%;
  width: 100%;
  padding-left: 6%;
  margin-bottom: 10;
`;
export const Card = styled.View`
  width: 92%;
  margin: 0 16px 0 16px;
  background-color: #fff;
  border-width: 1px;
  border-color: #d6d6d6;
  justify-content: center;
`;
export const Linha = styled.View`
  width: 100%;
  justify-content: space-evenly;
  min-height: 50px;
  flex-direction: row;
  margin-top: 5px;
`;
export const CardDeInformacao = styled.View`
  width: 48%;
  justify-content: space-around;
  height: 50px;
  justify-content: center;
  flex-direction: row;
`;
export const CardDeInformacaoLocalizacao = styled.TouchableOpacity`
  width: 48%;
  justify-content: space-around;
  height: 50px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
export const IconesInformacao = styled.View`
  width: 35px;
  height: 50px;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
`;
export const Icone = styled(Icon)`
  font-size: 25px;
  color: #142850;
`;
export const Informacaoes = styled.View`
  flex: 1;
  height: 50px;
  padding-left: 5px;
  justify-content: space-around;
  align-items: flex-start;
`;
export const TipoInformacao = styled.Text`
  font-size: 14px;
  color: #142850;
  font-family: WorkSans-SemiBold;
`;
export const Informacao = styled.Text`
  font-size: 14px;
  color: #142850;
  font-family: WorkSans;
`;
export const Categoria = styled.Text`
  margin-top: 10px;
  margin-left: 16px;
  font-size: 16px;
  color: #142850;
  font-family: WorkSans-SemiBold;
`;

export const Titulo = styled.Text`
  color: #142850;
  font-family: WorkSans-bold;
  font-size: 24;
  font-weight: bold;
`;
export const ViewDescricao = styled.View`
  width: 88%;
  margin-left: 6%;
  margin-right: 6%;
  margin-bottom: 10;
`;
export const Descricao = styled.Text`
  color: #142850;
  font-family: WorkSans;
  font-size: 18;
`;

export const Barra = styled.View`
  width: 88%;
  margin-left: 6%;
  margin-right: 6%;
  border-bottom-width: 1;
  border-bottom-color: #142850;
`;

export const ViewCaracteristicaTitle = styled.View`
  height: 30;
  margin-top: 4%;
  width: 100%;
  padding-left: 10%;
`;

export const CaracteristicaTitle = styled.Text`
  font-family: WorkSans;
  font-size: 22;
  font-weight: 600;
  color: #142850;
`;

export const ViewTipo = styled.View`
  height: 30;
  margin-top: 2%;
  width: 100%;
  padding-left: 10%;
`;

export const Tipo = styled.Text`
  font-family: WorkSans;
  font-size: 20;
`;

export const ViewCaracteristicaItens = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 40;
  margin-top: 2%;
  width: 85%;
  margin-left: 10%;
`;

export const Item2 = styled.View`
  align-items: center;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
  height: 40;
  width: 38%;
  padding-left: 2%;
`;

export const TextLabel = styled.Text`
  padding-left: 20;
  color: #00909e;
  text-align: left;
  font-size: 16;
  font-family: WorkSans;
  font-weight: 600;
`;

export const TextLabelGenero = styled.Text`
  color: #00909e;
  font-size: 16;
  font-family: WorkSans;
  font-weight: 600;
  margin-left: 30;
  width: 100;
`;

export const ViewInterna = styled.View`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  height: 40;
  width: 90%;
  padding-left: 5%;
`;

export const ViewVagas = styled.View`
  display: flex;
  flex-direction: row;
  height: 40;
  margin-top: 1%;
  width: 85%;
  margin-left: 10%;
  margin-right: 10%;
`;

export const ViewBotao = styled.View`
  margin-top: 20;
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

export const TextoAgendamento = styled.Text`
  color: #ffffff;
  margin-left: 15;
`;
