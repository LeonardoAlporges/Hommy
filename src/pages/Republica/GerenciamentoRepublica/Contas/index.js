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
} from './styles';

 const Contas = forwardRef( (props,ref) => { 
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const anoCorrente = moment().format('YYYY');

  useEffect(()=>{
    console.log("props",props);
    carregarContas();
  },[]);

  const carregarContas = () => {
    api
      .get(`/contas/${props.idRepublica}/${mesSelecionado}/${anoCorrente}`)
      .then(response => {
        console.log("contas",response)
        setListaDeContas(response.data);
        AsyncStorage.setItem('REPUBLICA_GERENCIADA_CONTAS', JSON.stringify(response.data));
      })
      .catch(error => {
        setErro(true);
      });
  }

  useImperativeHandle(ref, () => ({
    carregarContas(){
      carregarContas()
    },
  }));

  const [modalContas, setModalContas ] = useState(false);

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
          <ListContas onPress={() => { props.modalVisualizacao() }}>
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
});


export default Contas;
