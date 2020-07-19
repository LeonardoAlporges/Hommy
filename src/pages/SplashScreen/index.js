import React, { Component } from 'react';
import { View, Image, Text, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import style from './style';
import { Button, Spinner } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

class SplashScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
  }
  state = {
    modalVisible: false,
  };
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }
  abrirLoad() {
    this.setState({ modalVisible: true });

    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 1000);

    this.resetNavigation('Login');
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.posicao}>
          <View style={style.imagem}>
            <Image style={style.img} source={require('../../assets/Img/Wellcome.png')} />
          </View>
          <View style={style.texto}>
            <Text style={style.titulo}>Bem vindo ao Hommy </Text>

            <Text style={style.descricao}>
              Realize e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma TESTE
            </Text>
          </View>
        </View>

        <View style={style.V_Botoes}>
          <Button
            style={style.botao}
            onPress={() => {
              this.abrirLoad();
            }}
          >
            <Text style={style.labelButon}>Acessar minha conta</Text>
          </Button>
        </View>
        <View>
          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
            <View style={style.ViewFundo}>
              <View style={style.ViewModal}>
                <Spinner color="#142850" />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default withNavigation(SplashScreen);
