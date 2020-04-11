import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import { Button, Card, CardItem, Body, Header } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { selecionarItem } from '../../actions/DetalhesActions';
import estilo from './style';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DetalhesAnuncio extends Component {
  AbrirUrl = () => {
    Linking.openUrl(
      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
    );
  };
  render() {
    return (
      <ScrollView style={{ marginBottom: 55 }}>
        <ViewPager style={estilo.image} showPageIndicator="true">
          <View key="1" showPageIndicator={true}>
            <Image source={{ uri: this.props.image }} style={estilo.image} />
          </View>

          <View key="2" showPageIndicator={true}>
            <Image source={{ uri: this.props.image }} style={estilo.image} />
          </View>
          <View key="4" showPageIndicator={true}>
            <Image source={{ uri: this.props.image }} style={estilo.image} />
          </View>
        </ViewPager>

        <View style={estilo.V_titulo}>
          <Text style={estilo.titulo}>{this.props.titulo}</Text>
        </View>

        <View style={estilo.V_descricao}>
          <Text style={estilo.descricao}>{this.props.desc}</Text>
        </View>
        <View style={estilo.barra} />

        <View style={estilo.V_caracteristicaTitle}>
          <Text style={estilo.caracteristicaTitle}>Caracteristicas</Text>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Tipo</Text>
        </View>
        <View style={estilo.V_caracteristicaItens}>
          <View style={estilo.item}>
            <Icon name="home-outline" style={estilo.icone} />
            <Text style={estilo.txtlabel}>Apartamento</Text>
          </View>
          <View style={estilo.item}>
            <Icon name="gender-transgender" style={estilo.icone} />
            <Text style={estilo.txtlabel}>Masculina</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Acomodações</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="sofa" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              3 Camas,1 Suite, 1 Televisao, Wifi, Banheiro, Sala, Cozinha, Area
              de serviço
            </Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Utensilios</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="television-classic" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              Geladeira, Fogao, Maquina de Lavar, Varal, Microondas, Panelas
            </Text>
          </View>
        </View>

        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Disponibilidade</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="account-group-outline" style={estilo.icone} />
            <Text style={estilo.txtlabel}>4 Vagas</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Localização</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="map-marker-outline" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              R. Anísio Fernandes Coelho, Alegre, ES
            </Text>
          </View>
        </View>
        <View style={estilo.V_botao}>
          <Button
            style={estilo.botao}
            onPress={() => {
              Linking.openURL(
                'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
              );
            }}
          >
            <Icon name="whatsapp" style={{ color: '#ffffff', fontSize: 30 }} />
            <Text style={{ color: '#FFFFFF', paddingRight: 15 }}>ZipZop</Text>
          </Button>
          <Button
            style={estilo.botao}
            onPress={() => {
              Linking.openURL(`tel:${+5527997488849}`);
            }}
          >
            <Icon
              name="phone-outline"
              style={{ color: '#ffffff', fontSize: 30, marginRight: 5 }}
            />
            <Text style={{ color: '#FFFFFF', paddingRight: 15 }}>
              Contatinho
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapsStateToProps = state => {
  return {
    titulo: state.auth.titulo,
    valor: state.auth.valor,
    bairro: state.auth.bairro,
    pessoas: state.auth.pessoas,
    desc: state.auth.desc,
    animal: state.auth.animal,
    movelQuarto: state.auth.movelQuarto,
    moveisComun: state.auth.moveisComun,
    valorContas: state.auth.valorContas,
    observacao: state.auth.observacao,
    imagem: state.auth.imagem,
  };
};

const connectDetalails = connect(
  mapsStateToProps,
  null
)(DetalhesAnuncio);

export default withNavigation(connectDetalails);
