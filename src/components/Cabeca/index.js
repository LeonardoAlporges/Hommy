import React, {Component} from 'react';
import { withNavigation } from 'react-navigation';
import {TouchableOpacity, View,Text, StyleSheet} from 'react-native';
import {} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Estilos from './style';

class Cabeca extends Component{
  render(){
  return (
    <View style={Estilos.ViewCabeca}>
        <TouchableOpacity style={Estilos.touch_Icon} onPress={() => {this.props.navigation.navigate('Login')}} >
            <Icon style={Estilos.icon2} name= 'account-outline'/>
        </TouchableOpacity>
        <View style={Estilos.Titulo}>
          <Text style={Estilos.txt}> HOMMY </Text>
        </View>
        <TouchableOpacity style={{marginLeft:20,marginRight:20}} onPress={() => {alert("Em Construção por favor aguarde!!")}} >
            <Icon style={Estilos.icon2}  name="settings-outline"/>
        </TouchableOpacity>
    </View>
  );
  }
};



export default withNavigation(Cabeca);
