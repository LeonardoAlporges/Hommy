import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import HeaderBack from '../../components/CustomHeader';

import { connect } from 'react-redux';

import estilo from './style';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';

class DetalhesAnuncio extends Component {
  state = {
    interesse: this.props.navigation.state.params.interessado,
    page1: false,
    page2: false,
    page3: false,
    desativarBotaoAgenda: this.props.navigation.state.params.desativarBotaoAgenda,
  };

  static navigationOptions = { header: null };
  AbrirUrl = () => {
    Linking.openUrl('https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849');
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  clickInteresse = () => {
    this.props.navigation.navigate('Agendar', {
      data: this.props,
    });
  };

  renderDotIndicator() {
    this.contadorImagem = 0;
    if (this.props.imagem1 != '') {
      this.contadorImagem = this.contadorImagem + 1;
    }
    if (this.props.imagem2 != '') {
      this.contadorImagem = this.contadorImagem + 1;
    }
    if (this.props.imagem3 != '') {
      this.contadorImagem = this.contadorImagem + 1;
    }

    return (
      <PagerDotIndicator
        dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        selectedDotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        pageCount={this.contadorImagem}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <HeaderBack ajuda title={this.props.nomeRepublica} onNavigation={() => this.navegar()} />
        <IndicatorViewPager style={{ height: 300 }} indicator={this.renderDotIndicator()}>
          {this.props.imagem1 != '' &&(
            <View key="1">
              <Image source={{ uri: this.props.imagem1 }} style={estilo.image} />
            </View>
          )}
          {this.props.imagem2 != '' && (
            <View key="2">
              <Image source={{ uri: this.props.imagem2 }} style={estilo.image} />
            </View>
          )}
          {this.props.imagem3 != '' && (
            <View key="3">
              <Image source={{ uri: this.props.imagem3 }} style={estilo.image} />
            </View>
          )}
        </IndicatorViewPager>

        <View style={estilo.V_titulo}>
          <Text style={estilo.titulo}>{this.props.nomeRepublica}</Text>
        </View>

        <View style={estilo.V_descricao}>
          <Text style={estilo.descricao}>{this.props.descricao}</Text>
        </View>
        <View style={estilo.barra} />

        <View style={estilo.V_caracteristicaTitle}>
          <Text style={estilo.caracteristicaTitle}>Características</Text>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Tipo</Text>
        </View>
        <View style={estilo.V_caracteristicaItens}>
          <View style={estilo.item}>
            <Icon name="home" style={estilo.icone} />
            <Text style={estilo.txtlabel4}>{this.props.imovel}</Text>
          </View>
          <View style={estilo.item2}>
            <Icon name="people" style={estilo.icone} />
            <Text style={estilo.txtlabelGenero}>{this.props.genero}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Mobília do quarto</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="drawer" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.acomodacaoQuarto}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Mobília e eletrodomésticos</Text>
        </View>
        <View style={estilo.V_caracteristicaAcomodacao}>
          <View style={estilo.itemAcomodacao}>
            <Icon name="screen-desktop" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.acomodacaoRepublica}</Text>
          </View>
        </View>

        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Disponibilidade</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="user-follow" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.numVagas} Vaga(s)</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Endereço</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon name="location-pin" style={estilo.icone} />
            <Text style={estilo.txtlabel}>
              {this.props.rua}, {this.props.bairro}, Nº
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
            <Text style={estilo.txtlabel}>R$ {this.props.valorConta}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Valor Aluguel</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon2 name="dollar-sign" style={estilo.icone} />
            <Text style={estilo.txtlabel}>R$ {this.props.valorAluguel}</Text>
          </View>
        </View>
        <View style={estilo.V_tipo}>
          <Text style={estilo.tipo}>Aceita animais?</Text>
        </View>
        <View style={estilo.V_vagas}>
          <View style={estilo.vagas}>
            <Icon4 name="md-paw" style={estilo.icone} />
            <Text style={estilo.txtlabel}>{this.props.animal}</Text>
          </View>
        </View>
        {!this.state.interesse && !this.state.desativarBotaoAgenda ? (
          <View style={estilo.V_botao}>
            <Button
              style={estilo.botao}
              onPress={() => {
                this.clickInteresse();
              }}
            >
              <Text style={estilo.txtWhatsapp}>Agendar uma visita</Text>
            </Button>
          </View>
        ) : (
          <View style={{ height: 30 }} />
        )}
      </ScrollView>
    );
  }
}

const mapsStateToProps = state => {
  return {
    nomeRepublica: state.auth.nomeRepublica,
    genero: state.auth.genero,
    valorAluguel: state.auth.valorAluguel,
    valorConta: state.auth.valorContas,
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
    userEmail: state.auth.userEmail,
    idRepublica: state.auth.idRepublica,
    imovel: state.auth.tipoImovel,
  };
};

const connectDetalails = connect(
  mapsStateToProps,
  null
)(DetalhesAnuncio);

export default withNavigation(connectDetalails);
