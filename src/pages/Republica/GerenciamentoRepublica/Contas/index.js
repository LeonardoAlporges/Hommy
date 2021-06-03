import AsyncStorage from '@react-native-community/async-storage';
import { Picker } from 'native-base';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
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

const Contas = forwardRef((props, ref) => {
  const moment = require('moment');

  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const [valorTotalConta, setValorTotal] = useState(0);
  const anoCorrente = moment().format('YYYY');

  useEffect(() => {
    carregarContas();
  }, []);

  const meses = moment.months();

  function valorTotalContas(item) {
    let calculo = 0
    item.map(item => {
      calculo += item.valor
    });
    setValorTotal(calculo);
  }

  const carregarContas = () => {
    api
      .get(`/contas/${props.idRepublica}/${mesSelecionado}/${anoCorrente}`)
      .then(response => {
        console.log(response);
        setListaDeContas(response.data);
        valorTotalContas(response.data);
      })
      .catch(error => {
        setErro(true);
      })
  }

  useImperativeHandle(ref, () => ({
    carregarContas() {
      carregarContas()
    },
  }));

  const [listaDeContas, setListaDeContas] = useState([]);
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
        <Adicionar onPress={() => { props.modalInsercaoDados() }}>
          <LabelBotao>+</LabelBotao>
        </Adicionar>
      </Apresentacao>
      <ItemPicker>
        <Picker
          mode="dropdown"
          style={{ width: 100, height: 100 }}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={mesSelecionado}
          onValueChange={value => {
            setMesSelecionado(value);
            carregarContas();
          }}
          value={mesSelecionado}
        >
          {meses.map((item) => {
            return (<Picker.Item color={'#142850'} label={item} value={item} />);
          })}
        </Picker>
      </ItemPicker>
      {listaDeContas.length == 0 &&
        <SemDados>
          <SemDadosLabel>
            Você nao tem consta para serem exibidas.
        </SemDadosLabel>
        </SemDados>}
      {listaDeContas.length != 0 &&
        <FlatList
          nestedScrollEnabled
          style={{ flex: 1 }}
          data={listaDeContas}
          renderItem={({ item }) => (
            <ListContas onPress={() => { props.modalVisualizacao(item) }}>
              <LabelTitulo>{item.descricao}</LabelTitulo>
              <LabelValor>R${item.valor}</LabelValor>
            </ListContas>
          )}
          keyExtractor={item => item._id}
        />
      }
      <TotalView>
        <LabelTotal>Total</LabelTotal>
        <Linhas />
        <ViewValoraTotal>
          <Total>R$ {valorTotalConta}</Total>
        </ViewValoraTotal>
      </TotalView>
    </Card>
  );
});


export default Contas;
