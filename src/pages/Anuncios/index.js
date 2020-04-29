import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import estilo from './style';
import api from '../../service/api';
import Cartao from '../../components/Cartao';
// import { Container } from './styles';

import { connect } from 'react-redux';
import CartaoCarona from '../../components/CartaoCarona';

class Anuncios extends Component {
  static navigationOptions = { header: null };
  state = {
    listaRepublicas: [],
    listaCaronas: [],
    email: 'leo@hotmail.com',
  };
  UNSAFE_componentWillMount() {
    api
      .get(`/userCarona/${'leo@hotmail.com'}`)
      .then(responseJson => {
        console.log('Caronas', responseJson);
        this.setState({ listaCaronas: responseJson.data });
      })
      .catch(error => {
        console.tron.error('Erro no Servidor');
      });

    api
      .get(`/userRepublica/${'leo@hotmail.com'}`)
      .then(responseJson => {
        console.log('leo', responseJson);
        this.setState({ listaRepublicas: responseJson.data });
      })
      .catch(error => {
        console.tron.error('Erro no Servidor');
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={estilo.V_header}>
          <Icon name="arrow-left" style={estilo.iconHeader} />
          <Text style={estilo.title}>Meus Anuncios</Text>
        </View>
        <View style={estilo.V_label}>
          <Text style={estilo.label}>Republicas</Text>
          <View style={estilo.barra} />
        </View>
        <View>
          <ScrollView style={estilo.card}>
            <FlatList
              style={estilo.flatList}
              data={this.state.listaRepublicas}
              renderItem={({ item }) => <Cartao leonardo={item} />}
              keyExtractor={item => item._id}
            />

            <View style={estilo.V_edit}>
              <View style={estilo.edit}>
                <Icon
                  style={{ fontSize: 25, marginRight: '2%', color: '#ffffff' }}
                  name="pencil-outline"
                />
                <Text style={estilo.TxtEdit}>Editar</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={estilo.V_label}>
          <Text style={estilo.label}>Caronas</Text>
          <View style={estilo.barra} />
        </View>
        <View>
          <ScrollView style={estilo.card}>
            <FlatList
              style={estilo.flatList}
              data={this.state.listaCaronas}
              renderItem={({ item }) => <CartaoCarona dados={item} />}
              keyExtractor={item => item._id}
            />

            <View style={estilo.V_edit}>
              <View style={estilo.edit}>
                <Icon
                  style={{ fontSize: 25, marginRight: '2%', color: '#ffffff' }}
                  name="pencil-outline"
                />
                <Text style={estilo.TxtEdit}>Editar</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Anuncios;
