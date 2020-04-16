import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Icon,
  Input,
  Fab,
  Item,
  Button,
  Container,
  Header,
  Spinner,
  Tabs,
  Tab,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

import estilo from './style';

import Cabeca from '../../components/Cabeca';
import Republica from '../../components/Republica';
import Servicos from '../Servicos';
import { date } from 'yup';

class TabsHeader extends Component {
  static navigationOptions = { header: null };
  state = {
    loading: true,
  };
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Cabeca />

        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#1DA1F2' }}>
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
              <Text>OK</Text>
            )}
            <Republica style={estilo.card} navigation />
            <Fab
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: 'rgba(29,161,242,1)' }}
              position="bottomRight"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              <Icon name="md-add" />
            </Fab>
          </Tab>
          <Tab
            heading="Serviços"
            initialPage="2"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Servicos />
            <Fab
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: 'rgba(29,161,242,1)' }}
              position="bottomRight"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              <Icon name="md-add" />
            </Fab>
          </Tab>
          <Tab
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
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default withNavigation(TabsHeader);
