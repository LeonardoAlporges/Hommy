import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
import RenderApp from './pages/RenderApp/RenderApp';
import CadastroCaronas from './pages/CadastroCarona';
import SplashScreen from './pages/SplashScreen';
import Interessados from './pages/Interessados';
import Viagens from './pages/Viagens';
import Perfil from './pages/Perfil';
import EsqueciSenha from './pages/EsqueciSenha';
import Agendar from './pages/Agendar';
import Agendamentos from './pages/Agendamentos';
import AgendamentoUser from './pages/AgendamentosUser';
import ValidarCodigo from './pages/ValidarCodigo';
import Notificacao from './pages/TesteNot';

import { createDrawerNavigator } from 'react-navigation-drawer';

const Navegação = createStackNavigator(
  {
    RenderApp: {
      screen: RenderApp,
      navigationOptions: {
        headerLeft: null,
      },
    },
    TabsHeader: {
      screen: TabsHeader,
      navigationOptions: {
        headerLeft: null,
      },
    },
    Login: Login,
    CadastroUsuario: CadastroUsuario,
    ValidarCodigo,
    AgendamentoUser,
    Agendamentos,
    Agendar,
    Confirmacao,
    EsqueciSenha,
    Perfil,
    Viagens,
    Anuncios,
    Interessados,
    CadastroCaronas,
    DetalhesCarona,
    Caronas,
    Anuncios,
    Detalhes: PageAnuncio,
    DetalhesServicos,
    Republica,
    Servicos,
    Cadastro,
    Confirmacao,
    SplashScreen,
  },
  {
    initialRouteName: 'RenderApp',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default createAppContainer(Navegação);
