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

const Navegacao = createStackNavigator(

  {
    DetalhesServicos: DetalhesServicos,
    Republica: Republica,
    Servicos: Servicos,
    Cadastro: Cadastro,
    Detalhes: PageAnuncio,
    CadastroUsuario: CadastroUsuario,
    Login: Login,
    TabsHeader: TabsHeader,
    Confirmacao: Confirmacao,
  },
  {
    initialRouteName: 'TabsHeader',
  }

);

Confirmacao.navigationOptions = {
  header: null,
}
DetalhesServicos.navigationOptions = {
  header: null,
}
CadastroUsuario.navigationOptions = {
  header: null,
}

Republica.navigationOptions = {
  header: null,
}
Servicos.navigationOptions = {
  header: null,

}
TabsHeader.navigationOptions = {
  header: null,

}
Login.navigationOptions = {
  header: null,
}
PageAnuncio.navigationOptions = {
  header: null,
}
Cadastro.navigationOptions = {
  header: null,
}



export default createAppContainer(Navegacao);