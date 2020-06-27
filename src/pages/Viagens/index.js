import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal } from 'react-native';

import { connect } from 'react-redux';
import style from './style';
import { Button } from 'native-base';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';
import HeaderBack from '../../components/CustomHeader';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import CartaoCarona from '../../components/CartaoCarona';
import ModalAvaliacao from '../../components/ModalAvaliacao';

class Viagens extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      listaCaronas: [],
      modal: false,
      Load: true,
      botaoAvaliar: true,
      emailAvaliado: '',
      nomeAvaliado: '',
      MConfirmacao: false,
      item: '',
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

  deletar(valor, idCarona) {
    if (valor == 0) {
      return null;
    }
    this.setState({ Load: true });
    console.log(idCarona);
    return api
      .delete(`/carona/meusInteresses/${idCarona}`, {
        data: { email: this.props.email },
      })
      .then(responseJson => {
        this.setState({
          listaCaronas: [],
          Load: false,
        });
        this.getListCarona();
        console.log('Deletado', responseJson);
      })
      .catch(error => {
        this.setState({ Load: false });
        console.log(error);
      });
  }

  getListCarona = () => {
    return api
      .get(`/carona/meusInteresses/${this.props.email}`)
      .then(responseJson => {
        console.log('MEUS INTERESSES:', responseJson);
        this.setState({
          listaCaronas: responseJson.data,
          Load: false,
        });
      })
      .catch(error => {
        this.setState({ Load: false });
        console.log(error);
      });
  };

  returnModal() {
    this.setState({ modal: false });
    this.setState({ botaoAvaliar: false });
  }

  navegar() {
    this.props.navigation.navigate('TabsHeader');
  }

  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <HeaderBack
          title="Meus interesses"
          onNavigation={() => this.navegar()}
        />

        {this.state.MConfirmacao && (
          <ModalConfirmacao
            retornoModal={valor => {
              this.deletar(valor, this.state.item);
              this.setState({ MConfirmacao: false });
            }}
            mensagem="Deseja deletar esse anuncio ?"
            confirmar={true}
          />
        )}
        {this.state.Load && <Loading />}
        {this.state.listaCaronas.length == 0 && (
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <EmptyState
              titulo="Sem Interesses"
              mensagem="Busque caronas que lhe favoreça viajar :("
            />
          </View>
        )}
        <View style={style.card}>
          <FlatList
            style={style.flatList}
            data={this.state.listaCaronas}
            renderItem={({ item }) => (
              <View>
                <CartaoCarona dados={item.carona} />
                <View style={style.ViewStatus}>
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
                  {item.status == 'Realizada' && (
                    <View style={style.V_Botao}>
                      <Button
                        disabled={!this.state.botaoAvaliar}
                        style={style.botao}
                        onPress={() => {
                          this.avaliar(item);
                        }}
                      >
                        <Icon name="star" style={style.icon} />
                        <Text style={style.title}>Avaliar carona</Text>
                      </Button>
                    </View>
                  )}
                  <TouchableOpacity
                    style={style.ViewBotaoClose}
                    onPress={() => {
                      console.log(item);
                      this.setState({
                        MConfirmacao: true,
                        item: item.carona._id,
                      });
                    }}
                  >
                    <Icon style={style.iconeClose} name="close" />
                  </TouchableOpacity>
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
