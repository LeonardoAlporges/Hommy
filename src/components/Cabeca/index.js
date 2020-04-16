import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';

class Cabeca extends Component {
  static navigationOptions = { header: null };

  closeToken = async () => {
    Alert.alert('???');
    await AsyncStorage.removeItem('token')
      .then(value => {
        console.tron.log('sai do app', value);
      })
      .catch(error => {
        console.tron.log('Nao Foi possivel');
      });
    Alert.alert('Conta deslogada com sucesso');
  };
  render() {
    return (
      <View style={Estilos.ViewCabeca}>
        <TouchableOpacity
          style={Estilos.touch_Icon}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
        >
          <Icon style={Estilos.icon2} name="account-outline" />
        </TouchableOpacity>
        <View style={Estilos.Titulo}>
          <Text style={Estilos.txt}> HOMMY </Text>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 20 }}
          onPress={this.closeToken}
        >
          <Icon style={Estilos.icon2} name="settings-outline" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Cabeca);
