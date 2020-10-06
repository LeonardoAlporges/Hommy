import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import DetalhesAnuncio from './pages/Republica/DetalhesAnuncio';
import Cadastro from './pages/Republica/Cadastro/index';
import Login from './pages/Acesso/Login';
import TabsHeader from './pages/Geral/Home';
import Servicos from './pages/Servicos/Servicos';
import Republica from './pages/Republica/Republica';
import CadastroUsuario from './pages/Acesso/CadastroUsuario';
import DetalhesServicos from './pages/Servicos/DetalhesServico';
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

import TelefoneUteis from './pages/Geral/TelefoneUteis';
import GerenciamentoDeRepublica from './pages/Republica/GerenciamentoRepublica';
import CadastroServico from './pages/Servicos/Cadastro';

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

    DetalhesServicos: DetalhesServicos,
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
    GerenciamentoDeRepublica,
    Republica,
    Servicos,
    Cadastro,
    Confirmacao,
    SplashScreen,
    CadastroServico
  },
  {
    initialRouteName: 'TabsHeader',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(Navegação);
