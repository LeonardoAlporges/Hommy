import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from 'native-base';
import React, { useEffect, useState,forwardRef, useImperativeHandle} from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../../../../service/api';

import {
  Card,
  Apresentacao,
  DadosView,
  Icone,
  SubTitulo,
  Titulo,
  LabelView,
  IconeView,
  IconeDelete,
  ItemPicker,
  Adicionar,
  LabelBotao,
  ListContas,
  LabelTitulo,
  LabelDescricao,
  LabelValor,
  TotalView,
  LabelTotal,
  Linhas,
  Total,
  ViewValoraTotal,
  SemDados,
  SemDadosLabel
} from './styles';

const Tarefas = forwardRef((props, ref) => {
  const moment = require('moment');

  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  useImperativeHandle(ref, () => ({
    carregarTarefas() {
      carregarTarefas()
    },
  }));

  useEffect(() => {
    carregarTarefas();
  }, [])

  const [listaDeTarefas, setListaDeTarefas] = useState([]);

  function carregarTarefas() {
    api
      .get(`/tarefas/${props.idRepublica}`)
      .then(response => {
        console.log("Tarefas:",response)
        setListaDeTarefas(response.data);
      })
      .catch(error => {
        setErro(true);
      });
  }

  const [mesSelecionado, setMesSelecionado] = useState(moment().format('MMMM'));

  return (
    <Card>
      <Apresentacao>
        <IconeView>
          <Icone name="list" />
        </IconeView>
        <LabelView>
          <Titulo>Tarefas</Titulo>
        </LabelView>
        <Adicionar onPress={() => { props.modalInsercaoDados() }}>
          <LabelBotao>+</LabelBotao>
        </Adicionar>
      </Apresentacao>
      {listaDeTarefas.length == 0 ?
        <SemDados>
          <SemDadosLabel>
            Você nao tem consta para serem exibidas.
          </SemDadosLabel>
        </SemDados>
        :
        <FlatList
          nestedScrollEnabled
          style={{ flex: 1 }}
          data={listaDeTarefas}
          renderItem={({ item }) => (
            <ListContas onPress={() => { props.modalVisualizacao(item) }}>
              <LabelTitulo>{item.descricao}</LabelTitulo>
              <LabelValor>Venc: {moment(item.dataLimite).format('DD/MM/YY') }</LabelValor>
            </ListContas>
          )}
          keyExtractor={item => item._id}
        />}
    </Card>
  );
});

export default Tarefas;
