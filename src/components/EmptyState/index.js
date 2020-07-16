import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

const EmptyState = props => {
  return (
    <View style={styles.Container}>
      <Image style={styles.imagem} source={require('../../assets/Img/Empty.png')} />

      <View style={styles.V_Titutlo}>
        <Text style={styles.titulo}>{props.titulo}</Text>
      </View>
      <View style={styles.V_mensagem}>
        <Text style={styles.mensage}>{props.mensagem}</Text>
      </View>
    </View>
  );
};

export default EmptyState;
