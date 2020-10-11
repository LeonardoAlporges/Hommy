import styled from 'styled-components/native';
import { Button } from 'native-base';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const Conteudo = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 10%;
`;

export const Logo = styled.View`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
`;

export const Imagem = styled.Image`
  width: 150px;
  height: 150px;
`;
export const Label = styled.View`
  width: 80%;
  height: 130px;
  justify-content: space-around;
  align-items: center;
`;
export const Titulo = styled.Text`
  font-family: 'WorkSans-bold';
  color: #142850;
  font-size: 24px;
`;
export const Descricao = styled.Text`
  font-family: 'WorkSans';
  color: #142850;
  font-size: 18px;
  text-align: center;
`;

export const Botoes = styled.View`
  width: 80%;
  height: 50px;
  position: absolute;
  bottom: 30px;
`;

export const Botao = styled(Button)`
  border-radius: 6px;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #142850;
`;

export const TituloBotao = styled.Text`
  font-family: WorkSans-SemiBold;
  color: #ffffff;
  font-size: 20px;
`;

export const FundoModal = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
`;

export const Spin = styled.View`
  background-color: #00000080;
  justify-content: center;
  align-items: center;
  height: 50;
  margin: 0px 30px 0px 30px;
  align-items: center;
`;
