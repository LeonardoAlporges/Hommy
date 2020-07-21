import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
        console.log(error.response.data);
        this.setState({ Load: false, Erro: true });
      });
  };

  enviarSujestao = () => {
    const data = {
      status: 'Sujetao',
      data: this.state.data,
    };
  };

  enviarReq = (tipoSocilitacao, usuario) => {
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
          console.log(error.response.data);
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
        <HeaderBack title="Agendamentos" onNavigation={() => this.navegar()} />
        {this.state.Load && <Loading />}
        {this.state.listaAgendamento.length == 0 && (
          <EmptyState
            titulo="Sem Agendamentos"
            mensagem="Ninguém agendou uma visita a sua república. Aguarde, logo aparecerá alguém para preencher esse vazio"
          />
        )}
        {this.state.listaAgendamento.length != 0 && (
          <View>
            <View style={{ width: '100%', paddingHorizontal: 5, height: 40 }}>
              <Text style={style.subtitulo}>
                Abaixo estão listadas as pessoas que solicitaram uma visita a sua república.
              </Text>
            </View>
            <View style={style.V_label}>
              <Text style={style.label}>Interessados</Text>
              <View style={style.barra} />
            </View>
          </View>
        )}
        <FlatList
          data={this.state.listaAgendamento}
          renderItem={({ item }) => (
            <ScrollView>
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
                  <Text style={style.data}>{moment(new Date(item.data)).format('DD/MM/YY')}</Text>
                  <Text>As</Text>
                  <Text style={style.data}>{moment(new Date(item.hora)).format('hh:mm')}</Text>
                </View>
                {item.status == 'Análise' && (
                  <View style={style.Analise}>
                    <Text style={style.data}>Em análise</Text>
                  </View>
                )}
                {item.status == 'Confirmado' && (
                  <View style={style.Confirmado}>
                    <Text style={style.dataConf}>Confirmada</Text>
                  </View>
                )}
                {item.status == 'Rejeitado' && (
                  <View style={style.Rejeitado}>
                    <Text style={style.dataRej}>Rejeitada</Text>
                  </View>
                )}
              </View>
            </ScrollView>
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
