import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

import CartaoServico from '../../components/CartaoServico';
import Estilo from './style';

class Servicos extends Component {
  constructor(props) {
    super(props);
    this.state = { listaServicos: [] };
  }

  UNSAFE_componentWillMount() {
    return axios
      .get('https://backendhommy.herokuapp.com/servicos')
      .then(responseJson => {
        this.setState({ listaServicos: responseJson.data });
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }

  render() {
    return (
      <ScrollView style={Estilo.card}>
        <FlatList
          style={Estilo.flatList}
          data={this.state.listaServicos}
          renderItem={({ item }) => <CartaoServico leonardo={item} />}
          keyExtractor={item => item.key}
        />
      </ScrollView>
    );
  }
}

export default Servicos;
