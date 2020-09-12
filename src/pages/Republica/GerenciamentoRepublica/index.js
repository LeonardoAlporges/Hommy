import React, { Component, useState, useEffect } from 'react';
import { Container, AdicionarRepublica, Titulo, V_titulo, FieldSetLarge, LabelFielSet, Linha, FieldSetRua, Linha2, FieldSetNumero, ViewBotaoADD, ViewTarefas, ViewTitulo, BotaoAdicionarConta, LabelBotaoADD, Botao, CardsContas, NomeConta, ValorConta, ViewContas, TituloEPicker, TituloSession, LinhaBotao, LabelBotao, ViewNomeRepublica, NomeRepublica, TelaGerenciamento } from './styles';

import HeaderBack from '../../../components/CustomHeader';
import { View, Text, Image, FlatList, Modal } from 'react-native'
import { Input, Item, Picker } from 'native-base';
import { set } from 'lodash';
import api from '../../../service/api';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export default function GerenciamentoDeRepublica({ navigation }) {
  useEffect(() => {

  }, [listaContas, listaMebros, listaTarefas])
  const listaContas = [{
    nome: 'Luz',
    valor: '94,00R$',
    id: 1,
  }, {
    nome: 'Gás',
    valor: '75,00R$',
    id: 2,
  }, {
    nome: 'Internet',
    valor: '140,00R$',
    id: 3,
  }, {
    nome: 'Empregada',
    valor: '100,00R$',
    id: 4,
  },]
  const listaMebros = [{
    nome: 'Leonardo Alporges',
    id: 1,
  }, {
    nome: 'Robinson Lima',
    id: 2,
  }, {
    nome: 'Giuliano Prado Moraes',
    id: 3,
  }, {
    nome: 'Aleg Biano',
    id: 4,
  },]
  const listaTarefas = [{
    nome: 'Limpar banheiro',
    id: 1,
  }, {
    nome: 'Compra Gás',
    id: 2,
  }, {
    nome: 'Festa dia 05',
    id: 3,
  }, {
    nome: 'Empregada',
    id: 4,
  },]
  function adicionarContas() {
    listaContas.push(nomeConta, valorConta)
    setAdiconarConta(!adiconarConta);
    console.log(listaContas);
    console.log(nomeConta, valorConta);

  }
  const email = useSelector(state => state.user.email);
  const [adiconarConta, setAdiconarConta] = useState(true)
  const [existeRepublica, setExisteRepublica] = useState(false)
  const [modal, setModal] = useState(false)
  const [nomeRepublica, setNomeRepublica] = useState()
  const [valorConta, setValorConta] = useState('');
  const [nomeConta, setNomeConta] = useState('');
  const [erro, setErro] = useState(false);

  function cadastrarRepublica() {
    const data = {
      email: email,
      nomeRepublica: nomeRepublica
    }
    console.log(data)
    api.post(`/gerenciaRepublica`, data)
      .then(response => {
        console.log(response)
        AsyncStorage.setItem('REPUBLICA_GERENCIADA', JSON.stringify(data));
        setExisteRepublica(true);

      })
      .catch(error => {
        console.log(error.response);
        setErro(true);
        console.log('erro')
      });
  }

  return (
    <Container>
      <HeaderBack title="Gerenciamento de republica" onNavigation={() => navigation.goBack(null)} />
      {!existeRepublica ? (
        <AdicionarRepublica>

          <Image
            source={require('../../../assets/Img/adicionar_republica.png')}
            style={{ width: 150, height: 150 }}
          />
          <V_titulo><Titulo>
            Voce ainda nao tem uma republica cadastrada para gerenciar
          </Titulo></V_titulo>
          <Linha>
            <FieldSetLarge>
              <LabelFielSet>Nome Republica</LabelFielSet>
              <Item style={{ borderColor: 'transparent' }}>
                <Input
                  placeholderStyle={{ fontFamily: 'WorkSans' }}
                  onChangeText={value => setNomeRepublica(value)}
                  onBlur={value => setNomeRepublica(value)}
                  placeholder="Nome da sua republica"
                  placeholderTextColor="#989898"
                />
              </Item>
            </FieldSetLarge>
          </Linha>
          <LinhaBotao>
            <Botao onPress={() => cadastrarRepublica()}><LabelBotao>Continuar cadastro</LabelBotao></Botao>
          </LinhaBotao>
        </AdicionarRepublica>
      ) : (
          <TelaGerenciamento>
            <ViewNomeRepublica>
              <NomeRepublica>{nomeRepublica}</NomeRepublica>
            </ViewNomeRepublica>
            <ViewContas>
              <TituloEPicker>
                <TituloSession>Contas do mês</TituloSession>
                <Item style={{ width: 120, height: 30 }}>
                  <Picker
                    mode="dropdown"
                    style={{ width: undefined }}
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff"
                    selectedValue={'Agosto'}
                    value={'Agosto'}
                  >
                    <Picker.Item label="Agosto" value="Não informado" />
                    <Picker.Item label="Setembro" value="1" />
                    <Picker.Item label="Outubro" value="2" />
                    <Picker.Item label="Novembro" value="3" />
                    <Picker.Item label="Dezembro" value="4" />
                  </Picker>
                </Item>

              </TituloEPicker>
              <FlatList
                style={{ backgroundColor: '#f8f8f8', marginTop: 5, borderRadius: 4, borderWidth: 1, borderColor: '#e2e2e2', width: '100%', maxHeight: 160 }}
                data={listaContas}
                renderItem={({ item }) => <CardsContas><NomeConta>{item.nome}</NomeConta><ValorConta>{item.valor}</ValorConta></CardsContas>}
                keyExtractor={item => item.id}
              />
              <CardsContas><NomeConta style={{ fontFamily: 'WorkSans-Bold' }}>Valor dividido para 4 membros</NomeConta><ValorConta style={{ fontFamily: 'WorkSans-Bold' }}>98,00R$</ValorConta></CardsContas>
              {adiconarConta ?
                <ViewBotaoADD >
                  <BotaoAdicionarConta onPress={() => setAdiconarConta(!adiconarConta)}><LabelBotaoADD>Adiconar Conta</LabelBotaoADD></BotaoAdicionarConta>
                </ViewBotaoADD>
                :
                <View>
                  <Linha2>
                    <FieldSetRua>
                      <LabelFielSet>Descrição</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          onChangeText={value => setNomeConta(value)}
                          onBlur={value => setNomeConta(value)}

                          placeholder=""
                        />
                      </Item>
                    </FieldSetRua>
                    <FieldSetNumero>
                      <LabelFielSet>Valor</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          onChangeText={value => setValorConta(value)}
                          onBlur={value => setValorConta(value)}

                          style={{ justifyContent: 'center' }}
                          keyboardType="number-pad"
                          placeholder=""
                        />
                      </Item>
                    </FieldSetNumero>
                  </Linha2>
                  <ViewBotaoADD >
                    <BotaoAdicionarConta onPress={() => adicionarContas()}><LabelBotaoADD>Adicionar</LabelBotaoADD></BotaoAdicionarConta>
                  </ViewBotaoADD>
                </View>
              }



            </ViewContas>
            <ViewTarefas>
              <ViewTitulo>
                <TituloSession>Tarefas/Eventos</TituloSession>
              </ViewTitulo>
              <FlatList
                style={{ backgroundColor: '#f8f8f8', marginTop: 5, borderRadius: 4, borderWidth: 1, borderColor: '#e2e2e2', width: '100%', maxHeight: 160 }}
                data={listaTarefas}
                renderItem={({ item }) => <CardsContas><NomeConta numberOfLines={1}>{item.nome}</NomeConta></CardsContas>}
                keyExtractor={item => item.id}
              />
              <ViewBotaoADD >
                <BotaoAdicionarConta><LabelBotaoADD>Adiconar Tarefa</LabelBotaoADD></BotaoAdicionarConta>
              </ViewBotaoADD>
            </ViewTarefas>
            <ViewTarefas>
              <ViewTitulo>
                <TituloSession>Membros</TituloSession>
              </ViewTitulo>
              <FlatList
                style={{ backgroundColor: '#f8f8f8', marginTop: 5, borderRadius: 4, borderWidth: 1, borderColor: '#e2e2e2', width: '100%', maxHeight: 160 }}
                data={listaTarefas}
                renderItem={({ item }) => <CardsContas><NomeConta numberOfLines={1}>{item.nome}</NomeConta></CardsContas>}
                keyExtractor={item => item.id}
              />
              <ViewBotaoADD >
                <BotaoAdicionarConta><LabelBotaoADD>Adiconar Membro</LabelBotaoADD></BotaoAdicionarConta>
              </ViewBotaoADD>
            </ViewTarefas>
            <ViewBotaoADD></ViewBotaoADD>

          </TelaGerenciamento>
        )}

    </Container>

  );
}
