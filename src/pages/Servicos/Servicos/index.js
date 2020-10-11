import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import axios from 'axios';

import CartaoServico from '../../../components/CartaoServico';
import Estilo from './style';
import { CheckBox, ListItem, Button, Fab, Input, Item, Label } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../service/api';
class Servicos extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = { listaServicos: [], active: false };
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/servicos')
      .then(responseJson => {
        this.setState({ listaServicos: responseJson.data });
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }

  render() {
    return (
      <View style={Estilo.container}>
        <ScrollView style={Estilo.card}>
          <FlatList
            style={Estilo.flatList}
            data={this.state.listaServicos}
            renderItem={({ item }) => <CartaoServico leonardo={item} />}
            keyExtractor={item => item.key}
          />
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={Estilo.S_FAB}
          position="bottomRight"
          onPress={() => {
            this.setState({ active: !this.state.active });
          }}
        >
          {this.state.active ? <Icon name="minus" /> : <Icon name="plus" />}

          <Button style={Estilo.corFAB} onPress={() => {}}>
            <Icon name="plus" style={Estilo.corIconFab} />
          </Button>
        </Fab>
      </View>
    );
  }
}

export default Servicos;
