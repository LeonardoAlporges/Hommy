import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import DetalhesAnuncio from '../../components/DetalhesAnuncio';

export default class PageAnuncio extends Component {
  static navigationOptions = { header: null };
  render() {
    return <DetalhesAnuncio />;
  }
}
