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
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import {
  CheckBox,
  Spinner,
  ListItem,
  Fab,
  Input,
  Item,
  Button,
  Picker
} from 'native-base';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Estilo from './style';
import CustomModal from '../../components/Alert';
import CartaoCarona from '../../components/CartaoCarona';
import api from '../../service/api';
import _ from 'lodash';

class Caronas extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      listaCaronas: [],
      loading: true,
      erro: false,
      fullData: [],
      modalVisible: false,
      filtroVagas1: false,
      filtroVagas2: false,
      filtroVagas3: false,
      filtroVagas4: false,
      filtroValorMaior: false,
      filtroValorMenor: false,
      filtroCidadeD: false,
      filtroCidadeS: false,
      aluguelMin: '',
      aluguelMax: '',
      cidadeD: '',
      cidadeS: '',
    };
  }

  limparPropsCaronaRedux() {
    this.props.editChegada(''),
      this.props.editData(''),
      this.props.editDesembarque(''),
      this.props.editEmbarque(''),
      this.props.editHChegada(''),
      this.props.editHSaida(''),
      this.props.editImagem(''),
      this.props.editNome(''),
      this.props.editNota(''),
      this.props.editSaida(''),
      this.props.editVagas(''),
      this.props.editValor('');

    this.props.navigation.navigate('CadastroCaronas', {
      update: false,
    });
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/carona')
      .then(responseJson => {
        this.setState({ listaCaronas: responseJson.data });
        this.setState({ loading: false });
        this.setState({
          listaCaronas: responseJson.data,
          fullData: responseJson.data,
        });
      })
      .catch(error => {
        console.log('SERVIDOR ESTA DESLIGADO');
        this.setState({ loading: false });
        this.setState({ erro: true });
      });
    this.setState({ loading: false });
  }

  fVagas1 = async checked => {
    if (this.state.filtroVagas1) await this.setState({ filtroVagas1: false });
    else
      await this.setState({
        filtroVagas1: true,
        filtroVagas2: false,
        filtroVagas3: false,
        filtroVagas4: false
      });
  };

  fVagas2 = async checked => {
    if (this.state.filtroVagas2) await this.setState({ filtroVagas2: false });
    else
      await this.setState({
        filtroVagas2: true,
        filtroVagas1: false,
        filtroVagas3: false,
        filtroVagas4: false
      });
  };

  fVagas3 = async checked => {
    if (this.state.filtroVagas3) await this.setState({ filtroVagas3: false });
    else
      await this.setState({
        filtroVagas3: true,
        filtroVagas2: false,
        filtroVagas1: false,
        filtroVagas4: false
      });
  };
  fVagas4 = async checked => {
    if (this.state.filtroVagas4) await this.setState({ filtroVagas4: false });
    else
      await this.setState({
        filtroVagas4: true,
        filtroVagas2: false,
        filtroVagas1: false,
        filtroVagas3: false,
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

  FCidadeS = value => {
    if (value != 'null')
    this.setState({
      cidadeS: value,
      filtroCidadeS: true
    });
    else{
      this.setState({
        cidadeS: value,
        filtroCidadeS: false
      });
    }
  }

  FCidadeD = value => {
    if (value != 'null')
    this.setState({
      cidadeD: value,
      filtroCidadeD: true
    });
    else{
      this.setState({
        cidadeD: value,
        filtroCidadeD: false
      });
    }
  }

  filtro = async () => {
    await this.setState({ listaCaronas: this.state.fullData });
    let listaCaronas = this.state.listaCaronas;
    if (this.state.filtroVagas1 === true) {
      listaCaronas = _.filter(listaCaronas, { vagas: '1' });
    }
    if (this.state.filtroVagas2 === true) {
      listaCaronas = _.filter(listaCaronas, { vagas: '2' });
    }
    if (this.state.filtroVagas3 === true) {
      listaCaronas = _.filter(listaCaronas, { vagas: '3' });
    }
    if (this.state.filtroVagas4 === true) {
      listaCaronas = _.filter(listaCaronas, { vagas: '4' });
    }
    if (this.state.filtroCidadeS === true) {
      listaCaronas = _.filter(listaCaronas, { localSaida: this.state.cidadeS });
    }
    if (this.state.filtroCidadeD === true) {
      listaCaronas = _.filter(listaCaronas, { localChegada: this.state.cidadeD });
    }
    if (this.state.filtroValorMenor === true) {
      listaCaronas = _.filter(
        listaCaronas,
        ({ valor }) => valor >= this.state.aluguelMin
      );
    }
    if (this.state.filtroValorMaior === true) {
      listaCaronas = _.filter(
        listaCaronas,
        ({ valor }) => valor <= this.state.aluguelMax
      );
    }
    await this.setState({ listaCaronas });
  };

  render() {
    return (
      <View style={{height: '100%'}}>
        {this.state.loading ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
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
            }}
          >
            <CustomModal parametro="Erro" />
            <Image
              style={{ height: 200, width: 200 }}
              source={require('../../assets/Img/Empty.png')}
            />
            <Text
              style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'Roboto' }}
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
              Aproveite essa oportunidade publique sua oferta de carona agora
              mesmo{' '}
            </Text>
          </View>
        ) : (
          <ScrollView style={Estilo.card}>
            <FlatList
              style={Estilo.flatList}
              data={this.state.listaCaronas}
              renderItem={({ item }) => <CartaoCarona dados={item} />}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        )}

        <View
          style={{
            backgroundColor: '#ffffff',
            flex: 1,
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
                marginTop: 150,
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
                <CheckBox
                color="#27496d"
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas4}
                  checked={this.state.filtroVagas4}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  4
                </Text>
              </ListItem>
              <Text>Saida</Text>
              <ListItem style={{  marginBottom: 10 }}>
              <Item picker style={{ marginLeft:50, marginRight:50}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Destino"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.cidadeS}
                onValueChange={this.FCidadeS.bind(this)}
              >
                <Picker.Item label="Cidades" value= 'null' />
                <Picker.Item label="Alegre" value="Alegre" />
                <Picker.Item label="Serra" value="Serra" />
                <Picker.Item label="Piuma" value="Piuma" />
                <Picker.Item label="Guarapari" value="Guarapari" />
                <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                <Picker.Item label="Vitoria" value="Vitoria" />
                <Picker.Item label="Vila Velha" value="Vila Velha" />
                <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                <Picker.Item label="Guacui" value="Guacui" />
                <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                <Picker.Item label="Celina" value="Celina" />
                <Picker.Item label="Rive" value="Rive" />
              </Picker>
            </Item>
              </ListItem>
              <Text>Destino</Text>
              <ListItem style={{ marginBottom: 10 }}>
              <Item picker style={{ marginLeft:50, marginRight:50}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Destino"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.cidadeD}
                onValueChange={this.FCidadeD.bind(this)}
              >
                <Picker.Item label="Cidades" value= 'null' />
                <Picker.Item label="Alegre" value="Alegre" />
                <Picker.Item label="Serra" value="Serra" />
                <Picker.Item label="Piuma" value="Piuma" />
                <Picker.Item label="Guarapari" value="Guarapari" />
                <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                <Picker.Item label="Vitoria" value="Vitoria" />
                <Picker.Item label="Vila Velha" value="Vila Velha" />
                <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                <Picker.Item label="Guacui" value="Guacui" />
                <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                <Picker.Item label="Celina" value="Celina" />
                <Picker.Item label="Rive" value="Rive" />
              </Picker>
            </Item>
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
          style={{ backgroundColor: '#27496d', position: 'absolute' }}
          position="bottomRight"
          onPress={() => {
            this.setState({ active: !this.state.active });
            //this.limparPropsCaronaRedux();
          }}
        >
          {this.state.active ? (
            <Icon name="arrow-down" />
          ) : (
            <Icon name="arrow-up" />
          )}

          <Button
            style={{
              backgroundColor: '#27496d',
            }}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Icon name="equalizer" style={{ color: '#ffffff' }} />
          </Button>
          <Button
            style={{ backgroundColor: '#27496d' }}
            onPress={() => {
              this.limparPropsCaronaRedux();
            }}
          >
            <Icon name="pencil" style={{ color: '#ffffff' }} />
          </Button>
        </Fab>
      </View>
    );
  }
}

const CaronasConnect = connect(
  null,
  {
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
)(Caronas);

export default withNavigation(CaronasConnect);
