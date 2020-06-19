import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { Icon } from 'native-base';
import style from './style';
import api from '../../service/api';
import CartaoUser from '../../components/CartaoUser';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import { connect } from 'react-redux';
import HeaderBack from '../../components/CustomHeader';
import EmptyState from '../../components/EmptyState';

class Interessados extends Component {
  static navigationOptions = { header: null };
  state = {
    user: [],
    userConfirmado: [],
    modal: false,
    refreshing: false,
  };

  UNSAFE_componentWillMount() {
    this.getlist();
  }

  getlist = () => {
    this.setState({ refreshing: true });
    api
      .get(`/carona/retornaInteresse/${this.props.email}`)
      .then(responseJson => {
        this.setState({
          user: responseJson.data,
        });
      })
      .catch(error => {
        console.log('erro:', error);
      });

    api
      .get(`/carona/confirmar/${this.props.email}`)
      .then(responseJson => {
        this.setState({ userConfirmado: responseJson.data });
      })
      .catch(error => {
        console.log('erro:', error);
      });
    this.setState({ refreshing: false });
  };
  navegar = () => {
    this.props.navigation.goBack(null);
  };
  onRefreshPage = () => {
    this.getlist;
  };

  render() {
    return (
      <View
        style={{ backgroundColor: '#ffffff', width: '100%', height: '100%' }}
      >
        <HeaderBack
          title="Lista de interessados"
          onNavigation={() => this.navegar()}
        />
        {(this.state.user.length == 0 ||
          this.state.useuserConfirmador.length == 0) && (
          <EmptyState
            titulo="Sem interessados"
            mensagem="Aguarde logo aparecerár alguem para preencher esse vazio :("
          />
        )}
        <ScrollView>
          <View style={style.Listas}>
            <FlatList
              style={style.flatList}
              data={this.state.user}
              renderItem={({ item }) => (
                <CartaoUser
                  callback={() => this.onRefreshPage()}
                  dados={item}
                />
              )}
              refreshing={this.state.refreshing}
              onRefresh={this.getlist}
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
              renderItem={({ item }) => (
                <CartaoUser
                  callback={() => this.onRefreshPage()}
                  dados={item}
                />
              )}
              refreshing={this.state.refreshing}
              onRefresh={this.getlist}
              keyExtractor={item => item._id}
            />
          </View>
        </ScrollView>
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
