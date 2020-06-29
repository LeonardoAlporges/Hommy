import React, { Component } from 'react';
import {
  FlatList,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { CheckBox, ListItem, Button, Fab, Input, Item } from 'native-base';
import EmptyState from '../../components/EmptyState';

import Estilos from './style';
import { Spinner } from 'native-base';
import Cartao from '../Cartao/index';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
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
  editIdRepublica,
} from '../../actions/AuthActions';

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
      refreshing: false,
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
      update: false,
    });
  }

  getListRepublica = () => {
    this.setState({ refreshing: true, listaRepublicas: [] });
    return api
      .get('/main')
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaRepublicas: responseJson.data,
          fullData: responseJson.data,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ erro: true });
        this.setState({ refreshing: false });
      });
  };

  componentDidMount() {
    this.getListRepublica();
  }

  fAnimalSim = async checked => {
    if (this.state.filtroAnimalSim)
      await this.setState({ filtroAnimalSim: false });
    else await this.setState({ filtroAnimalSim: true, filtroAnimalNao: false });
  };
  fAnimalNao = async checked => {
    if (this.state.filtroAnimalNao)
      await this.setState({ filtroAnimalNao: false });
    else await this.setState({ filtroAnimalNao: true, filtroAnimalSim: false });
  };

  fMasc = async checked => {
    if (this.state.filtroMasc) await this.setState({ filtroMasc: false });
    else
      await this.setState({
        filtroMasc: true,
        filtroFem: false,
        filtroMista: false,
      });
  };

  fFem = async checked => {
    if (this.state.filtroFem) await this.setState({ filtroFem: false });
    else
      await this.setState({
        filtroFem: true,
        filtroMasc: false,
        filtroMista: false,
      });
  };

  fMista = async checked => {
    if (this.state.filtroMista) await this.setState({ filtroMista: false });
    else
      await this.setState({
        filtroMista: true,
        filtroMasc: false,
        filtroFem: false,
      });
  };

  fMoradores2 = async checked => {
    if (this.state.filtroMoradores2)
      await this.setState({ filtroMoradores2: false });
    else
      await this.setState({
        filtroMoradores2: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores6: false,
      });
  };

  fMoradores3 = async checked => {
    if (this.state.filtroMoradores3)
      await this.setState({ filtroMoradores3: false });
    else
      await this.setState({
        filtroMoradores3: true,
        filtroMoradores2: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores6: false,
      });
  };

  fMoradores4 = async checked => {
    if (this.state.filtroMoradores4)
      await this.setState({ filtroMoradores4: false });
    else
      await this.setState({
        filtroMoradores4: true,
        filtroMoradores3: false,
        filtroMoradores2: false,
        filtroMoradores5: false,
        filtroMoradores6: false,
      });
  };

  fMoradores5 = async checked => {
    if (this.state.filtroMoradores5)
      await this.setState({ filtroMoradores5: false });
    else
      await this.setState({
        filtroMoradores5: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores2: false,
        filtroMoradores6: false,
      });
  };

  fMoradores6 = async checked => {
    if (this.state.filtroMoradores6)
      await this.setState({ filtroMoradores6: false });
    else
      await this.setState({
        filtroMoradores6: true,
        filtroMoradores3: false,
        filtroMoradores4: false,
        filtroMoradores5: false,
        filtroMoradores2: false,
      });
  };

  fVagas1 = async checked => {
    if (this.state.filtroVagas1) await this.setState({ filtroVagas1: false });
    else
      await this.setState({
        filtroVagas1: true,
        filtroVagas2: false,
        filtroVagas3: false,
      });
  };

  fVagas2 = async checked => {
    if (this.state.filtroVagas2) await this.setState({ filtroVagas2: false });
    else
      await this.setState({
        filtroVagas2: true,
        filtroVagas1: false,
        filtroVagas3: false,
      });
  };

  fVagas3 = async checked => {
    if (this.state.filtroVagas3) await this.setState({ filtroVagas3: false });
    else
      await this.setState({
        filtroVagas3: true,
        filtroVagas2: false,
        filtroVagas1: false,
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

  filtro = async () => {
    await this.setState({ listaRepublicas: this.state.fullData });
    let listaRepublicas = this.state.listaRepublicas;

    if (this.state.filtroAnimalSim === true) {
      listaRepublicas = _.filter(listaRepublicas, { animal: 'Sim' });
    }
    if (this.state.filtroAnimalNao === true) {
      listaRepublicas = _.filter(listaRepublicas, { animal: 'Nao' });
    }
    if (this.state.filtroMasc === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Masculina',
      });
    }
    if (this.state.filtroFem === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Feminina',
      });
    }
    if (this.state.filtroMista === true) {
      listaRepublicas = _.filter(listaRepublicas, {
        genero: 'Mista',
      });
    }
    if (this.state.filtroMoradores2 === true) {
      listaRepublicas = _.filter(listaRepublicas, { pessoas: '2' });
    }
    if (this.state.filtroMoradores3 === true) {
      listaRepublicas = _.filter(listaRepublicas, { pessoas: '3' });
    }
    if (this.state.filtroMoradores4 === true) {
      listaRepublicas = _.filter(listaRepublicas, { pessoas: '4' });
    }
    if (this.state.filtroMoradores5 === true) {
      listaRepublicas = _.filter(listaRepublicas, { pessoas: '5' });
    }
    if (this.state.filtroMoradores6 === true) {
      listaRepublicas = _.filter(listaRepublicas, { pessoas: '6+' });
    }
    if (this.state.filtroVagas1 === true) {
      listaRepublicas = _.filter(listaRepublicas, { numVagas: '1' });
    }
    if (this.state.filtroVagas2 === true) {
      listaRepublicas = _.filter(listaRepublicas, { numVagas: '2' });
    }
    if (this.state.filtroVagas3 === true) {
      listaRepublicas = _.filter(listaRepublicas, { numVagas: '3' });
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
      <View style={Estilos.V_completa}>
        <NavigationEvents onDidFocus={this.getListRepublica} />
        <View>
          {this.state.loading ? (
            <View style={Estilos.V_republicas}>
              <Spinner color="#142850" />
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
          ) : this.state.listaRepublicas.length != 0 ? (
            <FlatList
              style={Estilos.flatList}
              data={this.state.listaRepublicas}
              renderItem={({ item }) => <Cartao data={item} />}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListRepublica}
            />
          ) : (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
              <EmptyState
                titulo="Sem Anuncios Disponivel "
                mensagem="Comece publicando um agora mesmo"
              />
            </View>
          )}
        </View>
        <View style={Estilos.V_filtroExterno}>
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
          >
            <View style={Estilos.V_filtroInterno}>
              <Text>Valor</Text>
              <ListItem style={Estilos.listStyle}>
                <Text style={Estilos.textFiltro}>De</Text>
                <Item underlined style={Estilos.itemInput}>
                  <Input
                    style={{ alignSelf: 'stretch' }}
                    onChangeText={text => this.valMenor(text)}
                    value={this.state.aluguelMin}
                    keyboardType="numeric"
                  />
                </Item>
                <Text style={Estilos.textFiltro}>Até</Text>
                <Item underlined style={Estilos.itemInput}>
                  <Input
                    style={{ alignSelf: 'stretch' }}
                    onChangeText={text => this.valMaior(text)}
                    value={this.state.aluguelMax}
                    keyboardType="numeric"
                  />
                </Item>
              </ListItem>
              <Text>Aceita animais?</Text>
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
              <Text> Tipo de república</Text>
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
              <Text>Capacidade de moradores</Text>
              <ListItem style={Estilos.listStyle}>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores2}
                  checked={this.state.filtroMoradores2}
                />
                <Text style={Estilos.textFiltro}>2</Text>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores3}
                  checked={this.state.filtroMoradores3}
                />
                <Text style={Estilos.textFiltro}>3</Text>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores4}
                  checked={this.state.filtroMoradores4}
                />
                <Text style={Estilos.textFiltro}>4</Text>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores5}
                  checked={this.state.filtroMoradores5}
                />
                <Text style={Estilos.textFiltro}>5</Text>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores6}
                  checked={this.state.filtroMoradores6}
                />
                <Text style={Estilos.textFiltro}>6+</Text>
              </ListItem>
              <Text>Vagas disponíveis</Text>
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
                <Text style={Estilos.textFiltro}>3</Text>
              </ListItem>

              <TouchableOpacity
                style={Estilos.botaoModal}
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.filtro();
                }}
              >
                <Text style={Estilos.textBotaoModal}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
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
          {this.state.active ? (
            <Icon name="arrow-down" />
          ) : (
            <Icon name="arrow-up" />
          )}

          <Button
            style={Estilos.corFAB}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Icon name="equalizer" style={Estilos.corIconFab} />
          </Button>
          <Button
            style={Estilos.corFAB}
            onPress={() => {
              this.limparPropsRepublicaRedux();
            }}
          >
            <Icon name="pencil" style={Estilos.corIconFab} />
          </Button>
        </Fab>
      </View>
    );
  }
}

const RepublicaConnect = connect(
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
    editNumeroCasa,
    editTipoImovel,
    editIdRepublica,
  }
)(Republica);

export default withNavigation(RepublicaConnect);
