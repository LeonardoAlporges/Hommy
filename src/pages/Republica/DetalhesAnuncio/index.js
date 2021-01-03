import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Button, Text, Linking } from 'react-native';

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
  ViewBotao,
  CardDeInformacaoLocalizacao,
  ViewCaracteristicaTitle,
  CaracteristicaTitle,
  ViewTipo,
  Tipo,
  ViewCaracteristicaItens,
  Item2,
  TextLabel,
  ViewVagas,
  ViewInterna,
  Container
} from './style';

export default function DetalhesAnuncio({ navigation }) {
  const [ocutarBotaoAgendamento, setOcutarBotaoAgendamento] = useState(navigation.state.params.desativarBotaoAgenda);
  const [republica, setRepublica] = useState(navigation.state.params.dadosRepublica);
  const [contadorImagem, setContadorImagem] = useState(0);

  function irParaAgendamento() {
    navigation.navigate('Agendar', {
      data: republica
    });
  }

  useEffect(() => {
    if (republica.bairro === 'Guararema' || republica.bairro === 'guararema') {
      republica.bairro = 'Bilau';
    }
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
    <ScrollView style={{ backgroundColor: '#f8f8f8' }}>
      <HeaderBack title={republica.nomeRepublica} onNavigation={() => navigation.goBack(null)} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
        {republica.imagem1 != '' && republica.imagem1 != null && (
          <View key="1">
            <Image style={{ height: 300 }} source={{ uri: republica.imagem1 }} />
          </View>
        )}
        {republica.imagem2 != '' && republica.imagem2 != null && (
          <View key="2">
            <Image style={{ height: 300 }} source={{ uri: republica.imagem2 }} />
          </View>
        )}
        {republica.imagem3 != '' && republica.imagem3 != null && (
          <View key="3">
            <Image style={{ height: 300 }} source={{ uri: republica.imagem3 }} />
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
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="google-maps" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Endereço</TipoInformacao>
              <Informacao numberOfLines={2}>
                {republica.rua}, {republica.bairro}, Nº
                {republica.numeroCasa}
              </Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
        <Linha>
          <CardDeInformacaoLocalizacao
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${republica.rua},+${republica.numeroCasa}-+${
                  republica.bairro
                },${'Alegre-ES'}`
              )
            }
          >
            <IconesInformacao>
              <Icone name="google-maps" />
            </IconesInformacao>
            <TipoInformacao>Buscar no google maps </TipoInformacao>
          </CardDeInformacaoLocalizacao>
        </Linha>
      </Card>

      <Categoria>Valores</Categoria>
      <Card>
        <Linha>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="wallet-outline" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Aluguel</TipoInformacao>
              <Informacao>R$ {republica.valorAluguel},00</Informacao>
            </Informacaoes>
          </CardDeInformacao>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="chart-bar" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Contas (média)</TipoInformacao>
              <Informacao>R$ {republica.valorContas},00</Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
      </Card>
      <Categoria>Mobilia</Categoria>
      <Card>
        <Linha>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="television" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Quarto</TipoInformacao>
              <Informacao>{republica.acomodacaoQuarto}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
          <CardDeInformacao>
            <IconesInformacao>
              <Icone name="fridge-outline" />
            </IconesInformacao>
            <Informacaoes>
              <TipoInformacao>Social</TipoInformacao>
              <Informacao>{republica.acomodacaoRepublica}</Informacao>
            </Informacaoes>
          </CardDeInformacao>
        </Linha>
      </Card>
      {!ocutarBotaoAgendamento ? (
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
