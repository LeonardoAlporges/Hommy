import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'native-base';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const Imagem = styled.Image`
  width: 120px;
  height: 120px;
  margin: 0px;
`;
export const BotaoEnviarFoto = styled.View`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10%;
`;
export const BotaoFoto = styled(Button)`
  width: 130;
  height: 45;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  background-color: #d9e0e6;
`;
export const LabelBotaoFoto = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 14px;
  color: #263b50;
`;
export const CampoLogin = styled.View`
  width: 80%;
  height: 50px;
  margin-bottom: 10px;
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

export const AreaBotao = styled.View`
  margin: 10% 0 5% 0;
  height: 40px;
  width: 130px;
`;
export const BotaoCadastro = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  border-radius: 4px;
`;
export const LabelBotao = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 16px;
  color: #ffffff;
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

const estilo = StyleSheet.create({
  Botaolinear: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 4
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30
  },

  view_CamposLogin: {
    height: 40,
    width: 330
  },

  icons_CamposLogin: {
    fontSize: 25,
    margin: 5,
    color: '#142850'
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%'
  },
  icon_send: {
    fontSize: 25,
    margin: 5,
    color: '#142850'
  },
  view_BotaoEntar: {
    marginTop: '10%',
    marginBottom: '5%',
    height: 60,
    width: 150
  },

  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    backgroundColor: '#142850',
    borderRadius: 8
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#142850',
    flexDirection: 'row'
  },
  txtErro: {
    fontFamily: 'Roboto-light',
    fontSize: 10,
    color: 'red'
  },
  V_ErroSem: {
    height: 15
  },
  V_Erro: {
    marginBottom: 20,
    width: '80%',
    height: 15
  },
  imagemStyle: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  V_Btn: {},
  textoLabel: {
    fontFamily: 'Roboto Bold',
    fontSize: 13,
    color: '#ffffff'
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
  },
  labelInput: {
    fontSize: 14,
    fontFamily: 'WorkSans',
    fontWeight: '500',
    marginLeft: '2%',
    width: '88%',
    height: 40,
    color: '#263b50'
  }
});

export default estilo;
