import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import {
  BarraSeparadora,
  Botao,
  ContainerIformacao,
  Data,
  Header,
  HeaderUser,
  Hora,
  Imagem,
  InformacaoPerfil,
  Label,
  LabelPontoEmbarque,
  LabelValor,
  Nome,
  Nota,
  Partida,
  TextoLabel,
  Valor,
  ViewBotao,
  ViewData,
  ViewHora,
  ViewLabel,
  ViewNotas,
  ViewPartida,
  ViewPontoEmbarque,
  ViewPontos,
  ViewValor
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
  const [horaSaida, setHoraSaida] = useState(moment(dados.horaSaida).format('HH:mm'));
  const [horaChegada, setHoraChegada] = useState(moment(dados.horaChegada).format('HH:mm'));

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

  useEffect(() => {
    dados.valor = parseFloat(dados.valor).toFixed(2);
  
  }, []);
  

  return (
    <ScrollView>
      <View style={{ width: '100%', height: '100%', paddingBottom: 40 }}>
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
            descricao="Você já tem um interesse cadastrado nessa carona."
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
            <LabelValor>Preço por pessoa </LabelValor>
            <Valor>R$ {dados.valor}</Valor>
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
            <Botao
              onPress={() => {
                demonstrarInteresse();
              }}
            >
              <Label>Tenho Interesse</Label>
            </Botao>
          </ViewBotao>
        ) : (
          <View style={{ height: 30 }} />
        )}
      </View>
    </ScrollView>
  );
}

export default withNavigation(DetalhesCarona);
