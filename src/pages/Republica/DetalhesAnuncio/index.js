import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import HeaderBack from '../../../components/CustomHeader';

import { connect } from 'react-redux';

import estilo from './style';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import {
  ViewTitulo,
  Titulo,
  ViewDescricao,
  Descricao,
  Barra,
  ViewCaracteristicaTitle,
  CaracteristicaTitle,
  ViewTipo,
  Tipo,
  ViewCaracteristicaItens,
  Item2,
  TextLabel,
  TextLabelGenero,
  ViewInterna,
  ViewVagas,
  ViewBotao,
  TextoAgendamento
} from './style';
export default function DetalhesAnuncio({ navigation }) {
  const [usuarioJaInteressado, setUsuarioJaInteressado] = useState(navigation.state.params.interessado);
  const [ocutarBotaoAgendamento, setOcutarBotaoAgendamento] = useState(navigation.state.params.desativarBotaoAgenda);
  const [republica, setRepublica] = useState(navigation.state.params.dadosRepublica);
  const [contadorImagem, setContadorImagem] = useState(0);

  function irParaAgendamento() {
    navigation.navigate('Agendar', {
      data: republica,
    });
  }

  useEffect(() => {
    if (republica.imagem1 != '' && republica.imagem1 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    if (republica.imagem2 != '' && republica.imagem2 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    if (republica.imagem3 != '' && republica.imagem3 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    console.log(contadorImagem);
  },[]);
  
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
      <HeaderBack ajuda title={republica.nomeRepublica} onNavigation={() => navigation.goBack(null)} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()} >
        {(republica.imagem1 != '' && republica.imagem1 != null) && (
          <View key="1">
            <Image source={{ uri: republica.imagem1 }} style={estilo.image} />
          </View>
        )}
        {(republica.imagem2 != '' && republica.imagem2 != null) && (
          <View key="2">
            <Image source={{ uri: republica.imagem2 }} style={estilo.image} />
          </View>
        )}
        {(republica.imagem3 != '' && republica.imagem3 != null) && (
          <View key="3">
            <Image source={{ uri: republica.imagem3 }} style={estilo.image} />
          </View>
        )}
      </IndicatorViewPager>

      <ViewTitulo>
        <Titulo>{republica.nomeRepublica}</Titulo>
      </ViewTitulo>

      <ViewDescricao>
        <Descricao>{republica.descricao}</Descricao>
      </ViewDescricao>
      <Barra/>

      <ViewCaracteristicaTitle>
        <CaracteristicaTitle>Características</CaracteristicaTitle>
      </ViewCaracteristicaTitle>
      <ViewTipo>
        <Tipo>Tipo</Tipo>
      </ViewTipo>
      <ViewCaracteristicaItens>
        <Item2>
          <Icon name="home" style={estilo.icone} />
          <TextLabel>{republica.imovel}</TextLabel>
        </Item2>
        <Item2>
          <Icon name="people" style={estilo.icone} />
          <TextLabel>{republica.genero}</TextLabel>
        </Item2>
      </ViewCaracteristicaItens>
      <ViewTipo>
        <Tipo>Mobília do quarto</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="drawer" style={estilo.icone} />
          <TextLabel>{republica.acomodacaoQuarto}</TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Mobília e eletrodomésticos</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="screen-desktop" style={estilo.icone} />
          <TextLabel>{republica.acomodacaoRepublica}</TextLabel>
        </ViewInterna>
      </ViewVagas>

      <ViewTipo>
        <Tipo>Disponibilidade</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="user-follow" style={estilo.icone} />
          <TextLabel>{republica.numVagas} Vaga(s)</TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Endereço</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="location-pin" style={estilo.icone} />
          <TextLabel>
            {republica.rua}, {republica.bairro}, Nº
            {republica.numeroCasa}
          </TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Representante</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="user" style={estilo.icone} />
          <TextLabel>{republica.representante}</TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Valor médio das contas</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon name="chart" style={estilo.icone} />
          <TextLabel>R$ {republica.valorContas}</TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Valor Aluguel</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon2 name="dollar-sign" style={estilo.icone} />
          <TextLabel>R$ {republica.valorAluguel}</TextLabel>
        </ViewInterna>
      </ViewVagas>
      <ViewTipo>
        <Tipo>Aceita animais?</Tipo>
      </ViewTipo>
      <ViewVagas>
        <ViewInterna>
          <Icon4 name="md-paw" style={estilo.iconeAnimal} />
          <TextLabel>{republica.animal}</TextLabel>
        </ViewInterna>
      </ViewVagas>
      {!usuarioJaInteressado && !ocutarBotaoAgendamento ? (
        <ViewBotao>
          <Button
            style={estilo.botao}
            onPress={() => {
              irParaAgendamento();
            }}
          >
            <TextoAgendamento>Agendar uma visita</TextoAgendamento>
          </Button>
        </ViewBotao>
      ) : (
        <View style={{ height: 30 }} />
      )}
    </ScrollView>
  );
}
