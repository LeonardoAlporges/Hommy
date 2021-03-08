import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { Image, Linking, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import Estilos, {
  Botao,
  BotesLogin,
  Card,
  CardAmigos,
  Container,
  Header,
  HeaderPrincipal,
  Icone,
  IconeMenu,
  IconVoltar,
  Label,
  LabelBotaoSair,
  LabelBotoes,
  Linha,
  Menu,
  Nome,
  SairdoApp,
  Titulo,
  TituloHeader,
  ViewDados,
  ViewFotoPerfil,
  ViewIcons,
  ViewLabel,
  ViewLabelAmigos,
  ViewNome,
  ViewNota,
  V_titulo
} from './style';

export function Cabeca({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);


 

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
      .catch(error => {});
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
