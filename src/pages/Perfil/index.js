import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import style from './styles';
import { Icon, Button } from 'native-base';

export default class Perfil extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      dados: this.props.navigation.state.params.dados,
    };
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View style={style.V_header}>
          <TouchableOpacity
            style={{ marginLeft: '5%' }}
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Icon name="ios-arrow-back" style={style.iconHeader} />
          </TouchableOpacity>
          <Text style={style.title}>Perfil</Text>
        </View>
        <View style={style.V_profile}>
          <View style={style.V_imagem}>
            <Image
              style={style.V_imagem}
              source={{
                uri: this.state.dados.fotoPerfil,
              }}
            />
          </View>
        </View>
        <View style={style.V_Title}>
          <View style={style.V_nome}>
            <Text style={style.nome}>{this.state.dados.nome}</Text>
          </View>
          <View style={style.V_nota}>
            <Icon name="ios-arrow-back" style={style.iconHeader} />
            <Text style={style.nota}>{this.state.dados.nota}</Text>
          </View>
        </View>

        <Text style={style.label}>Entre em contato</Text>
        <View style={style.barra} />
        <View style={style.V_contatos}>
          <Button style={style.botoes}>
            <Text style={style.labelbotao}>Ligar</Text>
          </Button>
          <Button
            style={style.botoes}
            onPress={() => {
              Linking.openURL(
                'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
              );
            }}
          >
            <Text style={style.labelbotao}>Enviar mensagem</Text>
          </Button>
        </View>
      </View>
    );
  }
}
