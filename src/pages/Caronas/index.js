import React, { Component } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import Estilo from './style';

import CartaoCarona from '../../components/CartaoCarona';
import api from '../../service/api';

class Caronas extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      listaCaronas: [],
    };
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/carona')
      .then(responseJson => {
        this.setState({ listaCaronas: responseJson.data });
        console.log('oque tem ', responseJson);
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }

  render() {
    return (
      <View>
        <ScrollView style={Estilo.card}>
          <FlatList
            style={Estilo.flatList}
            data={this.state.listaCaronas}
            renderItem={({ item }) => <CartaoCarona dados={item} />}
            keyExtractor={item => item._id}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(Caronas);
