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

export function CartaoProdutos(props) {
  function onClickCard() {
    const dados = props.dados;
    props.navigation.navigate('DetalhesProduto', { dados });
  }

  return (
    <Container underlayColor="#fff" onPress={onClickCard} style={styles.touch_card}>
      <View style={styles.V_cartao}>
        <ViewImagem>
          <Imagem source={{ uri: props.dados.imagem1 }} />
        </ViewImagem>
        <ViewDados>
          <ViewTitulo>
            <Titulo numberOfLines={1}>{props.dados.titulo}</Titulo>
          </ViewTitulo>
          <ViewDescricao>
            <Descricao numberOfLines={2}>{props.dados.descricao}</Descricao>
          </ViewDescricao>
          <ViewComIcones>
            <ViewValor>
              <Icon style={styles.icones} name="wallet" />
              <Label>{props.dados.valor}</Label>
            </ViewValor>
            <ViewVagas>
              <Icon style={styles.icones} name="clock" />
              <Label>10/01</Label>
            </ViewVagas>
          </ViewComIcones>
        </ViewDados>
      </View>
    </Container>
  );
}

export default withNavigation(CartaoProdutos);
