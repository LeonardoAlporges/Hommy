import React, { Component, useState } from 'react';
import { View, Image, Text, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Container,
  Conteudo,
  Logo,
  Imagem,
  Label,
  Titulo,
  Descricao,
  Botao,
  Botoes,
  TituloBotao,
  FundoModal,
  Spin,
} from './styles';
import { Button, Spinner } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';

class SplashScreen extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    console.log(props);
  }
  state = {
    modalVisible: false,
  };
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota, params: { token: this.props.token } })], //navigation.state.parms.token
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
      <View>
        <Container>
          <Conteudo>
            <Logo>
              <Imagem source={require('../../../assets/Img/Wellcome.png')} />
            </Logo>
            <Label>
              <Titulo>Bem vindo ao Hommy </Titulo>
              <Descricao>
                Realize e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma carona
              </Descricao>
            </Label>
          </Conteudo>

          <Botoes>
            <Botao
              onPress={() => {
                this.abrirLoad();
              }}
            >
              <TituloBotao>Acessar minha conta</TituloBotao>
            </Botao>
          </Botoes>
          <View>
            <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
              <FundoModal>
                <Spin>
                  <Spinner color="#142850" />
                </Spin>
              </FundoModal>
            </Modal>
          </View>
        </Container>
      </View>
    );
  }
}

export default withNavigation(SplashScreen);
