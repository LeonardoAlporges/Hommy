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
        console.log('Saiu da conta', value);
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Nao Foi possivel');
      });
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
          <View
            style={{
              backgroundColor: '#f8f8f8',
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: '#f8f8f8',

                alignItems: 'center',
                borderRadius: 5,
                height: 100,
                flex: 1,
              }}
            >
              <View
                style={{
                  height: 55,
                  width: '100%',
                  marginTop: '3%',
                  paddingHorizontal: '3%',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon
                    style={{ marginTop: 8, fontSize: 20, color: '#27496d' }}
                    name="arrow-left"
                  />
                </TouchableOpacity>
              </View>
              {this.props.fotoPerfil != null ? (
                <Image
                  source={{
                    uri: this.props.fotoPerfil,
                  }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginBottom: '2%',
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/Img/ProfilePicture.png')}
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: 100,
                    marginBottom: '2%',
                  }}
                />
              )}

              <View
                style={{
                  width: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    color: '#27496d',
                  }}
                >
                  {this.props.nome}
                </Text>
                <Text
                  style={{
                    fontSize: 14,

                    fontFamily: 'Roboto',

                    color: '#00909e',
                  }}
                >
                  {this.props.cpf}
                </Text>
              </View>

              <View
                style={{
                  marginTop: '8%',
                  width: '88%',
                  marginLeft: '6%',
                  marginRight: '6%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#27496d',
                }}
              />

              <View
                style={{
                  color: '#27496d',
                  width: '100%',
                  paddingHorizontal: '10%',
                  justifyContent: 'space-between',
                  height: 325,
                  marginTop: '10%',
                }}
              >
                <Button
                  style={{
                    width: '100%',
                    height: 55,
                    backgroundColor: '#27496d',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '6%',
                    color: '#dae1e7',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Anuncios'),
                      this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon
                    style={{ fontSize: 18, color: '#dae1e7' }}
                    name="book-open"
                  />

                  <Text
                    style={{
                      width: '75%',
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '6%',
                      color: '#ffff',
                    }}
                  >
                    Meus Anuncios
                  </Text>
                  <Icon
                    style={{
                      paddingLeft: '2%',
                      fontSize: 18,
                      color: '#dae1e7',
                    }}
                    name="arrow-right"
                  />
                </Button>
                <Button
                  style={{
                    width: '100%',
                    height: 55,
                    backgroundColor: '#27496d',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '6%',
                    color: '#ffff',
                  }}
                >
                  <Icon
                    style={{ fontSize: 18, color: '#ffff' }}
                    name="pencil"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      width: '75%',
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '6%',
                      color: '#ffff',
                    }}
                  >
                    Editar perfil
                  </Text>
                  <Icon
                    style={{
                      paddingLeft: '2%',
                      fontSize: 18,
                      color: '#dae1e7',
                    }}
                    name="arrow-right"
                  />
                </Button>
                <Button
                  onPress={() => {
                    Linking.openURL(
                      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
                    );
                  }}
                  style={{
                    width: '100%',
                    height: 55,
                    color: '#ffff',
                    backgroundColor: '#27496d',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '6%',
                  }}
                >
                  <Icon
                    style={{ fontSize: 18, color: '#ffff' }}
                    name="question"
                  />
                  <Text
                    style={{
                      color: '#ffff',
                      width: '75%',
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '6%',
                    }}
                  >
                    Me ajuda
                  </Text>
                  <Icon
                    style={{
                      paddingLeft: '2%',
                      fontSize: 18,
                      color: '#dae1e7',
                    }}
                    name="arrow-right"
                  />
                </Button>
                <Button
                  onPress={() => {
                    Linking.openURL(
                      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
                    );
                  }}
                  style={{
                    height: 55,
                    width: '100%',
                    backgroundColor: '#27496d',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '6%',
                    color: '#ffff',
                  }}
                >
                  <Icon
                    style={{ fontSize: 18, color: '#ffff' }}
                    name="exclamation"
                  />
                  <Text
                    style={{
                      color: '#ffff',
                      fontSize: 18,
                      width: '75%',
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '6%',
                    }}
                  >
                    Enviar feedback
                  </Text>
                  <Icon
                    style={{
                      paddingLeft: '2%',
                      fontSize: 18,
                      color: '#dae1e7',
                    }}
                    name="arrow-right"
                  />
                </Button>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 15,
                  width: '70%',
                  color: '#fff',
                }}
              >
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
    nome: state.user.nome,
    email: state.user.email,
    cpf: state.user.cpf,
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
