import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { fmcService } from '../../Firebase/FMCService';
import { localNotificationService } from '../../Firebase/LocalSendNotification';

export default function Notificacao() {
  useEffect(() => {
    fmcService.registerAppWithFMC();
    fmcService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[APP] onRegister:', token);
    }

    function onNotification(notify) {
      console.log('[APP] onNotification:', notify);
      const option = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        option
      );
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
  });
}
