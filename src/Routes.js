import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import PageAnuncio from './pages/PageAnuncio';
import Cadastro from './pages/Cadastro/index';
import Login from './pages/Login';
import TabsHeader from './pages/Tabs';
import Servicos from './pages/Servicos';
import Republica from './components/Republica';
import CadastroUsuario from './pages/CadastroUsuario';
import DetalhesServicos from './components/DetalhesServicos';
import Confirmacao from './components/Confirmacao';
import Anuncios from './pages/Anuncios';
import Caronas from './pages/Caronas';
import DetalhesCarona from './pages/DetalhesCarona';
import Teste from './teste';
import CadastroCaronas from './pages/CadastroCarona';
import SplashScreen from './pages/SplashScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Navegação = createAppContainer(
  createStackNavigator(
    {
      Login: createStackNavigator({
        Login: Login,
        CadastroUsuario: CadastroUsuario,
      }),
      App: createStackNavigator({
        //Teste,
        TabsHeader: TabsHeader,
        Anuncios,
        CadastroCaronas,
        DetalhesCarona: DetalhesCarona,
        Caronas: Caronas,
        Anuncios: Anuncios,
        Detalhes: PageAnuncio,
        DetalhesServicos: DetalhesServicos,
        Republica: Republica,
        Servicos: Servicos,
        Cadastro: Cadastro,
        Confirmacao: Confirmacao,
        SplashScreen,
      }),
    },
    {
      initialRouteName: 'App',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
    }
  )
);

export default Navegação;
