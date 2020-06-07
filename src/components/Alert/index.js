import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native';
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

  navegar = props => {
    this.setState({ modalVisible: false });
    if (this.props.onAction != null) {
      this.props.onAction();
    }
  };
  UNSAFE_componentWillMount() {
    if (this.props.parametro == 'Custom') {
      this.setState({
        icon: require('../../assets/Img/Question.png'),
        titulo: this.props.titulo,
        descricao: this.props.descricao,
        botao: this.props.botao,
      });
    }

    if (this.props.parametro == 'Sucesso') {
      this.setState({
        icon: require('../../assets/Img/Succes.png'),
        titulo: 'Socilitação concluida com sucesso!',
        descricao: 'Confirmar',
        botao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Aviso') {
      this.setState({
        icon: require('../../assets/Img/Question.png'),
        titulo: 'Fique atento ',
        descricao: 'Voçe pode ter inserido algum dado errado',
        botao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Erro') {
      this.setState({
        icon: require('../../assets/Img/Fail_Connection.png'),
        titulo: 'Erro de conexao',
        descricao:
          'Nao foi possivel completar sua requisição, verifique sua conexao com a internet',
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
                onPress={async () => {
                  this.navegar();
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
