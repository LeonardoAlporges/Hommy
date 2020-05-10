import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Fab, Button, Container, Spinner, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {
  editValorAluguel,
  editNomeRepublica,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumero,
  editTipoImovel,
} from '../../actions/AuthActions';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editNome,
  editNota,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';
import { withNavigation } from 'react-navigation';

import estilo from './style';
import CustomModal from '../../components/Alert';
import Cabeca from '../../components/Cabeca';
import Republica from '../../components/Republica';
import Caronas from '../Caronas';

class TabsHeader extends Component {
  static navigationOptions = { header: null };

  limparPropsRepublicaRedux() {
    this.props.editValorConta('');
    this.props.editNomeRepublica('');
    this.props.editValorAluguel('');
    this.props.editBairro('');
    this.props.editRua('');
    this.props.editNumero('');
    this.props.editPessoas('');
    this.props.editAnimal('');
    this.props.editDescricao('');
    this.props.editAcomodacaoQuarto('');
    this.props.editAcomodacaoRepublica('');
    this.props.editObservacao('');
    this.props.editGenero('');
    this.props.editNumVagas('');
    this.props.editRepresentante('');
    this.props.editImg1('');
    this.props.editImg2('');
    this.props.editImg3('');
    this.props.editTipoImovel('');

    this.props.navigation.navigate('Cadastro', { update: false });
  }

  limparPropsCaronaRedux() {
    this.props.editChegada(''),
      this.props.editData(''),
      this.props.editDesembarque(''),
      this.props.editEmbarque(''),
      this.props.editHChegada(''),
      this.props.editHSaida(''),
      this.props.editImagem(''),
      this.props.editNome(''),
      this.props.editNota(''),
      this.props.editSaida(''),
      this.props.editVagas(''),
      this.props.editValor('');

    this.props.navigation.navigate('CadastroCaronas', {
      update: false,
    });
  }
  state = {
    loading: true,
    active: false,
  };
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Cabeca />

        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: '#1DA1F2', height: 3 }}
          tabContainerStyle={{ height: 45 }}
        >
          <Tab
            heading="Republica"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spinner color="rgba(29,161,242,1)" />
              </View>
            ) : (
              <View />
            )}
            <Republica style={estilo.card} navigation />
            {this.state.erro ? <CustomModal parametro="Erro" /> : <View />}
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: 'rgba(29,161,242,1)' }}
              position="bottomRight"
              onPress={() => {
                this.setState({ active: !this.state.active });
              }}
            >
              {this.state.active ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrow-up" />
              )}

              <Button style={{ backgroundColor: 'rgba(29,161,242,1)' }}>
                <Icon name="equalizer" style={{ color: '#ffffff' }} />
              </Button>
              <Button
                style={{ backgroundColor: 'rgba(29,161,242,1)' }}
                onPress={() => {
                  this.limparPropsRepublicaRedux();
                }}
              >
                <Icon name="pencil" style={{ color: '#ffffff' }} />
              </Button>
            </Fab>
          </Tab>
          <Tab
            heading="Caronas"
            initialPage="2"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            {this.state.loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spinner color="rgba(29,161,242,1)" />
              </View>
            ) : (
              <View />
            )}
            <Caronas />
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: 'rgba(29,161,242,1)' }}
              position="bottomRight"
              onPress={() => {
                this.setState({ active: !this.state.active });
                //this.limparPropsCaronaRedux();
              }}
            >
              {this.state.active ? (
                <Icon name="arrow-down" />
              ) : (
                <Icon name="arrow-up" />
              )}

              <Button
                style={{
                  backgroundColor: 'rgba(29,161,242,1)',
                }}
              >
                <Icon name="equalizer" style={{ color: '#ffffff' }} />
              </Button>
              <Button
                style={{ backgroundColor: 'rgba(29,161,242,1)' }}
                onPress={() => {
                  this.limparPropsCaronaRedux();
                }}
              >
                <Icon name="pencil" style={{ color: '#ffffff' }} />
              </Button>
            </Fab>
          </Tab>
          {/* <Tab
            heading="Eventos"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <View style={estilo.content}>
              <View>
                <View>
                  <LoginButton
                    onLoginFinished={(error, result) => {
                      console.log('leo', result);
                      if (error) {
                        console.log('login has error: ' + result.error);
                      } else if (result.isCancelled) {
                        console.log('login is cancelled.');
                      } else {
                        AccessToken.getCurrentAccessToken().then(data => {
                          console.log('leo2', data);
                          console.log(data.accessToken.toString());
                        });
                      }
                    }}
                    onLogoutFinished={() => console.log('logout.')}
                  />
                </View>
              </View>
              <View style={estilo.empty}>
                <Image
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Imagens%2Fempty_state.gif?alt=media&token=da0384c2-b981-49f4-9c79-b7e7ab9ad19b',
                  }}
                  style={{ width: 200, height: 200 }}
                />
                <Text style={estilo.empty_titulo}>
                  Funcinalidade em produçao
                </Text>
                <Text style={estilo.empty_sub}>
                  Desculpe as pessoas que fariam essa tela estao com Coronga
                  Virus
                </Text>
              </View>
            </View>
          </Tab> */}
        </Tabs>
      </Container>
    );
  }
}

const TabsConnect = connect(
  null,
  {
    editTipoImovel,
    editValorAluguel,
    editNomeRepublica,
    editBairro,
    editPessoas,
    editDescricao,
    editAnimal,
    editAcomodacaoQuarto,
    editAcomodacaoRepublica,
    editValorConta,
    editObservacao,
    editImg1,
    editImg2,
    editImg3,
    editGenero,
    editNumVagas,
    editRepresentante,
    editRua,
    editNumero,
    editChegada,
    editData,
    editDesembarque,
    editEmbarque,
    editHChegada,
    editHSaida,
    editImagem,
    editNome,
    editNota,
    editSaida,
    editVagas,
    editValor,
  }
)(TabsHeader);

export default withNavigation(TabsConnect);
