import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.View`
  width: '100%',
  height: '100%',
  alignItems: 'center'
`;

export const ViewImagem = styled.View`
  margin-top: '10%',
  width: 200,
  height: 150
`;

export const ViewTitulo = styled.View`
  margin-top: '5%',
  padding: '10%',
  paddingTop: '0%',
  width: '100%',
  height: 28,
  align-items: 'flex-start',
`;

export const Titulo = styled.Text`
  font-family: 'WorkSans',
  font-size: 16,
  color: '#687368',
`;

export const ViewSubtitulo = styled.View`
  width: '80%',
  height: 55,
  justify-content: 'center',
  align-items: 'center',
`;

export const Subtitulo = styled.Text`
  text-align: 'center',
  font-family: 'WorkSans',
  font-size: 16,
  color: '#687368',
`;

export const ViewBotao = styled.View`
  margin-top: '30%',
  justify-content: 'center',
  align-items: 'center',
  width: '100%',
  height: 50
`;

export const TextoBotao = styled.Text`
  text-align: 'center',
  font-family: 'WorkSans',
  font-size: 20,
  color: '#ffff',
  font-weight: 'bold',
`;

export const ViewModal = styled.View`
  flex: 1,
  justify-content: 'center',
  align-items: 'center',
`;

export const CamposLogin = styled.View`
  margin-top: '15%',
  height: 60,
  width: 330,
`;

export const ViewErro = styled.View`
  height: 12px;
  width: 100%;
  text-align: left;
`;

export const LabelErro = styled.Text`
  text-align: left;
  font-family: WorkSans;
  font-size: 10px;
  color: red;
`;

const estilo = StyleSheet.create({
  V_img: {
    marginTop: '10%',
    width: 200,
    height: 150
  },
  botao: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    borderRadius: 10,
    flexDirection: 'row'
  },
  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#142850'
  },
  labelInput: {
    fontSize: 20,
    fontFamily: 'WorkSans',
    marginLeft: '2%',
    width: '88%',
    height: 60
  }
});

export default estilo;
