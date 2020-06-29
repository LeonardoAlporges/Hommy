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
import Loading from '../../components/Loading';
import CustomModal from '../../components/Alert';

class Interessados extends Component {
  static navigationOptions = { header: null };
  state = {
    Erro: false,
    Load: true,
    user: [],
    userConfirmado: [],
    modal: false,
    refreshing: false,
    idCarona: this.props.navigation.state.params.idCarona,
  };

  UNSAFE_componentWillMount() {
    this.getlist();
  }

  getlist = () => {
    api
      .get(`/carona/confirmar/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          user: responseJson.data,
          Load: false,
        });
      })
      .catch(error => {
        this.setState({ Erro: true, Load: false });
        console.log(error);
      });
  };

  SendStatus = (number, user) => {
    this.setState({ Load: true });
    if (number === 1) {
      const data = {
        email: user,
        status: 'Confirmado',
      };
      api
        .put(`/carona/confirmar/${this.state.idCarona}`, data)
        .then(responseJson => {
          this.setState({ Load: false });
          this.onRefreshPage();
        })
        .catch(error => {
          this.setState({ Erro: true, Load: false });
          console.log(error);
        });
    } else if (number === 0) {
      const data = {
        email: user,
        status: 'Rejeitado',
      };
      api
        .put(`/carona/confirmar/${this.state.idCarona}`, data)
        .then(responseJson => {
          this.setState({ Load: false });

          this.onRefreshPage();
        })
        .catch(error => {
          this.setState({ Erro: true, Load: false });
        });
    }
    this.setState({ Load: false });
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };
  onRefreshPage = () => {
    this.setState({ user: [] });
    this.getlist();
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
        {this.state.Load && <Loading />}
        {this.state.user == 0 && (
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
                <View>
                  <CartaoUser
                    status={item[0].status}
                    callback={(number, user) => this.SendStatus(number, user)}
                    dados={item[0].user}
                    dadosGerais={item}
                    tipoRetorno="Carona"
                  />
                  {item[0].status == 'Confirmado' && (
                    <View style={style.botaoStatusConf}>
                      <Text style={style.textStatusConf}>{item[0].status}</Text>
                    </View>
                  )}
                  {item[0].status == 'Análise' && (
                    <View style={style.botaoStatusAna}>
                      <Text style={style.textStatusAna}>{item[0].status}</Text>
                    </View>
                  )}
                  {item[0].status == 'Rejeitado' && (
                    <View style={style.botaoStatusRej}>
                      <Text style={style.textStatusRej}>{item[0].status}</Text>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item[0]._id}
            />
          </View>
        </ScrollView>
        {this.state.Erro && (
          <CustomModal
            parametro="Erro"
            callback={() => {
              this.setState({ Erro: false });
            }}
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
