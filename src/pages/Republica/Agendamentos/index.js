import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'native-base';
import style from './styles';

import HeaderBack from '../../../components/CustomHeader';
import { connect, useSelector } from 'react-redux';
import api from '../../../service/api';
import CustomModal from '../../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';
import CartaoUser from '../../../components/CartaoUser';

import moment from 'moment';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  Container,
  ViewDetalhes,
  Subtitulo,
  ViewData,
  LabelData,
  LabelConfirmacao,
  Barra,
  Label,
  ViewLabel,
  Analise,
  Confirmado,
  Rejeitado,
  LabelReijeicao
} from './styles';

export default function Agendamentos({ navigation }) {
  const email = useSelector(state => state.user.email);

  const [listaAgendamento, setListaAgendamento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [republicaID, setUsuario] = useState(navigation.state.params.idRepublica);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    setListaAgendamento([]);
    carregarAgendamentos();
  }, [reload]);

  function carregarAgendamentos() {
    setLoading(true);
    api
      .get(`/confirmAgendamento/${email}`)
      .then(response => {
        setListaAgendamento(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function confirmarAgendamento(user) {
    const data = {
      email: user,
      status: 'Confirmado',
    };
    api
      .put(`/confirmAgendamento/${republicaID}`, data)
      .then(response => {
        setReload(!reload);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function rejeitarAgendamento(user) {
    const data = {
      email: user,
      status: 'Rejeitado',
    };
    api
      .put(`/confirmAgendamento/${republicaID}`, data)
      .then(response => {
        setReload(!reload);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function verificarTipoRequisicao(tipoSocilitacao, usuario) {
    if (tipoSocilitacao == 1) {
      confirmarAgendamento(usuario);
    } else if (tipoSocilitacao == 0) {
      rejeitarAgendamento(usuario);
    }
  }

  return (
    <Container>
      <HeaderBack title="Agendamentos" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      {listaAgendamento.length == 0 && (
        <EmptyState
          titulo="Sem Agendamentos"
          mensagem="Ninguém agendou uma visita a sua república. Aguarde, logo aparecerá alguém para preencher esse vazio"
        />
      )}
      {listaAgendamento.length != 0 && (
        <View>
          <View style={{ width: '100%', paddingHorizontal: 5, height: 40 }}>
            <Subtitulo>
              Abaixo estão listadas as pessoas que solicitaram uma visita a sua república.
            </Subtitulo>
          </View>
          <ViewLabel>
            <Label>Interessados</Label>
            <Barra/>
          </ViewLabel>
        </View>
      )}
      <FlatList
        data={listaAgendamento}
        renderItem={({ item }) => (
          <ScrollView>
            <CartaoUser
              status={item.status}
              callback={() => setReload()}
              retorno={(number, user) => verificarTipoRequisicao(number, user)}
              dados={item.user}
              dadosGerais={item}
              tipoRetorno="Republica"
            />
            <ViewData>
              <View style={style.viewData2}>
                <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                <Text>As</Text>
                <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
              </View>
              {item.status == 'Análise' && (
                <Analise>
                  <Label>Em análise</Label>
                </Analise>
              )}
              {item.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>Confirmada</LabelConfirmacao>
                </Confirmado>
              )}
              {item.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>Rejeitada</LabelReijeicao>
                </Rejeitado>
              )}
            </ViewData>
          </ScrollView>
        )}
        keyExtractor={item => item._id}
      />
      {erro && (
        <ViewDetalhes>
          <CustomModal
            parametro="Erro"
            callback={() => {
              setErro(false);
            }}
          />
        </ViewDetalhes>
      )}
    </Container>
  );
}
