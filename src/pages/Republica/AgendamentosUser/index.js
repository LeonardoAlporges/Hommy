import moment from 'moment';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';
import style, {
  Analise,
  Barra,
  Confirmado,
  Container,
  Label,
  LabelConfirmacao,
  LabelData,
  LabelReijeicao,
  Rejeitado,
  Subtitulo,
  ViewData,
  ViewDetalhes,
  ViewLabel
} from './styles';

export default function AgendamentoUser({ navigation }) {
  const email = useSelector(state => state.user.email);
  const [listaAgendamento, setListaAgendamendo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [republicaID, setRepublicaID] = useState();
  const [reload, setReload] = useState();

  useEffect(() => {
    carregarMeusAgendamentos();
  }, [reload]);

  function carregarMeusAgendamentos() {
    setListaAgendamendo([]);
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
        data: { email: email }
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
    <Container>
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
      {listaAgendamento.length == 0 && !loading && (
        <EmptyState
          titulo="Você não possui visitas agendadas."
          mensagem="O que está esperando? Navegue pelo aplicativo e encontre uma vaga na república ideal. "
        />
      )}
      <View style={{ widht: '100%', height: 20, paddingHorizontal: 20, marginBottom: 10,marginTop:5 }}>
        <Subtitulo>Fique atento no status das repúblicas nas quais você solicitou uma visita.</Subtitulo>
      </View>
      <ViewLabel>
        <Label>Agendamentos</Label>
        <Barra />
      </ViewLabel>

      <FlatList
        data={listaAgendamento}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Cartao data={item.republica} interessado />
            <ViewData>
              {item.status == 'Análise' && (
                <Analise>
                  <LabelData>{item.status}</LabelData>
                </Analise>
              )}
              {item.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>{item.status}</LabelConfirmacao>
                </Confirmado>
              )}
              {item.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>{item.status}</LabelReijeicao>
                </Rejeitado>
              )}

              <View style={style.viewData2}>
                <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                <Text>As</Text>
                <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
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
            </ViewData>
          </View>
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
