import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Container, Tabs, Tab } from 'native-base';
import { withNavigation } from 'react-navigation';

import Cabeca from '../../../components/Cabeca';
import Republica from '../../Republica/Republica';
import Caronas from '../../Carona/Caronas';
import Servicos from '../../Servicos/Servicos';
import Divulgacao from '../Divulgacao';

import estilo from './style';

function TabsHeader({ navigation }) {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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

export default withNavigation(TabsHeader);
