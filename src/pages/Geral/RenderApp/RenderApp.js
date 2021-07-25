import React, { useState, useEffect } from 'react';
import { Spinner } from 'native-base';
import { View, StatusBar,PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import messaging from '@react-native-firebase/messaging';

import * as userAction from '../../../actions/UserAction';
import SplashScreen from '../SplashScreen';
import { fmcService } from '../../../Firebase/FMCService';
import { localNotificationService } from '../../../Firebase/LocalSendNotification';

import { ViewCarregamento, Imagem, ViewSpinner } from './styles';

export default function RenderApp(props) {
  const [load, setLoad] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(true);
  const [firtsOpen, setFirtsOpen] = useState(false);
  const dispatch = useDispatch();

  function pegarToken() {
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
        console.log('[FMCService] GetToken rejeitado');
      });
  }

  function registrarNotificacao() {
    fmcService.registerAppWithFMC();
    fmcService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {

      return token;
    }

    function onNotification(notify) {
      const option = {
        soundName: 'default',
        playSound: true
      };
      localNotificationService.showNotification(0, notify.title, notify.body, notify, option);
    }

    function onOpenNotification(notify) {
      alert('ALTERAR ESSE TROSSO QUANDO TIVER EM PRODUÇÂO: ' + notify.body);
    }

    return () => {
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
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(response => { 
      console.log("tes:",response)

      if(!response){
        requestPermissionRead
      }
    })

    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(response => { 
      console.log("Wri:",response)
      if(!response){
        requestPermissionWrite
      }
    })


    Buscar();
  }, []);

  const requestPermissionRead = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.READ_EXTERNAL_STORAGE,
        {
          title: "Permisão Necessaria Leitura",
          message:
            "Hommy quer acesso para salvar informações exenciais para o funcionamento ",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
    } catch (err) {
    }
  };
 

  const requestPermissionWrite = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.READ_EXTERNAL_STORAGE,
        {
          title: "Permisão Necessaria ",
          message:
            "Hommy quer acesso para ler informações exenciais para o funcionamento ",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
    } catch (err) {
    }
  };
 
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
          {firtsOpen ? <SplashScreen /> : <View>{usuarioLogado ? reset('TabsHeader') : reset('Login')}</View>}
        </View>
      )}
    </View>
  );
}
