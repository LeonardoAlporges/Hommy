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

import { withNavigation } from 'react-navigation';

import {
  CheckBox,
  Spinner,
  ListItem,
  Fab,
  Icon,
  Input,
  Item,
} from 'native-base';

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
      listaCaronas: [],
      loading: true,
      erro: false,
      fullData: [],
      modalVisible: false,
      filtroVagas1: false,
      filtroVagas2: false,
      filtroVagas3: false,
      filtroValorMaior: false,
      filtroValorMenor: false,
      aluguelMin: '',
      aluguelMax: '',
    };
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
    await this.setState({ listaCaronas: this.state.fullData });
    let listaCaronas = this.state.listaCaronas;
    if (this.state.filtroVagas1 === true) {
      listaCaronas = _.filter(this.state.listaCaronas, { vagas: '1' });
    }
    if (this.state.filtroVagas2 === true) {
      listaCaronas = _.filter(this.state.listaCaronas, { vagas: '2' });
    }
    if (this.state.filtroVagas3 === true) {
      listaCaronas = _.filter(this.state.listaCaronas, { vagas: '3' });
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
      <View>
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
            backgroundColor: '#00000080',
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
                height: 400,
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
                    borderBottomColor: 'rgba(29,161,242,1)',
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
                    borderBottomColor: 'rgba(29,161,242,1)',
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
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas1}
                  checked={this.state.filtroVagas1}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  1
                </Text>
                <CheckBox
                  style={{ alignSelf: 'stretch' }}
                  onPress={this.fVagas2}
                  checked={this.state.filtroVagas2}
                />
                <Text style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                  2
                </Text>
                <CheckBox
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
                  backgroundColor: '#30C21E',
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
          direction="up"
          containerStyle={{}}
          style={{
            backgroundColor: 'rgba(29,161,242,1)',
            position: 'absolute',
          }}
          position="bottomLeft"
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        >
          <Icon name="md-add" />
        </Fab>
      </View>
    );
  }
}

export default withNavigation(Caronas);
