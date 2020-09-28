import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native';
import Estilos from './style';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.visivel,
      icon: '',
      titulo: '',
      descricao: '',
      botao: ''
    };
  }

  callback = () => {
    this.props.callback();
  };

  navegar = props => {
    this.setState({ modalVisible: false });
    this.callback();
    if (this.props.onAction != null) {
      this.props.onAction();
    }
  };

  verificarImagem = () => {
    if (this.props.imagem == '') {
      this.setState({ icon: require('../../assets/Img/Succes.png') });
    } else if (this.props.imagem == 'NaoEncontrado') {
      this.setState({ icon: require('../../assets/Img/Nao_Encontrado.png') });
    } else if (this.props.imagem == 'EnvieImagem') {
      this.setState({ icon: require('../../assets/Img/Enviar_Foto.png') });
    } else if (this.props.imagem == 'Faltando') {
      this.setState({ icon: require('../../assets/Img/Vazio.png') });
    } else if (this.props.imagem == 'Teste') {
      this.setState({ icon: require('../../assets/Img/Nao_Encontrado.png') });
    }
  };

  UNSAFE_componentWillMount() {
    this.verificarImagem();
    if (this.props.parametro == 'Custom') {
      if (this.props.imagem == '' || !this.props.imagem) {
        this.setState({ icon: require('../../assets/Img/Succes.png') });
      }
      this.setState({
        titulo: this.props.titulo,
        descricao: this.props.descricao,
        botao: this.props.botao
      });
    }

    if (this.props.parametro == 'Sucesso') {
      this.setState({
        icon: require('../../assets/Img/Succes.png'),
        titulo: 'Tudo certo!',
        descricao: 'Concluído com sucesso',
        botao: 'Ok'
      });
    }
    if (this.props.parametro == 'Erro') {
      this.setState({
        icon: require('../../assets/Img/Fail_Connection.png'),
        titulo: 'OOPS!',
        descricao: this.props.descricao,
        botao: 'Voltar'
      });
      if (!this.props.descricao) {
        this.setState({
          descricao: 'Alguma coisa deu errado. Por favor, verifique sua conexão com a internet.'
        });
      }
    }
  }

  render() {
    return (
      <Modal animationType="fade" visible={this.state.modalVisible} transparent={true}>
        <View style={Estilos.ViewFundo}>
          <View style={Estilos.ViewModal}>
            <Image style={Estilos.Imagem} source={this.state.icon} />

            <Text style={Estilos.titulo}>{this.state.titulo}</Text>
            <Text style={Estilos.descricao}>{this.state.descricao}</Text>
            <TouchableOpacity
              style={Estilos.botao}
              onPress={async () => {
                this.navegar();
              }}
            >
              <Text style={Estilos.botaoTxt}>{this.state.botao}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
