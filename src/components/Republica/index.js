import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import estilosRepublica from './style';

import Cartao from '../Cartao/index';
import api from '../../service/api';

class Republica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaRepublicas: [],
    };
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/main')
      .then(responseJson => {
        this.setState({ listaRepublicas: responseJson.data });
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }

  render() {
    return (
      <View>
        <ScrollView style={estilosRepublica.card}>
          <FlatList
            style={estilosRepublica.flatList}
            data={this.state.listaRepublicas}
            renderItem={({ item }) => <Cartao leonardo={item} />}
            keyExtractor={item => item._id}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(Republica);
