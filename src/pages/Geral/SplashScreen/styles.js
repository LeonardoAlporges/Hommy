// import styled from 'styled-components';
// import { StyleSheet } from 'react-native';
// import { Button } from 'native-base';
// export const Container = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;
// export const Conteudo = styled.View`
//   justify-content: center;
//   align-items: center;
//   padding-bottom: 10%;
// `;

// export const Logo = styled.View`
//   width: 150px;
//   height: 150px;
//   justify-content: center;
//   align-items: center;
// `;

// export const Imagem = styled.Image`
//   width: 150px;
//   height: 150px;
// `;
// export const Label = styled.View`
//   width: 80%;
//   height: 130px;
//   justify-content: space-around;
//   align-items: center;
// `;
// export const Titulo = styled.Text`
//   font-family: 'WorkSans';
//   color: #142850;
//   font-size: 24px;
// `;
// export const Descricao = styled.Text`
//   font-family: 'WorkSans';
//   color: #142850;
//   font-size: 18px;
//   text-align: center;
// `;

// export const Botoes = styled.View`
//   width: 80%;
//   height: 50px;
//   position: absolute;
//   bottom: 30px;
// `;

// export const Botao = styled(Button)`
//   border-radius: 6px;
//   width: 100%;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
// `;

// export const TituloBotao = styled.Text`
//   font-family: 'WorkSans';
//   color: #ffffff;
//   font-size: 20px;
// `;

// export const FundoModal = styled.View`
//   height: 100%;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   background-color: #00000080;
// `;

// export const Spin = styled.View`
//   background-color: #00000080;
//   justify-content: center;
//   align-items: center;
//   height: 50;
//   margin: 0px 30px 0px 30px;
//   align-items: center;
// `;

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  posicao: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  imagem: { width: 150, height: 150 },
  img: { width: 150, height: 150 },
  texto: {
    width: '80%',
    height: 130,

    justifyContent: 'space-around',
    alignItems: 'center',
  },
  descricao: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#142850',
    fontSize: 18,
  },
  titulo: {
    fontFamily: 'Roboto Bold',
    color: '#142850',
    fontSize: 24,
  },
  V_Botoes: {
    width: '80%',
    height: 50,
    position: 'absolute',
    bottom: 30,
  },
  botao: {
    borderRadius: 6,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelButon: {
    fontFamily: 'Roboto Bold',
    color: '#ffffff',
    fontSize: 20,
  },

  ViewFundo: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
  ViewModal: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 30,
    alignItems: 'center',
  },
});

export default style;
