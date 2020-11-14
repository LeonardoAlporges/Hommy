import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ViewTitulo = styled.View`
margin-top: '3%',
width: '100%',
padding-left: '6%',
margin-bottom: 10,
`;

export const Titulo = styled.Text`
color: '#142850',
font-family: 'WorkSans-bold',
font-size: 24,
font-weight: 'bold',
`;

export const ViewDescricao = styled.View`
width: '88%',
margin-left: '6%',
margin-right: '6%',
margin-bottom: 10,
`;

export const Descricao = styled.Text`
color: '#142850',
font-family: 'WorkSans',
font-size: 18,
`;

export const Barra = styled.View`
width: '88%',
margin-left: '6%',
margin-right: '6%',
border-bottom-width: 1,
border-bottom-color: '#142850',
`;

export const ViewCaracteristicaTitle = styled.View`
height: 30,
margin-top: '4%',
width: '100%',
padding-left: '10%',
`;

export const CaracteristicaTitle = styled.Text`
font-family: 'WorkSans',
font-size: 22,
font-weight: '600',
color: '#142850',
`;

export const ViewTipo = styled.View`
height: 30,
margin-top: '2%',
width: '100%',
padding-left: '10%',
`;

export const Tipo = styled.Text`
font-family: 'WorkSans',
font-size: 20
`;

export const ViewCaracteristicaItens = styled.View`
display: 'flex',
flex-direction: 'row',
justify-content: 'space-around',
height: 40,
margin-top: '2%',
width: '85%',
margin-left: '10%',
`;

export const Item2 = styled.View`
align-items: 'center',
justify-content: 'space-around',
display: 'flex',
flex-direction: 'row',
height: 40,
width: '38%',
padding-left: '2%',
`;

export const TextLabel = styled.Text`
padding-left: 20,
color: '#00909e',
text-align: 'left',
font-size: 16,
font-family: 'WorkSans',
font-weight: '600',
`;

export const TextLabelGenero = styled.Text`
color: '#00909e',
font-size: 16,
font-family: 'WorkSans',
font-weight: '600',
margin-left: 30,
width: 100,
`;

export const ViewInterna = styled.View`
align-items: 'center',
justify-content: 'flex-start',
display: 'flex',
flex-direction: 'row',
height: 40,
width: '90%',
padding-left: '5%',
`;

export const ViewVagas = styled.View`
display: 'flex',
flex-direction: 'row',
height: 40,
margin-top: '1%',
width: '85%',
margin-left: '10%',
margin-right: '10%',
`;

export const ViewBotao = styled.View`
margin-top: 20,
margin-bottom: 20,
height: 60,
align-items: 'center',
justify-content: 'center',
flex-direction: 'row',
justify-content: 'space-around',
`;

export const TextoAgendamento = styled.Text`
color: '#FFFFFF',
margin-left: 15,
`;




const estilo = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  icone: {
    justifyContent: 'flex-start',
    fontSize: 28,
    fontFamily: 'WorkSans',
    color: '#142850',
    marginRight: '5%',
    fontWeight: '600',
  },
  iconeAnimal: {
    justifyContent: 'flex-start',
    fontSize: 28,
    fontFamily: 'WorkSans',
    color: '#142850',
    marginRight: '7%',
    fontWeight: '600',
  },
  botao: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtWhatsapp: {
    color: '#FFFFFF',
    marginLeft: 15,
  },
});

export default estilo;
