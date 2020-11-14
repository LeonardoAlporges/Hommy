import styled from 'styled-components/native';
import { Button } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
export const HeaderPrincipal = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  background-color: #fff;
`;
export const IconeMenu = styled.TouchableOpacity`
  position: absolute;
  left: 15;
  color: #142850;
`;
export const Icone = styled(Icon)`
  font-size: 30px;
  color: #142850;
`;
export const V_titulo = styled.View`
  justify-content: center;
  align-items: center;
`;
export const Titulo = styled.Text`
  font-family: WorkSans-Bold;
  font-size: 26px;
  color: #142850;
`;
const Estilos = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },

  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: '2%'
  }
});

export default Estilos;
