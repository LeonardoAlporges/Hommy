import React, { useEffect, useState } from 'react';
import { Modal, View, Text } from 'react-native';
import { FakeCurrencyInput } from 'react-native-currency-input';
import api from '../../service/api';
import { ViewModal, Iconefechar, BotaoFechar, Container, ViewTitulo,BotaoExcluir, Titulo, Topico, Valor } from './styles';

export default function ModalIformativoGerenciamento(props) {

  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const [modalVisivel, setModalVisible] = useState(true);

  function onClose() {
    props.onClose();
  }

  function excluirTarefa() {
    api
      .delete(`/tarefas/${props.item._id}`)
      .then(response => {
        props.onClose();
      })
      .catch(error => {
        setErro(true);
      });
  }
  function excluirConta() {
    api
      .delete(`/contas/${props.item._id}`)
      .then(response => {
        console.log("response")
        props.onClose();
      })
      .catch(() => {
        setErro(true);
      });
  }


  if(props.contas){
    return (
      <Modal animationType="fade" visible={modalVisivel} transparent={true} >
        <Container>
          <ViewModal>
            <ViewTitulo>
              <Titulo>
                Conta do mês
                </Titulo>
              <BotaoFechar onPress={() => onClose()}>
                <Iconefechar name="close" />
              </BotaoFechar>
            </ViewTitulo>
            <Topico numberOfLines={3}>Descrição</Topico>
            <Valor >{props.item.descricao}</Valor>
            <Topico numberOfLines={2}>Valor</Topico>
            <Valor>R$ {props.item.valor}</Valor>
            <BotaoExcluir onPress={()=>{excluirConta()}}>
              <Iconefechar name="trash-can-outline" />
            </BotaoExcluir>
          </ViewModal>
        </Container>
      </Modal>
    );
  }
  
  if(props.tarefas){
    return (
      <Modal animationType="fade" visible={modalVisivel} transparent={true} >
        <Container>
          <ViewModal>
            <ViewTitulo> 
              <Titulo>
               Tarefa
                </Titulo>
                 <BotaoExcluir  onPress={()=>{excluirTarefa()}}>
              <Iconefechar name="trash-can-outline" />
            </BotaoExcluir>
              <BotaoFechar onPress={() => onClose()}>
                <Iconefechar name="close" />
              </BotaoFechar>
            </ViewTitulo>
            <Topico>Descrição</Topico>
            <Valor  numberOfLines={3}>{props.item.descricao}</Valor>
            <Topico>Vencimento</Topico>
            <Valor>{moment(props.item.dataLimite).format('DD/MM/YY') }</Valor>
            <Topico>Responsavel</Topico>
            <Valor>{props.item.responsavel.nome}</Valor>
           
          </ViewModal>
        </Container>
      </Modal>
    );
  }

  if(props.membros){
    return (
      <Modal animationType="fade" visible={modalVisivel} transparent={true} >
        <Container>
          <ViewModal>
            <ViewTitulo>
              <Titulo>
                Membro
                </Titulo>
              <BotaoFechar onPress={() => onClose()}>
                <Iconefechar name="close" />
              </BotaoFechar>
            </ViewTitulo>
            <Topico numberOfLines={3}>Nome </Topico>
            <Valor >{props.item.nome}</Valor>
            <Topico numberOfLines={2}>Email</Topico>
            <Valor>{props.item.email}</Valor>
          </ViewModal>
        </Container>
      </Modal>
    );
  }
  

}