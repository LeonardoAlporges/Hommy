import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DetalhesAnuncio from './pages/Republica/DetalhesAnuncio';
import Cadastro from './pages/Republica/Cadastro/index';
import Login from './pages/Acesso/Login';
import TabsHeader from './pages/Geral/Home';
import Servicos from './pages/Servicos';
import Republica from './pages/Republica/Republica';
import CadastroUsuario from './pages/Acesso/CadastroUsuario';
import DetalhesServicos from './components/DetalhesServicos';
import Confirmacao from './components/Confirmacao';
import Anuncios from './pages/Geral/Anuncios';
import Caronas from './pages/Carona/Caronas';
import DetalhesCarona from './pages/Carona/DetalhesCarona';
import RenderApp from './pages/Geral/RenderApp/RenderApp';
import CadastroCaronas from './pages/Carona/CadastroCarona';
import SplashScreen from './pages/Geral/SplashScreen';
import Interessados from './pages/Carona/Interessados';
import Viagens from './pages/Carona/Viagens';
import Perfil from './pages/Geral/Perfil';
import EsqueciSenha from './pages/Acesso/EsqueciSenha';
import Agendar from './pages/Republica/Agendar';
import Agendamentos from './pages/Republica/Agendamentos';
import AgendamentoUser from './pages/Republica/AgendamentosUser';
import ValidarCodigo from './pages/Acesso/ValidarCodigo';
import Notificacao from './pages/Geral/TesteNot';
import TelefoneUteis from './pages/Geral/TelefoneUteis';
import AutenticacaoTelefone from './pages/Acesso/AutenticaçãoTelefone';

import { createDrawerNavigator } from 'react-navigation-drawer';

const Navegação = createStackNavigator(
  {
    RenderApp: {
      screen: RenderApp,
      navigationOptions: {
        headerLeft: null
      }
    },
    TabsHeader: {
      screen: TabsHeader,
      navigationOptions: {
        headerLeft: null
      }
    },
    Detalhes: DetalhesAnuncio,
    Login: Login,
    CadastroUsuario: CadastroUsuario,
    ValidarCodigo,
    TelefoneUteis,
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

    DetalhesServicos,
    Republica,
    Servicos,
    Cadastro,
    Confirmacao,
    SplashScreen,
    AutenticacaoTelefone
  },
  {
    initialRouteName: 'RenderApp',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(Navegação);
