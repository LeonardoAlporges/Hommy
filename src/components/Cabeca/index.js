import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Modal,
  Image,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';

class Cabeca extends Component {
  static navigationOptions = { header: null, left: null };
  state = {
    isModalVisible: false,
    dados: this.props,
  };

  AbrirUrl = () => {
    Linking.openUrl(
      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
    );
  };

  resetNavigation(Rota) {
    console.log('pe');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  closeToken = async () => {
    await AsyncStorage.removeItem('token')
      .then(value => {
        console.log('?');
        this.resetNavigation('Login');
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={Estilos.ViewCabeca}>
        <TouchableOpacity
          style={Estilos.touch_Icon}
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          <Icon style={Estilos.icon2} name="user" />
        </TouchableOpacity>
        <View style={Estilos.Titulo}>
          <Text style={Estilos.txt}> HOMMY </Text>
        </View>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
            width: 30,
            height: 30,
          }}
          onPress={this.closeToken}
        >
          {/* //<Icon style={Estilos.icon2} name="settings" /> */}
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isModalVisible}
        >
          <View style={Estilos.bgModal}>
            <View style={Estilos.modal}>
              <View style={Estilos.voltar}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon style={Estilos.iconModal} name="arrow-left" />
                </TouchableOpacity>
              </View>
              {this.props.fotoPerfil != null && (
                <View style={Estilos.fotodeperfil}>
                  <Image
                    source={{
                      uri: this.props.fotoPerfil,
                    }}
                    style={Estilos.fotoPerfil}
                  />
                  {/* <TouchableOpacity style={Estilos.editFoto}>
                    <Icon style={Estilos.iconBotoesArrow} name="pencil" />
                  </TouchableOpacity> */}
                </View>
              )}

              <View style={Estilos.viewNome}>
                <Text style={Estilos.textNome}>{this.props.nome}</Text>
                <Text style={Estilos.textCPF}>
                  {this.props.nota}
                  <Icon name="star" />
                </Text>
              </View>
              <View style={Estilos.viewDivisor} />
              <View style={Estilos.viewBotoes}>
                <Button
                  style={Estilos.botoes}
                  onPress={() => {
                    this.props.navigation.navigate('Anuncios'),
                      this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon style={Estilos.iconBotoes} name="book-open" />
                  <Text style={Estilos.textBotoes}>Meus Anuncios</Text>
                  <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                </Button>
                <Button
                  style={Estilos.botoes}
                  onPress={() => {
                    this.props.navigation.navigate('AgendamentoUser', {
                      usuario: true,
                    }),
                      this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon style={Estilos.iconBotoes} name="list" />
                  <Text style={Estilos.textBotoes}>Meus Agendamentos</Text>
                  <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                </Button>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate('Viagens'),
                      this.setState({ isModalVisible: false });
                  }}
                  style={Estilos.botoes}
                >
                  <Icon style={Estilos.iconBotoes} name="question" />
                  <Text style={Estilos.textBotoes}>Meus interesses</Text>
                  <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                </Button>
                <Button
                  style={Estilos.botoes}
                  onPress={() => {
                    this.props.navigation.navigate('Perfil', {
                      dados: this.state.dados,
                      update: true,
                    });
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon style={Estilos.iconBotoes} name="pencil" />
                  <Text style={Estilos.textBotoes}>Meu perfil</Text>
                  <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                </Button>

                <Button
                  onPress={() => {
                    Linking.openURL(
                      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
                    );
                  }}
                  style={Estilos.botoes}
                >
                  <Icon style={Estilos.iconBotoes} name="exclamation" />
                  <Text style={Estilos.textBotoes}>Enviar feedback</Text>
                  <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                </Button>
              </View>
              <View style={Estilos.viewFooter}>
                <Text width="100%">©2020 Todos direiros reservados.</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapsStateToProps = state => {
  return {
    nome: state.user.usuario,
    email: state.user.email,
    nota: state.user.notaUser,
    idUser: state.user.idUser,
    telefone: state.user.telefone,
    fotoPerfil: state.user.fotoPerfil,
    logado: state.user.logado,
  };
};

const cabecaConnect = connect(
  mapsStateToProps,
  null
)(Cabeca);

export default withNavigation(cabecaConnect);
