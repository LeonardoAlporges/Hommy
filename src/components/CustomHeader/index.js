import React from 'react';
import { Container, ViewIcon, Icone, ViewTitulo, Titulo } from './styles';

export default function HeaderBack(props) {
  return (
    <Container>
      <ViewIcon
        onPress={async () => {
          props.onNavigation();
        }}
      >
        <Icone name="arrow-left" />
      </ViewIcon>
      <ViewTitulo>
        <Titulo>{props.title}</Titulo>
      </ViewTitulo>
    </Container>
  );
}
