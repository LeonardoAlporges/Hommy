import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import style from './style';
import { Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import api from '../../service/api';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
class CartaoUser extends Component {
  state = {
    modal: false,
    mensagem: '',
    confirmar: false,
    rejeitar: false,
  };

  retorno = number => {
    console.log('CARDTO', this.props.dados.email);
    this.props.retorno(number, this.props.dados.email);
  };

  mudarStatusInteressado = number => {
    this.retorno(number);
    console.log(number);

    // if (number === 1) {
    //   api
    //     .put(`/carona/confirmar/${this.props.email}`, {
    //       UsuarioConfirmado: this.props.dados.email,
    //     })
    //     .then(responseJson => {
    //       console.log('USUARIO ACEITO', responseJson);
    //     })
    //     .catch(error => {
    //       console.log('erro:', error);
    //     });
    // } else if (number === 0) {
    //   api
    //     .put(`/carona/rejeitar/${this.props.email}`, {
    //       UsuarioRejeitado: this.props.dados.email,
    //     })
    //     .then(responseJson => {
    //       console.log('USUARIO Rejeitado', responseJson);
    //     })
    //     .catch(error => {
    //       console.log('erro:', error);
    //     });
    // }
    this.props.callback();
  };

  render() {
    return (
      <View style={style.card}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Perfil', {
              dados: this.props.dados,
              update: false,
            });
          }}
          style={style.V_imagem}
        >
          <Image
            style={style.Imagem}
            source={{
              uri: this.props.dados.fotoPerfil,
            }}
          />
        </TouchableOpacity>
        <View style={style.V_nome}>
          <Text style={style.nome}>{this.props.dados.nome}</Text>
        </View>
        <View style={style.V_nota}>
          <Icon name="star" style={style.icon} />
          <Text style={style.nota}>{this.props.dados.nota}</Text>
        </View>
        <View style={style.V_Icon}>
          {this.props.dadosGerais.status != 'Confirmado' ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  mensagem: 'Confirmar',

                  confirmar: true,
                  modal: true,
                });
              }}
            >
              <Icon name="check" style={style.iconAceite} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState({
                mensagem: 'Rejeitar',
                rejeitar: true,
                modal: true,
              });
            }}
          >
            <Icon name="close" style={style.iconRejeite} />
          </TouchableOpacity>
        </View>

        {this.state.modal && (
          <ModalConfirmacao
            retornoModal={valor => this.mudarStatusInteressado(valor)}
            mensagem={this.state.mensagem}
            rejeitar={this.state.rejeitar}
            confirmar={this.state.confirmar}
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

const CartaoUserConnect = connect(
  mapStateToProps,
  null
)(CartaoUser);

export default withNavigation(CartaoUserConnect);
