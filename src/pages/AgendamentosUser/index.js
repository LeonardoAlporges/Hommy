import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Button } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';

import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ModalConfirmacao from '../../components/ModalConfirmacao';

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
    MConfirmacao: false,
    item: '',
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  Deletar = (valor, item) => {
    if (valor == 0) {
      return null;
    }
    console.log(item);
    return api
      .delete(`/agendamento/${item}`, {
        data: { email: this.props.email },
      })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ listaAgendamento: [], Load: false });
        this.Agendar();
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false, Erro: true });
      });
  };
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

        {this.state.MConfirmacao && (
          <ModalConfirmacao
            retornoModal={valor => {
              this.Deletar(valor, this.state.item);
              this.setState({ MConfirmacao: false });
            }}
            mensagem="Deseja deletar esse anuncio ?"
            confirmar={true}
          />
        )}
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
                <TouchableOpacity
                  style={{ width: 30, height: 30, justifyContent: 'center' }}
                  onPress={() => {
                    this.setState({
                      MConfirmacao: true,
                      item: item.republica._id,
                    });
                  }}
                >
                  <Icon name="close" style={style.iconDel} />
                </TouchableOpacity>
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
                {item.status == 'Rejeitado' && (
                  <View style={style.View_Rejeitado}>
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

const AgendamentoUserConnect = connect(
  mapStateToProps,
  null
)(AgendamentoUser);

export default AgendamentoUserConnect;
