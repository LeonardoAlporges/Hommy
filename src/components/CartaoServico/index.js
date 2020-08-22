import React, { Component } from 'react';
import { Image, TouchableHighlight, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';


import Estilos from './style';

class CartaoServico extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
  }

  onClickCard = () => {
    const dados = this.props.leonardo;
    this.props.navigation.navigate('DetalhesServicos');
  };

  render() {
    return (
      <TouchableHighlight underlayColor="#fff" onPress={this.onClickCard} style={Estilos.touch_card}>
        <View style={Estilos.V_cartao}>
          <View style={Estilos.V_imagem}>
            <Image source={{ uri: this.props.leonardo.image }} style={Estilos.V_imagem} />
          </View>

          <View style={Estilos.V_TituloDesc}>
            <View style={Estilos.V_titulo}>
              <Text style={Estilos.txtTitulo}>{this.props.leonardo.titulo}</Text>
            </View>

            <View style={Estilos.V_desc}>
              <Text numberOfLines={2} style={Estilos.txtDesc}>
                {this.props.leonardo.desc}
              </Text>
            </View>
          </View>

          <View style={Estilos.V_notasImg}>
            <View>
              <Text style={{ fontFamily: 'Roboto', fontSize: 14 }}>{this.props.leonardo.numero}</Text>
            </View>

            <View style={Estilos.imgNota}>
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Imagens%2FEstrela.png?alt=media&token=c6e03865-4e3e-4b5d-8bac-bbe06f2debd9',
                }}
                style={Estilos.imgNota}
              />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


export default withNavigation(CartaoServico);
