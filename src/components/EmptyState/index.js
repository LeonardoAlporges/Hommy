import React from 'react';
import { Container, Imagem, ViewTitulo, Titulo, ViewMensagem, Mensagem } from './styles';

export default function EmptyState(props) {
  return (
    <Container>
      <Imagem source={require('../../assets/Img/Empty.png')} />
      <ViewTitulo>
        <Titulo>{props.titulo}</Titulo>
      </ViewTitulo>
      <ViewMensagem>
        <Mensagem>{props.mensagem}</Mensagem>
      </ViewMensagem>
    </Container>
  );
}
