import React, { Component, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, View, Text, BackHandler, Modal, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import { NavigationActions, StackActions } from 'react-navigation';

import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import Estilos from './style';
import { ScrollView } from 'react-native-gesture-handler';

import {
  Container,
  Header,
  TituloHeader,
  IconVoltar,
  ViewDados,
  ViewFotoPerfil,
  ViewNome,
  Nome,
  ViewNota,
  Menu,
  Linha,
  Card,
  ViewIcons,
  ViewLabel,
  Label,
  CardAmigos,
  ViewLabelAmigos,
  BotesLogin,
  Botao,
  LabelBotoes,
  SairdoApp,
  LabelBotaoSair
} from './style';

function Cabeca({ navigation }) {
  navigationOptions = { header: null, left: null };
  const [dados, setDados] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const nome = useSelector(state => state.user.usuario);
  const fotoPerfil = useSelector(state => state.user.fotoPerfil);
  const nota = useSelector(state => state.user.notaUser);
  AbrirUrl = () => {
    Linking.openURL(`tel:27997488849`);
    //Linking.openUrl('https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849');
  };

  function resetNavigation(Rota) {
    console.log('pe');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });

    navigation.dispatch(resetAction);
  }
  closeToken = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user')
      .then(value => {
        resetNavigation('Login');
      })
      .catch(error => {});
  };
  return (
    <View style={Estilos.ViewCabeca}>
      <TouchableOpacity
        style={Estilos.touch_Icon}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Icon style={Estilos.icon2} name="account-circle-outline" />
      </TouchableOpacity>
      <View style={Estilos.Titulo}>
        <Text style={Estilos.txt}> Hommy </Text>
      </View>
      <View style={Estilos.touch_Fake}>{/* <Icon style={Estilos.icon2} name="user" /> */}</View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Container>
          <Header>
            <IconVoltar
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <Icon size={25} name="arrow-left" color="#022250" />
            </IconVoltar>
            <TituloHeader>Perfil</TituloHeader>
          </Header>
          <ScrollView style={{ width: '100%' }}>
            <ViewDados>
              <ViewFotoPerfil>
                <Image
                  source={{
                    uri: fotoPerfil
                  }}
                  style={Estilos.fotoPerfil}
                />
              </ViewFotoPerfil>
              <ViewNome>
                <Nome>{nome}</Nome>
              </ViewNome>
              <ViewNota>
                <Icon name="star" color="#ffd700" size={16}></Icon>
                <Icon name="star" color="#ffd700" size={16}></Icon>
                <Icon name="star" color="#ffd700" size={16}></Icon>
                <Icon name="star" color="#ffd700" size={16}></Icon>
                <Icon name="star-half" color="#ffd700" size={16}></Icon>
              </ViewNota>
            </ViewDados>
            <Menu>
              <Linha>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    navigation.navigate('Anuncios'), setIsModalVisible(false);
                  }}
                >
                  <ViewIcons>
                    <Icon name="card-text-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Anuncios</Label>
                  </ViewLabel>
                </Card>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    navigation.navigate('AgendamentoUser', {
                      usuario: true
                    }),
                      setIsModalVisible(false);
                  }}
                >
                  <ViewIcons>
                    <Icon name="calendar-month-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Agendamentos</Label>
                  </ViewLabel>
                </Card>
              </Linha>
              <Linha>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    navigation.navigate('Viagens'), setIsModalVisible(false);
                  }}
                >
                  <ViewIcons>
                    <Icon name="car" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Interesses</Label>
                  </ViewLabel>
                </Card>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    navigation.navigate('TelefoneUteis');
                    setIsModalVisible(false);
                  }}
                >
                  <ViewIcons>
                    <Icon name="phone-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Telefones</Label>
                  </ViewLabel>
                </Card>
              </Linha>
              <Linha>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    Linking.openURL('mailto:contato.hommy@gmail.com');
                  }}
                >
                  <ViewIcons>
                    <Icon name="help-circle-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Ajuda</Label>
                  </ViewLabel>
                </Card>
                <Card
                  style={Estilos.card}
                  onPress={() => {
                    Linking.openURL('mailto:contato.hommy@gmail.com');
                  }}
                >
                  <ViewIcons>
                    <Icon name="heart-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabel>
                    <Label>Feedback</Label>
                  </ViewLabel>
                </Card>
              </Linha>
              <Linha>
                <CardAmigos style={Estilos.card}>
                  <ViewIcons>
                    <Icon name="account-multiple-plus-outline" color="#022250" size={35}></Icon>
                  </ViewIcons>
                  <ViewLabelAmigos>
                    <Label>Convidar amigos</Label>
                  </ViewLabelAmigos>
                  <BotesLogin>
                    <Botao transparent>
                      <Image
                        resizeMode="contain"
                        style={{ width: 16, height: 16 }}
                        source={require('../../assets/Img/Login/google.png')}
                      />
                      <LabelBotoes>Google</LabelBotoes>
                    </Botao>
                    <Botao transparent>
                      <Image
                        resizeMode="contain"
                        style={{ width: 16, height: 16 }}
                        source={require('../../assets/Img/Login/facebook.png')}
                      />
                      <LabelBotoes>Facebook</LabelBotoes>
                    </Botao>
                    <Botao transparent>
                      <Image
                        resizeMode="contain"
                        style={{ width: 18, height: 16 }}
                        source={require('../../assets/Img/Login/twitter.png')}
                        source={require('../../assets/Img/Login/twitter.png')}
                      />
                      <LabelBotoes>Twitter</LabelBotoes>
                    </Botao>
                  </BotesLogin>
                </CardAmigos>
              </Linha>
              <Linha>
                <SairdoApp style={Estilos.card} onPress={closeToken}>
                  <LabelBotaoSair>Desconectar-se</LabelBotaoSair>
                </SairdoApp>
              </Linha>
            </Menu>
          </ScrollView>
        </Container>
      </Modal>
    </View>
  );
}

const mapsStateToProps = state => {
  return {
    nome: state.user.usuario,
    email: state.user.email,
    nota: state.user.notaUser,
    idUser: state.user.idUser,
    telefone: state.user.telefone,
    fotoPerfil: state.user.fotoPerfil,
    logado: state.user.logado
  };
};

const cabecaConnect = connect(mapsStateToProps, null)(Cabeca);

export default withNavigation(cabecaConnect);
