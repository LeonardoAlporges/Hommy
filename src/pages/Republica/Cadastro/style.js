import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

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
export const FieldSetRua = styled.View`
  width: 60%;
  height: 50px;
  border-radius: 3;
  border-width: 1px;
  align-items: center;
  border-color: #dcdcdc;
  padding-top: 5px;
`;
export const FieldSetNumero = styled.View`
  width: 35%;
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
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 33px;
`;
export const AreaFotos = styled.View`
  height: 130px;
  width: 100%;
  justify-content: space-between;
  margin-top: 33px;
`;
export const LabelFotos = styled.Text`
  height: 30px;
  width: 100%;
  font-family: WorkSans;
  font-size: 16px;
  color: #022250;
`;
export const DivisaoFotos = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const estilo = StyleSheet.create({
  V_header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 2,
    borderBottomColor: '#00909e',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tabs_TextStyle: {
    color: '#142850',
    fontFamily: 'WorkSans-SemiBold',
    fontSize: 12
  },
  tabs_ActiveTextStyle: {
    color: '#142850',
    fontSize: 12,
    fontFamily: 'WorkSans-Bold'
  },
  tabs_ActiveTabs: {
    backgroundColor: '#fff'
  },
  tabs_style: {
    backgroundColor: '#fff'
  },
  textoValue: {
    color: '#2e2e2e',
    fontFamily: 'WorkSans',
    fontWeight: '600',
    fontSize: 14
  },
  campos: {
    marginTop: 20
  },
  camposAmb: {
    marginTop: 50
  },
  V_carregando: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%'
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  botao_send: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 6,
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
  iconHeader: {
    fontSize: 26,
    color: '#142850',
    marginLeft: '5%'
  },
  txtLabel: {
    fontFamily: 'WorkSans',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#586880'
  },
  title: {
    fontSize: 24,
    fontFamily: 'WorkSans',
    fontWeight: 'bold',
    color: '#142850'
  },
  V_Conteudo: {
    width: '100%',
    height: '100%',
    marginBottom: 60,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  V_Conteudo2: {
    width: '100%',
    height: 550,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  ruaNum: {
    display: 'flex',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  Valores: {
    display: 'flex',
    height: 30,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#f8f2',
    justifyContent: 'space-between'
  },
  campos2: {
    marginTop: 20
  },
  place: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#000000'
  },
  enviar: {
    alignItems: 'center',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  btnProximo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#142850',
    borderRadius: 6
  },
  iconeBtn: {
    margin: 0,
    color: '#68c0e8'
  },
  botaoEnv: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',
    color: '#142850'
  },
  V_modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textRepublica: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#687368'
  },
  textError: {
    fontFamily: 'WorkSans',
    textAlign: 'left',
    fontSize: 10,
    color: 'red'
  },
  V_error: {
    height: 12,
    width: '100%',
    textAlign: 'left'
  },
  V_ImageLabel: {
    width: '100%',
    height: 20,
    marginBottom: 18
  },
  V_ImageEmpty: {
    justifyContent: 'space-around',
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row'
  },
  V_ImageFull: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2e2e2e',
    padding: 10,
    opacity: 1
  },
  V_ImageFullEmpty: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2e2e2e',
    padding: 10,
    opacity: 0.3
  },
  ImageEmpty: {
    width: 50,
    height: 50,
    borderRadius: 3,
    opacity: 0.7
  },
  ImageFull: {
    width: 100,
    height: 100,
    borderRadius: 3
  },
  V_BotaoSend: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  V_BotaoImg: {
    marginTop: 20,
    width: '100%',
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  V_Caracteristicas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  V_Campos: {
    width: '43%'
  },
  V_btnProx: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%'
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
