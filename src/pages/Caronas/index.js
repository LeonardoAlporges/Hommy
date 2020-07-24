import React, { Component } from 'react';

import { FlatList, View, Modal, Text, TouchableOpacity, Image } from 'react-native';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';
import { connect } from 'react-redux';
import { withNavigation, NavigationEvents } from 'react-navigation';

import { CheckBox, Spinner, ListItem, Fab, Input, Item, Button, Picker } from 'native-base';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Estilo from './style';
import CustomModal from '../../components/Alert';
import CartaoCarona from '../../components/CartaoCarona';
import api from '../../service/api';
import _ from 'lodash';
import EmptyState from '../../components/EmptyState';

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
      this.props.editSaida(''),
      this.props.editVagas(''),
      this.props.editValor('');

    this.props.navigation.navigate('CadastroCaronas', {
      update: false,
    });
  }

  UNSAFE_componentWillMount() {
    this.getListCarona();
  }

  fVagas1 = async checked => {
    if (this.state.filtroVagas1) await this.setState({ filtroVagas1: false });
    else
      await this.setState({
        filtroVagas1: true,
        filtroVagas2: false,
        filtroVagas3: false,
        filtroVagas4: false,
      });
  };

  fVagas2 = async checked => {
    if (this.state.filtroVagas2) await this.setState({ filtroVagas2: false });
    else
      await this.setState({
        filtroVagas2: true,
        filtroVagas1: false,
        filtroVagas3: false,
        filtroVagas4: false,
      });
  };

  fVagas3 = async checked => {
    if (this.state.filtroVagas3) await this.setState({ filtroVagas3: false });
    else
      await this.setState({
        filtroVagas3: true,
        filtroVagas2: false,
        filtroVagas1: false,
        filtroVagas4: false,
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
        filtroCidadeS: true,
      });
    else {
      this.setState({
        cidadeS: value,
        filtroCidadeS: false,
      });
    }
  };

  FCidadeD = value => {
    if (value != 'null')
      this.setState({
        cidadeD: value,
        filtroCidadeD: true,
      });
    else {
      this.setState({
        cidadeD: value,
        filtroCidadeD: false,
      });
    }
  };

  padrao = async () => {
    await this.setState({ filtroVagas1: false,
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
      cidadeS: ''})
      this.filtro();
  }

  filtro = async () => {
    await this.setState({ listaCaronas: this.state.fullData });
    let listaCaronas = this.state.listaCaronas;
    if (this.state.filtroVagas1 === true) {
      listaCaronas = _.filter(listaCaronas, ({ vagas }) => vagas == 1);
    }
    if (this.state.filtroVagas2 === true) {
      listaCaronas = _.filter(listaCaronas, ({ vagas }) => vagas == 2);
    }
    if (this.state.filtroVagas3 === true) {
      listaCaronas = _.filter(listaCaronas, ({ vagas }) => vagas == 3);
    }
    if (this.state.filtroVagas4 === true) {
      listaCaronas = _.filter(listaCaronas, ({ vagas }) => vagas >= 4);
    }
    if (this.state.filtroCidadeS === true) {
      listaCaronas = _.filter(listaCaronas, { localSaida: this.state.cidadeS });
    }
    if (this.state.filtroCidadeD === true) {
      listaCaronas = _.filter(listaCaronas, {
        localChegada: this.state.cidadeD,
      });
    }
    if (this.state.filtroValorMenor === true) {
      listaCaronas = _.filter(listaCaronas, ({ valor }) => valor >= this.state.aluguelMin);
    }
    if (this.state.filtroValorMaior === true) {
      listaCaronas = _.filter(listaCaronas, ({ valor }) => valor <= this.state.aluguelMax);
    }
    await this.setState({ listaCaronas });
  };

  getListCarona = () => {
    this.setState({ refreshing: true, listaCaronas: [] });
    return api
      .get('/carona')
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaCaronas: responseJson.data,
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

  render() {
    return (
      <View style={Estilo.V_externa}>
        <NavigationEvents onDidFocus={this.getListCarona} />
        {this.state.loading ? (
          <View style={Estilo.V_internaLoad}>
            <Spinner color="#142850" />
          </View>
        ) : (
            <View>
              {this.state.erro ? (
                <View style={Estilo.V_interna1}>
                  <CustomModal
                    parametro="Erro"
                    callback={() => {
                      this.setState({ erro: false });
                    }}
                  />
                </View>
              ) : (
                  <View>
                    {this.state.listaCaronas.length !== 0 ? (
                      <View style={Estilo.card}>
                        <FlatList
                          style={Estilo.flatList}
                          data={this.state.listaCaronas}
                          renderItem={({ item }) => <CartaoCarona dados={item} />}
                          keyExtractor={item => item._id}
                          refreshing={this.state.refreshing}
                          onRefresh={this.getListCarona}
                        />
                      </View>
                    ) : (
                        <View style={{ backgroundColor: '#ffffff' }}>
                          {this.state.listaCaronas.length == 0 && (
                            <EmptyState
                              titulo="Nada por aqui!"
                              mensagem="Por enquanto ninguém está oferecendo carona. Tente novamente mais tarde. "
                            />
                          )}
                        </View>
                      )}
                  </View>
                )}
            </View>
          )}

        {this.state.modalVisible && (
          <View style={Estilo.V_modalExterno}>
            <Modal animationType="fade" visible={this.state.modalVisible} transparent={true}>
              <View style={Estilo.V_modalInterno}>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
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
                <ListItem style={Estilo.listStyle}>
                  <View style={Estilo.ViewLabel}>
                    <Text style={Estilo.textValor}>De R$</Text>
                  </View>
                  <Item underlined style={Estilo.itemStyle}>
                    <Input
                      onChangeText={text => this.valMenor(text)}
                      value={this.state.aluguelMin}
                      keyboardType="numeric"
                    />
                  </Item>
                  <View style={Estilo.ViewLabel}>
                    <Text style={Estilo.textValor}>Até R$</Text>
                  </View>
                  <Item underlined style={Estilo.itemStyle}>
                    <Input
                      onChangeText={text => this.valMaior(text)}
                      value={this.state.aluguelMax}
                      keyboardType="numeric"
                    />
                  </Item>
                </ListItem>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>Vagas disponíveis</Text>
                <ListItem style={Estilo.listStyle}>
                  <CheckBox
                    color="#142850"
                    style={Estilo.inputStyle}
                    onPress={this.fVagas1}
                    checked={this.state.filtroVagas1}
                  />
                  <Text style={Estilo.textList}>1</Text>
                  <CheckBox
                    color="#142850"
                    style={Estilo.inputStyle}
                    onPress={this.fVagas2}
                    checked={this.state.filtroVagas2}
                  />
                  <Text style={Estilo.textList}>2</Text>
                  <CheckBox
                    color="#142850"
                    style={Estilo.inputStyle}
                    onPress={this.fVagas3}
                    checked={this.state.filtroVagas3}
                  />
                  <Text style={Estilo.textList}>3</Text>
                  <CheckBox
                    color="#142850"
                    style={Estilo.inputStyle}
                    onPress={this.fVagas4}
                    checked={this.state.filtroVagas4}
                  />
                  <Text style={Estilo.textList}>4+</Text>
                </ListItem>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>Saida</Text>      
                <ListItem style={Estilo.listStyle}>                
                  <Item picker style={Estilo.pickerStyle}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: 140 }}
                      placeholder="Destino"
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.cidadeS}
                      onValueChange={this.FCidadeS.bind(this)}
                    >
                      <Picker.Item label=" " value="null" />
                      <Picker.Item label="Alegre" value="Alegre" />
                      <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                      <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                      <Picker.Item label="Celina" value="Celina" />
                      <Picker.Item label="Guacui" value="Guacui" />
                      <Picker.Item label="Guarapari" value="Guarapari" />
                      <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                      <Picker.Item label="Piuma" value="Piuma" />
                      <Picker.Item label="Rive" value="Rive" />
                      <Picker.Item label="Serra" value="Serra" />
                      <Picker.Item label="Vila Velha" value="Vila Velha" />  
                      <Picker.Item label="Vitoria" value="Vitoria" />
                    </Picker>
                  </Item>
                </ListItem>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>Destino</Text>           
                <ListItem style={Estilo.listStyle}>
                
                  <Item picker style={Estilo.pickerStyle}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: 140 }}
                      placeholder="Destino"
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.cidadeD}
                      onValueChange={this.FCidadeD.bind(this)}
                    >
                         <Picker.Item label=" " value="null" />
                      <Picker.Item label="Alegre" value="Alegre" />
                      <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                      <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                      <Picker.Item label="Celina" value="Celina" />
                      <Picker.Item label="Guacui" value="Guacui" />
                      <Picker.Item label="Guarapari" value="Guarapari" />
                      <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                      <Picker.Item label="Piuma" value="Piuma" />
                      <Picker.Item label="Rive" value="Rive" />
                      <Picker.Item label="Serra" value="Serra" />
                      <Picker.Item label="Vila Velha" value="Vila Velha" />  
                      <Picker.Item label="Vitoria" value="Vitoria" />
                    </Picker>
                  </Item>
                </ListItem>
                <TouchableOpacity
                  style={Estilo.modalBtn}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.padrao();
                  }}
                >
                  <Text style={Estilo.textBtn}>Voltar ao padrão</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Estilo.modalBtn}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.filtro();
                  }}
                >
                  <Text style={Estilo.textBtn}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
        <Fab
          active={this.state.active}
          direction="up"
          style={Estilo.FABStyle}
          position="bottomRight"
          onPress={() => {
            this.setState({ active: !this.state.active });
          }}
        >
          {this.state.active ? <Icon name="minus" /> : <Icon name="plus" />}

          <Button
            style={Estilo.FabBTN}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Icon name="filter-outline" style={Estilo.FabIcon} />
          </Button>
          <Button
            style={Estilo.FabBTN}
            onPress={() => {
              this.limparPropsCaronaRedux();
            }}
          >
            <Icon name="plus" style={Estilo.FabIcon} />
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
    editSaida,
    editVagas,
    editValor,
  }
)(Caronas);

export default withNavigation(CaronasConnect);
