import styled from 'styled-components/native';

import { StyleSheet } from 'react-native';

export const Container = styled.TouchableHighlight`
  flex: 1;
  padding: 10px 10px 10px 10px;
`;
export const ViewImagem = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 3px;
`;
export const Imagem = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 4px;
`;

export const ViewDados = styled.View`
  padding-left: 15px;
  width: 70%;
  border-radius: 4px;
`;
export const ViewTitulo = styled.View`
  justify-content: center;
  width: 100%;
  height: 30px;
  padding-top: 5px;
`;
export const Titulo = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 18px;
  color: #212c50;
`;
export const ViewComIcones = styled.View`
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  height: 30%;
`;
export const ViewDescricao = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  flex-direction: row;
  width: 100%;
  height: 40%;
  padding: 4px 0px 6px 1px;
`;
export const Descricao = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #212c50;
`;
export const ViewValor = styled.View`
  justify-content: flex-start;
  flex-direction: row;
  width: 25%;
  height: 40;

  padding: 8px 0px 0px 0px;
`;
export const ViewVagas = styled.View`
  justify-content: center;
  flex-direction: row;
  width: 70%;
  height: 40;
  padding: 8px 0px 0px 0px;
`;
export const Label = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 14px;
  color: #212c50;
`;

const styles = StyleSheet.create({
  V_cartao: {
    backgroundColor: '#fff',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    height: 130,
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
  icones: {
    marginHorizontal: 5,
    fontSize: 18,
    color: '#212c50'
  }
});

export default styles;
