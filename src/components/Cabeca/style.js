import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: #fff;
  align-items: center;
`;
export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
`;
export const IconVoltar = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 50px;
`;
export const TituloHeader = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 20px;
  color: #022250;
`;
export const ViewDados = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
`;
export const ViewFotoPerfil = styled.View`
  margin-top: 10px;
  align-items: center;
  padding: 5px;
  width: 110px;
  height: 110px;
`;
export const ViewNome = styled.View`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 22px;
`;
export const Nome = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 16px;
  color: #022250;
`;
export const ViewNota = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 150px;
  height: 22px;
`;
export const Menu = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const Linha = styled.View`
  margin: 10px 0 10px 0;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: space-around;
  width: 79%;
  height: 90px;
`;
export const Card = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 90px;
  border-radius: 5;
`;
export const ViewIcons = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
export const ViewLabel = styled.View`
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 22px;
`;
export const Label = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #212c50;
`;
export const CardAmigos = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 100px;
  border-radius: 5;
`;

export const ViewLabelAmigos = styled.View`
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 18px;
`;
export const BotesLogin = styled.View`
  margin-top: 10px;
  width: 100%;
  align-items: center;
  height: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

export const Botao = styled(Button)`
  width: 30%;
  height: 20px;
  background-color: #f8f8f8;
  justify-content: space-around;
  border-radius: 4px;
`;

export const LabelBotoes = styled.Text`
  font-family: WorkSans;
  font-size: 14px;
  color: #022250;
`;

export const SairdoApp = styled.TouchableOpacity`
  background-color: #fff;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 40px;
  border-radius: 5;
`;
export const LabelBotaoSair = styled.Text`
  font-family: WorkSans;
  font-size: 16px;
  color: #022250;
`;

const Estilos = StyleSheet.create({
  card: {
    //backgroundColor: 'white',
    // padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 140,
    // height: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  ViewCabeca: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff'
  },
  touch_Icon: {
    position: 'absolute',
    left: 15,
    color: '#1f242e'
  },
  touch_Fake: {
    position: 'absolute',
    right: 10
  },
  Titulo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    fontFamily: 'WorkSans-Bold',
    fontSize: 26,
    color: '#212c50'
  },
  icon2: {
    color: '#212c50',
    fontSize: 30
  },
  bgModal: {
    backgroundColor: '#f8f8f8',
    flex: 1
  },
  modal: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderRadius: 5,
    height: 100,
    flex: 1
  },
  voltar: {
    height: 30,
    width: '100%',
    marginTop: '3%',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  iconModal: {
    marginTop: 8,
    fontSize: 20,
    color: '#142850'
  },
  fotodeperfil: {
    width: 120,
    height: 130
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: '2%'
  },
  editFoto: {
    position: 'absolute',
    borderRadius: 10,
    top: 90,
    left: 85,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142850',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  viewNome: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNome: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'WorkSans-Bold',
    color: '#142850'
  },
  textCPF: {
    fontSize: 14,
    fontFamily: 'WorkSans',
    color: '#00909e'
  },
  viewDivisor: {
    marginTop: '2%',
    width: '88%',
    marginLeft: '6%',
    marginRight: '6%',
    borderBottomWidth: 1,
    borderBottomColor: '#142850'
  },
  viewBotoes: {
    color: '#142850',
    width: '100%',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    height: 350,
    marginTop: '10%',
    paddingBottom: '10%'
  },
  botoes: {
    width: '100%',
    height: 50,
    backgroundColor: '#142850',
    justifyContent: 'flex-start',
    borderRadius: 5,
    paddingLeft: '6%',
    color: '#dae1e7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20
  },
  iconBotoes: {
    fontSize: 18,
    color: '#dae1e7'
  },
  iconBotoesArrow: {
    paddingLeft: '2%',
    fontSize: 18,
    color: '#dae1e7'
  },
  textBotoes: {
    width: '75%',
    fontSize: 18,
    fontFamily: 'WorkSans-Bold',

    marginLeft: '6%',
    color: '#ffff'
  },
  viewFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    width: '70%',
    color: '#fff'
  }
});

export default Estilos;
