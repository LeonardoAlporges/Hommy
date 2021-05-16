import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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
} from './styles';

export default function Tarefas(props, { navigation }) {
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const [listaDeContas, setListaDeContas] = useState([
    {
      id: 9,
      nome: "Lixo",
      periodo: 200,
    },
    {
      id: 8,
      nome: "Arrumar",
      periodo: 200,
    },
    {
      id: 7,
      nome: "Teste",
      periodo: 200,
    }, {
      id: 7,
      nome: "Teste",
      periodo: 200,
    }, {
      id: 7,
      nome: "Teste",
      periodo: 200,
    }, {
      id: 7,
      nome: "Teste",
      periodo: 200,
    },
  ]);

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
        <Adicionar>
          <LabelBotao>+</LabelBotao>
        </Adicionar>
      </Apresentacao>
      <FlatList
        nestedScrollEnabled
        style={{ flex: 1 }}
        data={listaDeContas}
        renderItem={({ item }) => (
          <ListContas>
            <LabelTitulo>{item.nome}</LabelTitulo>
            <LabelValor>R${item.periodo}</LabelValor>
          </ListContas>
        )}
        keyExtractor={item => item._id}
      />
      <TotalView>
        <LabelTotal>Total</LabelTotal>
        <Linhas />
        <ViewValoraTotal>
          <Total>R$ 300</Total>
        </ViewValoraTotal>
      </TotalView>
    </Card>
  );
}
