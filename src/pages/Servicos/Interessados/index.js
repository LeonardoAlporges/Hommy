import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import CartaoUser from '../../../components/CartaoUser';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalAvaliacao from '../../../components/ModalAvaliacao';
import api from '../../../service/api';
import style, {
  Analise,
  Barra,
  Confirmado,
  Container,
  Finalizado, Label,
  LabelConfirmacao,
  LabelData,
  LabelFinalizado, LabelReijeicao,
  Rejeitado,
  Subtitulo,
  ViewData,
  ViewDetalhes,
  ViewLabel
} from './styles';

export default function InteressadosServico({ navigation }) {

  const email = useSelector(state => state.user.email);
  const [listaAgendamento, setListaAgendamento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [servicoID, setServicoID] = useState(navigation.state.params.idServico);
  const [erro, setErro] = useState(false);
  const [avaliar, setAvaliar] = useState(false);
  const [usuarioAvaliado, setUsuarioAvaliado] = useState('');

  useEffect(() => {
    setListaAgendamento([]);
    carregarAgendamentos();
  }, [reload]);

  function carregarAgendamentos() {
    setLoading(true);
    api
      .get(`/servicos/agendamento/ofertante/${servicoID}`)
      .then(response => {
        setListaAgendamento(response.data);
      })
      .catch(error => {
        setErro(true);
      })
      .finally(setLoading(false));
  }

  function atualizarStatus(user, status) {
    const data = {
      _id: servicoID,
      userType: "ofertante",
      email: user,
      status: status
    };
    api
      .put(`/servicos/agendamento/atualizaStatus`, data)
      .then(response => {
        console.log(response)
        setReload(!reload);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function abrirAvaliacao(usuario) {
    setAvaliar(true);
    setUsuarioAvaliado(usuario);
  }

  function verificarTipoRequisicao(tipoSocilitacao, usuario) {
    if (tipoSocilitacao == 1) {
      console.log(tipoSocilitacao, usuario)
      atualizarStatus(usuario, "Confirmado");
    } else if (tipoSocilitacao == 0) {
      atualizarStatus(usuario, "Rejeitado");
    }
  }

  return (
    <Container>
      <HeaderBack title="Agendamentos" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      {listaAgendamento.length == 0 && !loading && (
        <EmptyState
          titulo="Sem Agendamentos"
          mensagem="Ninguém agendou uma visita para seu Servico. Aguarde, logo aparecerá alguém para preencher esse vazio"
        />
      )}
      {listaAgendamento.length != 0 && !loading && (
        <View>
          <View style={{ width: '100%', paddingHorizontal: 5, height: 40 }}>
            <Subtitulo>Abaixo estão listadas as pessoas que solicitaram uma visita para ver seu serviço.</Subtitulo>
          </View>
          <ViewLabel>
            <Label>Interessados</Label>
            <Barra />
          </ViewLabel>
        </View>
      )}
      <FlatList
        data={listaAgendamento}
        renderItem={({ item }) => (
          <ScrollView>
            <CartaoUser
              status={item.agenda.status}
              callback={() => setReload()}
              retornoServico={(number, user) => verificarTipoRequisicao(number, user)}
              dados={item.user}
              dadosGerais={item}
              tipoRetorno="Servico"
            />
            <ViewData>
              {item.agenda.status != 'Finalizado' &&
                <View style={style.viewData2}>
                  <LabelData>{moment(item.agenda.data).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(item.agenda.horario).format('hh:mm')}</LabelData>
                </View>
              }

              {item.agenda.status == 'Análise' && (
                <Analise>
                  <Label>Em análise</Label>
                </Analise>
              )}
              {item.agenda.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>Confirmada</LabelConfirmacao>
                </Confirmado>
              )}
              {item.agenda.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>Rejeitada</LabelReijeicao>
                </Rejeitado>
              )}
              {item.agenda.status == 'Finalizado' && (

                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.user.email) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
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
      {avaliar && (
        <ModalAvaliacao usuario={usuarioAvaliado}></ModalAvaliacao>
      )}
    </Container>
  );

}
