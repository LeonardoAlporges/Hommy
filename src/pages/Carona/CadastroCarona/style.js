import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 15px 20px 15px 20px;
`;

export const Subtitle = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #586880;
`;

export const FieldSet = styled.View`
  width: 45%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const FieldSetLarge = styled.View`
  width: 100%;
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
  color: #022250;
  background-color: #ffffff;
  padding: 0 5px 0 5px;
`;
export const Linha = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 33px;
`;
export const ViewErro = styled.View`
  height: 12px;
  width: 100%;
  text-align: left;
`;
export const InputHora = styled.TouchableOpacity`
  height: 50px;
  width: 130px;
  justify-content: center;
  align-items: center;
`;
export const LabelErro = styled.Text`
  text-align: left;
  font-family: WorkSans;
  font-size: 10px;
  color: red;
`;
export const ViewBotao = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-left: 20%;
  margin-top: 15%;
`;
export const LabeBotaoEnviar = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 18px;
  color: #142850;
`;
const estilo = StyleSheet.create({
  btnProximo: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  },
  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080'
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center'
  }
});

export default estilo;
