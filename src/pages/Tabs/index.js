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
        </Tabs>
      </Container>
    );
  }
}

export default withNavigation(TabsHeader);
