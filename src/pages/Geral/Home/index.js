import React, { Component } from 'react';
import { View, Text, StatusBar, BackHandler, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Fab, Button, Container, Spinner, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { withNavigation } from 'react-navigation';

import estilo from './style';
import Cabeca from '../../../components/Cabeca';
import Republica from '../../Republica/Republica';
import Caronas from '../../Carona/Caronas';
import Servicos from '../../Servicos';
import Divulgacao from '../Divulgacao';

class TabsHeader extends Component {
  static navigationOptions = { header: null, headerLeft: null };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      active: false,
    };
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Cabeca />

        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: '#142850', height: 3 }}
          tabContainerStyle={{ height: 45 }}
        >
          <Tab
            heading="Repúblicas"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Republica style={estilo.card} />
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
          <Tab
            heading="Serviços"
            initialPage="2"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Servicos />
          </Tab>
          <Tab
            heading="Promoções"
            initialPage="2"
            tabStyle={estilo.tabs_style}
            textStyle={estilo.tabs_TextStyle}
            activeTabStyle={estilo.tabs_ActiveTabs}
            activeTextStyle={estilo.tabs_ActiveTextStyle}
          >
            <Divulgacao />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default withNavigation(TabsHeader);
