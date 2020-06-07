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
  };

  mudarStatusInteressado = number => {
    console.log(number);
    if (number === 1) {
      api
        .put(`/carona/confirmar/${this.props.email}`, {
          UsuarioConfirmado: this.props.dados.email,
        })
        .then(responseJson => {
          console.log('USUARIO ACEITO', responseJson);
        })
        .catch(error => {
          console.log('erro:', error);
        });
    } else if (number === 0) {
      api
        .put(`/carona/rejeitar/${this.props.email}`, {
          UsuarioConfirmado: this.props.dados.email,
        })
        .then(responseJson => {
          console.log('USUARIO ACEITO', responseJson);
        })
        .catch(error => {
          console.log('erro:', error);
        });
    }
  };

  render() {
    return (
      <View style={style.card}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Perfil', {
              dados: this.props.dados,
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
          <TouchableOpacity
            onPress={() => {
              this.setState({ modal: true });
            }}
          >
            <Icon name="check" style={style.iconAceite} />
          </TouchableOpacity>

          <Icon name="close" style={style.iconRejeite} />
        </View>
        {this.state.modal && (
          <ModalConfirmacao
            retornoModal={valor => this.mudarStatusInteressado(valor)}
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
