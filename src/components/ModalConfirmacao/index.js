import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';

import style from './styles';
import { Button } from 'native-base';

class ModalConfirmacao extends Component {
  state = {
    modalVisible: true,
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
            <Text style={style.descricao}>
              Leoanardo sera notificado que foi aceito e terá acesso ao seu
              numero de telefone para entrar em contato caso nessesario
            </Text>
            <View style={style.V_botoes}>
              <Button
                style={style.botaoCancelar}
                onPress={async () => {
                  this.setState({ modalVisible: false }),
                    this.props.retornoModal(0);
                }}
              >
                <Text style={style.botaoTxtCancelar}>Cancelar</Text>
              </Button>
              <Button
                style={style.botao}
                onPress={async () => {
                  this.setState({ modalVisible: false }),
                    this.props.retornoModal(1);
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
