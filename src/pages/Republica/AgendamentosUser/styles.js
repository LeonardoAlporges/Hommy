import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
`;

export const ViewDetalhes = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Subtitulo = styled.Text`
  font-family: WorkSans;
  font-size: 14;
  color: #687368;
  margin: 0 20px 0 20px;
`;

export const ViewData = styled.View`
  margin-top: 0;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  height: 40;
`;

export const LabelData = styled.Text`
  font-size: 16;
  font-family: WorkSans;
  color: #142850;
  font-weight: bold;
`;

export const LabelConfirmacao = styled.Text`
  font-size: 16;
  font-family: WorkSans;
  color: #ffffff;
  font-weight: bold;
`;

export const Barra = styled.View`
  width: 90%;
  margin: 0 5% 0 5%;
  border-bottom-width: 1;
  border-bottom-color: #adadad;
`;

export const Label = styled.Text`
  margin-left: 6%;
  font-family: WorkSans Bold;
  font-size: 16;
  color: #142850;
`;

export const ViewLabel = styled.View`
  width: 100%;
  margin: 10px 0 10px 0;
`;

export const Analise = styled.View`
  width: 30%;
  border-radius: 20;
  background-color: yellow;
  justify-content: center;
  align-items: center;
`;

export const Confirmado = styled.View`
  width: 30%;
  border-radius: 20;
  background-color: green;
  justify-content: center;
  align-items: center;
`;

export const Rejeitado = styled.View`
  width: 30%;
  border-radius: 20;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

export const LabelReijeicao = styled.Text`
  font-size: 16;
  font-family: WorkSans;
  color: #ffffff;
  font-weight: bold;
`;

const style = StyleSheet.create({
  viewData2: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '45%',
    borderRadius: 50,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51
  }
});
export default style;
