import React, { Component, useState, useEffect } from 'react';
import { Container, AdicionarRepublica, Titulo, V_titulo, FieldSetLarge, LabelFielSet, Linha, FieldSetRua, Linha2, FieldSetNumero, ViewBotaoADD, ViewTarefas, ViewTitulo, Data, BotaoAdicionarConta, LabelBotaoADD, Botao, CardsContas, NomeConta, ValorConta, ViewContas, TituloEPicker, TituloSession, LinhaBotao, LabelBotao, ViewNomeRepublica, NomeRepublica, TelaGerenciamento } from './styles';

import HeaderBack from '../../../components/CustomHeader';
import { View, Text, Image, FlatList, Modal } from 'react-native'
import { Input, Item, Picker, DatePicker } from 'native-base';
import { map, set, values } from 'lodash';
import api from '../../../service/api';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { asyncStorage } from 'reactotron-react-native';

export default function GerenciamentoDeRepublica({ navigation }) {

  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  });
  const anoCorrente = moment().format('YYYY');
  const [idRepublica, setIdRepublica] = useState('')
  const email = useSelector(state => state.user.email);
  const [adiconarContaButao, setAdiconarContaButao] = useState(true)
  const [adiconarTarefaButao, setAdiconarTarefaButao] = useState(true)
  const [nomeTarefa, setNomeTarefa] = useState('');
  const [emailMebroSelecionado, setEmailMebroSelecionado] = useState('');
  const [existeRepublica, setExisteRepublica] = useState(false)
  const [modal, setModal] = useState(false)
  const [nomeRepublica, setNomeRepublica] = useState()
  const [valorConta, setValorConta] = useState('');
  const [nomeConta, setNomeConta] = useState('');
  const [erro, setErro] = useState(false);
  const [dataVencimento, setDataVencimento] = useState(null)
  const [listaDeContas, setListaDeContas] = useState([]);
  const [listaDeMebros, setListaDeMebros] = useState([]);
  const [listaDeTarefas, setListaDeTarefas] = useState([])
  const [republica, setRepublica] = useState();
  const [mesSelecionado, setMesSelecionado] = useState(moment().format('MMMM'));
  const [valorGeralContas, setValorGeralContas] = useState(0);


  useEffect(() => {
    verificarSeJaCadastrou();
  }, []);

  useEffect(() => {
    alterarValorGeralDasContas();
  }, [listaDeContas]);

  useEffect(() => {
    buscarContas();
    buscarTarefas();
  }, [idRepublica]);

  //CADASTRO ESTA OK
  function cadastrarRepublica() {
    const data = {
      email: email,
      nomeRepublica: nomeRepublica
    }
    api.post(`/gerenciaRepublica`, data)
      .then(response => {
        setRepublica(response.data)
        AsyncStorage.setItem('REPUBLICA_GERENCIADA', JSON.stringify(response.data));
      })
      .catch(error => {
        setErro(true);
      });
  }

  function alterarValorGeralDasContas() {
    var valores = 0
    listaDeContas.map((item) => {
      valores = valores + item.valor;
    })
    setValorGeralContas(valores)
  }

  async function verificarSeJaExiste() {
    //await AsyncStorage.getItem('REPUBLICA_GERENCIADA').then(value => {
    //console.log(value)
    // if (value != null) {
    //   setExisteRepublica(true)
    //   preencherVariaveis(value);
    // } else {
    // AsyncStorage.getItem('REPUBLICA_GERENCIADA').then(value => { console.log(JSON.parse(value)) })
    // AsyncStorage.getItem('REPUBLICA_GERENCIADA_CONTAS').then(value => { console.log(JSON.parse(value)) })
    // AsyncStorage.getItem('REPUBLICA_GERENCIADA_TAREFAS').then(value => { console.log(JSON.parse(value)) })
    // AsyncStorage.getItem('REPUBLICA_GERENCIADA_MEMBROS').then(value => { console.log(JSON.parse(value)) })
    //}
    // });
  }

  //
  async function verificarSeJaCadastrou() {
    await api.get(`/gerenciaRepublica/${'leo@teste.com'}`)
      .then(response => {
        console.log("res", response)
        setListaDeMebros(listaDeMebros.concat(response.data.membros))
        setRepublica(response.data);
        setIdRepublica(response.data._id);
        AsyncStorage.setItem('REPUBLICA_GERENCIADA', JSON.stringify(response.data));
        AsyncStorage.setItem('REPUBLICA_GERENCIADA_MEMBROS', JSON.stringify(response.data.membros));
        setExisteRepublica(true)
      })
      .catch(error => {
        console.log(error.response);
        setErro(true);
      });
  }

  function atulizarListaContas(value) {
    setMesSelecionado(value)
    setListaDeContas([]);
    //buscarContas();
  }
  function buscarContas() {
    api.get(`/contas/${idRepublica}/${mesSelecionado}/${anoCorrente}`)
      .then(response => {
        setListaDeContas(listaDeContas.concat(response.data))
        AsyncStorage.setItem('REPUBLICA_GERENCIADA_CONTAS', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
        setErro(true);
      });
  }
  function adicionarConta() {
    setAdiconarContaButao(!adiconarContaButao);
    const data = {
      descricao: nomeConta,
      valor: valorConta,
      vencimento: dataVencimento,
      idRepublica: idRepublica,
    }
    api.post(`/contas/`, data)
      .then(response => {
        console.log(response);
        setListaDeContas(listaDeContas.concat(response.data))
      })
      .catch(error => {
        console.log(error);
        setErro(true);
      });
    setNomeConta('');
    setValorConta('');
    setDataVencimento(null);
  }


  function adicionarTarefa() {
    setAdiconarTarefaButao(!adiconarTarefaButao);
    console.log('EMAIL:', emailMebroSelecionado)
    const data = {
      descricao: nomeTarefa,
      email: 'leo@teste.com',
      dataLimite: dataVencimento,
      idRepublica: idRepublica,
    }
    api.post(`/tarefas/`, data)
      .then(response => {
        console.log('TAREFFA POSTADA', response)
        setListaDeTarefas(listaDeTarefas.concat(response.data))
      })
      .catch(error => {
        console.log(error.response);
        setErro(true);
      });
    setNomeTarefa('');
    setEmailMebroSelecionado('');
    setDataVencimento(null);
  }

  function buscarTarefas() {

    api.get(`/tarefas/${idRepublica}`,)
      .then(response => {
        setListaDeTarefas(listaDeTarefas.concat(response.data))
        AsyncStorage.setItem('REPUBLICA_GERENCIADA_TAREFAS', JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
        setErro(true);
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
              <NomeRepublica>{republica.republica}</NomeRepublica>
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
                    selectedValue={mesSelecionado}
                    onValueChange={value => { atulizarListaContas(value) }}
                    value={mesSelecionado}
                  >
                    <Picker.Item label="Agosto" value="Não informado" />
                    <Picker.Item label="Setembro" value="Setembro" />
                    <Picker.Item label="Outubro" value="Outubro" />
                    <Picker.Item label="Novembro" value="Novembro" />
                    <Picker.Item label="Dezembro" value="Dezembro" />
                  </Picker>
                </Item>

              </TituloEPicker>
              <FlatList
                style={{ backgroundColor: '#f8f8f8', marginTop: 5, borderRadius: 4, borderWidth: 1, borderColor: '#e2e2e2', width: '100%', maxHeight: 160 }}
                data={listaDeContas}
                renderItem={({ item }) => <CardsContas delayLongPress={1} onLongPress={() => setAdiconarContaButao(!adiconarContaButao)}  ><NomeConta>{item.descricao}</NomeConta><ValorConta>{item.valor} R$</ValorConta></CardsContas>}
                keyExtractor={item => item._id}
              />
              <CardsContas><NomeConta style={{ fontFamily: 'WorkSans-Bold' }}>Valor dividido para 4 membros</NomeConta><ValorConta style={{ fontFamily: 'WorkSans-Bold' }}>{valorGeralContas} R$</ValorConta></CardsContas>
              {adiconarContaButao ?
                <ViewBotaoADD >
                  <BotaoAdicionarConta onPress={() => setAdiconarContaButao(!adiconarContaButao)}><LabelBotaoADD>Adiconar Conta</LabelBotaoADD></BotaoAdicionarConta>
                </ViewBotaoADD>
                :
                <View>
                  <Linha2 style={{ marginTop: 15 }} >
                    <FieldSetRua>
                      <LabelFielSet>Descrição</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          onChangeText={value => setNomeConta(value)}
                          placeholder=""
                        />
                      </Item>
                    </FieldSetRua>
                    <FieldSetNumero>
                      <LabelFielSet>Valor</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          onChangeText={value => setValorConta(value)}

                          style={{ justifyContent: 'center' }}
                          keyboardType="number-pad"
                          placeholder=""
                        />
                      </Item>

                    </FieldSetNumero>
                    <FieldSetRua>
                      <LabelFielSet>Vencimento</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <DatePicker
                          defaultDate={new Date()}
                          minimumDate={new Date()}
                          locale={'pt-br'}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={true}
                          animationType={'slide'}
                          androidMode={'default'}
                          placeHolderText="__/__/___"
                          onDateChange={date => {
                            setDataVencimento(date);
                          }}
                          disabled={false}
                        />
                      </Item>
                    </FieldSetRua>
                  </Linha2>
                  <ViewBotaoADD >
                    <BotaoAdicionarConta onPress={() => adicionarConta()}><LabelBotaoADD>Adicionar</LabelBotaoADD></BotaoAdicionarConta>
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
                data={listaDeTarefas}
                renderItem={({ item }) => <CardsContas><NomeConta numberOfLines={1}>{item.descricao}</NomeConta></CardsContas>}
                keyExtractor={item => item._id}
              />
              {adiconarTarefaButao ?
                <ViewBotaoADD >
                  <BotaoAdicionarConta onPress={() => setAdiconarTarefaButao(!adiconarTarefaButao)}><LabelBotaoADD>Adiconar tarefa</LabelBotaoADD></BotaoAdicionarConta>
                </ViewBotaoADD>
                :
                <View>
                  <Linha2 style={{ marginTop: 15 }} >
                    <FieldSetRua style={{ width: '58%' }}>
                      <LabelFielSet>Descrição</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          onChangeText={value => setNomeTarefa(value)}
                          placeholder=""
                        />
                      </Item>
                    </FieldSetRua>

                    <FieldSetRua>
                      <LabelFielSet>Data Limite</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <DatePicker
                          defaultDate={new Date()}
                          minimumDate={new Date()}
                          locale={'pt-br'}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={true}
                          animationType={'slide'}
                          androidMode={'default'}
                          placeHolderText="__/__/___"
                          onDateChange={date => {
                            setDataVencimento(date);
                          }}
                          disabled={false}
                        />
                      </Item>
                    </FieldSetRua>
                  </Linha2>
                  <Linha2 style={{ marginTop: 20, marginBottom: 10 }}>
                    <FieldSetLarge>
                      <LabelFielSet>Membro</LabelFielSet>

                      <Item style={{ borderColor: 'transparent' }}>
                        <Picker
                          mode="dropdown"
                          style={{ width: undefined }}
                          placeholderIconColor="#007aff"

                          selectedValue={emailMebroSelecionado}
                          onValueChange={value => setEmailMebroSelecionado(value)}
                          value={emailMebroSelecionado}
                          onChangeText={value => setEmailMebroSelecionado(value)}
                        >
                          <Picker.Item label="Selecione um membro" value="Não informado" />
                          {listaDeMebros.map((item) => { return (<Picker.Item label={item.nome} value={item.email} />) })}
                        </Picker>
                      </Item>

                    </FieldSetLarge>
                  </Linha2>
                  <ViewBotaoADD >
                    <BotaoAdicionarConta onPress={() => adicionarTarefa()}><LabelBotaoADD>Adicionar</LabelBotaoADD></BotaoAdicionarConta>
                  </ViewBotaoADD>
                </View>
              }
            </ViewTarefas>

            <ViewTarefas>
              <ViewTitulo>
                <TituloSession>Membros</TituloSession>
              </ViewTitulo>
              <FlatList
                style={{ backgroundColor: '#f8f8f8', marginTop: 5, borderRadius: 4, borderWidth: 1, borderColor: '#e2e2e2', width: '100%', maxHeight: 160 }}
                data={listaDeMebros}
                renderItem={({ item }) => <CardsContas><NomeConta numberOfLines={1}>{item.nome}</NomeConta></CardsContas>}
                keyExtractor={item => item._id}
              />
            </ViewTarefas>
            <ViewBotaoADD></ViewBotaoADD>
          </TelaGerenciamento>
        )
      }
    </Container >

  );
}
