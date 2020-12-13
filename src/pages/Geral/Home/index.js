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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import estilo from './style';

function TabsHeader({ navigation }) {
  const [index, setIndex] = useState(1);

  function alterarTela(number) {
    setIndex(number);
  }

  return (
    // <Container>
    //   <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    //   <Cabeca />

    //   <Tabs
    //     initialPage={0}
    //     tabBarUnderlineStyle={{ backgroundColor: '#142850', height: 3 }}
    //     tabContainerStyle={{ height: 45 }}
    //   >
    //     <Tab
    //       heading="Repúblicas"
    //       tabStyle={estilo.tabs_style}
    //       textStyle={estilo.tabs_TextStyle}
    //       activeTabStyle={estilo.tabs_ActiveTabs}
    //       activeTextStyle={estilo.tabs_ActiveTextStyle}
    //     >
    //       <Republica style={estilo.card} />
    //     </Tab>
    //     <Tab
    //       heading="Caronas"
    //       initialPage="2"
    //       tabStyle={estilo.tabs_style}
    //       textStyle={estilo.tabs_TextStyle}
    //       activeTabStyle={estilo.tabs_ActiveTabs}
    //       activeTextStyle={estilo.tabs_ActiveTextStyle}
    //     >
    //       <Caronas />
    //     </Tab>
    //     {/* <Tab
    //         heading="Serviços"
    //         initialPage="2"
    //         tabStyle={estilo.tabs_style}
    //         textStyle={estilo.tabs_TextStyle}
    //         activeTabStyle={estilo.tabs_ActiveTabs}
    //         activeTextStyle={estilo.tabs_ActiveTextStyle}
    //       >
    //         <Servicos />
    //       </Tab>
    //       <Tab
    //         heading="Promoções"
    //         initialPage="2"
    //         tabStyle={estilo.tabs_style}
    //         textStyle={estilo.tabs_TextStyle}
    //         activeTabStyle={estilo.tabs_ActiveTabs}
    //         activeTextStyle={estilo.tabs_ActiveTextStyle}
    //       >
    //         <Divulgacao />
    //       </Tab> */}
    //   </Tabs>
    // </Container>
    <View style={estilo.container}>
      <Button
        style={{ width: '100%', height: '30%' }}
        onPress={() =>
          Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=-20.76698470734127,-41.53869791886807`)
        }
      ></Button>

      {/* <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={estilo.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      ></MapView> */}
    </View>
  );
}

export default withNavigation(TabsHeader);
