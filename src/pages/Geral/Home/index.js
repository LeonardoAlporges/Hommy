import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
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
    <View style={estilo.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={estilo.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      ></MapView>
    </View>
  );
}

export default withNavigation(TabsHeader);
