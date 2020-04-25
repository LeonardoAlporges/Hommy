import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Rotas from './leo';

import { connect } from 'react-redux';

import { editLogado } from './actions/AuthActions';
import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editTelefone,
  editFoto,
} from './actions/UserAction';
import { Spinner } from 'native-base';

class Splash extends Component {
  state = {
    loading: true,
  };
  UNSAFE_componentWillMount = async () => {
    console.tron.log('primeiro');
    try {
      console.tron.log('segundo');
      await AsyncStorage.getItem('token')
        .then(value => {
          console.tron.log('valor-> kee', value);
          if (value != null) {
            this.props.editLogado(true);
            console.tron.log('leo:', this.props.logado);
          } else {
            this.props.editLogado(false);
            console.tron.log('segundo');
          }
        })
        .catch(erro => {
          console.tron.console.error(erro, 'Nao tem nada no Storage');
        });

      await AsyncStorage.getItem('user').then(value => {
        const dados = JSON.parse(value);
        this.props.editNome(dados.nome);
        this.props.editEmail(dados.email);
        this.props.editCpf(dados.cpf);
        this.props.editIdUser(dados.nome);
        this.props.editLogado(dados.nome);
        this.props.editTelefone(dados.celular);
        this.props.editFoto(dados.fotoPerfil);

        console.tron.log('user Salvo->', JSON.parse(value));
      });
    } catch (erro) {
      console.tron.log(erro, 'Nao tem nada no Storage');
    }
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

const loginConnect = connect(
  mapStateToProps,
  {
    editNome,
    editEmail,
    editCpf,
    editIdUser,
    editLogado,
    editTelefone,
    editFoto,
  }
)(Splash);

export default loginConnect;
