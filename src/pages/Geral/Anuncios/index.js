import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import estilo from './style';
import api from '../../../service/api';
import Cartao from '../../../components/Cartao';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import EmptyState from '../../../components/EmptyState';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editNomeOfertante,
  editNotaCarona,
  editSaida,
  editVagas,
  editValor,
  editIdCarona,
} from '../../../actions/CaronaActions';

import {
  editValorAluguel,
  editNomeRepublica,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumeroCasa,
  editTipoImovel,
} from '../../../actions/AuthActions';
import HeaderBack from '../../../components/CustomHeader';
import CustomModal from '../../../components/Alert';
import Loading from '../../../components/Loading';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import { connect } from 'react-redux';
import CartaoCarona from '../../../components/CartaoCarona';

function Anuncios({ navigation }, email) {
  const [listaRepublicas, setListaRepublicas] = useState([]);
  const [listaCaronas, setListaCaronas] = useState([]);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [item, setItem] = useState('');
  const [tipo, setTipo] = useState('');
  const [emailUser, setEmail] = useState(navigation.state.params.email);

  function DeleteAnuncio(valor, item, tipo) {
    console.log(item._id);
    if (valor == 0) {
      return null;
    }
    if (tipo == 'Republica' && valor == 1) {
      api
        .delete(`/main/${item._id}`)
        .then(responseJson => {
          console.log(responseJson);
          setListaRepublicas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          setErro(true);
        });
    } else if (tipo == 'Carona' && valor == 1) {
      api
        .delete(`/carona/${item._id}`)
        .then(responseJson => {
          console.log(responseJson);
          setListaCaronas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setReloading(false);
          setLoading(false);
        });
    }
  };

  function getlist() {
    setReloading(true);
    api
      .get(`/userCarona/${emailUser}`)
      .then(responseJson => {
        console.log(responseJson);
        setListaCaronas(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
    api
      .get(`/userRepublica/${emailUser}`)
      .then(responseJson => {
        console.log(responseJson);
        setListaRepublicas(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getlist();
  }, [reloading]);

  function editRepublica(edit) {
    const dados = edit;
    console.log('DA', edit);
    navigation.editNomeRepublica(dados.nomeRepublica);
    navigation.editValorAluguel(dados.valorAluguel);
    navigation.editBairro(dados.bairro);
    navigation.editRua(dados.rua);
    navigation.editNumeroCasa(dados.numeroCasa);
    navigation.editPessoas(dados.pessoas);
    navigation.editAnimal(dados.animal);
    navigation.editDescricao(dados.descricao);
    navigation.editAcomodacaoQuarto(dados.acomodacaoQuarto);
    navigation.editAcomodacaoRepublica(dados.acomodacaoRepublica);
    navigation.editObservacao(dados.observacao);
    navigation.editGenero(dados.genero);
    navigation.editNumVagas(dados.numVagas);
    navigation.editRepresentante(dados.representante);
    navigation.editImg1(dados.imagem1);
    navigation.editImg2(dados.imagem2);
    navigation.editImg3(dados.imagem3);
    navigation.editValor(dados.valor);
    navigation.editValorConta(dados.valorContas);
    navigation.editTipoImovel(dados.imovel);
    navigation.navigate('Cadastro', { update: true });
  }

  function editCaronas(edit) {
    console.log(edit);
    const dados = edit;
    navigation.editNomeOfertante(dados.nome);
    navigation.editChegada(dados.localChegada);
    navigation.editData(dados.data);
    navigation.editDesembarque(dados.desembarque);
    navigation.editEmbarque(dados.embarque);
    navigation.editHChegada(dados.horaChegada);
    navigation.editHSaida(dados.horaSaida);
    navigation.editImagem(dados.imagem);
    navigation.editNotaCarona(dados.nota);
    navigation.editSaida(dados.localSaida);
    navigation.editVagas(dados.vagas);
    navigation.editValor(dados.valor);
    navigation.editIdCarona(dados._id);
    navigation.navigate('CadastroCaronas', { update: true });
  }
  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading />}
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            setErro(false);
          }}
        />
      )}
      {modalConfirmacao && (
        <ModalConfirmacao
          retornoModal={valor => {
            DeleteAnuncio(valor, item, tipo);
            setModalConfirmacao(false);
          }}
          titulo="Excluir anúncio?"
          mensagem="Sua publicação será apagada e mais ninguém poderá vê-la."
          botaoCancel="Cancelar"
          botaoConfirmar="Excluir"
          confirmar={true}
        />
      )}
      <HeaderBack title="Meus anúncios" onNavigation={() => navigation.goBack(null)} />
      <ScrollView>
        <View style={estilo.V_geral}>
          {listaRepublicas.length != 0 ? (
            <View>
              <View style={estilo.V_label}>
                <Text style={estilo.label}>Suas Repúblicas</Text>
                <View style={estilo.barra} />
              </View>
              <View>
                <ScrollView style={estilo.card}>
                  <FlatList
                    style={estilo.flatList}
                    data={listaRepublicas}
                    renderItem={({ item }) => (
                      <View>
                        <Cartao data={item} />
                        <View style={estilo.V_edit}>
                          <Button
                            style={estilo.delete}
                            onPress={() => {
                              setItem(item);
                              setTipo('Republica');
                              setModalConfirmacao(true);
                            }}
                          >
                            <Icon style={estilo.iconDel} name="close" />
                          </Button>

                          <Button
                            style={estilo.edit}
                            onPress={() => {
                              editRepublica(item);
                            }}
                          >
                            <Icon style={estilo.icon} name="pencil" />
                            <Text style={estilo.TxtEdit}>Editar</Text>
                          </Button>
                          <Button
                            style={estilo.ver}
                            onPress={() => {
                              navigation.navigate('Agendamentos', {
                                usario: false,
                                idRepublica: item._id,
                              });
                            }}
                          >
                            <Icon style={estilo.icon} name="list" />
                            <Text style={estilo.TxtEdit}>Ver interessados</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item._id}
                    refreshing={reloading}
                    onRefresh={getlist}
                  />
                </ScrollView>
              </View>
            </View>
          ) : (
              <View />
            )}
          {listaCaronas.length != 0 ? (
            <View style={{ marginTop: 30 }}>
              <View style={estilo.V_label}>
                <Text style={estilo.label}> Suas Caronas</Text>
                <View style={estilo.barra} />
              </View>
              <View>
                <ScrollView style={estilo.card}>
                  <FlatList
                    style={estilo.flatList}
                    data={listaCaronas}
                    renderItem={({ item }) => (
                      <View>
                        <CartaoCarona dados={item} />
                        <View style={estilo.V_edit}>
                          <Button
                            style={estilo.delete}
                            onPress={() => {
                              setItem(item);
                              setTipo('Carona');
                              setModalConfirmacao(true);
                            }}
                          >
                            <Icon style={estilo.iconDel} name="close" />
                          </Button>
                          <Button
                            style={estilo.edit}
                            onPress={() => {
                              editCaronas(item);
                            }}
                          >
                            <Icon style={estilo.icon} name="pencil" />
                            <Text style={estilo.TxtEdit}>Editar</Text>
                          </Button>
                          <Button
                            style={estilo.ver}
                            onPress={() => {
                              navigation.navigate('Interessados', {
                                usario: false,
                                idCarona: item._id,
                              });
                            }}
                          >
                            <Icon style={estilo.icon} name="list" />
                            <Text style={estilo.TxtEdit}>Ver interessados</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item._id}
                  />
                </ScrollView>
              </View>
            </View>
          ) : (
              <View />
            )}
        </View>
      </ScrollView>
      {listaCaronas.length == 0 && listaRepublicas.length == 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <EmptyState
            titulo="Sem anúncios"
            mensagem="Você ainda não anunciou nada. Nos diga quando houver vagas em sua república ou ofereça uma carona."
          />
        </View>
      ) : (
          <View />
        )}
    </View>
  );
}
const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    email: state.user.email,
    //nota: state.carona.nota,

    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};
const EditConnect = connect(
  mapStateToProps,
  {
    editValorAluguel,
    editNomeRepublica,
    editBairro,
    editPessoas,
    editDescricao,
    editAnimal,
    editAcomodacaoQuarto,
    editAcomodacaoRepublica,
    editValorConta,
    editTipoImovel,
    editObservacao,
    editImg1,
    editImg2,
    editImg3,
    editGenero,
    editNumVagas,
    editRepresentante,
    editRua,
    editNumeroCasa,
    editChegada,
    editData,
    editDesembarque,
    editEmbarque,
    editHChegada,
    editHSaida,
    editImagem,
    editNomeOfertante,
    editNotaCarona,
    editSaida,
    editVagas,
    editValor,
    editIdCarona,
  }
)(Anuncios);

export default withNavigation(EditConnect);
