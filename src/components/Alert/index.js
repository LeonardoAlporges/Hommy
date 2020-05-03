import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

export default class CustomModal extends Component {
  state = {
    modalVisible: true,
  };

  constructor(props) {
    super(props);
    if (this.props.parametro == 'Sucesso') {
      this.state({
        // icon: require('../../assets/undraw_confirmed_81ex.png'),
        titulo: 'Qualquer coisa concluida com sucesso!',
        descricao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Aviso') {
      this.state({
        //icon: require('../../assets/undraw_warning_cyit.png'),
        titulo: 'Qualquer coisa tem um aviso',
        descricao: 'Confirmar',
      });
    }
    if (this.props.parametro == 'Erro') {
      this.state({
        //icon: require('../../assets/undraw_cancel_u1it.png'),
        titulo: 'Qualquer coisa não foi concluido',
        descricao: 'Confirmar',
      });
    }
  }

  render() {
    const { icon, descricao, titulo } = this.state;

    return (
      <View>
        <Modal
          animationType="fade"
          visible={this.state.modalVisible}
          transparent={true}
        >
          <View
            style={{
              backgroundColor: '#00000080',
              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
                marginTop: 150,
                marginHorizontal: 50,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                style={{
                  alignSelf: 'center',
                  width: 300,
                  height: 300,
                  justifyContent: 'center',
                }}
                source={{ uri: icon }}
              />
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Roboto',
                  fontSize: 15,
                }}
              >
                {this.state.titulo}
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#30C21E',
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  justifyContent: 'center',
                  height: 45,
                  width: 170,
                }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    fontSize: 20,
                  }}
                >
                  {this.state.descricao}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
