import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import TabsHeader from './pages/Tabs';
import Login from './pages/Login';
import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editNota,
  editTelefone,
  editFoto,
} from './actions/UserAction';
import SplashScreen from './pages/SplashScreen';

class Teste extends Component {
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
          console.log('tOKEN SALVO->', value);
          this.setState({ logado: true });
        } else {
          console.log('USER NAO LOGADO');
          this.setState({ logado: false });
        }
      });
      console.log('Buscando User');
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
          this.props.editNota('3.1');
          console.log('???', dados);
        }
      });
    } catch (erro) {
      this.setState({ logado: false });
      console.log('Nao tem nada no Storage');
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
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#142850',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 200, height: 200 }}
              source={require('./assets/Img/Splash.png')}
            />
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 30,
              }}
            >
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
)(Teste);

export default TesteConnect;
