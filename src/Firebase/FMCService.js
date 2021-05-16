import messaging from '@react-native-firebase/messaging';
import { Plataform } from 'react-native';

class FMCService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListerners(onRegister, onNotification, onOpenNotification);
  };
  registerAppWithFMC = async () => {
    if (Plataform === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enable => {
        if (enable) {
          //User has permission
          this.getToken(onRegister);
        } else {
          //User sem permisão
          this.requestPermission(onRegister);
        }
      })
      .catch(erro => {
        console.log('[FMCService] Permissão rejeitada', erro);
      });
  };
  //Pegando o Token
  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fmcToken => {
        if (fmcToken) {
          onRegister(fmcToken);
        } else {
          console.log('[FMCService] User does not have a device token');
        }
      })
      .catch(erro => {
        console.log('[FMCService] getToken rejeitado ', erro);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(erro => {
        console.log('[FMC] Envio de permisao rejeitado', erro);
      });
  };

  deleteToken = () => {
    console.log('[FMC] Delete token');
    messaging()
      .deleteToken()
      .catch(erro => {
        console.log('[FMC] Delete token error', erro);
      });
  };

  createNotificationListerners = (onRegister, onNotification, onOpenNotification) => {
    //When the application is running, but in the backgroud
    messaging().onNotificationOpenedApp(remoteMessages => {
      console.log('[FMC] onNotificationOpenedApp Notification caused app to open');
      if (remoteMessages) {
        const notification = remoteMessages.notification;
        onOpenNotification(notification);
        //this.removeDeLiveredNotification(notification.notificaitoID)
      }
    });

    //When the application is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessages => {
        console.log('[FMC] getInitialNotification Abriu o app');
        if (remoteMessages) {
          const notification = remoteMessages.notification;
          onOpenNotification(notification);
          //this.removeDeLiveredNotification(notification.notificaitoID)
        }
      });

    this.messageListerner = messaging().onMessage(async remoteMessages => {
      console.log('[FMC] Novo FMC mensagem recebida');
      if (remoteMessages) {
        let notification = null;
        if (Plataform.OS === 'ios') {
          notification = remoteMessages.data.notification;
        } else {
          notification = remoteMessages.notification;
        }
        onNotification(notification);
      }
    });

    //Triggered when have new token
    messaging().onNewToken(fmcToken => {
      console.log('[FMC] Novo token gerado ', fmcToken);
      onRegister(fmcToken);
    });
  };

  unRegister = () => {
    this.messageListerner();
  };
}

export const fmcService = new FMCService();
