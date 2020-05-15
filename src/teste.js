import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editTelefone,
  editFoto,
} from './actions/UserAction';

class Teste extends Component {
  state = {
    loading: false,
    logado: true,
  };

  async Buscar() {
    try {
      console.log('Busncado Token');
      await AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          console.log('user ????->', value);
          this.setState({ logado: true });
        } else {
          console.log('User False');
          this.setState({ logado: false });
        }
      });
      console.log('Buscando User');
      await AsyncStorage.getItem('user').then(value => {
        if (value != null) {
          console.log('oqeu vem ?', value);
          const dados = JSON.parse(value);
          this.props.editNome(dados.nome);
          this.props.editEmail(dados.email);
          this.props.editCpf(dados.cpf);
          this.props.editIdUser(dados.nome);
          this.props.editLogado(dados.nome);
          this.props.editTelefone(dados.celular);
          this.props.editFoto(dados.fotoPerfil);
          console.log('???', dados);
        }
      });
    } catch (erro) {
      this.setState({ logado: false });
      console.log('Nao tem nada no Storage');
    }
    this.setState({ loading: false });
  }
  constructor(props) {
    super(props);
    this.Buscar();
    console.log(this.props.navigation);
    console.log('Logado->', this.state.logado);
  }

  render() {
    return (
      <View>
        {this.state.loading ? (
          <Text>Carregando</Text>
        ) : (
          <View>
            {this.state.logado
              ? this.props.navigation.navigate('TabsHeader')
              : this.props.navigation.navigate('Login')}
          </View>
        )}
      </View>
    );
  }
}

const TesteConnect = connect(
  null,
  {
    editNome,
    editEmail,
    editCpf,
    editIdUser,
    editLogado,
    editTelefone,
    editFoto,
  }
)(Teste);

export default TesteConnect;
