import React, { Component, useState } from 'react';
import { Modal } from 'react-native';
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
          <Imagem source={require('../../../assets/Img/Wellcome.png')} />
        </Logo>
        <Label>
          <Titulo>Bem vindo ao Hommy </Titulo>

          <Descricao>Realize e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma</Descricao>
        </Label>
      </Conteudo>

      <Botoes>
        <Botao onPress={() => abrirLoad()}>
          <TituloBotao>Acessar minha conta</TituloBotao>
        </Botao>
      </Botoes>
      {exibirModal && (
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

export default withNavigation(SplashScreen);
