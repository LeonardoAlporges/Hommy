import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import HeaderBack from '../../../../components/CustomHeader';
import {
  BarraSeparacao,
  BotaoContato, Descricao,
  Imagem, ItemDuplo, ItemUnico,
  ItemUnicoLink, LabelBotao, LabelItem,
  LinhaDupla,
  LinhaUnica,
  SubTitle, Titulo,
  ViewBotao, ViewDescricao, ViewDoTitulo,
  ViewIcone,
  ViewSubTitle
} from './styles';



export default function DetalhesEventos({ navigation }) {
  const [contadorImagem, setContadorImagem] = useState(0);
  const [evento, setEvento] = useState(navigation.state.params.dados);
  const [habilitarDesconto,setHabilitarDesconto] = useState(false)


  function navegar() {
    navigation.goBack(null);
  }

  function AbrirTelefone() {
    Linking.openURL(`tel:${evento.telefone}`);
  }

  useEffect(() => {
    console.log(evento);
    if (evento.imagem1 != '' && evento.imagem1 != null) {
      setContadorImagem(contadorImagem => 1);
    }
    if (evento.imagem2 != '' && evento.imagem2 != null) {
      setContadorImagem(contadorImagem => 2);
    }
    if (evento.imagem3 != '' && evento.imagem3 != null) {
      setContadorImagem(contadorImagem => 3);
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
      <HeaderBack title="Detalhes do Evento" onNavigation={() => navegar()} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()}>
        {evento.imagem1 != '' && evento.imagem1 != null && (
          <View key="1">
            <Imagem source={{ uri: evento.imagem1 }} />
          </View>
        )}
        {evento.imagem2 != '' && evento.imagem2 != null && (
          <View key="2">
            <Imagem source={{ uri: evento.imagem2 }} />
          </View>
        )}
        {evento.imagem3 != '' && evento.imagem3 != null && (
          <View key="3">
            <Imagem source={{ uri: evento.imagem3 }} />
          </View>
        )}
      </IndicatorViewPager>
      <ViewDoTitulo>
        <Titulo>{evento.titulo}</Titulo>
      </ViewDoTitulo>
      <ViewDescricao>
        <Descricao>{evento.descricao}</Descricao>
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
          <LabelItem>R$ {evento.valor}</LabelItem>
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
          <LabelItem>{evento.telefone}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>

      <ViewSubTitle>
        <SubTitle>Endereço</SubTitle>
      </ViewSubTitle>

      <LinhaUnica>
        <ItemUnicoLink>
          <ViewIcone>
            <Icon name="pin" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>{evento.localCompraIngresso}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>

      <ViewSubTitle>
        <SubTitle>Rede social</SubTitle>
      </ViewSubTitle>
      <LinhaUnica>
        <ItemUnicoLink>
          <ViewIcone>
            <Icon name="instagram" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>

          <LabelItem>{evento.telefone}</LabelItem>
        </ItemUnicoLink>
      </LinhaUnica>
      {evento.descontoDisponivel && habilitarDesconto &&
       <LinhaDupla>
         <ItemDuplo>
         <ViewIcone>
            <Icon name="currency-usd" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>Desconto: {evento.desconto}%</LabelItem>
         </ItemDuplo>
         <ItemDuplo>
         <ViewIcone>
            <Icon name="ticket" style={{ fontSize: 25, color: '#142850' }} />
          </ViewIcone>
          <LabelItem>Cupom: {evento.codigoDesconto}</LabelItem>
         </ItemDuplo>
       </LinhaDupla>

      }
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
