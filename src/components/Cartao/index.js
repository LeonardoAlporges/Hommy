import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import styles from './styles';
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
} from './styles';
export function Cartao({ navigation, data }) {
  useEffect(() => {
    preencherUserLogado();
  }, []);
  const [usuarioLogado, setUsuarioLogado] = useState();

  async function preencherUserLogado() {
    await AsyncStorage.getItem('user').then(value => {
      setUsuarioLogado(JSON.parse(value));
    });
  }

  async function onClickCard() {
    await preencherUserLogado();
    const dados = data;
    var desativarBotaoAgenda = false;

    if (dados.userEmail == usuarioLogado.email) {
      desativarBotaoAgenda = true;
    }
    navigation.navigate('Detalhes', {
      dadosRepublica: dados,
      desativarBotaoAgenda
    });
  }

  return (
    <Container underlayColor="#fff" onPress={() => onClickCard()} style={styles.touch_card}>
      <View style={styles.V_cartao}>
        <ViewImagem>
          <Imagem source={{ uri: data.imagem1 }} />
        </ViewImagem>
        <ViewDados>
          <ViewTitulo>
            <Titulo numberOfLines={1}>{data.nomeRepublica}</Titulo>
          </ViewTitulo>
          <ViewDescricao>
            <Descricao numberOfLines={2}>{data.descricao}</Descricao>
          </ViewDescricao>
          <ViewComIcones>
            <ViewValor>
              <Icon style={styles.icones} name="wallet" />
              <Label>R$ {data.valorAluguel}</Label>
            </ViewValor>
            <ViewVagas>
              <Icon style={styles.icones} name="home" />
              <Label>{data.numVagas} Vaga</Label>
            </ViewVagas>
          </ViewComIcones>
        </ViewDados>
      </View>
    </Container>
  );
}
export default withNavigation(Cartao);
