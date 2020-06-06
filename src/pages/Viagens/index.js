import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal } from 'react-native';

import { connect } from 'react-redux';
import style from './style';
import { Button } from 'native-base';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import CartaoCarona from '../../components/CartaoCarona';
import ModalAvaliacao from '../../components/ModalAvaliacao';

class Viagens extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      listaCaronas: [],
      modal: false,
      botaoAvaliar: true,
      emailAvaliado: '',
      nomeAvaliado: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.getListCarona();
  }

  avaliar = item => {
    console.log(item);
    this.setState({ emailAvaliado: item.userEmail });
    this.setState({ nomeAvaliado: item.nome });
    this.setState({ modal: true });
  };

  getListCarona = () => {
    this.setState({ refreshing: true });
    return api
      .get(`/carona/meusInteresses/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          listaCaronas: responseJson.data,
        });
      })
      .catch(error => {
        console.log(e);
      });
  };

  returnModal() {
    this.setState({ modal: false });
    this.setState({ botaoAvaliar: false });
    console.log('leo');
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <View style={style.V_header}>
          <TouchableOpacity
            style={{ marginHorizontal: '3%' }}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Icon name="arrow-left" style={style.iconHeader} />
          </TouchableOpacity>
          <Text style={style.titleHeader}>Minhas viagens</Text>
        </View>
        <View style={style.card}>
          <FlatList
            style={style.flatList}
            data={this.state.listaCaronas}
            renderItem={({ item }) => (
              <View>
                <CartaoCarona dados={item} />
                <View style={style.V_Botao}>
                  <Button
                    style={style.botao}
                    onPress={() => {
                      this.avaliar(item);
                    }}
                  >
                    <Icon name="star" style={style.icon} />
                    <Text style={style.title}>Avaliar carona</Text>
                  </Button>
                </View>
              </View>
            )}
          />
        </View>

        {this.state.modal && (
          <ModalAvaliacao
            nome={this.state.nomeAvaliado}
            email={this.state.emailAvaliado}
            retornoModal={() => this.returnModal()}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

const ViagemConnect = connect(
  mapStateToProps,
  null
)(Viagens);

export default ViagemConnect;
