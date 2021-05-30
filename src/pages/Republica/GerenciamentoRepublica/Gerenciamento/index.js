import AsyncStorage from '@react-native-community/async-storage';
import { DatePicker, Input, Item, Picker } from 'native-base';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';
import ModalAdicaoContas from '../../../../components/ModalAdicaoContas';
import ModalIformativoGerenciamento from '../../../../components/ModalInformativoGerenciamento';

import api from '../../../../service/api';
import Contas from '../Contas'
import Membros from '../Membros';
import Tarefas from '../Tarefas'
import {
  Container,
  Apresentacao,
  DadosView,
  Icone,
  SubTitulo,
  Titulo,
  LabelView,
  IconeView,
  IconeDelete,
} from './styles';

export default function Gerenciamento(props, { navigation }) {
  // const moment = require('moment');
  // moment.locale('pt', {
  //   months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  // });
  const [erro, setErro] = useState(false);
  
  const [modalContasVisible, setModalContaVisible] = useState(false);
  const [modalTarefaVisible, setModalTarefaVisible] = useState(false);
  const [modalMembroVisible, setModalMembroVisible] = useState(false);

  const [modalContasDadosVisible, setModalContaDadosVisible] = useState(false);
  const [modalTarefaDadosVisible, setModalTarefaDadosVisible] = useState(false);
  const [modalMembroDadosVisible, setModalMembroDadosVisible] = useState(false);


  const contaRef = useRef(null);

  function abrirModalContas() {
    setModalContaVisible(true);
  }
  function abrirModalTarefas() {
    setModalTarefaVisible(true);
  }
  function abrirModalMembro() {
    setModalMembroVisible(true);
  }
 

  function excluirRepublica() {
    api
      .delete(`/gerenciaRepublica/${props.idRepublica}`)
      .then(response => {
        setExisteRepublica(false);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function fecharModalConta() {
    contaRef.current.carregarContas()
    console.log(contaRef.current);
    setModalContaVisible(false);
    setModalContaDadosVisible(false);
  }

  return (
    <Container altura={Dimensions.get('window').height} >
      <HeaderBack title="Gerenciamento de republica" onNavigation={() => navigation.goBack(null)} />
      <Apresentacao>
        <IconeView>
          <Icone name="home" />
        </IconeView>
        <LabelView>
          <SubTitulo>
            Republica
          </SubTitulo>
          <Titulo>
            Só Fadinha
          </Titulo>
        </LabelView>
        <IconeView>
          <IconeDelete name="trash" />
        </IconeView>
      </Apresentacao>
      <ScrollView style={{ marginBottom: '5%' }}>
        <Contas idRepublica={props.idRepublica} ref={contaRef} modalVisualizacao={() => { abrirModalContas() }} modalInsercaoDados={() => { setModalContaDadosVisible(true) }} ></Contas>
        <Tarefas idRepublica={props.idRepublica} modalVisualizacao={() => { abrirModalTarefas() }} modalInsercaoDados={() => { setModalTarefaDadosVisible(true) }} ></Tarefas>
        <Membros idRepublica={props.idRepublica} modalVisualizacao={() => { abrirModalMembro() }} modalInsercaoDados={() => { setModalMembroDadosVisible(true) }} ></Membros>
      </ScrollView>

      {modalContasDadosVisible && <ModalAdicaoContas idRepublica={props.idRepublica} onClose={() => { fecharModalConta() }} visivel={true} />}

      {/* {modalTarefaDadosVisible && <ModalAdicaoGerenciamento tarefas={true} onClose={() => { setModalTarefaDadosVisible(false)}} visivel={true} />}
      {modalMembroDadosVisible && <ModalAdicaoGerenciamento membros={true} onClose={() => { setModalMembroDadosVisible(false)}} visivel={true} />} */}

      {modalContasVisible && <ModalIformativoGerenciamento contas={true} onClose={() => { fecharModalConta() }} visivel={true} />}
      {modalTarefaVisible && <ModalIformativoGerenciamento tarefas={true} onClose={() => { fecharModalTarefa() }} visivel={true} />}
      {modalMembroVisible && <ModalIformativoGerenciamento membros={true} onClose={() => { fecharModalMembro() }} visivel={true} />}

      {erro && (
        <CustomModal
          parametro="Erro"
          descricao="Opss! Ocorreu um erro estranho :O"
          callback={() => {
            setErro(false);
          }}
        />
      )}
    </Container>
  );
}
