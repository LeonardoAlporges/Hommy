import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, Image, StatusBar } from 'react-native';
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
  editTokenNotificacao,
} from '../../actions/UserAction';
import SplashScreen from '../SplashScreen';
import style from './styles';
import Notificacao from '../TesteNot/index';
import { fmcService } from '../../Firebase/FMCService';
import { localNotificationService } from '../../Firebase/LocalSendNotification';
import { NavigationActions, StackActions } from 'react-navigation';
import messaging from '@react-native-firebase/messaging';
class RenderApp extends Component {
  static navigationOptions = { header: null };
  state = {
    load: true,
    logado: true,
    firtsOpen: false,
  };

  pegarToken() {
    messaging()
      .getToken()
      .then(fmcToken => {
        if (fmcToken) {
          console.log('?', fmcToken);
          this.props.editTokenNotificacao(fmcToken);
        } else {
          console.log('[FMCService] User does not have a device token');
        }
      })
      .catch(erro => {
        console.log('[FMCService] getToken rejeitado ', erro);
      });
  }

  registrarNotificacao() {
    fmcService.registerAppWithFMC();
    fmcService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[APP] onRegister:', token);
      return token;
    }

    function onNotification(notify) {
      console.log('[APP] onNotification:', notify);
      const option = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(0, notify.title, notify.body, notify, option);
    }

    function onOpenNotification(notify) {
      console.log('[APP] OnOPENNOTIFICAÇAO:', notify);
      alert('Open Notificação: ' + notify.body);
    }

    return () => {
      console.log('[App] Unregsitre');
      fmcService.unRegister();
      localNotificationService.unRegister();
    };
  }

  async Buscar() {
    this.registrarNotificacao();
    this.pegarToken();
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

  reset(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#142850" />
        {this.state.load ? (
          <View style={style.load}>
            <Image style={style.imagem} source={require('../../assets/Img/Splash.png')} />
            <View style={style.V_spinner}>
              <Spinner color="#ffffff" />
            </View>
          </View>
        ) : (
          <View>
            {this.state.firtsOpen ? (
              <SplashScreen />
            ) : (
              <View>{this.state.logado ? this.reset('TabsHeader') : this.reset('Login')}</View>
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
    editTokenNotificacao,
  }
)(RenderApp);

export default TesteConnect;
