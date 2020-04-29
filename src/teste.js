import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import { Button } from 'native-base';
import Splash from './Splash';
// import { Container } from './styles';
export default class Teste extends Component {
  state = {
    loading: false,
    logado: true,
  };

  async Buscar() {
    try {
      console.log('firts');
      await AsyncStorage.getItem('token').then(value => {
        if (value != null) {
          console.log('user ????->', value);
          this.setState({ logado: true });
        } else {
          console.log('User False');
          this.setState({ logado: false });
        }
      });
    } catch (erro) {
      this.setState({ logado: false });
      console.log(erro, 'Nao tem nada no Storage');
    }
    this.setState({ loading: false });
    console.log('ACABOU');
  }
  constructor(props) {
    super(props);
    this.Buscar();
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
