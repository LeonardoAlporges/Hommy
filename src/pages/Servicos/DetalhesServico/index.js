import React, { Component, useState } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
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
  Imagem
} from './styles';

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import HeaderBack from '../../../components/CustomHeader';

export default function DetalhesServicos({ navigation }) {
  const [contadorImagem, setContadorImagem] = useState(0);
  const [servico, setServicos] = useState(navigation.state.params.dados);

  function AbrirTelefone() {
    Linking.openURL(`tel:${servico.tel}`);
  }
  function navegar() {
    navigation.goBack(null);
  }

  function renderDotIndicator() {
    return (
      <PagerDotIndicator
        dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        selectedDotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        pageCount={3}
      />
    );
  }

  return (
    <Container>
      <HeaderBack title="Detalhes Serviço" onNavigation={() => navegar()} />
      <ScrollView>
        <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
          {servico.image != '' && servico.image != null && (
            <View key="1">
              <Imagem source={{ uri: servico.image }} />
            </View>
          )}
          {servico.image != '' && servico.image != null && (
            <View key="2">
              <Imagem source={{ uri: servico.image }} />
            </View>
          )}
          {servico.image != '' && servico.image != null && (
            <View key="3">
              <Imagem source={{ uri: servico.image }} />
            </View>
          )}
        </IndicatorViewPager>
        <ViewDoTitulo>
          <Titulo>{servico.titulo}</Titulo>
        </ViewDoTitulo>
        <ViewDescricao>
          <Descricao>{servico.desc}</Descricao>
        </ViewDescricao>
        <BarraSeparacao></BarraSeparacao>

        <ViewSubTitle>
          <SubTitle>Tipo de serviço prestado</SubTitle>
        </ViewSubTitle>
        <LinhaUnica>
          <ItemUnico>
            <ViewIcone>
              <Icon name="clock" style={{ fontSize: 25, color: '#142850' }} />
            </ViewIcone>
            <LabelItem>Eletricista</LabelItem>
          </ItemUnico>
        </LinhaUnica>
        <ViewSubTitle>
          <SubTitle>Contato</SubTitle>
        </ViewSubTitle>
        <LinhaDupla>
          <ItemDuplo>
            <ViewIcone>
              <Icon name="phone" style={{ fontSize: 25, color: '#142850' }} />
            </ViewIcone>
            <LabelItem>{servico.telefone}</LabelItem>
          </ItemDuplo>
          <ItemDuplo>
            <ViewIcone>
              <Icon name="envelope" style={{ fontSize: 25, color: '#142850' }} />
            </ViewIcone>
            <LabelItem>{!servico.email && 'leo@gmail.com'}</LabelItem>
          </ItemDuplo>
        </LinhaDupla>
        <ViewSubTitle>
          <SubTitle>Horarios de atendimento</SubTitle>
        </ViewSubTitle>
        <LinhaUnica>
          <ItemUnico>
            <ViewIcone>
              <Icon name="clock" style={{ fontSize: 25, color: '#142850' }} />
            </ViewIcone>
            <LabelItem>Seguda a Segunda</LabelItem>
          </ItemUnico>
        </LinhaUnica>
        <ViewBotao>
          <BotaoContato
            onPress={() => {
              AbrirTelefone();
            }}
          >
            <ViewIcone>
              <Icon name="phone" style={{ fontSize: 25, color: '#ffffff' }} />
            </ViewIcone>

            <LabelBotao>Entrar em Contato</LabelBotao>
          </BotaoContato>
        </ViewBotao>
      </ScrollView>
    </Container>
  );
}
