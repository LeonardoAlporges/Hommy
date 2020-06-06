import React, { Component } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import api from '../../service/api';

import style from './styles';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

class ModalAvaliacao extends Component {
  state = {
    modalVisible: true,
    n1: false,
    n2: false,
    n3: false,
    n4: false,
    n5: false,
    valor: 0,
  };

  atualizarCor = valor => {
    if (valor == 1) this.setState({ n1: true, valor: valor });
    if (valor == 2) this.setState({ n2: true, valor: valor });
    if (valor == 3) this.setState({ n3: true, valor: valor });
    if (valor == 4) this.setState({ n4: true, valor: valor });
    if (valor == 5) this.setState({ n5: true, valor: valor });
  };

  Avaliar = () => {
    api
      .put(`/userNota/${this.props.email}`, { nota: this.state.valor })
      .then(responseJson => {
        console.log('NOTA REGISTRADA');
      })
      .catch(error => {
        console.log('Erro:', error);
      });
    this.setState({ modalVisible: false }), this.props.retornoModal();
  };

  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.state.modalVisible}
        transparent={true}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
        onDismiss={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Text style={style.titulo}>Avalie {this.props.nome}</Text>
            <View style={style.tipoAva}>
              <Text style={style.descricao}> Pessimo</Text>
              <Text style={style.descricao}> Muito bom</Text>
            </View>
            <View style={style.iconesAva}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.atualizarCor(1);
                }}
              >
                {this.state.valor > 0 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                  <Icon name="star" style={style.icon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.atualizarCor(2);
                }}
              >
                {this.state.valor > 1 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                  <Icon name="star" style={style.icon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.atualizarCor(3);
                }}
              >
                {this.state.valor > 2 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                  <Icon name="star" style={style.icon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.atualizarCor(4);
                }}
              >
                {this.state.valor > 3 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                  <Icon name="star" style={style.icon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.atualizarCor(5);
                }}
              >
                {this.state.valor > 4 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                  <Icon name="star" style={style.icon} />
                )}
              </TouchableOpacity>
            </View>

            <Button
              style={style.botao}
              onPress={async () => {
                this.Avaliar();
              }}
            >
              <Text style={style.botaoTxt}>Confirmar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalAvaliacao;
