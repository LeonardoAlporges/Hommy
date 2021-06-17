import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import moment from 'moment';
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

  const [valor, setValor] = useState();
  const [data, setDataViagem] = useState(moment(props.dados.data).format('DD/MM'));


  useEffect(() => {
    setValor(parseFloat(props.dados.valor).toFixed(2));
    props.dados.valor = parseFloat(props.dados.valor).toFixed(2);
  }, []);

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
              <Label>{valor}</Label>
            </ViewValor>
            <ViewVagas>
              <Icon style={styles.icones} name="clock" />
              <Label>{data}</Label>
            </ViewVagas>
          </ViewComIcones>
        </ViewDados>
      </View>
    </Container>
  );
}

export default withNavigation(CartaoProdutos);
