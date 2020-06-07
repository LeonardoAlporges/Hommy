import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editNota,
  editTelefone,
  editFoto,
} from '../../actions/UserAction';
import SplashScreen from '../SplashScreen';
import style from './styles';

class RenderApp extends Component {
  static navigationOptions = { header: null };
  state = {
    load: true,
    logado: true,
    firtsOpen: false,
  };

  async Buscar() {
    try {
      await AsyncStorage.getItem('firtOpen').then(value => {
        if (value === 'true') {
          this.setState({ firtsOpen: false });
        } else {
          this.setState({ firtsOpen: true });
          AsyncStorage.setItem('firtOpen', 'true');
        }
      });

      await AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          this.setState({ logado: true });
        } else {
          this.setState({ logado: false });
        }
      });
      await AsyncStorage.getItem('user').then(value => {
        if (value != null) {
          const dados = JSON.parse(value);
          this.props.editNome(dados.nome);
          this.props.editEmail(dados.email);
          this.props.editCpf(dados.cpf);
          this.props.editIdUser(dados.usuario);
          this.props.editLogado(dados.usuario);
          this.props.editTelefone(dados.celular);
          this.props.editFoto(dados.fotoPerfil);
          this.props.editNota(dados.nota);
        }
      });
    } catch (erro) {
      this.setState({ logado: false });
    }
    setTimeout(() => {
      this.setState({ load: false });
    }, 1000);
  }

  constructor(props) {
    super(props);
    this.Buscar();
  }

  render() {
    return (
      <View>
        {this.state.load ? (
          <View style={style.load}>
            <Image
              style={style.imagem}
              source={require('../../assets/Img/Splash.png')}
            />
            <View style={style.V_spinner}>
              <Spinner color="#ffffff" />
            </View>
          </View>
        ) : (
          <View>
            {this.state.firtsOpen ? (
              <SplashScreen />
            ) : (
              <View>
                {this.state.logado
                  ? this.props.navigation.navigate('TabsHeader')
                  : this.props.navigation.navigate('Login')}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const TesteConnect = connect(
  null,
  {
    editNome,
    editEmail,
    editCpf,
    editIdUser,
    editLogado,
    editNota,
    editTelefone,
    editFoto,
  }
)(RenderApp);

export default TesteConnect;
