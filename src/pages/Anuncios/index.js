import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  editNome,
  editNota,
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
  editNumero,
} from '../../actions/AuthActions';

// import { Container } from './styles';

import { connect } from 'react-redux';
import CartaoCarona from '../../components/CartaoCarona';

class Anuncios extends Component {
  static navigationOptions = { header: null };
  state = {
    listaRepublicas: [],
    listaCaronas: [],
    email: 'leo@hotmail.com',
    dados: [],
  };

  UNSAFE_componentWillMount() {
    api
      .get(`/userCarona/${'leo@hotmail.com'}`)
      .then(responseJson => {
        console.log('Caronas', responseJson);
        //this.setState({ listaCaronas: responseJson.data });
      })
      .catch(error => {
        console.log('Erro no Servidor');
      });

    api
      .get(`/userRepublica/${'leo@hotmail.com'}`)
      .then(responseJson => {
        console.log('leo', responseJson);
        //this.setState({ listaRepublicas: responseJson.data });
      })
      .catch(error => {
        console.log('Erro no Servidor');
      });
  }

  editRepublica(edit) {
    const dados = edit;
    console.log(dados);
    this.props.editNomeRepublica(dados.nomeRepublica);
    this.props.editValorAluguel(dados.valorAluguel);
    this.props.editBairro(dados.bairro);
    this.props.editRua(dados.rua);
    this.props.editNumero(dados.numeroCasa);
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
    console.log(dados);
    this.props.editNome(dados.nome);
    this.props.editChegada(dados.localChegada);
    this.props.editData(dados.data);
    this.props.editDesembarque(dados.desembarque);
    this.props.editEmbarque(dados.embarque);
    this.props.editHChegada(dados.horaChegada);
    this.props.editHSaida(dados.horaSaida);
    this.props.editImagem(dados.imagem);
    this.props.editNota(dados.nota);
    this.props.editSaida(dados.localSaida);
    this.props.editVagas(dados.vagas);
    this.props.editValor(dados.valor);
    this.props.navigation.navigate('CadastroCaronas', { update: true });
  }

  render() {
    return (
      <View>
        <View style={estilo.V_header}>
          <Icon name="arrow-left" style={estilo.iconHeader} />
          <Text style={estilo.title}>Meus Anuncios</Text>
        </View>
        <View style={{ width: '100%', height: '100%' }}>
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
                        <Cartao leonardo={item} />
                        <View style={estilo.V_edit}>
                          <Button
                            style={estilo.edit}
                            onPress={() => {
                              this.editRepublica(item);
                            }}
                          >
                            <Icon style={estilo.icon} name="pencil-outline" />
                            <Text style={estilo.TxtEdit}>Editar</Text>
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
                            style={estilo.edit}
                            onPress={() => {
                              this.editCaronas(item);
                            }}
                          >
                            <Icon style={estilo.icon} name="pencil-outline" />
                            <Text style={estilo.TxtEdit}>Editar</Text>
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
      </View>
    );
  }
}

const EditConnect = connect(
  null,
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
    editNumero,
    editChegada,
    editData,
    editDesembarque,
    editEmbarque,
    editHChegada,
    editHSaida,
    editImagem,
    editNome,
    editNota,
    editSaida,
    editVagas,
    editValor,
  }
)(Anuncios);

export default withNavigation(EditConnect);
