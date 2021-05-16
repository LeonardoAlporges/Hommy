import React, { useState } from 'react';
import moment from 'moment';
import { View,Text,TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ModalAvaliacao from '../../../components/ModalAvaliacao';
import CartaoServico from '../../../components/CartaoServico';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';

import style, {
  Analise,
  Barra,
  Confirmado,
  Container,
  Finalizado, Label,
  LabelConfirmacao,
  LabelData,
  LabelFinalizado,
  LabelReijeicao,
  Rejeitado,
  ViewData,
  ViewLabel
} from './styles';

export default function MeusAgendamentosServico(props) {
  
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [servicoID, setServicoID] = useState(null);
  const [avaliar, setAvaliar] = useState(false);
  const [usuarioAvaliado, setUsuarioAvaliado] = useState('');

  function removerMeuAgendamentoServico(valorRetorno, idServico) {
    if(valorRetorno == 3){
      return null;
    }
    return api
      .delete(`/servicos/agendamento/${idServico}`)
      .then(response => {
        props.callback();
      })
      .catch(error => {
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
        data={props.agendamentos}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View >
            <CartaoServico dados={item.servico} />
            <ViewData>
              {item.agenda.status == 'Análise' && (
                <Analise>
                  <LabelData>{item.agenda.status}</LabelData>
                </Analise>
              )}
              {item.agenda.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>{item.agenda.status}</LabelConfirmacao>
                </Confirmado>
              )}
              {item.agenda.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>{item.agenda.status}</LabelReijeicao>
                </Rejeitado>
              )}{item.agenda.status == 'Finalizado' && (
                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.servico.userEmail) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
              )}
              {item.agenda.status != 'Finalizado' && (
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

