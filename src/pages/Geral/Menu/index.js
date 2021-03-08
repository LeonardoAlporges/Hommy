import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { Image, Linking, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import Estilos, {
  Botao,
  BotesLogin,
  Card,
  CardAmigos,
  Container,
  Header,
  HeaderPrincipal,
  Icone,
  IconeMenu,
  IconVoltar,
  Label,
  LabelBotaoSair,
  LabelBotoes,
  Linha,
  Menu,
  Nome,
  SairdoApp,
  Titulo,
  TituloHeader,
  ViewDados,
  ViewFotoPerfil,
  ViewIcons,
  ViewLabel,
  ViewLabelAmigos,
  ViewNome,
  ViewNota,
  V_titulo
} from './style';

function MenuLateral({ navigation }) {
    const nome = useSelector(state => state.user.usuario);
    const fotoPerfil = useSelector(state => state.user.fotoPerfil);

    function resetNavigation(Rota) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Rota })]
        });
        navigation.dispatch(resetAction);
    }

    async function closeToken() {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user')

            .then(value => {
                resetNavigation('Login');
            })
            .catch(error => { });
    }
    return (        
            <Container>
                <Header>
                    <IconVoltar
                        onPress={() => {
                            navigation.goBack(null);
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
                                    navigation.navigate('Anuncios')
                                }}
                            >
                                <ViewIcons>
                                    <Icon name="card-text-outline" color="#212c50" size={35}></Icon>
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
                                    })                                        
                                }}
                            >
                                <ViewIcons>
                                    <Icon name="calendar-month-outline" color="#212c50" size={35}></Icon>
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
                                    navigation.navigate('Viagens')
                                }}
                            >
                                <ViewIcons>
                                    <Icon name="car" color="#212c50" size={35}></Icon>
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
                                    <Icon name="phone-outline" color="#212c50" size={35}></Icon>
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
                                    <Icon name="help-circle-outline" color="#212c50" size={35}></Icon>
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
                                    <Icon name="heart-outline" color="#212c50" size={35}></Icon>
                                </ViewIcons>
                                <ViewLabel>
                                    <Label>Feedback</Label>
                                </ViewLabel>
                            </Card>
                        </Linha>
                        <Linha>
                            <Card
                                style={Estilos.card}
                                onPress={() => {
                                    navigation.navigate('GerenciamentoDeRepublica')
                                }}
                            >
                                <ViewIcons>
                                    <Icon name="account-group-outline" color="#212c50" size={35}></Icon>
                                </ViewIcons>
                                <ViewLabel>
                                    <Label>Gerenciamento</Label>
                                </ViewLabel>
                            </Card>
                        </Linha>
                        <Linha>
                            <CardAmigos style={Estilos.card}>
                                <ViewIcons>
                                    <Icon name="account-multiple-plus-outline" color="#212c50" size={35}></Icon>
                                </ViewIcons>
                                <ViewLabelAmigos>
                                    <Label>Convidar amigos</Label>
                                </ViewLabelAmigos>
                                <BotesLogin>
                                    <Botao transparent>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 16, height: 16 }}
                                            source={require('../../../assets/Img/Login/google.png')}
                                        />
                                        <LabelBotoes>Google</LabelBotoes>
                                    </Botao>
                                    <Botao transparent>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 16, height: 16 }}
                                            source={require('../../../assets/Img/Login/facebook.png')}
                                        />
                                        <LabelBotoes>Facebook</LabelBotoes>
                                    </Botao>
                                    <Botao transparent>
                                        <Image
                                            resizeMode="contain"
                                            style={{ width: 18, height: 16 }}
                                            source={require('../../../assets/Img/Login/twitter.png')}
                                            source={require('../../../assets/Img/Login/twitter.png')}
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
    )
}
export default withNavigation(MenuLateral)