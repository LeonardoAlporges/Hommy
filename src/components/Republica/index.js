import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { CheckBox, ListItem, Button, Fab, Input, Item } from 'native-base';

import estilosRepublica from './style';
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
  editNumero,
  editTipoImovel,
} from '../../actions/AuthActions';

class Republica extends Component {
  static navigationOptions = { header: null };
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
    };
  }

  limparPropsRepublicaRedux() {
    this.props.editValorConta('');
    this.props.editNomeRepublica('');
    this.props.editValorAluguel('');
    this.props.editBairro('');
    this.props.editRua('');
    this.props.editNumero('');
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

  UNSAFE_componentWillMount() {
    return api
      .get('/main')
      .then(responseJson => {
        this.setState({ listaRepublicas: responseJson.data });
        this.setState({ loading: false });
        console.log(responseJson);
        this.setState({
          listaRepublicas: responseJson.data,
          fullData: responseJson.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log('SERVIDOR ESTA DESLIGADO');
        this.setState({ loading: false });
        this.setState({ erro: true });
      });
    this.setState({ loading: false });
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
      <View style={{ width: '100%', height: '100%' }}>
        <View>
          {this.state.loading ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#ffffff"
              }}
            >
              <Spinner color="#27496d" />
            </View>
          ) : this.state.erro ? (
            <View
              style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '10%',
                backgroundColor: "#ffffff"
              }}
            >
              <CustomModal parametro="Erro" />
              <Image
                style={{ height: 200, width: 200 }}
                source={require('../../assets/Img/Empty.png')}
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                }}
              >
                Nenhum Anuncio Disponivel
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '400',
                  fontFamily: 'Roboto',
                  width: '80%',
                }}
              >
                Aproveite essa oportunidade publique a de vaga da sua republica
                agora mesmo{' '}
              </Text>
            </View>
          ) : (
                <ScrollView style={estilosRepublica.card}>
                  <FlatList
                    style={estilosRepublica.flatList}
                    data={this.state.listaRepublicas}
                    renderItem={({ item }) => <Cartao leonardo={item} />}
                    keyExtractor={item => item._id}
                  />
                </ScrollView>
              )}
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            height: '100%',
            width: '100%',
          }}
        >
          <Modal
            animationType="fade"
            visible={this.state.modalVisible}
            transparent={true}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 500,
                marginTop: 125,
                marginHorizontal: 50,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text>Valor</Text>
              <ListItem style={{ alignItems: 'stretch', marginBottom: 10 }}>
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  De
                </Text>
                <Item
                  underlined
                  style={{
                    width: 100,
                    borderBottomColor: '#27496d',
                  }}
                >
                  <Input
                    style={{ alignSelf: 'stretch' }}
                    onChangeText={text => this.valMenor(text)}
                    value={this.state.aluguelMin}
                    keyboardType="numeric"
                  />
                </Item>
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Até
                </Text>
                <Item
                  underlined
                  style={{
                    width: 100,
                    borderBottomColor: '#27496d',
                  }}
                >
                  <Input
                    style={{ alignSelf: 'stretch' }}
                    onChangeText={text => this.valMaior(text)}
                    value={this.state.aluguelMax}
                    keyboardType="numeric"
                  />
                </Item>
              </ListItem>
              <Text>Aceita animais?</Text>
              <ListItem style={{ alignItems: 'center', marginBottom: 10 }}>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fAnimalSim}
                  checked={this.state.filtroAnimalSim}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Sim
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fAnimalNao}
                  checked={this.state.filtroAnimalNao}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Não
                </Text>
              </ListItem>
              <Text> Tipo de república</Text>
              <ListItem style={{ alignItems: 'center', marginBottom: 10 }}>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMasc}
                  checked={this.state.filtroMasc}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Masculina
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fFem}
                  checked={this.state.filtroFem}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Feminina
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMista}
                  checked={this.state.filtroMista}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  Mista
                </Text>
              </ListItem>
              <Text>Capacidade de moradores</Text>
              <ListItem style={{ alignItems: 'center', marginBottom: 10 }}>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores2}
                  checked={this.state.filtroMoradores2}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  2
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores3}
                  checked={this.state.filtroMoradores3}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  3
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores4}
                  checked={this.state.filtroMoradores4}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  4
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores5}
                  checked={this.state.filtroMoradores5}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  5
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fMoradores6}
                  checked={this.state.filtroMoradores6}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  6+
                </Text>
              </ListItem>
              <Text>Vagas disponíveis</Text>
              <ListItem style={{ alignItems: 'stretch', marginBottom: 10 }}>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas1}
                  checked={this.state.filtroVagas1}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  1
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas2}
                  checked={this.state.filtroVagas2}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  2
                </Text>
                <CheckBox
                  color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas3}
                  checked={this.state.filtroVagas3}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  3
                </Text>
              </ListItem>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#57A773',
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  justifyContent: 'center',
                  height: 45,
                  width: 170,
                }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                  this.filtro();
                  console.log(this.state.listaRepublicas);
                }}
              >
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    fontSize: 20,
                  }}
                >
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{
            backgroundColor: '#27496d',
            position: 'absolute',
            bottom: 10,
          }}
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
            style={{ backgroundColor: '#27496d' }}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Icon name="equalizer" style={{ color: '#ffffff' }} />
          </Button>
          <Button
            style={{ backgroundColor: '#27496d' }}
            onPress={() => {
              this.limparPropsRepublicaRedux();
            }}
          >
            <Icon name="pencil" style={{ color: '#ffffff' }} />
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
    editNumero,
    editTipoImovel,
  }
)(Republica);

export default withNavigation(RepublicaConnect);
