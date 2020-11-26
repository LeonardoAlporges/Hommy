import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Container, Tabs, Tab, Footer, FooterTab, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Cabeca from '../../../components/Cabeca';
import Republica from '../../Republica/Republica';
import Caronas from '../../Carona/Caronas';
import Servicos from '../../Servicos/Servicos';
import Divulgacao from '../Divulgacao';

import estilo from './style';

function TabsHeader({ navigation }) {
  const [index, setIndex] = useState(1);

  function alterarTela(number) {
    setIndex(number);
  }

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
          {index == 1 && <Republica></Republica>}
          {index == 2 && <Caronas></Caronas>}
          {index == 3 && <Divulgacao></Divulgacao>}
          <Footer style={{}}>
            <FooterTab
              style={{
                backgroundColor: '#fff',
                borderTopWidth: 1,
                borderTopColor: '#DCDCDC'
              }}
            >
              <Button
                style={{
                  flex: 1,
                  height: '90%',
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  borderRightWidth: 1,
                  borderRightColor: '#DCDCDC'
                }}
                vertical
                active={false}
                onPress={() => {
                  alterarTela(1);
                }}
              >
                <Icon style={{ fontSize: 22, color: '#142850' }} name="home-outline"></Icon>
                <Text uppercase={false} style={{ color: '#142850', fontFamily: 'WorkSans-Bold', fontSize: 15 }}>
                  Repúblicas
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  height: '90%',
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  borderRightWidth: 1,
                  borderRightColor: '#C6C6C6'
                }}
                vertical
                active={true}
                onPress={() => {
                  alterarTela(2);
                }}
              >
                <Icon style={{ fontSize: 16, color: '#142850' }} name="monitor-cellphone"></Icon>
                <Text uppercase={false} style={{ color: '#142850', fontFamily: 'WorkSans', fontSize: 14 }}>
                  Produtos
                </Text>
              </Button>
              <Button
                style={{
                  flex: 1,
                  height: '90%',
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  borderRightWidth: 1,
                  borderRightColor: '#C6C6C6'
                }}
                vertical
                active={false}
                onPress={() => {
                  alterarTela(3);
                }}
              >
                <Icon style={{ fontSize: 16, color: '#142850' }} name="music"></Icon>
                <Text style={{ color: '#142850', fontFamily: 'WorkSans', fontSize: 14 }} uppercase={false}>
                  Eventos
                </Text>
              </Button>
            </FooterTab>
          </Footer>
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
      </Tabs>
    </Container>
  );
}

export default withNavigation(TabsHeader);
