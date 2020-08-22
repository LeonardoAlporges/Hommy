import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, View, Text, BackHandler, Modal, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';
import { ScrollView } from 'react-native-gesture-handler';

class Cabeca extends Component {
  static navigationOptions = { header: null, left: null };
  state = {
    isModalVisible: false,
    dados: this.props,
  };

  AbrirUrl = () => {
    Linking.openURL(`tel:27997488849`);
    //Linking.openUrl('https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849');
  };

  resetNavigation(Rota) {
    console.log('pe');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick = () => {
  //   console.log('???');
  //   if (this.state.isModalVisible) {
  //     this.setState({
  //       isModalVisible: false,
  //     });
  //     this.props.navigation.goBack(null);
  //     return true;
  //   }
  //   return false;
  // };

  closeToken = async () => {
    await AsyncStorage.removeItem('token')
      .then(value => {
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
        <View style={Estilos.touch_Fake}>{/* <Icon style={Estilos.icon2} name="user" /> */}</View>

        <Modal transparent={true} animationType="slide" visible={this.state.isModalVisible} onRequestClose={() => this.setState({ isModalVisible: false })}>
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
                <TouchableOpacity onPress={this.closeToken}>
                  <Icon style={Estilos.iconModal} name="login" />
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
              <ScrollView>
                <View style={Estilos.viewBotoes}>
                  <Button
                    style={Estilos.botoes}
                    onPress={() => {
                      this.props.navigation.navigate('Anuncios', {email: this.props.email}), this.setState({ isModalVisible: false });
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
                      this.props.navigation.navigate('Viagens'), this.setState({ isModalVisible: false });
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
                      this.props.navigation.navigate('TelefoneUteis');
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Icon style={Estilos.iconBotoes} name="phone" />
                    <Text style={Estilos.textBotoes}>Telefones Úteis</Text>
                    <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                  </Button>

                  <Button
                    onPress={() => {
                      Linking.openURL('mailto:contato.hommy@gmail.com');
                    }}
                    style={Estilos.botoes}
                  >
                    <Icon style={Estilos.iconBotoes} name="exclamation" />
                    <Text style={Estilos.textBotoes}>Enviar feedback</Text>
                    <Icon style={Estilos.iconBotoesArrow} name="arrow-right" />
                  </Button>
                </View>
              </ScrollView>
              {/* <View style={Estilos.viewFooter}>
                <Text width="100%">©2020 Todos direiros reservados.</Text>
              </View> */}
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
