import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList, View } from 'react-native';
import axios from 'axios';
import { withNavigation, NavigationEvents } from 'react-navigation';

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
  servicosRedux() {
    this.props.navigation.navigate('CadastroServico');
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/servicos')
      .then(responseJson => {
        console.log('SERVIÇOS', responseJson);
        this.setState({ listaServicos: responseJson.data });
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }
  irParaCadastro() {
    this.props.navigation.navigate('CadastroServico');
  }

  render() {
    return (
      <View style={Estilo.V_externa}>
        <ScrollView>
          <View style={Estilo.card}>
            <FlatList
              style={Estilo.flatList}
              data={this.state.listaServicos}
              renderItem={({ item }) => <CartaoServico dados={item} />}
              keyExtractor={item => item._id}
            />
          </View>
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

          <Button
            style={Estilo.corFAB}
            onPress={() => {
              this.servicosRedux();
            }}
          >
            <Icon name="plus" style={Estilo.corIconFab} />
          </Button>
        </Fab>
      </View>
    );
  }
}

export default withNavigation(Servicos);
