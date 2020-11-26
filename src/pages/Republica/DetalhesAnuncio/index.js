import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import HeaderBack from '../../../components/CustomHeader';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import {
  Imagem,
  ViewTitulo,
  Titulo,
  ViewDescricao,
  Descricao,
  Card,
  Linha,
  CardDeInformacao,
  IconesInformacao,
  Icone,
  Informacaoes,
  TipoInformacao,
  Informacao,
  Categoria,
  Botao,
  Label,
  ViewBotao
} from './style';

export default function DetalhesAnuncio({ navigation }) {
  const [usuarioJaInteressado, setUsuarioJaInteressado] = useState(navigation.state.params.interessado);
  const [ocutarBotaoAgendamento, setOcutarBotaoAgendamento] = useState(navigation.state.params.desativarBotaoAgenda);
  const [republica, setRepublica] = useState(navigation.state.params.dadosRepublica);
  const [contadorImagem, setContadorImagem] = useState(0);

  function irParaAgendamento() {
    navigation.navigate('Agendar', {
      data: republica
    });
  }

  useEffect(() => {
    if (republica.imagem1 != '' && republica.imagem1 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (republica.imagem2 != '' && republica.imagem2 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    if (republica.imagem3 != '' && republica.imagem3 != null) {
      setContadorImagem(contadorImagem => contadorImagem + 1);
    }
    console.log(contadorImagem);
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
    <ScrollView style={{ backgroundColor: '#F7F8F9' }}>
      <HeaderBack ajuda title={republica.nomeRepublica} onNavigation={() => navigation.goBack(null)} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
        {republica.imagem1 != '' && republica.imagem1 != null && (
          <View key="1">
            <Imagem source={{ uri: republica.imagem1 }} />
          </View>
        )}
        {republica.imagem2 != '' && republica.imagem2 != null && (
          <View key="2">
            <Imagem source={{ uri: republica.imagem2 }} />
          </View>
        )}
        {republica.imagem3 != '' && republica.imagem3 != null && (
          <View key="3">
            <Imagem source={{ uri: republica.imagem3 }} />
          </View>
        )}
      </IndicatorViewPager>

      <ViewTitulo>
        <Titulo>{republica.nomeRepublica}</Titulo>
      </ViewTitulo>

      <ViewDescricao>
        <Descricao>{republica.descricao}</Descricao>
      </ViewDescricao>
      <Card>
        <Linha>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="account-outline" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Representante</TipoInformacao>
              <Informacao>{republica.representante}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="home-outline" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Tipo de imóvel</TipoInformacao>
              <Informacao>{republica.imovel}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
        <Linha>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="gender-male-female" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Gênero</TipoInformacao>
              <Informacao>{republica.genero}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="paw" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Aceita animais?</TipoInformacao>
              <Informacao>{republica.animal}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
        <Linha>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="account-group-outline" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Disponibilidade</TipoInformacao>
              <Informacao>{republica.numVagas} Vaga(s)</Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
      </Card>

      <Categoria>Valores</Categoria>

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
      <Categoria>Endereço</Categoria>
      <Card>
        <Image
          style={{ width: '100%', height: 100 }}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/pictures%2FEndereco.png?alt=media&token=2103feff-5e6e-4faa-8cb6-87a214d17ff8'
          }}
        />
      </Card>

      {!usuarioJaInteressado && !ocutarBotaoAgendamento ? (
        <ViewBotao>
          <Botao
            onPress={() => {
              irParaAgendamento();
            }}
          >
            <Label>Agendar uma visita</Label>
          </Botao>
        </ViewBotao>
      ) : (
        <View style={{ height: 30 }} />
      )}
    </ScrollView>
  );
}
