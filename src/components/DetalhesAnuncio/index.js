import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';

import { connect } from 'react-redux';

import estilo from './style';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

class DetalhesAnuncio extends Component {
  state = {
    interesse: false,
  };

  static navigationOptions = { header: null };
  AbrirUrl = () => {
    Linking.openUrl(
      'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
    );
  };

  clickInteresse() {
    this.setState({ interesse: true });
  }

  render() {
    return (
      <ScrollView>
        {this.state.interesse ? (
          <View style={estilo.V_Detalhes}>
            <CustomModal
              parametro="Custom"
              titulo="Obrigado pelo interesse"
              descricao="Você sera adicionado a uma lista de interesse e sera notificado assim que o ofertante confirme sua vaga."
              botao="Confirmar"
            />
          </View>
        ) : (
          <View />
        )}
        <ViewPager style={estilo.image} showPageIndicator="true">
          <View key="1" showPageIndicator={true}>
            <Image source={{ uri: this.props.imagem1 }} style={estilo.image} />
          </View>

          <View key="2" showPageIndicator={true}>
            <Image source={{ uri: this.props.imagem2 }} style={estilo.image} />
          </View>
          <View key="4" showPageIndicator={true}>
            <Image source={{ uri: this.props.imagem3 }} style={estilo.image} />
          </View>
        </ViewPager>

        <View style={estilo.V_titulo}>
          <Text style={estilo.titulo}>{this.props.nomeRepublica}</Text>
        </View>

        <View style={estilo.V_descricao}>
          <Text style={estilo.descricao}>{this.props.descricao}</Text>
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
            <Icon name="home" style={estilo.icone} />
            <Text style={estilo.txtlabel}>Apartamento</Text>
          </View>
          <View style={estilo.item}>
            <Icon name="people" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.genero}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Acomodações</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="drawer" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.acomodacaoQuarto}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Utensilios</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="screen-desktop" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              {this.props.acomodacaoRepublica}
            </Text>
          </View>
        </View>

        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Disponibilidade</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="user-follow" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.numVagas} Vagas</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Localização</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="location-pin" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              {this.props.rua},{this.props.bairro}, Nº
              {this.props.numeroCasa}
            </Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Representante</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="user" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.representante}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Valor médio das contas</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="chart" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.valorContas}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Valor Aluguel</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon2 name="dollar" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.valor}</Text>
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
            <Icon2 name="whatsapp" style={estilo.iconWhatsapp} />
            <Text style={estilo.txtWhatsapp}>Tenho Interesse</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapsStateToProps = state => {
  return {
    nomeRepublica: state.auth.nomeRepublica,
    genero: state.auth.genero,
    valor: state.auth.valorAluguel,
    valorContas: state.auth.valorContas,
    rua: state.auth.rua,
    numeroCasa: state.auth.numeroCasa,
    representante: state.auth.representante,
    bairro: state.auth.bairro,
    pessoas: state.auth.pessoas1,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    numVagas: state.auth.numVagas,
  };
};

const connectDetalails = connect(
  mapsStateToProps,
  null
)(DetalhesAnuncio);

export default withNavigation(connectDetalails);
