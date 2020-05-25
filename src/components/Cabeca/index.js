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
import CustomModal from '../Alert';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';

class Cabeca extends Component {
  static navigationOptions = { header: null };
  state = {
    isModalVisible: false,
    erro: false,
  };
  AbrirUrl = () => {
    Linking.openUrl(
      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
    );
  };
  closeToken = async () => {
    await AsyncStorage.removeItem('token')
      .then(value => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => {});
    //Alert.alert('Conta deslogada com sucesso');
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
          {this.state.erro ? <CustomModal parametro="Sucesso" /> : <View />}
          <Icon style={Estilos.icon2} name="user" />
        </TouchableOpacity>
        <View style={Estilos.Titulo}>
          <Text style={Estilos.txt}> HOMMY </Text>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={this.closeToken}
        >
          <Icon style={Estilos.icon2} name="settings" />
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
              {this.props.fotoPerfil != null ? (
                <Image
                  source={{
                    uri: this.props.fotoPerfil,
                  }}
                  style={Estilos.fotoPerfil}
                />
              ) : (
                <Image
                  source={require('../../assets/Img/ProfilePicture.png')}
                  style={Estilos.fotoPerfil}
                />
              )}

              <View style={Estilos.viewNome}>
                <Text style={Estilos.textNome}>
                  {this.props.usuario} -> {this.props.nota}
                </Text>
                <Text style={Estilos.textCPF}>{this.props.nota}</Text>
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
                <Button style={Estilos.botoes}>
                  <Icon style={Estilos.iconBotoes} name="pencil" />
                  <Text style={Estilos.textBotoes}>Editar perfil</Text>
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
                  <Icon style={Estilos.iconBotoes} name="question" />
                  <Text style={Estilos.textBotoes}>Me ajuda</Text>
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
    usuario: state.user.usuario,
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
