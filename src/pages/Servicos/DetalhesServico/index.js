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

import HeaderBack from '../../../components/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DetalhesServicos({ navigation }) {
  const [contadorImagem, setContadorImagem] = useState(0);
  const [servico, setServicos] = useState(navigation.state.params.dados);

  function AbrirTelefone() {
    Linking.openURL(`tel:${servico.telefone}`);
  }
  function AbrirInstagram() {
    Linking.openURL(`http://instagram.com/_u/${servico.redeSocial}`);
  }
  function AbrirEmail() {
    Linking.openURL(`mailto:${servico.userEmail}`);
  }
  function navegar() {
    navigation.goBack(null);
  }

  useEffect(() => {
    if (servico.image1 != '' && servico.image1 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (servico.image2 != '' && servico.image2 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (servico.image3 != '' && servico.image3 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
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
      <HeaderBack title="Detalhes Serviço" onNavigation={() => navegar()} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
        {servico.image1 != '' && servico.image1 != null && (
          <View key="1">
            <Imagem source={{ uri: servico.image1 }} />
          </View>
        )}
        {servico.image2 != '' && servico.image2 != null && (
          <View key="2">
            <Imagem source={{ uri: servico.image2 }} />
          </View>
        )}
        {servico.image3 != '' && servico.image3 != null && (
          <View key="3">
            <Imagem source={{ uri: servico.image3 }} />
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
            <Icon name="screwdriver" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>{servico.tipo}</LabelItem>
        </ItemUnico>
      </LinhaUnica>

      <ViewSubTitle>
        <SubTitle>Endereço</SubTitle>
      </ViewSubTitle>
      <LinhaUnica>
        <ItemUnico>
          <ViewIcone>
            <Icon name="home-outline" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>
            {servico.rua}, {servico.numero} - {servico.bairro}
          </LabelItem>
        </ItemUnico>
      </LinhaUnica>

      <ViewSubTitle>
        <SubTitle>Contato</SubTitle>
      </ViewSubTitle>
      <LinhaUnica>
        <ItemUnicoLink
          onPress={() => {
            AbrirEmail();
          }}
        >
          <ViewIcone>
            <Icon name="email-outline" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>{servico.userEmail}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>
      <LinhaUnica>
        <ItemUnicoLink
          onPress={() => {
            AbrirInstagram();
          }}
        >
          <ViewIcone>
            <Icon name="instagram" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>

          <LabelItem>{servico.redeSocial}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>
      <ViewSubTitle>
        <SubTitle>Horarios de atendimento</SubTitle>
      </ViewSubTitle>
      <LinhaUnica>
        <ItemUnico>
          <ViewIcone>
            <Icon name="clock-outline" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>
            De {servico.horario.inicio} às {servico.horario.fim} - {servico.dia.inicio} até {servico.dia.fim}
          </LabelItem>
        </ItemUnico>
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
