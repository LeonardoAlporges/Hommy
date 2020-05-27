import React, { Component } from 'react';
import { Image, Text, View, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editNomeOfertante,
  editNotaCarona,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Estilos from './style';
import { Button } from 'native-base';
const moment = require('moment');

class CartaoCarona extends Component {
  Click = () => {
    const dados = this.props.dados;

    this.props.editNomeOfertante(dados.nome);
    this.props.editChegada(dados.localChegada);
    this.props.editData(dados.data);
    this.props.editDesembarque(dados.desembarque);
    this.props.editEmbarque(dados.embarque);
    this.props.editHChegada(dados.horaChegada);
    this.props.editHSaida(dados.horaSaida);
    this.props.editImagem(dados.imagem);
    this.props.editNotaCarona(dados.nota);
    this.props.editSaida(dados.localSaida);
    this.props.editVagas(dados.vagas);
    this.props.editValor(dados.valor);
    this.props.navigation.navigate('DetalhesCarona');
  };

  state = {
    data: moment(this.props.dados.data).format('DD/MM')
  };

  render() {
    return (
      <Button
        transparent
        underlayColor="#fff"
        onPress={this.Click}
        style={Estilos.touch_card}
      >
        <View style={Estilos.V_cartao}>
          <View style={Estilos.V_ImgNome}>
            <View style={Estilos.V_imagem}>
              <Image
                source={{ uri: this.props.dados.imagem }}
                style={Estilos.imagem}
              />
            </View>
            <Text style={Estilos.txtnome}>{this.props.dados.nome}</Text>
            <View style={Estilos.V_nota}>
              <Icon name="star" style={Estilos.icon} />
              <Text> {this.props.dados.nota}</Text>
            </View>
          </View>
          <View style={Estilos.V_local}>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcSaHora}>
                {this.props.dados.horaSaida}
              </Text>
              <Icon name="action-redo" style={Estilos.txtIcon} />
              <Text style={Estilos.txtdeslcSa}>
                {this.props.dados.localSaida}
              </Text>
            </View>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcChHora}>
                {this.props.dados.horaChegada}
              </Text>
              <Icon name="flag" style={Estilos.txtIcon} />
              <Text style={Estilos.txtdeslcCh}>
                {this.props.dados.localChegada}
              </Text>
            </View>
          </View>
          <View style={Estilos.V_DataVal}>
            <View style={Estilos.Data}>
              <Icon style={Estilos.txtIcon} name="event" />
              <Text style={Estilos.txtData}>{this.state.data}</Text>
            </View>
            <View style={Estilos.Valor}>
              <Icon style={Estilos.txtIcon} name="wallet" />
              <Text style={Estilos.txtvalor}>R$ {this.props.dados.valor}</Text>
            </View>
          </View>
        </View>
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const CartaoCaronaConnect = connect(
  null,
  {
    editChegada,
    editData,
    editDesembarque,
    editEmbarque,
    editHChegada,
    editHSaida,
    editImagem,
    editNomeOfertante,
    editNotaCarona,
    editSaida,
    editVagas,
    editValor,
  }
)(CartaoCarona);

export default withNavigation(CartaoCaronaConnect);
