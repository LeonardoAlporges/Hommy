import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';

import style from './styles';
import { Button } from 'native-base';
import { number } from 'yup';
import {
  ViewFundo,
  ViewModal,
  Titulo,
  Descricao,
  BotaoTxt,
  BotaoTxtCancelar,
  ViewBotoes
} from'./styles';

export default function ModalConfirmacao(props) {
  const [modalVisivel, setModalVisivel] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const [rejeitar, setRejeitar] = useState(false);

  onDimiss = number => {
    props.retornoModal(3);
  };

  mudarEstado = () => {
    if (confirmar == true) {
      props.retornoModal(1);
    } else if (rejeitar == true) {
      props.retornoModal(0);
    }
  };

  return (
    <Modal animationType="fade" visible={modalVisivel} transparent={true}>
      <ViewFundo>
        <ViewModal>
          <Titulo>{props.titulo}</Titulo>
          {mensagem != '' && <Descricao>{mensagem}</Descricao>}
          <ViewBotoes>
            <Button
              style={style.botaoCancelar}
              onPress={async () => {
                onDimiss();
                setModalVisivel(false);
              }}
            >
              <BotaoTxtCancelar>{props.botaoCancel}</BotaoTxtCancelar>
            </Button>
            <Button
              style={style.botao}
              onPress={async () => {
                mudarEstado();
                setModalVisivel(false);
              }}
            >
              <BotaoTxt>{props.botaoConfirmar}</BotaoTxt>
            </Button>
          </ViewBotoes>
        </ViewModal>
      </ViewFundo>
    </Modal>
  );
}
