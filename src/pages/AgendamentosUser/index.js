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
    MConfirmacaoDelete: false,
    MConfirmacaoAgendar: false,
    item: '',
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  Deletar = (valor, item) => {
    if (valor == 0) {
      return null;
    }
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

  NovoAgendamento = (valor, item) => {
    if (valor == 0) {
      return null;
    }
    this.setState({ Load: true });
    const agendamento = {
      email: this.props.email,
      data: item.data,
      hora: item.hora,
    };
    api
      .put(`/agendamento/${item.republica._id}`, agendamento)
      .then(responseJson => {
        this.setState({ listaAgendamento: [], Load: false });
        this.Agendar();
        console.log(responseJson);
        this.setState({ Sucesso: true, Load: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false, Erro: true });
      });

    console.log('Modal falando que ele vai ser colocado em analise dnv');
  };

  async navegar() {
    await this.props.navigation.goBack(null);
  }

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

        {this.state.MConfirmacaoDelete && (
          <ModalConfirmacao
            retornoModal={valor => {
              this.Deletar(valor, this.state.item);
              this.setState({ MConfirmacaoDelete: false });
            }}
            mensagem="Deseja deletar esse Agendamento ?"
            confirmar={true}
          />
        )}
        {this.state.MConfirmacaoAgendar && (
          <ModalConfirmacao
            retornoModal={valor => {
              this.NovoAgendamento(valor, this.state.item);
              this.setState({ MConfirmacaoAgendar: false });
            }}
            mensagem="Deseja re-fazer o agendamento para Republica ?"
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
              {item.status == 'NovaSugestao' ? (
                <View style={style.viewData}>
                  <TouchableOpacity
                    style={{ width: 30, height: 30, justifyContent: 'center' }}
                    onPress={() => {
                      this.setState({
                        MConfirmacaoDelete: true,
                        item: item.republica._id,
                      });
                    }}
                  >
                    <Icon name="close" style={style.iconDel} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: 30, height: 30, justifyContent: 'center' }}
                    onPress={() => {
                      this.setState({
                        MConfirmacaoAgendar: true,
                        item: item,
                      });
                    }}
                  >
                    <Icon name="check" style={style.iconDel} />
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
                  {item.status == 'NovaSugestao' && (
                    <View style={style.ViewAnalise}>
                      <Text style={style.data}>{item.status}</Text>
                    </View>
                  )}
                </View>
              ) : (
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
              )}
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
