import React, { Component } from 'react';
import { View, Image, Text, Alert, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import style from './style';
import { Button, Spinner } from 'native-base';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
  };

  abrir() {
    this.setState({ modalVisible: true });

    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 10000);
  }

  static navigationOptions = { header: null };
  render() {
    return (
      <View style={style.container}>
        <View style={style.posicao}>
          <View style={style.imagem}>
            <Image
              style={style.img}
              source={require('../../assets/Img/Wellcome.png')}
            />
          </View>
          <View style={style.texto}>
            <Text style={style.titulo}>Bem vindo ao Hommy </Text>

            <Text style={style.descricao}>
              Agora voce pode ver anuncios de vagas em republicas, caronas tudo
              na palma da sua mão
            </Text>
          </View>
        </View>

        <View style={style.V_Botoes}>
          <Button
            style={style.botao}
            onPress={() => {
              //this.props.navigation.navigate('Login');
              this.abrir();
            }}
          >
            <Text style={style.labelButon}>Prosseguir</Text>
          </Button>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={style.ViewFundo}>
              <View style={style.ViewModal}>
                <Spinner color="red" />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default withNavigation(SplashScreen);
