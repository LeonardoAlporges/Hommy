import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';

import {HeaderPrincipal,
  Icone,
  IconeMenu,
  Titulo,
  V_titulo}  
from './style';

export function Cabeca({ navigation }) {

  function resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });
    navigation.dispatch(resetAction);
  }

  async function closeToken() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user')
      .then(value => {
        resetNavigation('Login');
      })
      .catch(error => { });
  }
  return (
    <HeaderPrincipal>
      <IconeMenu
        onPress={() => {
          navigation.navigate('MenuLateral');
        }}
      >
        <Icone name="account-circle-outline" />
      </IconeMenu>
      <V_titulo>
        <Titulo> Hommy </Titulo>
      </V_titulo>      
    </HeaderPrincipal>
  );
}
export default withNavigation(Cabeca);
