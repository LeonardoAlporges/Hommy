import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ViewImagem = styled.View`
  margin-top: 10%;
  width: 150;
  height: 150;
`;

export const ViewTitulo = styled.View`
  margin-top: 5%;
  padding: 10%;
  padding-top: 0%;
  width: 100%;
  align-items: flex-start;
`;

export const Titulo = styled.Text`
  font-family: WorkSans;
  font-size: 16;
  color: #687368;
`;

export const ViewSubtitulo = styled.View`
  width: 80%;
  height: 55;
  justify-content: center;
  align-items: center;
`;

export const Subtitulo = styled.Text`
  text-align: center;
  font-family: WorkSans;
  font-size: 16;
  color: #687368;
`;

export const ViewBotao = styled.View`
  margin-top: 30%;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
`;

export const TextoBotao = styled.Text`
  text-align: center;
  font-family: WorkSans;
  font-size: 20;
  color: #ffff;
  font-weight: bold;
`;

export const ViewModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CamposLogin = styled.View`
  margin-top: 15%;
  height: 60;
  width: 330px;
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

export const Linha = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

export const FieldSetLarge = styled.View`
  width: 80%;
  
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;

export const LabelFielSet = styled.Text`
  position: absolute;
  top: -13px;
  left: 10px;
  font-family: WorkSans;
  font-size: 16px;
  color: #142850;
  background-color: #ffffff;
  padding: 0 5px 0 5px;
`;

const estilo = StyleSheet.create({
  V_img: {
    marginTop: '10%',
    width: 200,
    height: 150
  },
  botao: {
    width: 200,
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
  V_error: {
    height: 12,
    width: '100%',
    textAlign: 'left'
  },
  textError: {
    fontFamily: 'WorkSans',
    textAlign: 'left',
    fontSize: 10,
    color: 'red'
  },
  labelInput: {
    fontSize: 20,
    fontFamily: 'WorkSans',
    marginLeft: '2%',
    width: 200,
    height: 60
  }
});

export default estilo;
