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
  };

  UNSAFE_componentWillMount() {
    this.getlist();
  }

  getlist = () => {
    api
      .get(`/carona/confirmar/${this.props.email}`)
      .then(responseJson => {
        this.setState({
          user: responseJson.data,
          Load: false,
        });
      })
      .catch(error => {
        this.setState({ Erro: true, Load: false });
        console.log('erro:', error);
      });
  };

  SendStatus = (number, user) => {
    this.setState({ Load: true });
    if (number === 1) {
      console.log('entrou no if');
      const data = {
        email: user,
        status: 'Confirmado',
      };
      api
        .put(`/carona/confirmar/${this.props.email}`, data)
        .then(responseJson => {
          this.setState({ Load: false });
          this.onRefreshPage();
          console.log('USUARIO ACEITO', responseJson);
        })
        .catch(error => {
          this.setState({ Erro: true, Load: false });
          console.log('erro:', error);
        });
    } else if (number === 0) {
      const data = {
        email: user,
        status: 'Rejeitado',
      };
      api
        .put(`/carona/rejeitar/${this.props.email}`, data)
        .then(responseJson => {
          this.setState({ Load: false });
          console.log('USUARIO Rejeitado', responseJson);
        })
        .catch(error => {
          this.setState({ Erro: true, Load: false });
          console.log('Deu Erro no Inte:', error);
        });
    }
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
        {this.state.user.length == 0 && (
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
                    callback={(number, user) => this.SendStatus(number, user)}
                    dados={item.user}
                    dadosGerais={item}
                    tipoRetorno="Carona"
                  />

                  {item.status == 'Confirmado' && (
                    <View style={style.botaoStatusConf}>
                      <Text style={style.textStatusConf}>{item.status}</Text>
                    </View>
                  )}
                  {item.status == 'Analise' && (
                    <View style={style.botaoStatusAna}>
                      <Text style={style.textStatusAna}>{item.status}</Text>
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item._id}
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
