import AsyncStorage from '@react-native-community/async-storage';
import { DatePicker, Input, Item, Picker } from 'native-base';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';
import ModalAdicaoContas from '../../../../components/ModalAdicaoContas';
import ModalIformativoGerenciamento from '../../../../components/ModalInformativoGerenciamento';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import Loading from '../../../../components/Loading';

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
import ModalAdicaoTarefas from '../../../../components/ModalAdicaoTarefas';

export function Gerenciamento(props, { navigation }) {


  
  useEffect(()=>{console.log(props)},[])
  const [erro, setErro] = useState(false);

  const idRepublica = props.navigation.state.params.idRepublica;
  const nomeRepublica =props.navigation.state.params.nomeRepublica;
  const codigorepublica = props.navigation.state.params.codigoRepublica;
  const membros = props.navigation.state.params.membros;

  const [modalContasVisible, setModalContaVisible] = useState(false);
  const [modalTarefaVisible, setModalTarefaVisible] = useState(false);
  const [modalMembroVisible, setModalMembroVisible] = useState(false);

  const [modalContasDadosVisible, setModalContaDadosVisible] = useState(false);
  const [modalTarefaDadosVisible, setModalTarefaDadosVisible] = useState(false);
  const [modalMembroDadosVisible, setModalMembroDadosVisible] = useState(false);

  const [item, setItem] = useState(null);
  const contaRef = useRef(null);
  const tarefaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  function abrirModalContas(item) {
    setItem(item);
    setModalContaVisible(true);
  }
  function abrirModalTarefas(item) {
    setItem(item);
    setModalTarefaVisible(true);
  }
  function abrirModalMembro(item) {
    setItem(item);
    setModalMembroVisible(true);
  }


  function excluirRepublica() {
    api
      .delete(`/gerenciaRepublica/${idRepublica}`)
      .then(response => {
        props.navigation.goBack(null);
        console.log(response)
      })
      .catch(error => {
        console.log(error)

        setErro(true);
      });
  }

  function fecharModalConta() {
    contaRef.current.carregarContas()
    setModalContaVisible(false);
    setModalContaDadosVisible(false);
  }

  function fecharModalTarefa() {
    tarefaRef.current.carregarTarefas()
    setModalTarefaVisible(false);
    setModalTarefaDadosVisible(false);
  }

  function fecharModalMembro() {
    setModalMembroDadosVisible(false);
    setModalMembroVisible(false);
  }

  return (
    <Container altura={Dimensions.get('window').height} >
      {loading && <Loading />}
      <HeaderBack title="Gerenciamento de republica" onNavigation={() =>props.navigation.goBack(null) } />

      <Apresentacao>
        <IconeView>
          <Icone name="home" />
        </IconeView>
        <LabelView>
          <SubTitulo>
            Republica
          </SubTitulo>
          <Titulo>
            {nomeRepublica} ({codigorepublica})
          </Titulo>
        </LabelView>
        <IconeView onPress={()=> excluirRepublica()}>
          <IconeDelete name="trash" />
        </IconeView>
      </Apresentacao>
      <ScrollView style={{ marginBottom: '5%' }}>
        <Contas idRepublica={idRepublica} ref={contaRef} modalVisualizacao={item => { abrirModalContas(item) }} modalInsercaoDados={() => { setModalContaDadosVisible(true) }} ></Contas>
        <Tarefas idRepublica={idRepublica} ref={tarefaRef} modalVisualizacao={item=> { abrirModalTarefas(item) }}  modalInsercaoDados={() => { setModalTarefaDadosVisible(true) }} ></Tarefas>
        <Membros idRepublica={idRepublica} membros={membros} modalVisualizacao={item => { abrirModalMembro(item) }} ></Membros>
      </ScrollView>

      {modalContasDadosVisible && <ModalAdicaoContas idRepublica={idRepublica} onClose={() => { fecharModalConta() }} visivel={true} />}
      {modalTarefaDadosVisible && <ModalAdicaoTarefas idRepublica={idRepublica}  tarefas={true} onClose={() => {fecharModalTarefa()}} visivel={true} />}

      {modalContasVisible && <ModalIformativoGerenciamento contas={true} item={item} onClose={() => { fecharModalConta() }} visivel={true} />}
      {modalTarefaVisible && <ModalIformativoGerenciamento tarefas={true} item={item}  onClose={() => { fecharModalTarefa() }} visivel={true} />}
      {modalMembroVisible && <ModalIformativoGerenciamento membros={true} item={item} onClose={() => { fecharModalMembro() }} visivel={true} />}
      
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

export default withNavigation(Gerenciamento);