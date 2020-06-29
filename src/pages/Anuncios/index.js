import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import estilo from './style';
import api from '../../service/api';
import Cartao from '../../components/Cartao';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
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
} from '../../actions/CaronaActions';
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
} from '../../actions/AuthActions';
import HeaderBack from '../../components/CustomHeader';
import CustomModal from '../../components/Alert';
import Loading from '../../components/Loading';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import { connect } from 'react-redux';
import CartaoCarona from '../../components/CartaoCarona';

class Anuncios extends Component {
  static navigationOptions = { header: null };
  state = {
    listaRepublicas: [],
    listaCaronas: [],
    dados: [],
    Load: true,
    Erro: false,
    refreshing: false,
    MConfirmacao: false,
    item: '',
  };

  DeleteAnuncio = (valor, item, tipo) => {
    if (valor == 0) {
      return null;
    }
    if (tipo == 'Republica' && valor == 1) {
      api
        .delete(`/main/${item._id}`)
        .then(responseJson => {
          console.log(responseJson);
          this.setState({
            listaRepublicas: [],
            Load: false,
          });
          this.getlist();
        })
        .catch(error => {
          console.log(error);
          this.setState({ Load: false, Erro: true });
        });
    } else if (tipo == 'Carona' && valor == 1) {
      api
        .delete(`/carona/${item._id}`)
        .then(responseJson => {
          console.log(responseJson);
          this.setState({
            listaCaronas: [],
          });
        })
        .catch(error => {
          this.setState({
            refreshing: false,
          });
        });
    }
  };

