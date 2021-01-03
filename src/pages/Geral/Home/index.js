import React, { useEffect, useState } from 'react';
import { StatusBar, View, Linking } from 'react-native';
import { Container, Tabs, Tab, Footer, FooterTab, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Cabeca from '../../../components/Cabeca';
import Republica from '../../Republica/Republica';
import Caronas from '../../Carona/Caronas';
import Servicos from '../../Servicos/Servicos';
import Divulgacao from '../Divulgacao';

import { BotaoFooter, Icone, Label } from './style';
import estilo from './style';

function TabsHeader({ navigation }) {
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);

  function alterarTela(number) {
    setPage(number);
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
          {page === 1 && <Republica style={estilo.card} />}
          {page === 2 && <Divulgacao />}
          {page === 3 && <Divulgacao />}
          <Footer
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24
            }}
          >
            <FooterTab style={{ borderTopWidth: 1, borderTopColor: '#2e2e2e' }}>
              <BotaoFooter
                active={page === 1 ? true : false}
                onPress={() => {
                  alterarTela(1);
                }}
              >
                <Icone active={page === 1 ? true : false} name="home" />
                <Label active={page === 1 ? true : false}>Anuncios</Label>
              </BotaoFooter>
              <BotaoFooter
                active={page === 2 ? true : false}
                onPress={() => {
                  alterarTela(2);
                }}
              >
                <Icone active={page === 2 ? true : false} name="calendar" />
                <Label active={page === 2 ? true : false}>Eventos</Label>
              </BotaoFooter>
              <BotaoFooter
                active={page === 3 ? true : false}
                onPress={() => {
                  alterarTela(3);
                }}
              >
                <Icone active={page === 3 ? true : false} name="cart-outline" />
                <Label active={page === 3 ? true : false}> Compra e venda</Label>
              </BotaoFooter>
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
        {/* <Tab
          heading="Promoções"
          initialPage="2"
          tabStyle={estilo.tabs_style}
          textStyle={estilo.tabs_TextStyle}
          activeTabStyle={estilo.tabs_ActiveTabs}
          activeTextStyle={estilo.tabs_ActiveTextStyle}
        >
          <Divulgacao />
        </Tab>*/}
      </Tabs>
    </Container>
  );
}

export default withNavigation(TabsHeader);
