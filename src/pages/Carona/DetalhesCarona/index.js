import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
import { useSelector } from 'react-redux';

import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import Loading from '../../../components/Loading';

import Estilo from './style';

import {
  Header,
  HeaderUser,
  Imagem,
  InformacaoPerfil,
  Nome,
  ViewNotas,
  Nota,
  ContainerIformacao,
  ViewData,
  Data,
  ViewPartida,
  Partida,
  ViewHora,
  Hora,
  ViewValor,
  LabelValor,
  Valor,
  BarraSeparadora,
  ViewPontos,
  ViewPontoEmbarque,
  LabelPontoEmbarque,
  ViewLabel,
  TextoLabel
} from './style';

export function DetalhesCarona({ navigation }) {
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado'.split('_')
  });
  const [botaoInteresse, setBotaoInteresse] = useState(navigation.state.params.desativarBotaoInteresse);
  const [dados, setDados] = useState(navigation.state.params.dados);

  const email = useSelector(state => state.user.email);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(moment(dados.data).format('dddd, DD MMMM'));
  const [horaSaida, setHoraSaida] = useState(moment(dados.Hsaida).format('HH:mm'));
  const [horaChegada, setHoraChegada] = useState(moment(dados.HChegada).format('HH:mm'));

  async function demonstrarInteresse() {
    setLoading(true);
    const dado = { email: email }; //ALTERAR ISSO PARA RECEBER SOMENTE O EMAIL

    await api
      .put(`/carona/meusInteresses/${dados._id}`, dado)
      .then(Response => {
        setSucesso(true);
        setLoading(false);
      })
      .catch(erro => {
        setErro(true);
        setLoading(false);
      });
  }

  return (
    <ScrollView style={{ paddingBottom: 50 }}>
      {loading && <Loading />}
      {sucesso && (
        <CustomModal
          parametro="Custom"
          titulo="Obrigado pelo interesse"
          descricao="Você será adicionado a uma lista de interesse e será notificado assim que o ofertante confirmar sua vaga."
          botao="Confirmar"
          callback={() => {
            navigation.navigate('Viagens');
          }}
        />
      )}
      {erro && (
        <CustomModal
          parametro="Erro"
          descricao="Você já tem um agendamento cadastrado nessa carona."
          callback={() => {
            setErro(false);
          }}
        />
      )}

      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(null);
          }}
        >
          <Icon style={{ fontSize: 30, color: '#FFFFFF' }} name="arrow-left" />
        </TouchableOpacity>
      </Header>

      <HeaderUser>
        <Imagem
          source={{
            uri: dados.imagem
          }}
        />
        <InformacaoPerfil>
          <Nome>{dados.nome} </Nome>
          <ViewNotas>
            <Icon style={{ fontSize: 20, color: '#FFFFFF', marginHorizontal: 3 }} name="star-outline" />
            <Nota>{dados.nota}</Nota>
          </ViewNotas>
        </InformacaoPerfil>
      </HeaderUser>

      <ContainerIformacao>
        <ViewData>
          <Data>{data}</Data>
        </ViewData>
        <ViewPartida>
          <Partida>Saída</Partida>
        </ViewPartida>
        <ViewHora>
          <Hora>
            {horaSaida} - {dados.localSaida}
          </Hora>
        </ViewHora>
        <ViewPartida>
          <Partida>Previsão Chegada</Partida>
        </ViewPartida>
        <ViewHora>
          <Hora>
            {horaChegada} - {dados.localChegada}
          </Hora>
        </ViewHora>

        <ViewValor>
          <LabelValor>Preço para 1 passageiro</LabelValor>
          <Valor>R$ {dados.valor},00</Valor>
        </ViewValor>
      </ContainerIformacao>
      <BarraSeparadora />

      <ViewPontos>
        <ViewPontoEmbarque>
          <LabelPontoEmbarque>Ponto de Embarque</LabelPontoEmbarque>
        </ViewPontoEmbarque>
        <ViewLabel>
          <TextoLabel>•{dados.embarque}</TextoLabel>
        </ViewLabel>
        <ViewPontoEmbarque>
          <LabelPontoEmbarque>Ponto Final</LabelPontoEmbarque>
        </ViewPontoEmbarque>
        <ViewLabel>
          <TextoLabel>•{dados.desembarque}</TextoLabel>
        </ViewLabel>
      </ViewPontos>
      {!botaoInteresse ? (
        <ViewBotao>
          <Button
            style={Estilo.Botao}
            onPress={() => {
              demonstrarInteresse();
            }}
          >
            <Text style={Estilo.txtBotao}>Tenho Interesse</Text>
          </Button>
        </ViewBotao>
      ) : (
        <View style={{ height: 40 }} />
      )}
    </ScrollView>
  );
}

export default withNavigation(DetalhesCarona);
