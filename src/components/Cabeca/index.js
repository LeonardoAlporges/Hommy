import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Modal,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';

class Cabeca extends Component {
  static navigationOptions = { header: null };
  state = {
    isModalVisible: false,
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
    Alert.alert('Conta deslogada com sucesso');
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
          <Icon style={Estilos.icon2} name="account-outline" />
        </TouchableOpacity>
        <View style={Estilos.Titulo}>
          <Text style={Estilos.txt}> HOMMY </Text>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={this.closeToken}
        >
          <Icon style={Estilos.icon2} name="settings-outline" />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.isModalVisible}
        >
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: '#ffff',

                alignItems: 'center',
                borderRadius: 10,
                height: 100,
                flex: 1,
              }}
            >
              <View
                style={{
                  height: 60,
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
                  <Icon style={{ fontSize: 35 }} name="arrow-left" />
                </TouchableOpacity>

                <Icon style={{ fontSize: 35 }} name="pencil-outline" />
              </View>
              <Image
                source={{
                  uri: this.props.fotoPerfil,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: '5%',
                }}
              />
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
                    color: '#000',
                  }}
                >
                  {this.props.nome}
                </Text>
                <Text
                  style={{
                    fontSize: 14,

                    fontFamily: 'Roboto',

                    color: '#000',
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
                  borderBottomColor: '#adadad',
                }}
              />

              <View
                style={{
                  color: '#ffff',
                  width: '100%',
                  paddingHorizontal: '10%',
                  justifyContent: 'space-between',
                  height: 325,
                  marginTop: '10%',
                }}
              >
                <Button
                  style={{
                    height: 60,
                    backgroundColor: 'rgba(29,161,242,1)',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '4%',
                    color: '#ffff',
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Anuncios'),
                      this.setState({ isModalVisible: false });
                  }}
                >
                  <Icon
                    style={{ fontSize: 35, color: '#ffff' }}
                    name="ballot-outline"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '4%',
                      color: '#ffff',
                    }}
                  >
                    Meus Anuncios
                  </Text>
                </Button>
                <Button
                  style={{
                    height: 60,
                    backgroundColor: 'rgba(29,161,242,1)',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '4%',
                    color: '#ffff',
                  }}
                >
                  <Icon
                    style={{ fontSize: 35, color: '#ffff' }}
                    name="pencil-outline"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '4%',
                      color: '#ffff',
                    }}
                  >
                    Editar perfil
                  </Text>
                </Button>
                <Button
                  style={{
                    height: 60,
                    color: '#ffff',
                    backgroundColor: 'rgba(29,161,242,1)',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '4%',
                  }}
                >
                  <Icon
                    style={{ fontSize: 35, color: '#ffff' }}
                    name="comment-question-outline"
                  />
                  <Text
                    style={{
                      color: '#ffff',
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '4%',
                    }}
                  >
                    Me ajuda
                  </Text>
                </Button>
                <Button
                  style={{
                    height: 60,
                    backgroundColor: 'rgba(29,161,242,1)',
                    justifyContent: 'flex-start',
                    borderRadius: 5,
                    paddingLeft: '4%',
                    color: '#ffff',
                  }}
                >
                  <Icon
                    style={{ fontSize: 35, color: '#ffff' }}
                    name="information-outline"
                  />
                  <Text
                    style={{
                      color: '#ffff',
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                      marginLeft: '4%',
                    }}
                  >
                    Enviar feedback
                  </Text>
                </Button>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',

                  bottom: 25,
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
