import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const AdicionarRepublica = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const V_titulo = styled.View`
  width: 80%;
  justify-content: center;
  align-items: center;
`;
export const Titulo = styled.Text`
  text-align: center;
  font-family: WorkSans;
  font-size: 18px;
  color: #142850;
  background-color: #ffffff;
  margin: 20px 0 20px 0;
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
  color: #142850;
  background-color: #ffffff;
  padding: 0 5px 0 5px;
`;
export const Linha = styled.View`
  height: 50px;
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 33px;
`;
export const LinhaBotao = styled.View`
  height: 50px;
  width: 80%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 33px;
  padding: 0px 50px 0px 0px;
`;
export const Botao = styled.TouchableOpacity`
  height: 50px;
  width: 180px;
  background-color: #142850;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
export const LabelBotao = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 16px;
  color: #ffffff;
`;
export const TelaGerenciamento = styled.ScrollView`
  flex: 1;
  padding: 10px 20px 10px 20px;
`;
export const ViewNomeRepublica = styled.View`
  justify-content: center;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  background-color: #fff;
`;
export const NomeRepublica = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 18px;
  color: #142850;
`;
export const ViewContas = styled.View`
  margin-top: 10px;
  width: 100%;
`;
export const TituloEPicker = styled.View`
  width: 100%;
  height: 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  padding-left: 10px;
`;
export const TituloSession = styled.Text`
  font-family: WorkSans-SemiBold;
  font-size: 16px;
  color: #142850;
`;
export const CardsContas = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
`;
export const NomeConta = styled.Text`
  margin-left: 10px;
  font-family: WorkSans-SemiBold;
  font-size: 14px;
  color: #142850;
`;
export const ValorConta = styled.Text`
  margin-right: 10px;
  font-family: WorkSans-SemiBold;
  font-size: 14px;
  color: #142850;
`;
export const BotaoAdicionarConta = styled.TouchableOpacity`
  width: 140px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background-color: #142850;
  border-width: 1px;
  border-color: #e2e2e2;
  border-radius: 4;
`;
export const LabelBotaoADD = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #fff;
`;
export const ViewBotaoADD = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: flex-end;
  margin-bottom: 10px;
`;
export const ViewTarefas = styled.View`
  margin-top: 15px;
  width: 100%;
`;
export const ViewTitulo = styled.View`
  width: 100%;
  height: 30px;
  background-color: #fff;
  padding-left: 10px;
`;
export const ViewInputConta = styled.View`
  margin-top: 10px;
  width: 100%;
  margin-bottom: 5px;
`;
export const FieldSetRua = styled.View`
  width: 37%;
  height: 45px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const FieldSetNumero = styled.View`
  width: 20%;
  height: 45px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const Linha2 = styled.View`
  height: 40px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
export const Data = styled.View`
  width: 25%;
  height: 45px;
  border-radius: 3;
  align-items: center;
  background-color: #142850;
`;
export const EmptyContas = styled.View`
  padding: 30px;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
`;
