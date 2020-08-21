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
  margin: 2% 0 2% 0;

  flex-direction: row;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

export const Invalido = styled.View`
  width: 100%;
  height: 20px;
`;
export const RecuperaSenha = styled.View`
  flex-direction: row;
  width: 80%;
  height: 20px;
  margin-bottom: 5%;
`;
export const LabelEsqueciSenha = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #2e2e2e;
  color: #022250;
`;

export const BotesPrincipal = styled.View`
  width: 80%;
  align-items: center;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
`;

export const BotaoLogin = styled.TouchableOpacity`
  width: 30%;
  height: 50px;
  border-radius: 4px;
`;
export const BotaoCadastro = styled(Button)`
  width: 30%;
  height: 50px;
  border-width: 1px;
  border-style: solid;
  border-color: #f2f2f2;
  justify-content: space-around;
  border-radius: 4px;
`;
export const LabelLogin = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #ffffff;
`;
export const LabelCadastro = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #022250;
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
  },
  txt_Titulo: {
    fontFamily: 'Roboto Bold',
    fontSize: 35,
    color: '#142850'
  },

  txt_FormaDeLogin: {
    fontFamily: 'Roboto Light',
    fontSize: 20,
    marginTop: '2%'
  },

  view_OutrosLogin: {
    height: '8%',
    marginTop: '2%',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  icons_OutroLogin: {
    fontSize: 40,
    color: '#142850'
  },

  view_CamposLogin: {
    height: '8%',
    width: '80%',
    marginTop: '5%',
    backgroundColor: 'red'
  },

  icons_CamposLogin: {
    fontSize: 35,
    margin: 5,
    color: '#142850'
  },

  esqueciSenha: {
    color: '#000',
    marginTop: '2%'
  },

  V_botoes: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 150,
    width: '50%',
    marginTop: 30,
    alignItems: 'center'
  },
  V_cadastrar: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: '7%'
  },
  touchTx: {},
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botao_login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#142850'
  },
  imgStyle: {
    width: 70,
    height: 70,
    marginTop: '5%'
  },
  labelBotao: {
    fontFamily: 'Roboto Bold',
    fontSize: 20,
    color: '#ffffff'
  },
  botao_cadastro: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    borderRadius: 5,
    backgroundColor: '#00909e'
  },
  txtError: {
    fontSize: 10,
    color: 'red'
  },
  iconStyle: {
    fontSize: 25
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

export default style;