  getlist = () => {
    this.setState({
      refreshing: true,
    });
    api
      .get(`/userCarona/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaCaronas: responseJson.data,
          Load: false,
        });
      })
      .catch(error => {
        this.setState({
          Load: false,
        });
      });

    api
      .get(`/userRepublica/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaRepublicas: responseJson.data,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({
          refreshing: false,
        });
      });
  };
  UNSAFE_componentWillMount() {
    this.getlist();
  }

  editRepublica(edit) {
    const dados = edit;
    this.props.editNomeRepublica(dados.nomeRepublica);
    this.props.editValorAluguel(dados.valorAluguel);
    this.props.editBairro(dados.bairro);
    this.props.editRua(dados.rua);
    this.props.editNumeroCasa(dados.numeroCasa);
    this.props.editPessoas(dados.pessoas);
    this.props.editAnimal(dados.animal);
    this.props.editDescricao(dados.descricao);
    this.props.editAcomodacaoQuarto(dados.acomodacaoQuarto);
    this.props.editAcomodacaoRepublica(dados.acomodacaoRepublica);
    this.props.editObservacao(dados.observacao);
    this.props.editGenero(dados.genero);
    this.props.editNumVagas(dados.numVagas);
    this.props.editRepresentante(dados.representante);
    this.props.editImg1(dados.imagem1);
    this.props.editImg2(dados.imagem2);
    this.props.editImg3(dados.imagem3);
    this.props.editValor(dados.valor);
    this.props.editValorConta(dados.valorContas);
    this.props.navigation.navigate('Cadastro', { update: true });
  }

  editCaronas(edit) {
    const dados = edit;
    this.props.editNomeOfertante(dados.nome);
    this.props.editChegada(dados.localChegada);
    this.props.editData(dados.data);
    this.props.editDesembarque(dados.desembarque);
    this.props.editEmbarque(dados.embarque);
    this.props.editHChegada(dados.horaChegada);
    this.props.editHSaida(dados.horaSaida);
    this.props.editImagem(dados.imagem);
    this.props.editNotaCarona(dados.nota);
    this.props.editSaida(dados.localSaida);
    this.props.editVagas(dados.vagas);
    this.props.editValor(dados.valor);
    this.props.navigation.navigate('CadastroCaronas', { update: true });
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.Load && <Loading />}
        {this.state.Erro && (
          <CustomModal
            parametro="Erro"
            callback={() => {
              this.setState({ Erro: false });
            }}
          />
        )}
        {this.state.MConfirmacao && (
          <ModalConfirmacao
            retornoModal={valor => {
              this.DeleteAnuncio(valor, this.state.item, this.state.tipo);
              this.setState({ MConfirmacao: false });
            }}
            mensagem="Deseja deletar esse anuncio ?"
            confirmar={true}
          />
        )}
        <HeaderBack title="Meus Anuncios" onNavigation={() => this.navegar()} />
        <ScrollView>
          <View style={estilo.V_geral}>
            {this.state.listaRepublicas.length != 0 ? (
              <View>
                <View style={estilo.V_label}>
                  <Text style={estilo.label}>Republicas</Text>
                  <View style={estilo.barra} />
                </View>
                <View>
                  <ScrollView style={estilo.card}>
                    <FlatList
                      style={estilo.flatList}
                      data={this.state.listaRepublicas}
                      renderItem={({ item }) => (
                        <View>
                          <Cartao data={item} />
                          <View style={estilo.V_edit}>
                            <Button
                              style={estilo.delete}
                              onPress={() => {
                                this.setState({
                                  item: item,
                                  tipo: 'Republica',
                                  MConfirmacao: true,
                                });
                              }}
                            >
                              <Icon style={estilo.iconDel} name="close" />
                            </Button>

                            <Button
                              style={estilo.edit}
                              onPress={() => {
                                this.editRepublica(item);
                              }}
                            >
                              <Icon style={estilo.icon} name="pencil" />
                              <Text style={estilo.TxtEdit}>Editar</Text>
                            </Button>
                            <Button
                              style={estilo.ver}
                              onPress={() => {
                                this.props.navigation.navigate('Agendamentos', {
                                  usario: false,
                                  idRepublica: item._id,
                                });
                              }}
                            >
                              <Icon style={estilo.icon} name="list" />
                              <Text style={estilo.TxtEdit}>
                                Ver interessados
                              </Text>
                            </Button>
                          </View>
                        </View>
                      )}
                      keyExtractor={item => item._id}
                      refreshing={this.state.refreshing}
                      onRefresh={this.getlist}
                    />
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.listaCaronas.length != 0 ? (
              <View>
                <View style={estilo.V_label}>
                  <Text style={estilo.label}>Caronas</Text>
                  <View style={estilo.barra} />
                </View>
                <View>
                  <ScrollView style={estilo.card}>
                    <FlatList
                      style={estilo.flatList}
                      data={this.state.listaCaronas}
                      renderItem={({ item }) => (
                        <View>
                          <CartaoCarona dados={item} />
                          <View style={estilo.V_edit}>
                            <Button
                              style={estilo.delete}
                              onPress={() => {
                                this.setState({
                                  item: item,
                                  tipo: 'Carona',
                                  MConfirmacao: true,
                                });
                              }}
                            >
                              <Icon style={estilo.iconDel} name="close" />
                            </Button>
                            <Button
                              style={estilo.edit}
                              onPress={() => {
                                this.editCaronas(item);
                              }}
                            >
                              <Icon style={estilo.icon} name="pencil" />
                              <Text style={estilo.TxtEdit}>Editar</Text>
                            </Button>
                            <Button
                              style={estilo.ver}
                              onPress={() => {
                                this.props.navigation.navigate('Interessados', {
                                  usario: false,
                                  idCarona: item._id,
                                });
                              }}
                            >
                              <Icon style={estilo.icon} name="list" />
                              <Text style={estilo.TxtEdit}>
                                Ver interessados
                              </Text>
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
            {this.state.listaCaronas.length == 0 &&
            this.state.listaRepublicas.length == 0 ? (
              <View style={estilo.V_interna2}>
                <Image
                  style={estilo.imagemError}
                  source={require('../../assets/Img/Empty.png')}
                />
                <Text style={estilo.textError}>
                  Nenhum Anuncio ou Interesse Disponivel
                </Text>
                <Text style={estilo.textError2}>
                  Poste a vaga disponivel na sua republica ou a vaga sobrando no
                  seu carro para aquela viagem.
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
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
  }
)(Anuncios);

export default withNavigation(EditConnect);
