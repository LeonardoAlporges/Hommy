import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Estilos from './style';

export default class CustomModal extends Component {
  state = {
    modalVisible: true,
    icon: '',
    titulo: '',
    descricao: '',
    botao: '',
  };
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    if (this.props.parametro == 'Sucesso') {
      this.setState({
        icon: require('../../../assets/undraw_confirmed_81ex.png'),
        titulo: 'Socilitação concluida com sucesso!',
        descricao: 'Confirmar',
        botao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Aviso') {
      this.setState({
        icon: require('../../../assets/undraw_warning_cyit.png'),
        titulo: 'Fique atento ',
        descricao: 'Voçe pode ter inserido algum dado errado',
        botao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Erro') {
      this.setState({
        icon: require('../../../assets/undraw_cancel_u1it.png'),
        titulo: 'Erro de conexao',
        descricao: 'Nao foi possivel completar sua requisição',
        botao: 'Voltar',
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

              <Text style={Estilos.titulo}>{this.state.titulo}</Text>
              <Text style={Estilos.descricao}>{this.state.descricao}</Text>
              <TouchableOpacity
                style={Estilos.botao}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={Estilos.botaoTxt}>{this.state.botao}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
