import React, { Component, useState } from 'react';
import { View, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Spinner } from 'native-base';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  Container,
  Conteudo,
  Logo,
  Imagem,
  Label,
  Titulo,
  Descricao,
  Botoes,
  Botao,
  TituloBotao,
  Spin,
  FundoModal,
} from './styles';

function SplashScreen(props) {
  const [exibirModal, setExibirModal] = useState(false);

  function resetNavigation(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
    });
    props.navigation.dispatch(resetAction);
  }

  function abrirLoad() {
    setExibirModal(true);

    setTimeout(() => {
      setExibirModal(false);
    }, 1000);

    resetNavigation('Login');
  }

  return (
    <Container>
      <Conteudo>
        <Logo>
          <Imagem source={require('../../assets/Img/Wellcome.png')} />
        </Logo>
        <Label>
          <Titulo>Bem vindo ao Hommy </Titulo>

          <Descricao>
            Realize e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma carona
          </Descricao>
        </Label>
      </Conteudo>

      <Botoes>
        <Botao onPress={() => abrirLoad()}>
          <TituloBotao>Acessar minha conta</TituloBotao>
        </Botao>
      </Botoes>
      {setExibirModal && (
        <Modal animationType="slide" transparent={true} visible={exibirModal}>
          <FundoModal>
            <Spin>
              <Spinner color="#142850" />
            </Spin>
          </FundoModal>
        </Modal>
      )}
    </Container>
  );
}

class SplashScreen extends Component {
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
              Realize e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma carona
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
