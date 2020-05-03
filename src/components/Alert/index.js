import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Estilos from './style';

export default class Aviso extends Component {
  state = {
    modalVisible: true,
    icon: '',
    titulo: '',
    descricao: '',
  };
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    if (this.props.parametro == 'Sucesso') {
      this.setState({
        icon: require('../../../assets/undraw_confirmed_81ex.png'),
        titulo: 'Qualquer coisa concluida com sucesso!',
        descricao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Aviso') {
      this.setState({
        icon: require('../../../assets/undraw_warning_cyit.png'),
        titulo: 'Qualquer coisa tem um aviso',
        descricao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Erro') {
      this.setState({
        icon: require('../../../assets/undraw_cancel_u1it.png'),
        titulo: 'Qualquer coisa não foi concluido',
        descricao: 'Confirmar',
      });
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View style={Estilos.ViewFundo}>
            <View style={Estilos.ViewModal}>
              <Image style={Estilos.Imagem} source={this.state.icon} />
              <Text style={Estilos.descricao}>{this.state.titulo}</Text>
              <TouchableOpacity
                style={Estilos.botao}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={Estilos.botaoTxt}>{this.state.descricao}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
