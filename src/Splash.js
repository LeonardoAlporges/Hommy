import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Rotas from './leo';

import { connect } from 'react-redux';

import { editLogado } from './actions/AuthActions';

class Splash extends Component {
  UNSAFE_componentWillMount = async () => {
    await AsyncStorage.getItem('token')
      .then(value => {
        console.tron.log('valor-> kee', value);
        if (value != null) {
          this.props.editLogado(true);
        } else {
          this.props.editLogado(false);
        }
      })
      .catch(error => {
        console.tron.log('Nao tem nada no Storage');
      });
  };

  render() {
    return <Rotas />;
  }
}

const mapStateToProps = state => {
  return {
    logado: state.auth.logado,
  };
};

const cardConnect = connect(
  mapStateToProps,
  {
    editLogado,
  }
)(Splash);

export default cardConnect;
