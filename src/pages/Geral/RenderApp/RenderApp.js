import React, { Component, useState, useEffect } from 'react';
import { Spinner } from 'native-base';
import { View, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import * as userAction from '../../../actions/UserAction';
import SplashScreen from '../SplashScreen';
import { ViewCarregamento, Imagem, ViewSpinner } from './styles';
import { fmcService } from '../../../Firebase/FMCService';
import { localNotificationService } from '../../../Firebase/LocalSendNotification';
import { NavigationActions, StackActions } from 'react-navigation';
import messaging from '@react-native-firebase/messaging';

export default function RenderApp(props) {
  const email = useSelector(state => state.user.email);
  const leo = useSelector(state => state.user.tokenUser);
  const [load, setLoad] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(true);
  const [firtsOpen, setFirtsOpen] = useState(false);
  const dispatch = useDispatch();

  function pegarToken() {
    console.log('EMIAL :', email);
    messaging()
      .getToken()
      .then(fmcToken => {
        if (fmcToken) {
          dispatch(userAction.editTokenNotificacao(fmcToken));
        } else {
          dispatch(userAction.editTokenNotificacao(null));
          console.log('[FMCService] Sem token de dispositivo');
        }
      })
      .catch(erro => {
        console.log('[FMCService] getToken rejeitado ');
      });
  }
  function registrarNotificacao() {
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
        playSound: true
      };
      localNotificationService.showNotification(0, notify.title, notify.body, notify, option);
    }

    function onOpenNotification(notify) {
      console.log('[APP] OnOPENNOTIFICAÇAO:', notify);
      alert('Notificação Aberta: ' + notify.body);
    }

    return () => {
      console.log('[App] Unregsitre');
      fmcService.unRegister();
      localNotificationService.unRegister();
    };
  }

  async function Buscar() {
    registrarNotificacao();
    pegarToken();
    try {
      await AsyncStorage.getItem('firtOpen').then(value => {
        if (value === 'true') {
          setFirtsOpen(false);
        } else {
          setFirtsOpen(true);
          AsyncStorage.setItem('firtOpen', 'true');
        }
      });

      await AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          setUsuarioLogado(true);
        } else {
          setUsuarioLogado(false);
        }
      });
      await AsyncStorage.getItem('user').then(value => {
        if (value != null) {
          const dados = JSON.parse(value);
          dispatch(userAction.editNome(dados.nome));
          dispatch(userAction.editEmail(dados.email));
          dispatch(userAction.editIdUser(dados.usuario));
          dispatch(userAction.editLogado(dados.usuario));
          dispatch(userAction.editTelefone(dados.celular));
          dispatch(userAction.editFoto(dados.fotoPerfil));
          dispatch(userAction.editNota(dados.nota));
        }
      });
    } catch (erro) {
      setUsuarioLogado(false);
    }
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }

  function reset(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });

    props.navigation.dispatch(resetAction);
  }

  useEffect(() => {
    Buscar();
  }, []);

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#142850" />
      {load ? (
        <ViewCarregamento>
          <Imagem source={require('../../../assets/Img/Splash.png')} />
          <ViewSpinner>
            <Spinner color="#ffffff" />
          </ViewSpinner>
        </ViewCarregamento>
      ) : (
        <View>
          {firtsOpen ? (
            <SplashScreen />
          ) : (
            <View>{usuarioLogado ? reset('TabsHeader') : reset('Login')}</View>
          )}
        </View>
      )}
    </View>
  );
}
