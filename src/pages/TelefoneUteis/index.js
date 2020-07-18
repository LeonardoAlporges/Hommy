import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import HeaderBack from '../../components/CustomHeader';
import style from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class TelefoneUteis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  AbrirUrl = () => {
    Linking.openURL(`tel:27997488849`);
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View>
        <HeaderBack title="Telefone Uteis" onNavigation={() => this.navegar()} />
        <View style={style.Divisao}>
          <Text style={style.Text}>Emergencia</Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <View style={style.Cards}>
            <Text style={style.Nome}>Policia</Text>
            <Text style={style.Numero}>190</Text>
            <TouchableOpacity
              style={style.Botao}
              onPress={() => {
                this.AbrirUrl();
              }}
            >
              <Icon style={style.Icone} name="arrow-right" />
            </TouchableOpacity>
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>Bombeiros</Text>
            <Text style={style.Numero}>193</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>SAMU</Text>
            <Text style={style.Numero}>192</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>Disk Denuncia</Text>
            <Text style={style.Numero}>181</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
        </View>
        <View style={style.Divisao}>
          <Text style={style.Text}>Uteis</Text>
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <View style={style.Cards}>
            <Text style={style.Nome}>Hospital</Text>
            <Text style={style.Numero}>(28)40028922</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>Rodoviaria</Text>
            <Text style={style.Numero}>(28)33214547</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>Farmacia Alegrense</Text>
            <Text style={style.Numero}>(28)9975845</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
          <View style={style.Cards}>
            <Text style={style.Nome}>Farmacia Droga</Text>
            <Text style={style.Numero}>(28)40028922</Text>
            <Icon style={style.Icone} name="arrow-right" />
          </View>
        </View>
      </View>
    );
  }
}
