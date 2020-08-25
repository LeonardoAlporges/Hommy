import React, { Component, useEffect } from 'react';
import { FlatList, View, Modal, Text, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { CheckBox, ListItem, Button, Fab, Input, Item, Label } from 'native-base';
import EmptyState from '../../../components/EmptyState';

import Estilos from './style';
import { Spinner } from 'native-base';
import Cartao from '../../../components/Cartao/index';
import api from '../../../service/api';
import CustomModal from '../../../components/Alert';
import _ from 'lodash';
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
  editIdRepublica
} from '../../../actions/AuthActions';

import { Container, Listagem } from './style';

class Republica extends Component {
  static navigationOptions = { header: null, headerLeft: null };
  constructor(props) {
    super(props);
    this.state = {
      listaRepublicas: [],
      loading: true,
      active: false,
      erro: false,
      fullData: [],
      modalVisible: false,
      filtroAnimalSim: false,
      filtroAnimalNao: false,
      filtroMQuarto: false,
      filtroMasc: false,
      filtroFem: false,
      filtroMista: false,
      filtroMoradores2: false,
      filtroMoradores3: false,
      filtroMoradores4: false,
      filtroMoradores5: false,
      filtroMoradores6: false,
      filtroVagas1: false,
      filtroVagas2: false,
      filtroVagas3: false,
      filtroValorMenor: false,
      filtroValorMaior: false,
      aluguelMin: '',
      aluguelMax: '',
      refreshing: false
    };
  }
  limparPropsRepublicaRedux() {
    this.props.editValorConta('');
    this.props.editNomeRepublica('');
    this.props.editValorAluguel('');
    this.props.editBairro('');
    this.props.editRua('');
    this.props.editNumeroCasa('');
    this.props.editPessoas('');
    this.props.editAnimal('');
    this.props.editDescricao('');
    this.props.editAcomodacaoQuarto('');
    this.props.editAcomodacaoRepublica('');
    this.props.editObservacao('');
    this.props.editGenero('');
    this.props.editNumVagas('');
    this.props.editRepresentante('');
    this.props.editImg1('');
    this.props.editImg2('');
    this.props.editImg3('');
    this.props.editTipoImovel('');

    this.props.navigation.navigate('Cadastro', {
      dadosRepublica: null,
      update: false
    });
  }
  getListRepublica = () => {
    this.setState({ refreshing: true });
    return api
      .get('/republica')
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaRepublicas: responseJson.data,
          fullData: responseJson.data,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ erro: true });
        this.setState({ refreshing: false });
      });
  };
  useEffect() {
    this.getListRepublica();
  }
  fAnimalSim = async checked => {
    if (this.state.filtroAnimalSim) await this.setState({ filtroAnimalSim: false });
    else await this.setState({ filtroAnimalSim: true, filtroAnimalNao: false });
  };
  fAnimalNao = async checked => {
    if (this.state.filtroAnimalNao) await this.setState({ filtroAnimalNao: false });
    else await this.setState({ filtroAnimalNao: true, filtroAnimalSim: false });
  };
  fMasc = async checked => {
    if (this.state.filtroMasc) await this.setState({ filtroMasc: false });
    else
      await this.setState({
        filtroMasc: true,
        filtroFem: false,
        filtroMista: false
      });
  };
  fFem = async checked => {
    if (this.state.filtroFem) await this.setState({ filtroFem: false });
    else
      await this.setState({
        filtroFem: true,
        filtroMasc: false,
        filtroMista: false
      });
  };
  fMista = async checked => {
    if (this.state.filtroMista) await this.setState({ filtroMista: false });
    else
      await this.setState({
        filtroMista: true,
        filtroMasc: false,
        filtroFem: false
      });
  };
  fMoradores2 = async checked => {
    if (this.state.filtroMoradores2) await this.setState({ filtroMoradores2: false });
    else
      await this.setState({
        filtroMoradores2: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores6: false
      });
  };
  fMoradores3 = async checked => {
    if (this.state.filtroMoradores3) await this.setState({ filtroMoradores3: false });
    else
      await this.setState({
        filtroMoradores3: true,
        filtroMoradores2: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores6: false
      });
  };
  fMoradores4 = async checked => {
    if (this.state.filtroMoradores4) await this.setState({ filtroMoradores4: false });
    else
      await this.setState({
        filtroMoradores4: true,
        filtroMoradores3: false,
        filtroMoradores2: false,
        filtroMoradores5: false,
        filtroMoradores6: false
      });
  };
  fMoradores5 = async checked => {
    if (this.state.filtroMoradores5) await this.setState({ filtroMoradores5: false });
    else
      await this.setState({
        filtroMoradores5: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores2: false,
        filtroMoradores6: false
      });
  };
  fMoradores6 = async checked => {
    if (this.state.filtroMoradores6) await this.setState({ filtroMoradores6: false });
    else
      await this.setState({
        filtroMoradores6: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores2: false
      });
  };
  fVagas1 = async checked => {
    if (this.state.filtroVagas1) await this.setState({ filtroVagas1: false });
    else
      await this.setState({
        filtroVagas1: true,
        filtroVagas2: false,
        filtroVagas3: false
      });
  };
  fVagas2 = async checked => {
    if (this.state.filtroVagas2) await this.setState({ filtroVagas2: false });
    else
      await this.setState({
        filtroVagas2: true,
        filtroVagas1: false,
        filtroVagas3: false
      });
  };
  fVagas3 = async checked => {
    if (this.state.filtroVagas3) await this.setState({ filtroVagas3: false });
    else
      await this.setState({
        filtroVagas3: true,
        filtroVagas2: false,
        filtroVagas1: false
      });
  };
  valMenor = async text => {
    if (text) {
      await this.setState({ filtroValorMenor: true, aluguelMin: text });
    } else {
      await this.setState({ filtroValorMenor: false, aluguelMin: text });
    }
  };
  valMaior = async text => {
    if (text) {
      await this.setState({ filtroValorMaior: true, aluguelMax: text });
    } else {
      await this.setState({ filtroValorMaior: false, aluguelMax: text });
    }
  };
  padrao = async () => {
    await this.setState({
      filtroVagas1: false,
      filtroAnimalSim: false,
      filtroAnimalNao: false,
      filtroMQuarto: false,
      filtroMasc: false,
      filtroFem: false,
      filtroMista: false,
      filtroMoradores2: false,
      filtroMoradores3: false,
      filtroMoradores4: false,
      filtroMoradores5: false,
      filtroMoradores6: false,
      filtroVagas1: false,
      filtroVagas2: false,
      filtroVagas3: false,
      filtroValorMenor: false,
      filtroValorMaior: false,
      aluguelMin: '',
      aluguelMax: ''
    });
    this.filtro();
  };
  filtro = async () => {
    await this.setState({ listaRepublicas: this.state.fullData });
    let listaRepublicas = this.state.listaRepublicas;

    if (this.state.filtroAnimalSim === true) {
      listaRepublicas = _.filter(listaRepublicas, { animal: 'sim' });
    }
    if (this.state.filtroAnimalNao === true) {
      listaRepublicas = _.filter(listaRepublicas, { animal: 'nao' });
    }
    if (this.state.filtroMasc === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Masculina'
      });
    }
    if (this.state.filtroFem === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Feminina'
      });
    }
    if (this.state.filtroMista === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Mista'
      });
    }
    if (this.state.filtroMoradores2 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ pessoas }) => (pessoas = 2));
    }
    if (this.state.filtroMoradores3 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ pessoas }) => (pessoas = 3));
    }
    if (this.state.filtroMoradores4 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ pessoas }) => (pessoas = 4));
    }
    if (this.state.filtroMoradores5 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ pessoas }) => (pessoas = 5));
      q;
    }
    if (this.state.filtroMoradores6 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ pessoas }) => pessoas >= 6);
    }
    if (this.state.filtroVagas1 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ numVagas }) => numVagas == 1);
    }
    if (this.state.filtroVagas2 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ numVagas }) => numVagas == 2);
    }
    if (this.state.filtroVagas3 === true) {
      listaRepublicas = _.filter(listaRepublicas, ({ numVagas }) => numVagas >= 3);
    }
    if (this.state.filtroValorMenor === true) {
      listaRepublicas = _.filter(
        listaRepublicas,
        ({ valorAluguel }) => valorAluguel >= this.state.aluguelMin
      );
    }
    if (this.state.filtroValorMaior === true) {
      listaRepublicas = _.filter(
        listaRepublicas,
        ({ valorAluguel }) => valorAluguel <= this.state.aluguelMax
      );
    }
    await this.setState({ listaRepublicas });
  };
  render() {
    return (
      <Container>
        <NavigationEvents onDidFocus={this.getListRepublica} />
        <View>
          {this.state.loading ? (
            <View style={Estilos.V_Load}>
              <Spinner style={{}} color="#142850" />
            </View>
          ) : this.state.erro ? (
            <View style={Estilos.V_republicas}>
              <CustomModal
                parametro="Erro"
                callback={() => {
                  this.setState({ erro: false });
                }}
              />
            </View>
          ) : this.state.listaRepublicas.length !== 0 ? (
            <Listagem
              data={this.state.listaRepublicas}
              renderItem={({ item }) => <Cartao data={item} />}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListRepublica}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <EmptyState
                titulo="Tudo tão vazio por aqui... "
                mensagem="Parece que não há publicações no momento. Mas não desanime, logo logo novas vagas surgirão. "
              />
            </View>
          )}
        </View>
        <Modal animationType="fade" visible={this.state.modalVisible} transparent={true}>
          <View style={Estilos.V_filtroInterno}>
            <View
              style={{
                width: '100%',
                height: 30,
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              <TouchableOpacity
                style={{ marginRight: 20, marginBottom: 10 }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Icon style={{ fontSize: 22 }} name="close" />
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>Valor</Text>
            <ListItem style={Estilos.listStyleInput}>
              <View style={Estilos.ViewLabel}>
                <Text style={Estilos.textFiltroValor}>De R$</Text>
              </View>
              <Item underlined style={Estilos.itemInput}>
                <Input
                  onChangeText={text => this.valMenor(text)}
                  value={this.state.aluguelMin}
                  keyboardType="numeric"
                />
              </Item>
              <View style={Estilos.ViewLabel}>
                <Text style={Estilos.textFiltroValor}>Até R$</Text>
              </View>
              <Item underlined style={Estilos.itemInput}>
                <Input
                  onChangeText={text => this.valMaior(text)}
                  value={this.state.aluguelMax}
                  keyboardType="numeric"
                />
              </Item>
            </ListItem>
            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>
              Aceita animais?
            </Text>
            <ListItem style={Estilos.listStyle}>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fAnimalSim}
                checked={this.state.filtroAnimalSim}
              />
              <Text style={Estilos.textFiltro}>Sim</Text>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fAnimalNao}
                checked={this.state.filtroAnimalNao}
              />
              <Text style={Estilos.textFiltro}>Não</Text>
            </ListItem>
            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>
              {' '}
              Tipo de república
            </Text>
            <ListItem style={Estilos.listStyle}>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fMasc}
                checked={this.state.filtroMasc}
              />
              <Text style={Estilos.textFiltro}>Masculina</Text>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fFem}
                checked={this.state.filtroFem}
              />
              <Text style={Estilos.textFiltro}>Feminina</Text>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fMista}
                checked={this.state.filtroMista}
              />
              <Text style={Estilos.textFiltro}>Mista</Text>
            </ListItem>

            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>
              Vagas disponíveis
            </Text>
            <ListItem style={Estilos.listStyle}>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fVagas1}
                checked={this.state.filtroVagas1}
              />
              <Text style={Estilos.textFiltro}>1</Text>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fVagas2}
                checked={this.state.filtroVagas2}
              />
              <Text style={Estilos.textFiltro}>2</Text>
              <CheckBox
                color="#142850"
                style={{ alignSelf: 'stretch' }}
                onPress={this.fVagas3}
                checked={this.state.filtroVagas3}
              />
              <Text style={Estilos.textFiltro}>3+</Text>
            </ListItem>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <TouchableOpacity
                style={Estilos.botaoReload}
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.padrao();
                }}
              >
                <Icon name="filter-remove-outline" style={Estilos.textBotaoModal} />
              </TouchableOpacity>
              <TouchableOpacity
                style={Estilos.botaoModal}
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.filtro();
                }}
              >
                <Text style={Estilos.textBotaoModal}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={Estilos.S_FAB}
          position="bottomRight"
          onPress={() => {
            this.setState({ active: !this.state.active });
          }}
        >
          {this.state.active ? <Icon name="minus" /> : <Icon name="plus" />}

          <Button
            style={Estilos.corFAB}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Icon name="filter-outline" style={Estilos.corIconFab} />
          </Button>
          <Button
            style={Estilos.corFAB}
            onPress={() => {
              this.limparPropsRepublicaRedux();
            }}
          >
            <Icon name="plus" style={Estilos.corIconFab} />
          </Button>
        </Fab>
      </Container>
    );
  }
}

const RepublicaConnect = connect(null, {
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
  editIdRepublica
})(Republica);

export default withNavigation(RepublicaConnect);
