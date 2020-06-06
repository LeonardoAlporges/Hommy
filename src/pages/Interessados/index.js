import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { Icon } from 'native-base';
import style from './style';
import api from '../../service/api';
import CartaoUser from '../../components/CartaoUser';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import { connect } from 'react-redux';

class Interessados extends Component {
  static navigationOptions = { header: null };
  state = {
    user: [],
    userConfirmado: [],
    modal: false,
  };

  UNSAFE_componentWillMount() {
    this.getlist();
  }

  getlist = () => {
    api
      .get(`/carona/retornaInteresse/${this.props.email}`)
      .then(responseJson => {
        this.setState({
          user: responseJson.data,
        }).catch(error => {
          console.log(e);
        });
      });

    api
      .get(`/carona/confirmar/${this.props.email}`)
      .then(responseJson => {
        this.setState({ userConfirmado: responseJson.data });
      })
      .catch(error => {
        console.log('erro:', error);
      });
  };

  render() {
    return (
      <View
        style={{ backgroundColor: '#ffffff', width: '100%', height: '100%' }}
      >
        <View style={style.V_header}>
          <TouchableOpacity
            style={{ marginLeft: '5%' }}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Icon name="ios-arrow-back" style={style.iconHeader} />
          </TouchableOpacity>
          <Text style={style.title}>Lista de interessados</Text>
        </View>
        <View style={style.Listas}>
          <FlatList
            style={style.flatList}
            data={this.state.user}
            renderItem={({ item }) => <CartaoUser dados={item} />}
            keyExtractor={item => item._id}
          />
        </View>

        <View style={style.V_title}>
          <Text style={style.titleCategoria}>Confirmados</Text>
          <View style={style.barra} />
        </View>

        <View style={style.Listas}>
          <FlatList
            style={style.flatList}
            data={this.state.userConfirmado}
            renderItem={({ item }) => <CartaoUser dados={item} />}
            keyExtractor={item => item._id}
          />
        </View>
        {this.state.modal && (
          <ModalConfirmacao
            retornoModal={valor => mudarStatusInteressado(valor)}
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

const InteressadoConnect = connect(
  mapStateToProps,
  null
)(Interessados);

export default InteressadoConnect;
