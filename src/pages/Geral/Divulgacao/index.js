import React, { Component, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Divulgacao({ navigation }) {
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        paddingBottom: 20,
      }}
    >
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      <View
        style={{
          marginVertical: 8,
          width: '100%',
          height: 225,
          backgroundColor: '#F8f8f8',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
        }}
      >
        <View style={{ width: '100%', height: 130, paddingHorizontal: 1 }}>
          <Image
            style={{ width: '100%', height: 130, borderRadius: 10 }}
            source={{
              uri: 'https://aguiarbuenosaires.com/wp-content/uploads/2020/01/DESTACADA-EVENTOS-2020.png',
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            height: 90,
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontFamily: 'Roboto' }}>Rock in Alegre</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 3, marginTop: 5 }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="calendar" />
            <Text>Dia 03/05</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="pin" />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', color: '' }}>Parque de exposição de Alegre - ES</Text>
          </View>
        </View>
      </View>
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      <View
        style={{
          marginVertical: 8,
          width: '100%',
          height: 225,
          backgroundColor: '#F8f8f8',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
        }}
      >
        <View style={{ width: '100%', height: 130, paddingHorizontal: 1 }}>
          <Image
            style={{ width: '100%', height: 130, borderRadius: 10 }}
            source={{
              uri: 'https://bafafa.com.br/images/artigos/boteco_largo_do_machado_fachada_capa_17122018_071708.jpg',
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            height: 90,
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontFamily: 'Roboto' }}>Buteco Fest</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 3, marginTop: 5 }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="calendar" />
            <Text>Dia 18/05</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="pin" />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', color: '' }}>Rua 07 de Janeiro Alegre - ES</Text>
          </View>
        </View>
      </View>

      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      <View
        style={{
          marginVertical: 8,
          width: '100%',
          height: 225,
          backgroundColor: '#F8f8f8',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
        }}
      >
        <View style={{ width: '100%', height: 130, paddingHorizontal: 1 }}>
          <Image
            style={{ width: '100%', height: 130, borderRadius: 10 }}
            source={{
              uri: 'https://images.sympla.com.br/5e44bf77e933c-lg.jpg',
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            height: 90,
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontFamily: 'Roboto' }}>6° Calourada Geral</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 3, marginTop: 5 }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="calendar" />
            <Text>Dia 15/05</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="pin" />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', color: '' }}>Parque de exposição de Alegre - ES</Text>
          </View>
        </View>
      </View>
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      {/* SEPARAÇÂO DE CARD  */}
      <View
        style={{
          marginBottom: 20,
          marginVertical: 8,
          width: '100%',
          height: 225,
          backgroundColor: '#F8f8f8',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,

          elevation: 15,
        }}
      >
        <View style={{ width: '100%', height: 130, paddingHorizontal: 1 }}>
          <Image
            style={{ width: '100%', height: 130, borderRadius: 10 }}
            source={{
              uri: 'https://aguiarbuenosaires.com/wp-content/uploads/2020/01/DESTACADA-EVENTOS-2020.png',
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            width: '100%',
            height: 90,
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontFamily: 'Roboto' }}>Rock in Alegre</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 3, marginTop: 5 }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="calendar" />
            <Text>Dia 03/05</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon style={{ fontSize: 24, color: '#142850' }} name="pin" />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', color: '' }}>Parque de exposição de Alegre - ES</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}