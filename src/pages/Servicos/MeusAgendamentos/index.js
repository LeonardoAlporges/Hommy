import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ModalAvaliacao from '../../../components/ModalAvaliacao';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';
import {
  Barra,
  Container,
  Label,
  ViewLabel
} from './styles';

export default function MeusAgendamentosServico(props) {
  const email = useSelector(state => state.user.email);
  const [listaAgendamentoServico, setListaAgendamentoServico] = useState([]);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [servicoID, setServicoID] = useState(null);
  const [reload, setReload] = useState();
  const [avaliar, setAvaliar] = useState(false);
  const [usuarioAvaliado, setUsuarioAvaliado] = useState('');

  function removerMeuAgendamentoServico(valorRetorno, idServico) {
    return api
      .delete(`/servicos/agendamento/${idServico}`)
      .then(response => {
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function abrirAvaliacao(usuario) {
    setAvaliar(true);
    setUsuarioAvaliado(usuario);
  }
  return (
    <Container>
      <ViewLabel>
        <Label>Serviços</Label>
        <Barra />
      </ViewLabel>

      <FlatList
        data={props.agendamnetos}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View >
            <CartaoServico dados={item.servico} />
            <ViewData>
              {item.status == 'Análise' && (
                <Analise>
                  <LabelData>{item.agenda.status}</LabelData>
                </Analise>
              )}
              {item.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>{item.agenda.status}</LabelConfirmacao>
                </Confirmado>
              )}
              {item.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>{item.agenda.status}</LabelReijeicao>
                </Rejeitado>
              )}{item.status == 'Finalizado' && (
                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.servico.userEmail) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
              )}
              {item.status != 'Finalizado' && (
                <View style={style.viewData2}>
                  <LabelData>{moment(item.agenda.data).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(item.agenda.hora).format('hh:mm')}</LabelData>
                </View>
              )}
              <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center' }}
                onPress={() => {
                  setServicoID(item.servico._id);
                  setModalRemocaoAgendamento(true);
                }}
              >
                <Icon name="close" style={style.iconDel} />
              </TouchableOpacity>
            </ViewData>
          </View>
        )}
        keyExtractor={item => item.servico._id}
      />
      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            removerMeuAgendamentoServico(valor, servicoID);
            setModalRemocaoAgendamento(false);
          }}
          titulo="Cancelar visita?"
          mensagem="A pessoa responsável pelo produto será notificada da sua desistência."
          botaoCancel="Não"
          botaoConfirmar="Sim"
          confirmar={true}
        />
      )}
      {avaliar && <ModalAvaliacao usuario={usuarioAvaliado} />}
    </Container>
  );
}

