import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
`;
export const Logo = styled.Image`
  width: 400px;
  height: 400px;
`;
export const LabelRedeSocial = styled.Text`
  margin-top: 30px;
  font-family: WorkSans;
  font-size: 14px;
  font-weight: bold;
  color: #022250;
`;
export const BotesLogin = styled.View`
  margin-top: 10px;
  width: 80%;
  align-items: center;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Botao = styled(Button)`
  width: 30%;
  height: 35px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
  justify-content: space-around;
  border-radius: 4px;
`;

export const LabelBotoes = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #022250;
`;
export const CampoLogin = styled.View`
  width: 80%;
  height: 50px;
  margin-bottom: 15px;
`;
export const Divisoria = styled.View`
  width: 35%;
  margin: 0px 10px 0px 5px;
  height: 1px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
`;
export const Ou = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  font-weight: bold;
  color: #022250;
`;

export const Hr = styled.View`
  margin: 6% 0 4% 0;

  flex-direction: row;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const Invalido = styled.View`
  width: 100%;
  height: 20px;
`;
export const LabelErro = styled.Text`
  font-family: WorkSans;
  font-size: 10px;
  color: red;
`;

export const RecuperaSenha = styled.View`
  flex-direction: row;
  width: 80%;
  height: 20px;
  margin-bottom: 5%;
`;
export const Click = styled.TouchableOpacity`
  height: 20px;
`;
export const LabelEsqueciSenha = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #022250;
  border-bottom-width: 1px;
  border-bottom-color: #2e2e2e;
`;

export const BotesPrincipal = styled.View`
  margin-top: 5%;
  width: 90%;
  align-items: center;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
`;

export const BotaoLogin = styled.TouchableOpacity`
  width: 40%;
  height: 50px;
  border-radius: 4px;
`;

export const BotaoCadastro = styled(Button)`
  width: 40%;
  height: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
  justify-content: space-around;
  border-radius: 4px;
`;
export const LabelLogin = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 16px;
  color: #ffffff;
`;
export const LabelCadastro = styled.Text`
  font-family: WorkSans-Light;
  font-size: 16px;
  color: #022250;
`;
export const BackgroundLoad = styled.View`
  height: 100%;
  width: 100%;
  background-color: #00000080;
  align-items: center;
  justify-content: center;
`;
export const ModalLoad = styled.View`
  height: 50px;
  width: 100%;
  background-color: rgba(52, 52, 52, 0);
  align-items: center;
  justify-content: center;
  margin: 0 30px 0 30px;
`;

const style = StyleSheet.create({
  linear: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Botaolinear: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});

export default style;
