import AsyncStorage from '@react-native-community/async-storage';
import { DatePicker, Input, Item, Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import { CustomModal } from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import Gerenciamento from './Gerenciamento';
import CadastroGerenciamentoRepublica from './Home'
import {
  AdicionarRepublica,
  Botao,
  BotaoAdicionarConta,
  CardsContas,
  Container,
  EmptyContas,
  FieldSetLarge,
  FieldSetNumero,
  FieldSetRua,
  LabelBotao,
  LabelBotaoADD,
  LabelFielSet,
  Linha,
  Linha2,
  LinhaBotao,
  NomeConta,
  NomeRepublica,
  TelaGerenciamento,
  Titulo,
  TituloEPicker,
  TituloSession,
  ValorConta,
  ViewBotaoADD,
  ViewContas,
  ViewNomeRepublica,
  ViewTarefas,
  ViewTitulo,
  V_titulo
} from './styles';

export default function GerenciamentoDeRepublica({ navigation }) {
  // const moment = require('moment');
  // moment.locale('pt', {
  //   months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  // });
  // const [codigoRepublica, setCodigoRepublica] = useState();
  // const anoCorrente = moment().format('YYYY');
  // const [idRepublica, setIdRepublica] = useState();
  // const email = useSelector(state => state.user.email);
  // const [adiconarContaButao, setAdiconarContaButao] = useState(true);
  // const [adiconarTarefaButao, setAdiconarTarefaButao] = useState(true);
  // const [nomeTarefa, setNomeTarefa] = useState('');
  // const [emailMebroSelecionado, setEmailMebroSelecionado] = useState('');
  // const [existeRepublica, setExisteRepublica] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [nomeRepublica, setNomeRepublica] = useState('');
  // const [valorConta, setValorConta] = useState('');
  // const [nomeConta, setNomeConta] = useState('');
  // const [erro, setErro] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [dataVencimento, setDataVencimento] = useState(new Date());
  // const [listaDeContas, setListaDeContas] = useState([]);
  // const [listaDeMebros, setListaDeMebros] = useState([]);
  // const [listaDeTarefas, setListaDeTarefas] = useState([]);
  // const [republica, setRepublica] = useState();
  // const [emailMembroConvite, setEmailMembroConvite] = useState();
  // const [mesSelecionado, setMesSelecionado] = useState(moment().format('MMMM'));
  // const [valorGeralContas, setValorGeralContas] = useState(0);
  // const [adiconarMembroButao, setAdiconarMembroButao] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [idTipoSelecionado, setIdTipoSelecionado] = useState();
  // const [tipoDeInformacao, setTipoDeInformacao] = useState();
  // const [responsavelTarefa, setResponsavelTarefa] = useState();

  // const handleChangeInput = event => {
  //   setNomeRepublica(event);
  // };

  // useEffect(() => {
  //   verificarSeJaCadastrou();
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   setListaDeContas([]);
  //   buscarContas();
  // }, [mesSelecionado]);

  // useEffect(() => {
  //   alterarValorGeralDasContas();
  // }, [listaDeContas]);

  // useEffect(() => {
  //   setLoading(true);
  //   buscarContas();
  //   buscarTarefas();
  //   setLoading(false);
  // }, [existeRepublica]);

  // function adicionarMembroPorCodigo() {
  //   const data = {
  //     email: email
  //   };

  //   api
  //     .put(`/gerenciaRepublica/membros/${codigoRepublica}`, data)
  //     .then(response => {
  //       verificarSeJaCadastrou();
  //     })
  //     .catch(error => { });
  // }
  // function cadastrarRepublica() {
  //   const data = {
  //     email: email,
  //     nomeRepublica: nomeRepublica
  //   };

  //   api
  //     .post(`/gerenciaRepublica`, data)
  //     .then(response => {
  //       setListaDeMebros(listaDeMebros.concat(response.data.membros));
  //       setRepublica(response.data);
  //       setIdRepublica(response.data._id);
  //       setExisteRepublica(true);
  //       // AsyncStorage.setItem('REPUBLICA_GERENCIADA', JSON.stringify(response.data));
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }


  // function alterarValorGeralDasContas() {
  //   var valores = 0;
  //   listaDeContas.map(item => {
  //     valores = valores + item.valor;
  //   });
  //   setValorGeralContas(valores / listaDeMebros.length);
  // }

  // function verificarSeJaCadastrou() {
  //   api
  //     .get(`/gerenciaRepublica/${email}`)
  //     .then(response => {
  //       if (response.data == null) {
  //         setExisteRepublica(false);
  //       } else {
  //         setListaDeMebros(listaDeMebros.concat(response.data.membros));
  //         setRepublica(response.data);
  //         setIdRepublica(response.data._id);
  //         setExisteRepublica(true);
  //       }
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     })
  //     .finally(setLoading(false));
  // }
  // function buscarContas() {
  //   api
  //     .get(`/contas/${idRepublica}/${mesSelecionado}/${anoCorrente}`)
  //     .then(response => {
  //       setListaDeContas(response.data);
  //       AsyncStorage.setItem('REPUBLICA_GERENCIADA_CONTAS', JSON.stringify(response.data));
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }
  // function adicionarConta() {
  //   setAdiconarContaButao(!adiconarContaButao);
  //   const data = {
  //     descricao: nomeConta,
  //     valor: valorConta,
  //     vencimento: dataVencimento,
  //     idRepublica: idRepublica
  //   };
  //   api
  //     .post(`/contas/`, data)
  //     .then(response => {
  //       if (mesSelecionado == response.data.mes) {
  //         setListaDeContas(listaDeContas.concat(response.data));
  //       }
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  //   setNomeConta('');
  //   setValorConta('');
  //   setDataVencimento(null);
  // }
  // function adicionarTarefa() {
  //   setAdiconarTarefaButao(!adiconarTarefaButao);

  //   const data = {
  //     descricao: nomeTarefa,
  //     email: 'leo@teste.com',
  //     dataLimite: dataVencimento,
  //     idRepublica: idRepublica
  //   };
  //   api
  //     .post(`/tarefas/`, data)
  //     .then(response => {
  //       setListaDeTarefas(listaDeTarefas.concat(response.data));
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  //   setNomeTarefa('');
  //   setEmailMebroSelecionado('');
  //   setDataVencimento(null);
  // }
  // function buscarTarefas() {
  //   api
  //     .get(`/tarefas/${idRepublica}`)
  //     .then(response => {
  //       if (response.data.length != 0) {
  //         setListaDeTarefas(listaDeTarefas.concat(response.data));
  //       }
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }
  // function enviarConviteMembro() {
  //   setAdiconarMembroButao(!adiconarMembroButao);

  //   const data = {
  //     inviteEmail: emailMembroConvite,
  //     email: email,
  //   };
  //   api
  //     .post(`/gerenciaRepublica/membros`, data)
  //     .then()
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }
  // function abrirModalDeDetalhes(item, tipo) {
  //   setIdTipoSelecionado(item._id);
  //   setTipoDeInformacao(tipo);
  //   if (tipo == 'Contas') {
  //     setNomeConta(item.descricao);
  //     setDataVencimento(item.vencimento);
  //     setValorConta(item.valor);
  //   } else if (tipo == 'Tarefas') {
  //     setNomeConta(item.descricao);
  //     setDataVencimento(item.dataLimite);
  //     setResponsavelTarefa(item.responsavel.nome);
  //   } else if (tipo == 'Membros') {
  //     setResponsavelTarefa(item.nome);
  //   }
  //   setIsModalVisible(true);
  // }
  // function fecharModalDetalhes() {
  //   setTipoDeInformacao();
  //   setNomeConta();
  //   setValorConta();
  //   setDataVencimento();
  //   setIsModalVisible(false);
  // }
  // function excluirInformacao() {
  //   if (tipoDeInformacao == 'Contas') {
  //     excluirConta();
  //     fecharModalDetalhes();
  //   } else if (tipoDeInformacao == 'Tarefas') {
  //     excluirTarefa();
  //     fecharModalDetalhes();
  //   } else if (tipoDeInformacao == 'Membros') {
  //     excluirMembro();
  //     fecharModalDetalhes();
  //   } else {
  //     setErro(true);
  //   }
  // }
  // function excluirTarefa() {
  //   api
  //     .delete(`/tarefas/${idTipoSelecionado}`)
  //     .then(response => {
  //       setListaDeTarefas([]);
  //       buscarTarefas();
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }
  // function excluirConta() {
  //   api
  //     .delete(`/contas/${idTipoSelecionado}`)
  //     .then(response => {
  //       setListaDeContas([]);
  //       buscarContas();
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }

  // function excluirRepublica() {
  //   api
  //     .delete(`/gerenciaRepublica/${idRepublica}`)
  //     .then(response => {
  //       setExisteRepublica(false);
  //     })
  //     .catch(error => {
  //       setErro(true);
  //     });
  // }
  return (
    // <Container>
    //   {erro && (
    //     <CustomModal
    //       parametro="Erro"
    //       callback={() => {
    //         setErro(false);
    //       }}
    //     />
    //   )}
    //   <HeaderBack title="Gerenciamento de republica" onNavigation={() => navigation.goBack(null)} />
    //   {loading && <Loading />}

    //   {!existeRepublica ? (
    //     <ScrollView>
    //       {loading ? (
    //         <Loading></Loading>
    //       ) : (
    //           <AdicionarRepublica>
    //             <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 40 }}>
    //               <Image
    //                 source={require('../../../assets/Img/adicionar_republica.png')}
    //                 style={{ width: 150, height: 150 }}
    //               />
    //               <V_titulo>
    //                 <Titulo>Voce ainda nao tem uma republica cadastrada para gerenciar. Cadastre agora mesmo</Titulo>
    //               </V_titulo>
    //               <Linha>
    //                 <FieldSetLarge>
    //                   <LabelFielSet>Nome Republica</LabelFielSet>
    //                   <Item style={{ borderColor: 'transparent' }}>
    //                     <Input
    //                       placeholderStyle={{ fontFamily: 'WorkSans' }}
    //                       onChangeText={value => setNomeRepublica(value)}
    //                       placeholder="Nome da sua republica"
    //                       placeholderTextColor="#989898"
    //                     />
    //                   </Item>
    //                 </FieldSetLarge>
    //               </Linha>
    //               <LinhaBotao>
    //                 <Botao onPress={() => cadastrarRepublica()}>
    //                   <LabelBotao>Continuar cadastro</LabelBotao>
    //                 </Botao>
    //               </LinhaBotao>
    //               <V_titulo style={{ marginTop: 20 }}>
    //                 <Titulo> Ou entre em uma republica já existente com o codigo de convite da mesma</Titulo>
    //               </V_titulo>
    //               <Linha>
    //                 <FieldSetLarge>
    //                   <LabelFielSet>Codigo da republica{codigoRepublica}</LabelFielSet>
    //                   <Item style={{ borderColor: 'transparent' }}>
    //                     <Input
    //                       placeholderStyle={{ fontFamily: 'WorkSans' }}
    //                       onChangeText={value => setCodigoRepublica(value)}
    //                       placeholder="Codigo da republica"
    //                       placeholderTextColor="#989898"
    //                     />
    //                   </Item>
    //                 </FieldSetLarge>
    //               </Linha>
    //               <LinhaBotao>
    //                 <Botao onPress={() => adicionarMembroPorCodigo()}>
    //                   <LabelBotao>Entrar na republica</LabelBotao>
    //                 </Botao>
    //               </LinhaBotao>
    //             </View>
    //           </AdicionarRepublica>
    //         )}
    //     </ScrollView>
    //   ) : (
    //       <TelaGerenciamento>
    //         {loading && <Loading />}
    //         <ViewNomeRepublica style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //           <NomeRepublica>{republica.republica}</NomeRepublica>
    //           <TouchableOpacity onPress={() => excluirRepublica()}>
    //             <Icon
    //               style={{
    //                 width: 30,
    //                 height: 30,
    //                 color: 'red',
    //                 fontSize: 20,
    //                 justifyContent: 'center',
    //                 alignItems: 'center'
    //               }}
    //               name="trash"
    //             ></Icon>
    //           </TouchableOpacity>
    //         </ViewNomeRepublica>
    //         <ViewContas>
    //           <TituloEPicker>
    //             <TituloSession>Contas do mês</TituloSession>
    //             <Item style={{ width: 120, height: 30 }}>
    //               <Picker
    //                 mode="dropdown"
    //                 style={{ width: undefined }}
    //                 placeholderStyle={{ color: '#bfc6ea' }}
    //                 placeholderIconColor="#007aff"
    //                 selectedValue={mesSelecionado}
    //                 onValueChange={value => {
    //                   setMesSelecionado(value);
    //                 }}
    //                 value={mesSelecionado}
    //               >
    //                 <Picker.Item color={'#142850'} label="Janeiro" value="Janeiro" />
    //                 <Picker.Item color={'#142850'} label="Fevereiro" value="Fevereiro" />
    //                 <Picker.Item color={'#142850'} label="Março" value="Março" />
    //                 <Picker.Item color={'#142850'} label="Abriu" value="Abriu" />
    //                 <Picker.Item color={'#142850'} label="Maio" value="Maio" />
    //               </Picker>
    //             </Item>
    //           </TituloEPicker>
    //           {listaDeContas.length == 0 ? (
    //             <EmptyContas>
    //               <Image source={require('../../../assets/Img/semInformacao.png')} style={{ width: 80, height: 80 }} />
    //               <V_titulo>
    //                 <Titulo style={{ fontSize: 14 }}>Voce ainda nao tem contas registradas</Titulo>
    //               </V_titulo>
    //             </EmptyContas>
    //           ) : (
    //               <FlatList
    //                 style={{
    //                   backgroundColor: '#f8f8f8',
    //                   marginTop: 5,
    //                   borderRadius: 4,
    //                   borderWidth: 1,
    //                   borderColor: '#e2e2e2',
    //                   width: '100%',
    //                   maxHeight: 160
    //                 }}
    //                 data={listaDeContas}
    //                 renderItem={({ item }) => (
    //                   <CardsContas onPress={() => abrirModalDeDetalhes(item, 'Contas')}>
    //                     <NomeConta>{item.descricao}</NomeConta>
    //                     <ValorConta>{item.valor} R$</ValorConta>
    //                   </CardsContas>
    //                 )}
    //                 keyExtractor={item => item._id}
    //               />
    //             )}
    //           <CardsContas>
    //             <NomeConta style={{ fontFamily: 'WorkSans-Bold' }}>
    //               Valor dividido para {listaDeMebros.length} membros
    //           </NomeConta>
    //             <ValorConta style={{ fontFamily: 'WorkSans-Bold' }}>{valorGeralContas} R$</ValorConta>
    //           </CardsContas>
    //           {adiconarContaButao ? (
    //             <ViewBotaoADD>
    //               <BotaoAdicionarConta onPress={() => setAdiconarContaButao(!adiconarContaButao)}>
    //                 <LabelBotaoADD>Adiconar Conta</LabelBotaoADD>
    //               </BotaoAdicionarConta>
    //             </ViewBotaoADD>
    //           ) : (
    //               <View>
    //                 <Linha2 style={{ marginTop: 15 }}>
    //                   <FieldSetRua>
    //                     <LabelFielSet>Descrição</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <Input onChangeText={value => setNomeConta(value)} placeholder="" />
    //                     </Item>
    //                   </FieldSetRua>
    //                   <FieldSetNumero>
    //                     <LabelFielSet>Valor</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <Input
    //                         onChangeText={value => setValorConta(value)}
    //                         style={{ justifyContent: 'center' }}
    //                         keyboardType="number-pad"
    //                         placeholder=""
    //                       />
    //                     </Item>
    //                   </FieldSetNumero>
    //                   <FieldSetRua>
    //                     <LabelFielSet>Vencimento</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <DatePicker
    //                         value={dataVencimento}
    //                         defaultDate={new Date(2020, 4, 4)}
    //                         minimumDate={new Date(2020, 4, 4)}
    //                         locale={"en"}
    //                         modalTransparent={true}
    //                         animationType={'fade'}
    //                         androidMode={'default'}
    //                         placeHolderText="__/__/___"
    //                         onDateChange={date => {
    //                           setDataVencimento(date);
    //                         }}
    //                         disabled={false}
    //                       />
    //                     </Item>
    //                   </FieldSetRua>
    //                 </Linha2>
    //                 <ViewBotaoADD>
    //                   <BotaoAdicionarConta onPress={() => adicionarConta()}>
    //                     <LabelBotaoADD>Adicionar</LabelBotaoADD>
    //                   </BotaoAdicionarConta>
    //                 </ViewBotaoADD>
    //               </View>
    //             )}
    //         </ViewContas>

    //         <ViewTarefas>
    //           <ViewTitulo>
    //             <TituloSession>Tarefas/Eventos</TituloSession>
    //           </ViewTitulo>
    //           {listaDeTarefas.length == 0 ? (
    //             <EmptyContas>
    //               <Image source={require('../../../assets/Img/semInformacao.png')} style={{ width: 80, height: 80 }} />
    //               <V_titulo>
    //                 <Titulo style={{ fontSize: 14 }}>Voce ainda nao tem tarefas registradas</Titulo>
    //               </V_titulo>
    //             </EmptyContas>
    //           ) : (
    //               <FlatList
    //                 style={{
    //                   backgroundColor: '#f8f8f8',
    //                   marginTop: 5,
    //                   borderRadius: 4,
    //                   borderWidth: 1,
    //                   borderColor: '#e2e2e2',
    //                   width: '100%',
    //                   maxHeight: 160
    //                 }}
    //                 data={listaDeTarefas}
    //                 renderItem={({ item }) => (
    //                   <CardsContas onPress={() => abrirModalDeDetalhes(item, 'Tarefas')}>
    //                     <NomeConta numberOfLines={1}>{item.descricao}</NomeConta>
    //                   </CardsContas>
    //                 )}
    //                 keyExtractor={item => item._id}
    //               />
    //             )}
    //           {adiconarTarefaButao ? (
    //             <ViewBotaoADD>
    //               <BotaoAdicionarConta onPress={() => setAdiconarTarefaButao(!adiconarTarefaButao)}>
    //                 <LabelBotaoADD>Adiconar tarefa</LabelBotaoADD>
    //               </BotaoAdicionarConta>
    //             </ViewBotaoADD>
    //           ) : (
    //               <View>
    //                 <Linha2 style={{ marginTop: 15 }}>
    //                   <FieldSetRua style={{ width: '58%' }}>
    //                     <LabelFielSet>Descrição</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <Input onChangeText={value => setNomeTarefa(value)} placeholder="" />
    //                     </Item>
    //                   </FieldSetRua>

    //                   <FieldSetRua>
    //                     <LabelFielSet>Data Limite</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <DatePicker
    //                         defaultDate={new Date()}
    //                         minimumDate={new Date()}
    //                         locale={'pt-br'}
    //                         timeZoneOffsetInMinutes={undefined}
    //                         modalTransparent={true}
    //                         animationType={'slide'}
    //                         androidMode={'default'}
    //                         placeHolderText="__/__/___"
    //                         onDateChange={date => {
    //                           setDataVencimento(date);
    //                         }}
    //                         disabled={false}
    //                       />
    //                     </Item>
    //                   </FieldSetRua>
    //                 </Linha2>
    //                 <Linha2 style={{ marginTop: 20, marginBottom: 10 }}>
    //                   <FieldSetLarge>
    //                     <LabelFielSet>Membro</LabelFielSet>

    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <Picker
    //                         mode="dropdown"
    //                         style={{ width: undefined }}
    //                         placeholderIconColor="#007aff"
    //                         selectedValue={emailMebroSelecionado}
    //                         onValueChange={value => setEmailMebroSelecionado(value)}
    //                         value={emailMebroSelecionado}
    //                         onChangeText={value => setEmailMebroSelecionado(value)}
    //                       >
    //                         <Picker.Item label="Selecione um membro" value="Não informado" />
    //                         {listaDeMebros.map(item => {
    //                           return <Picker.Item label={item.nome} value={item.email} />;
    //                         })}
    //                       </Picker>
    //                     </Item>
    //                   </FieldSetLarge>
    //                 </Linha2>
    //                 <ViewBotaoADD>
    //                   <BotaoAdicionarConta onPress={() => adicionarTarefa()}>
    //                     <LabelBotaoADD>Adicionar</LabelBotaoADD>
    //                   </BotaoAdicionarConta>
    //                 </ViewBotaoADD>
    //               </View>
    //             )}
    //         </ViewTarefas>

    //         <ViewTarefas>
    //           <ViewTitulo>
    //             <TituloSession>Membros</TituloSession>
    //           </ViewTitulo>
    //           <FlatList
    //             style={{
    //               backgroundColor: '#f8f8f8',
    //               marginTop: 5,
    //               borderRadius: 4,
    //               borderWidth: 1,
    //               borderColor: '#e2e2e2',
    //               width: '100%',
    //               maxHeight: 160
    //             }}
    //             data={listaDeMebros}
    //             renderItem={({ item }) => (
    //               <CardsContas onPress={() => abrirModalDeDetalhes(item, 'Membros')}>
    //                 <NomeConta numberOfLines={1}>{item.nome}</NomeConta>
    //               </CardsContas>
    //             )}
    //             keyExtractor={item => item._id}
    //           />
    //           {!adiconarMembroButao ? (
    //             <ViewBotaoADD>
    //               <BotaoAdicionarConta onPress={() => setAdiconarMembroButao(!adiconarMembroButao)}>
    //                 <LabelBotaoADD>Adiconar Membro</LabelBotaoADD>
    //               </BotaoAdicionarConta>
    //             </ViewBotaoADD>
    //           ) : (
    //               <View>
    //                 <Linha2 style={{ marginTop: 15 }}>
    //                   <FieldSetRua style={{ width: '100%' }}>
    //                     <LabelFielSet>Email</LabelFielSet>
    //                     <Item style={{ borderColor: 'transparent' }}>
    //                       <Input onChangeText={value => setEmailMembroConvite(value)} placeholder="" />
    //                     </Item>
    //                   </FieldSetRua>
    //                 </Linha2>
    //                 <ViewBotaoADD>
    //                   <BotaoAdicionarConta onPress={() => enviarConviteMembro()}>
    //                     <LabelBotaoADD>Adicionar</LabelBotaoADD>
    //                   </BotaoAdicionarConta>
    //                 </ViewBotaoADD>
    //               </View>
    //             )}
    //         </ViewTarefas>
    //         <ViewBotaoADD></ViewBotaoADD>
    //       </TelaGerenciamento>
    //     )}
    //   <Modal
    //     transparent={true}
    //     animationType="slide"
    //     visible={isModalVisible}
    //     onRequestClose={() => setIsModalVisible(false)}
    //   >
    //     <View
    //       style={{
    //         width: '100%',
    //         height: '100%',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: '#00000080'
    //       }}
    //     >
    //       <View
    //         style={{
    //           width: 330,
    //           minHeight: 150,
    //           justifyContent: 'center',
    //           alignItems: 'center',
    //           backgroundColor: '#ffffff',
    //           borderRadius: 5,
    //           flexWrap: 'wrap'
    //         }}
    //       >
    //         <View
    //           style={{
    //             position: 'absolute',
    //             right: 15,
    //             top: 10
    //           }}
    //         >
    //           <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
    //             <Icon
    //               style={{
    //                 width: 30,
    //                 height: 30,
    //                 fontSize: 20,
    //                 justifyContent: 'center',
    //                 alignItems: 'center'
    //               }}
    //               name="close"
    //             ></Icon>
    //           </TouchableOpacity>
    //         </View>
    //         {tipoDeInformacao != 'Membros' && (
    //           <View style={{ width: '100%', padding: 12, flexDirection: 'row' }}>
    //             <Text
    //               style={{
    //                 marginTop: 15,
    //                 fontFamily: 'WorkSans',
    //                 fontSize: 16,
    //                 color: '#142850',
    //                 marginRight: 10
    //               }}
    //             >
    //               Descrição:
    //             </Text>
    //             <Text
    //               numberOfLines={5}
    //               style={{
    //                 marginTop: 15,
    //                 width: '75%',
    //                 fontFamily: 'WorkSans-SemiBold',
    //                 fontSize: 16,
    //                 color: '#142850'
    //               }}
    //             >
    //               {nomeConta}
    //             </Text>
    //           </View>
    //         )}
    //         {tipoDeInformacao == 'Contas' ? (
    //           <View style={{ width: '100%', padding: 12, flexDirection: 'row' }}>
    //             <Text
    //               style={{
    //                 justifyContent: 'center',
    //                 marginTop: 5,
    //                 fontFamily: 'WorkSans',
    //                 fontSize: 16,
    //                 color: '#142850',
    //                 marginRight: 10
    //               }}
    //             >
    //               Valor:
    //             </Text>
    //             <Text
    //               numberOfLines={5}
    //               style={{
    //                 marginTop: 5,
    //                 width: '75%',
    //                 fontFamily: 'WorkSans-SemiBold',
    //                 fontSize: 16,
    //                 color: '#142850'
    //               }}
    //             >
    //               {valorConta}
    //             </Text>
    //           </View>
    //         ) : (
    //             <View>
    //               {tipoDeInformacao != 'Membros' ? (
    //                 <View style={{ width: '100%', padding: 12, flexDirection: 'row' }}>
    //                   <Text
    //                     style={{
    //                       justifyContent: 'center',
    //                       marginTop: 10,
    //                       fontFamily: 'WorkSans',
    //                       fontSize: 16,
    //                       color: '#142850',
    //                       marginRight: 10
    //                     }}
    //                   >
    //                     Responsavel:
    //                 </Text>
    //                   <Text
    //                     numberOfLines={5}
    //                     style={{
    //                       marginTop: 10,
    //                       width: '75%',
    //                       fontFamily: 'WorkSans-SemiBold',
    //                       fontSize: 16,
    //                       color: '#142850'
    //                     }}
    //                   >
    //                     {responsavelTarefa}
    //                   </Text>
    //                 </View>
    //               ) : (
    //                   <View style={{ width: '100%', padding: 12, flexDirection: 'row' }}>
    //                     <Text
    //                       style={{
    //                         justifyContent: 'center',
    //                         marginTop: 10,
    //                         fontFamily: 'WorkSans',
    //                         fontSize: 16,
    //                         color: '#142850',
    //                         marginRight: 10
    //                       }}
    //                     >
    //                       Membro:
    //                 </Text>
    //                     <Text
    //                       numberOfLines={5}
    //                       style={{
    //                         marginTop: 10,
    //                         width: '75%',
    //                         fontFamily: 'WorkSans-SemiBold',
    //                         fontSize: 16,
    //                         color: '#142850'
    //                       }}
    //                     >
    //                       {responsavelTarefa}
    //                     </Text>
    //                   </View>
    //                 )}
    //             </View>
    //           )}
    //         {tipoDeInformacao != 'Membros' && (
    //           <View style={{ width: '100%', padding: 12, flexDirection: 'row' }}>
    //             <Text
    //               style={{
    //                 marginTop: 10,
    //                 fontFamily: 'WorkSans',
    //                 fontSize: 16,
    //                 color: '#142850',
    //                 marginRight: 10
    //               }}
    //             >
    //               Vencimento:
    //             </Text>
    //             <Text
    //               numberOfLines={1}
    //               style={{
    //                 marginTop: 10,
    //                 width: '75%',
    //                 fontFamily: 'WorkSans-SemiBold',
    //                 fontSize: 16,
    //                 color: '#142850'
    //               }}
    //             >
    //               {moment(dataVencimento).format('DD MMMM  YYYY')}
    //             </Text>
    //           </View>
    //         )}
    //         <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
    //           <BotaoAdicionarConta
    //             style={{ width: 100, height: 50, marginBottom: 20 }}
    //             onPress={() => excluirInformacao()}
    //           >
    //             <LabelBotaoADD>Excluir</LabelBotaoADD>
    //           </BotaoAdicionarConta>
    //         </View>
    //       </View>
    //     </View>
    //   </Modal>
    // </Container>
    //<CadastroGerenciamentoRepublica></CadastroGerenciamentoRepublica>
    <Gerenciamento></Gerenciamento>
  );
}
