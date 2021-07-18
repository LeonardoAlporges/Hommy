import { Spinner } from 'native-base';
import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import {
  Botao,
  Botoes, Container,
  Conteudo,




  Descricao,



  FundoModal, Imagem,
  Label, Logo,








  Spin, Titulo,



  TituloBotao
} from './styles';

function SplashScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  function resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });

    navigation.dispatch(resetAction);
  }
  function abrirLoad() {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);

    resetNavigation('Login');
  }

 
  


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
              Crie e acompanhe anúncios! Descubra a república ideal e economize tempo pedindo uma carona
            </Descricao>
          </Label>
        </Conteudo>

        <Botoes>
          <Botao
            onPress={() => {
              abrirLoad();
            }}
          >
            <TituloBotao>Acessar minha conta</TituloBotao>
          </Botao>
        </Botoes>
        <View>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
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

export default withNavigation(SplashScreen);
