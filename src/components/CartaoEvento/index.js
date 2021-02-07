import moment from 'moment';
import 'moment/locale/br';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

function CartaoEvento(props) {
  const [data, setDataViagem] = useState(moment(props.dados.data).format('DD/MM'));
  const [hora, sethoraSaida] = useState(moment(new Date(props.dados.hora)).format('HH:mm'));

  function onClickCard() {
    const dados = props.dados;
    props.navigation.navigate('DetalhesEvento', { dados });
  }

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        paddingBottom: 20
      }}
    >
      <TouchableOpacity
        onPress={onClickCard}
        style={{
          marginVertical: 8,
          width: '100%',
          height: 225,
          backgroundColor: '#F8f8f8',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15
        }}
      >
        <View style={{ width: '100%', height: 130, paddingHorizontal: 1 }}>
          <Image style={{ width: '100%', height: 130, borderRadius: 10 }} source={{ uri: props.dados.imagem1 }} />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            height: 90
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontFamily: 'Roboto' }} numberOfLines={1}>
              {props.dados.titulo}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 3, marginTop: 5 }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="calendar" />
            <Text>
              Dia {data} as {hora}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="pin" />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', color: '' }}>Parque de exposição de Alegre - ES</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default withNavigation(CartaoEvento);
