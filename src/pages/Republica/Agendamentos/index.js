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
    <View style={style.Container}>
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
            <Text style={style.subtitulo}>
              Abaixo estão listadas as pessoas que solicitaram uma visita a sua república.
            </Text>
          </View>
          <View style={style.V_label}>
            <Text style={style.label}>Interessados</Text>
            <View style={style.barra} />
          </View>
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
            <View style={style.viewData}>
              <View style={style.viewData2}>
                <Text style={style.data}>{moment(new Date(item.data)).format('DD/MM/YY')}</Text>
                <Text>As</Text>
                <Text style={style.data}>{moment(new Date(item.hora)).format('hh:mm')}</Text>
              </View>
              {item.status == 'Análise' && (
                <View style={style.Analise}>
                  <Text style={style.data}>Em análise</Text>
                </View>
              )}
              {item.status == 'Confirmado' && (
                <View style={style.Confirmado}>
                  <Text style={style.dataConf}>Confirmada</Text>
                </View>
              )}
              {item.status == 'Rejeitado' && (
                <View style={style.Rejeitado}>
                  <Text style={style.dataRej}>Rejeitada</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        keyExtractor={item => item._id}
      />
      {erro && (
        <View style={style.V_Detalhes}>
          <CustomModal
            parametro="Erro"
            callback={() => {
              setErro(false);
            }}
          />
        </View>
      )}
    </View>
  );
}
