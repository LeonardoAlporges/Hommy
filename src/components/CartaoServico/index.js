import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import styles from './style';
import {
  Container,
  ViewImagem,
  Imagem,
  ViewTitulo,
  Titulo,
  ViewDados,
  ViewDescricao,
  Descricao,
  ViewValor,
  ViewVagas,
  Label,
  ViewComIcones
} from './style';

export function CartaoServico(props) {
  function onClickCard() {
    const dados = props.dados;
    console.log('leo', props);
    props.navigation.navigate('DetalhesServicos', { dados });
  }

  return (
    <Container underlayColor="#fff" onPress={onClickCard} style={styles.touch_card}>
      <View style={styles.V_cartao}>
        <ViewImagem>
          <Imagem source={{ uri: props.dados.image1 }} />
        </ViewImagem>
        <ViewDados>
          <ViewTitulo>
            <Titulo numberOfLines={1}>{props.dados.titulo}</Titulo>
          </ViewTitulo>
          <ViewDescricao>
            <Descricao numberOfLines={2}>{props.dados.desc}</Descricao>
          </ViewDescricao>
          <ViewComIcones>
            <ViewValor>
              <Icon style={styles.icones} name="star" />
              <Label>{props.dados.nota}</Label>
            </ViewValor>
            <ViewVagas>
              <Icon style={styles.icones} name="clock" />
              <Label>{props.dados.dia.inicio} à {props.dados.dia.fim}</Label>
            </ViewVagas>
          </ViewComIcones>
        </ViewDados>
      </View>
    </Container>
  );
}

export default withNavigation(CartaoServico);
