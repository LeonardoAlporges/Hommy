import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';

import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';

import moment from 'moment';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';

class AgendamentoUser extends Component {
  static navigationOptions = { header: null };
  state = {
    listaAgendamento: [],
    Load: true,
    Erro: false,
    Usuario: this.props.navigation.state.params.usuario,
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  onRefreshPage = () => {};

  Agendar = () => {
    api
      .get(`/agendamento/${this.props.email}`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ listaAgendamento: responseJson.data, Load: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false, Erro: true });
      });
  };

  render() {
    return (
      <View style={style.Container}>
        <HeaderBack
          title=" Meus agendamentos de visita"
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
          <Text style={style.label}>Sua lista de agendamento</Text>
          <View style={style.barra} />
        </View>

        <FlatList
          data={this.state.listaAgendamento}
          renderItem={({ item }) => (
            <View>
              <Cartao data={item.republica} interessado />
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
                  <View style={style.ViewAnalise}>
                    <Text style={style.data}>{item.status}</Text>
                  </View>
                )}
                {item.status == 'Confirmado' && (
                  <View style={style.View_Confirmado}>
                    <Text style={style.dataConf}>{item.status}</Text>
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

const AgendamentoUserConnect = connect(
  mapStateToProps,
  null
)(AgendamentoUser);

export default AgendamentoUserConnect;
