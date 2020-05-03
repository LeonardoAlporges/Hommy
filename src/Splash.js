import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { editLogado } from './actions/AuthActions';
import { withNavigation } from 'react-navigation';

import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editTelefone,
  editFoto,
} from './actions/UserAction';
import { Spinner, Button } from 'native-base';
import Routes from './Routes';

class Splash extends Component {
  constructor(props) {
    super(props);

    this.controle();
  }

  controle = () => {
    console.log(this.props.parametro);
  };

  render() {
    return <Routes />;
  }
}

export default Splash;
