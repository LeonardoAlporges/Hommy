import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import style from './styles';

import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';
import CartaoUser from '../../components/CartaoUser';

import moment from 'moment';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';

class Agendamentos extends Component {
  static navigationOptions = { header: null };
  state = {
    listaAgendamento: [],
    Load: true,
    Erro: false,
    Usuario: this.props.navigation.state.params.usuario,
    idRepublica: this.props.navigation.state.params.idRepublica,
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  onRefreshPage = () => {};

  Agendar = () => {
    this.setState({ Load: true });
    api
      .get(`/confirmAgendamento/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ listaAgendamento: responseJson.data, Load: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false, Erro: true });
        this.setState({});
      });
  };

  enviarReq = (tipoSocilitacao, usuario) => {
    console.log('???');
    console.log(this.state.idRepublica);

    if (tipoSocilitacao == 1) {
      const data = {
        email: usuario,
        status: 'Confirmado',
      };
      api
        .put(`/confirmAgendamento/${this.state.idRepublica}`, data)
        .then(responseJson => {
          console.log(responseJson);
          this.setState({ listaAgendamento: [] });
          this.Agendar();
        })
        .catch(error => {
          this.setState({ Erro: true });
        });
    } else if (tipoSocilitacao == 0) {
      const data = {
        email: usuario,
        status: 'Rejeitado',
      };
      api
        .put(`/confirmAgendamento/${this.state.idRepublica}`, data)
        .then(responseJson => {
          console.log(responseJson);
          this.setState({ listaAgendamento: [] });
          this.Agendar();
        })
        .catch(error => {
          this.setState({ Erro: true });
        });
    }
  };

  render() {
    return (
      <View style={style.Container}>
        <HeaderBack
          title="Agendamentos de visita"
          onNavigation={() => this.navegar()}
        />
        {this.state.Load && <Loading />}
        {this.state.listaAgendamento.length == 0 && (
          <EmptyState
            titulo="Sem Agendamentos"
            mensagem="Aguarde logo aparecerár alguem para preencher esse vazio :("
          />
        )}

        <View style={style.V_label}>
          <Text style={style.label}>Lista de agendamento de visita</Text>
          <View style={style.barra} />
        </View>

        <FlatList
          data={this.state.listaAgendamento}
          renderItem={({ item }) => (
            <View>
              <CartaoUser
                status={item.status}
                callback={() => this.onRefreshPage()}
                retorno={(number, user) => this.enviarReq(number, user)}
                dados={item.user}
                dadosGerais={item}
                tipoRetorno="Republica"
              />
              <View style={style.viewData}>
                <View style={style.viewData2}>
                  <Text style={style.data}>
                    {moment(new Date(item.data)).format('L')}
                  </Text>
                  <Text>As</Text>
                  <Text style={style.data}>
                    {moment(new Date(item.hora)).format('hh:mm')}
                  </Text>
                </View>
                {item.status == 'Análise' && (
                  <View style={style.Analise}>
                    <Text style={style.data}>{item.status}</Text>
                  </View>
                )}
                {item.status == 'Confirmado' && (
                  <View style={style.Confirmado}>
                    <Text style={style.dataConf}>{item.status}</Text>
                  </View>
                )}
                {item.status == 'Rejeitado' && (
                  <View style={style.Rejeitado}>
                    <Text style={style.dataRej}>{item.status}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          keyExtractor={item => item._id}
        />
        {this.state.Erro && (
          <View style={style.V_Detalhes}>
            <CustomModal
              parametro="Erro"
              callback={() => {
                this.setState({ Erro: false });
              }}
            />
          </View>
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

const AgendamentoConnect = connect(
  mapStateToProps,
  null
)(Agendamentos);

export default AgendamentoConnect;
