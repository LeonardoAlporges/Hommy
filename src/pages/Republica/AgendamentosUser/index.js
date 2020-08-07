import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import Cartao from '../../../components/Cartao';
import style from './styles';

import HeaderBack from '../../../components/CustomHeader';
import { connect, useSelector } from 'react-redux';
import api from '../../../service/api';
import CustomModal from '../../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ModalConfirmacao from '../../../components/ModalConfirmacao';

import moment from 'moment';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';

export default function AgendamentoUser() {
  const email = useSelector(state => state.user.email);
  const [listaAgendamento, setListaAgendamendo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [republicaID, setRepublicaID] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setListaAgendamendo([]);
    carregarMeusAgendamentos();
  }, [reload]);

  function carregarMeusAgendamentos() {
    api
      .get(`/agendamento/${email}`)
      .then(response => {
        setListaAgendamendo(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function removerMeuAgendamento(valorRetorno, idRepublica) {
    if (valorRetorno == 3) {
      return null;
    }
    return api
      .delete(`/agendamento/${idRepublica}`, {
        data: { email: email },
      })
      .then(response => {
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  return (
    <View style={style.Container}>
      <HeaderBack title="Meus agendamentos" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}

      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            removerMeuAgendamento(valor, republicaID);
            setModalRemocaoAgendamento(false);
          }}
          titulo="Cancelar visita?"
          mensagem="A pessoa responsável pela república será notificada da sua desistência."
          botaoCancel="Não"
          botaoConfirmar="Sim"
          mensagem="Deseja deletar esse Agendamento ?"
          confirmar={true}
        />
      )}
      {listaAgendamento.length == 0 && (
        <EmptyState
          titulo="Você não possui visitas agendadas."
          mensagem="O que está esperando? Navegue pelo aplicativo e encontre uma vaga na república ideal. "
        />
      )}
      <View style={{ widht: '100%', height: 20, paddingHorizontal: 20, marginBottom: 10 }}>
        <Text style={style.subtitulo}>Fique atento no status das repúblicas nas quais você solicitou uma visita.</Text>
      </View>
      <View style={style.V_label}>
        <Text style={style.label}>Agendamentos</Text>
        <View style={style.barra} />
      </View>

      <FlatList
        data={listaAgendamento}
        renderItem={({ item }) => (
          <View>
            <Cartao data={item.republica} interessado />
            <View style={style.viewData}>
              {item.status == 'Análise' && (
                <View style={style.ViewAnalise}>
                  <Text style={style.data}>{item.status}</Text>
                </View>
              )}
              {item.status == 'Confirmado' && (
                <View style={style.View_Confirmado}>
                  <Text style={style.dataConf}>{item.status}</Text>
                </View>
              )}
              {item.status == 'Rejeitado' && (
                <View style={style.View_Rejeitado}>
                  <Text style={style.dataRej}>{item.status}</Text>
                </View>
              )}

              <View style={style.viewData2}>
                <Text style={style.data}>{moment(new Date(item.data)).format('DD/MM/YY')}</Text>
                <Text>As</Text>
                <Text style={style.data}>{moment(new Date(item.hora)).format('hh:mm')}</Text>
              </View>

              <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center' }}
                onPress={() => {
                  setRepublicaID(item.republica._id);
                  setModalRemocaoAgendamento(true);
                }}
              >
                <Icon name="close" style={style.iconDel} />
              </TouchableOpacity>
            </View>
          </View>
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
