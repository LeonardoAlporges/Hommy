import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import Cartao from '../../../components/Cartao';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import ModalAvaliacao from '../../../components/ModalAvaliacao'
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

export default function MeusAgendamentosRepublica(props) {
  const email = useSelector(state => state.user.email);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [republicaID, setRepublicaID] = useState(null);
  const [avaliar, setAvaliar] = useState(false);
  const [usuarioAvaliado, setUsuarioAvaliado] = useState('');


  function removerMeuAgendamento(valorRetorno,idRepublica){
    if(valorRetorno == 3){
      return null
    }
    api.delete(`/agendamento/${idRepublica}`, {
      data: { email: email }
    })
    .then(() => {
      props.callback();
    })
    .catch(() => {
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
        <Label>Republicas</Label>
        <Barra />
      </ViewLabel>
      <FlatList
        data={props.agendamentos}
        renderItem={({ item }) => (
          <View style={{ flex: 1, maxHeight: 180 }}>
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
              {item.status == 'Finalizado' && (
                <Finalizado>
                  <LabelFinalizado onPress={() => {
                    abrirAvaliacao(item.user.email)
                  }}>Avaliar Anunciante  </LabelFinalizado>
                </Finalizado>
              )}

              {item.status != 'Finalizado' && (
                <View style={style.viewData2}>
                  <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
                </View>
              )}
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
      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            removerMeuAgendamento(valor, republicaID);
            setModalRemocaoAgendamento(false);
          }}
          titulo="Cancelar visita?"
          mensagem="A pessoa responsável será notificada da sua desistência."
          botaoCancel="Não"
          botaoConfirmar="Sim"
          confirmar={true}
        />
      )}
      {avaliar && <ModalAvaliacao usuario={usuarioAvaliado} />}
    </Container>
  );
}
