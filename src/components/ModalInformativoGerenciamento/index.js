import React, { useEffect, useState } from 'react';
import { Modal, View, Text } from 'react-native';
import api from '../../service/api';
import { ViewModal, Iconefechar, BotaoFechar, Container, ViewTitulo, Titulo, Topico, Valor } from './styles';

export default function ModalIformativoGerenciamento(props) {

  const [modalVisivel, setModalVisible] = useState(true);

  function onClose() {
    props.onClose();
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
            <Valor >{"Descrição do aluguel Descrição do aluguel Descrição do aluguel Descrição do aluguel "}</Valor>
            <Topico numberOfLines={2}>Valor</Topico>
            <Valor>R$ {"100.00"}</Valor>
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
              <BotaoFechar onPress={() => onClose()}>
                <Iconefechar name="close" />
              </BotaoFechar>
            </ViewTitulo>
            <Topico>Descrição</Topico>
            <Valor  numberOfLines={3}>{"Descrição do aluguel Descrição do aluguel Descrição do aluguel Descrição do aluguel "}</Valor>
            <Topico>Vencimento</Topico>
            <Valor>{"10/10/2020"}</Valor>
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
            <Valor >{"Leonardo"}</Valor>
            <Topico numberOfLines={2}>Email</Topico>
            <Valor>{"Leonardofixaa@gmail.com"}</Valor>
          </ViewModal>
        </Container>
      </Modal>
    );
  }
  

}