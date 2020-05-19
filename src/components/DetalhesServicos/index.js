import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Button, Card, CardItem, Body, Header, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { selecionarItem } from '../../actions/DetalhesActions';
import estilo from './style';
import Cabeca from '../Cabeca';

class DetalhesServicos extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Cabeca />
        <ScrollView>
          <ScrollView
            style={{ display: 'flex', flexDirection: 'row' }}
            horizontal={true}
          >
            <Image
              source={{
                uri:
                  'https://instagram.fsdu2-2.fna.fbcdn.net/v/t51.2885-15/e35/70186074_449432685722178_8774801877740762157_n.jpg?_nc_ht=instagram.fsdu2-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=3_hBaB4Uz-QAX_OdVa2&oh=2266ace61102deb4c3a4ff01510ee57a&oe=5EA25BA3',
              }}
              style={estilo.image}
            />
            <Image
              source={{
                uri:
                  'https://instagram.fsdu2-2.fna.fbcdn.net/v/t51.2885-15/e35/66251420_103613130878096_5640180059736136787_n.jpg?_nc_ht=instagram.fsdu2-2.fna.fbcdn.net&_nc_cat=108&_nc_ohc=6j6Bgwvn-IsAX8GkYlH&oh=2b7347ab5a3592c1627050125fabba8d&oe=5EA59887',
              }}
              style={estilo.image}
            />
            <Image
              source={{
                uri:
                  'https://instagram.fsdu2-1.fna.fbcdn.net/v/t51.2885-15/e35/54447070_220023068953742_2108633359996928040_n.jpg?_nc_ht=instagram.fsdu2-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=GThzDaEon3gAX8p8YQQ&oh=7ca15cb8f2f907057d94bb4180273017&oe=5EA60450',
              }}
              style={estilo.image}
            />
          </ScrollView>

          <View style={estilo.V_titulo}>
            <Text style={estilo.titulo}>Paula Professora</Text>
          </View>

          <View style={estilo.V_descricao}>
            <Text style={estilo.descricao}>
              Formada em Matematica e Quimica e atulamte professora da UFES. Dou
              aula particulares de Calculo e Geometria analitica{' '}
            </Text>
          </View>
          <View style={estilo.barra} />

          <View style={estilo.V_tipo}>
            <View style={estilo.V_tituloTipo}>
              <Text style={estilo.fontTitulo}>Contato</Text>
            </View>
            <View style={estilo.conteudo}>
              <Icon name="md-call" />
              <Text style={{ marginHorizontal: '5%' }}>(28)4002-8922</Text>
            </View>
          </View>
          <View style={estilo.V_tipo}>
            <View style={estilo.V_tituloTipo}>
              <Text style={estilo.fontTitulo}>Horario de Atendimento</Text>
            </View>
            <View style={estilo.conteudo}>
              <Icon name="ios-calendar" />
              <Text style={{ marginHorizontal: '5%' }}>
                Segunda a Sexta 08:00 as 18:00
              </Text>
            </View>
          </View>
          <View style={estilo.V_tipo}>
            <View style={estilo.V_tituloTipo}>
              <Text style={estilo.fontTitulo}>Tipo de serviço</Text>
            </View>
            <View style={estilo.conteudo}>
              <Icon name="ios-build" />
              <Text style={{ marginHorizontal: '5%' }}>
                Professora particular
              </Text>
            </View>
          </View>
          <Button
            style={estilo.botao}
            onPress={() => {
              alert(
                'Em breve aqui voce sera redirecionado para a tela de discagem de seu celular :)'
              );
            }}
          >
            <Icon name="ios-call" style={estilo.contato} />
            <Text style={estilo.contato}>
              Entrar em Contato
            </Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(DetalhesServicos);
