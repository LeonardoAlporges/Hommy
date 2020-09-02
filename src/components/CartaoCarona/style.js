import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const Container = styled.TouchableHighlight`
  flex: 1;
  padding: 13px 13px 13px 13px;
`;
export const ViewImgaem = styled.View`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;
export const ViewSuperior = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
`;
export const ViewAvaliacaoDestinos = styled.View`
  width: 80%;
  height: 100%;
  padding-left: 5px;
`;
export const ViewAvaliacao = styled.View`
  width: 100%;
  height: 20px;
  flex-direction: row;
`;
export const ViewDestinos = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
export const LabelLocalSaida = styled.Text`
  height: 25px;
  font-family: WorkSans-Bold;
  font-size: 20px;
  color: #203258;
`;
export const LabelLocalChegada = styled.Text`
  height: 25px;
  font-family: WorkSans-Bold;
  font-size: 20px;
  color: #203258;
`;
export const ViewInferior = styled.View`
  margin: 15px 0 7px 0;
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: space-around;
`;
export const CardsInfeirores = styled.View`
  width: 30%;
  height: 40px;
  align-items: center;
`;
export const Label = styled.Text`
  height: 22px;
  font-family: WorkSans;
  font-size: 14px;
  color: #203258;
`;
export const Informacao = styled.Text`
  height: 20px;
  font-family: WorkSans-Bold;
  font-size: 14px;
  color: #203258;
`;
export const Separador = styled.View`
  width: 1px;
  height: 40px;
  border-left-width: 1px;
  border-style: solid;
  border-color: #e0e0e0;
`;
const Estilos = StyleSheet.create({
  V_cartao: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    height: 150,
    borderRadius: 4,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },

  imagem: {
    borderRadius: 4,
    height: 70,
    width: 70
  }
});

export default Estilos;
