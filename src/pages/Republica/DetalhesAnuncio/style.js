import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export const ViewTitulo = styled.View`
  margin: 20px 16px 5px 16px;
`;
export const Titulo = styled.Text`
  font-family: WorkSans;
  font-size: 16px;
  color: #142850;
`;
export const ViewDescricao = styled.View`
  margin: 0px 16px 5px 16px;
`;
export const Descricao = styled.Text`
  font-family: WorkSans;
  font-size: 18px;
  color: #c0c0c0;
`;
export const Imagem = styled.Image`
  width: 100%;
  height: 300px;
`;
export const Card = styled.View`
  margin: 0px 16px 5px 16px;
  border-width: 1px;
  border-color: #d3d3d3;
  display: flex;
  background-color: #fff;
`;
export const Linha = styled.View`
  padding: 3px 5px 3px 5px;
  flex-direction: row;
  border-color: #d3d3d3;
  display: flex;
  justify-content: space-between;
  height: 60px;
`;
export const CardDeInformacao = styled.View`
  width: 48%;
  flex-direction: row;
  display: flex;
`;
export const IconesInformacao = styled.View`
  width: 20%;
  height: 55px;
  justify-content: center;
  align-items: center;
`;
export const Icone = styled(Icon)`
  font-size: 28px;
  color: #142850;
`;
export const Informacaoes = styled.View`
  display: flex;
  padding-left: 10px;
  justify-content: space-around;
`;
export const TipoInformacao = styled.Text`
  height: 20px;
  font-size: 16px;
  color: #142850;
  font-family: WorkSans-SemiBold;
`;
export const Informacao = styled.Text`
  font-size: 16px;
  color: #142850;
  font-family: WorkSans;
`;
export const Categoria = styled.Text`
  margin: 20px 16px 5px 16px;
  font-family: WorkSans;
  font-size: 18px;
  color: #142850;
`;
export const ViewBotao = styled.View`
  margin: 20px 0px 20px 0px;
  height: 60px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;
export const Botao = styled(Button)`
  display: flex;
  background-color: #142850;
  flex-direction: row;
  border-radius: 5px;
  width: 88%;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
export const Label = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: WorkSans-SemiBold;
`;
