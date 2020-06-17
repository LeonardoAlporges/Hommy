import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';

import style from './styles';
import { Button } from 'native-base';

class ModalConfirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  mudarEstado = () => {};
  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Text style={style.titulo}>{this.state.titulo}</Text>
            <Text style={style.descricao}>{this.state.mensagem}</Text>
            <View style={style.V_botoes}>
              <Button
                style={style.botao}
                onPress={async () => {
                  this.mudarEstado();
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={style.botaoTxt}>{'Ok'}</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default ModalConfirmacao;
