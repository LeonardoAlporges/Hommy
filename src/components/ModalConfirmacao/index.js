import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';

import style from './styles';
import { Button } from 'native-base';
import { number } from 'yup';

class ModalConfirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      mensagem: this.props.mensagem,
      confirmar: this.props.confirmar,
      rejeitar: this.props.rejeitar,
    };
  }
  onDimiss = number => {
    this.props.retornoModal(3);
  };

  mudarEstado = () => {
    if (this.state.confirmar == true) {
      this.props.retornoModal(1);
    } else if (this.state.rejeitar == true) {
      this.props.retornoModal(0);
    }
  };
  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Text style={style.titulo}>Deseja Aceitar ?</Text>
            <Text style={style.descricao}>{this.state.mensagem}</Text>
            <View style={style.V_botoes}>
              <Button
                style={style.botaoCancelar}
                onPress={async () => {
                  this.onDimiss();
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={style.botaoTxtCancelar}>Cancelar</Text>
              </Button>
              <Button
                style={style.botao}
                onPress={async () => {
                  this.mudarEstado();
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={style.botaoTxt}>Confirmar</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default ModalConfirmacao;
