import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Fab, Button, Container, Spinner, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { withNavigation } from 'react-navigation';

import estilo from './style';
import CustomModal from '../../components/Alert';
import Cabeca from '../../components/Cabeca';
import Republica from '../../components/Republica';
import Caronas from '../Caronas';

class TabsHeader extends Component {
  static navigationOptions = { header: null };

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
          tabBarUnderlineStyle={{ backgroundColor: '#27496d', height: 3 }}
          tabContainerStyle={{ height: 45 }}
        >
          <Tab
            heading="Republica"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Republica style={estilo.card} navigation />
          </Tab>
          <Tab
            heading="Caronas"
            initialPage="2"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Caronas />
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

export default withNavigation(TabsHeader);
