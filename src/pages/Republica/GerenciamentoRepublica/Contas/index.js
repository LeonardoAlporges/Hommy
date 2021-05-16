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

export default function Contas(props, { navigation }) {
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const [listaDeContas, setListaDeContas] = useState([
    {
      id: 9,
      titulo: "Aluguel",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 8,
      titulo: "Internet",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    },
    {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    }
    , {
      id: 7,
      titulo: "Luz",
      valorTotal: 200,
      valorParcela: 100,
    }



  ]);

  function listContas(item) {
    return (
      <ListContas>
        <LabelTitulo>{item.titulo}</LabelTitulo>
        <LabelDescricao>R${item.valorTotal}</LabelDescricao>
        <LabelValor>R${item.valorParcela}</LabelValor>
      </ListContas>
    )
  }

  const [mesSelecionado, setMesSelecionado] = useState(moment().format('MMMM'));

  return (
    <Card>
      <Apresentacao>
        <IconeView>
          <Icone name="list" />
        </IconeView>
        <LabelView>
          <Titulo>Contas do mês</Titulo>
        </LabelView>
        <Adicionar>
          <LabelBotao>+</LabelBotao>
        </Adicionar>
      </Apresentacao>
      <ItemPicker>
        <Picker
          mode="dropdown"
          style={{ width: 100 }}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={mesSelecionado}
          onValueChange={value => {
            setMesSelecionado(value);
          }}
          value={mesSelecionado}
        >
          <Picker.Item color={'#142850'} label="Janeiro" value="Janeiro" />
          <Picker.Item color={'#142850'} label="Fevereiro" value="Fevereiro" />
          <Picker.Item color={'#142850'} label="Março" value="Março" />
          <Picker.Item color={'#142850'} label="Abril" value="Abril" />
          <Picker.Item color={'#142850'} label="Maio" value="Maio" />
        </Picker>
      </ItemPicker>

      <FlatList
      nestedScrollEnabled 
      style={{flex: 1}}
        data={listaDeContas}
        renderItem={({ item }) => (
          <ListContas>
            <LabelTitulo>{item.titulo}</LabelTitulo>
            <LabelDescricao>R${item.valorTotal}</LabelDescricao>
            <LabelValor>R${item.valorParcela}</LabelValor>
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

