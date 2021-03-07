import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import estilo from './styles';
import {
  Container,
  ViewDoTitulo,
  Titulo,
  ViewDescricao,
  Descricao,
  BarraSeparacao,
  LinhaDupla,
  ItemDuplo,
  ViewIcone,
  LabelItem,
  LinhaUnica,
  ItemUnico,
  ViewSubTitle,
  SubTitle,
  BotaoContato,
  ViewBotao,
  LabelBotao,
  Imagem,
  ItemUnicoLink,
  ItemDuploLink
} from './styles';

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import HeaderBack from '../../../../components/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetalhesProduto({ navigation }) {
  const [contadorImagem, setContadorImagem] = useState(0);
  const [produto, setServicos] = useState(navigation.state.params.dados);

  function AbrirTelefone() {
    Linking.openURL(`tel:${produto.telefone}`);
  }

  function navegar() {
    navigation.goBack(null);
  }

  useEffect(() => {
    if (produto.imagem1 != '' && produto.imagem1 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (produto.imagem2 != '' && produto.imagem2 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (produto.imagem3 != '' && produto.imagem3 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }

    produto.valor = parseFloat(produto.valor).toFixed(2);
  }, []);

  function renderDotIndicator() {
    return (
      <PagerDotIndicator
        dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        selectedDotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        pageCount={contadorImagem}
      />
    );
  }

  return (
    <ScrollView>
      <HeaderBack title="Detalhes do Produto" onNavigation={() => navegar()} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
        {produto.imagem1 != '' && produto.imagem1 != null && (
          <View key="1">
            <Imagem source={{ uri: produto.imagem1 }} />
          </View>
        )}
        {produto.imagem2 != '' && produto.imagem2 != null && (
          <View key="2">
            <Imagem source={{ uri: produto.imagem2 }} />
          </View>
        )}
        {produto.imagem3 != '' && produto.imagem3 != null && (
          <View key="3">
            <Imagem source={{ uri: produto.imagem3 }} />
          </View>
        )}
      </IndicatorViewPager>
      <ViewDoTitulo>
        <Titulo>{produto.titulo}</Titulo>
      </ViewDoTitulo>
      <ViewDescricao>
        <Descricao>{produto.descricao}</Descricao>
      </ViewDescricao>
      <BarraSeparacao></BarraSeparacao>

      <ViewSubTitle>
        <SubTitle>Valor</SubTitle>
      </ViewSubTitle>
      <LinhaUnica>
        <ItemUnico>
          <ViewIcone>
            <Icon name="screwdriver" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>{produto.valor}</LabelItem>
        </ItemUnico>
      </LinhaUnica>

      <ViewSubTitle>
        <SubTitle>Contato</SubTitle>
      </ViewSubTitle>

      <LinhaUnica>
        <ItemUnicoLink>
          <ViewIcone>
            <Icon name="phone-outline" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>

          <LabelItem>{produto.telefone}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>

      <ViewBotao>
        <BotaoContato
          onPress={() => {
            AbrirTelefone();
          }}
        >
          <ViewIcone>
            <Icon name="phone-outline" style={{ fontSize: 25, color: '#ffffff', textAlign: 'center' }} />
          </ViewIcone>

          <LabelBotao>Entrar em Contato</LabelBotao>
        </BotaoContato>
      </ViewBotao>
    </ScrollView>
  );
}
