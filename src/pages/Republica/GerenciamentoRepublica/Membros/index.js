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

export default function Membros(props, { navigation }) {

  const membros = props.membros;

  return (
    <Card>
      <Apresentacao>
        <IconeView>
          <Icone name="list" />
        </IconeView>
        <LabelView>
          <Titulo>Membros</Titulo>
        </LabelView>
        {/* <Adicionar onPress={() => { props.modalInsercaoDados() }}>
          <LabelBotao>+</LabelBotao>
        </Adicionar> */}
      </Apresentacao>
      <FlatList
        nestedScrollEnabled
        style={{ flex: 1 }}
        data={membros}
        renderItem={({ item }) => (
          <ListContas onPress={() => { props.modalVisualizacao(item) }}>
            <LabelTitulo>{item.nome}</LabelTitulo>
          </ListContas>
        )}
        keyExtractor={item => item._id}
      />
    </Card>
  );
}
