import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View, Alert } from 'react-native';
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
  editNome,
  editNota,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Estilos from './style';
import { Button } from 'native-base';

class CartaoCarona extends Component {
  Click = () => {
    const dados = this.props.dados;
    console.tron.log(dados);
    this.props.editNome(dados.nome);
    this.props.editChegada(dados.localChegada);
    this.props.editData(dados.data);
    this.props.editDesembarque(dados.desembarque);
    this.props.editEmbarque(dados.embarque);
    this.props.editHChegada(dados.horaChegada);
    this.props.editHSaida(dados.horaSaida);
    this.props.editImagem(dados.imagem);
    this.props.editNota(dados.nota);
    this.props.editSaida(dados.localSaida);
    this.props.editVagas(dados.vagas);
    this.props.editValor(dados.valor);
    this.props.navigation.navigate('DetalhesCarona');
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
            <Text>{this.props.dados.nome}</Text>
            <View style={Estilos.V_nota}>
              <Icon name="settings-outline" style={Estilos.icon} />
              <Text>{this.props.dados.nota}.3</Text>
            </View>
          </View>
          <View style={Estilos.V_local}>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcSa}>
                {this.props.dados.horaSaida}
              </Text>
              <Icon name="car-sports" style={Estilos.iconDesSa} />
              <Text style={Estilos.txtdeslcSa}>
                {this.props.dados.localSaida}
              </Text>
            </View>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcCh}>
                {this.props.dados.horaChegada}
              </Text>
              <Icon name="flag-checkered" style={Estilos.iconDesCh} />
              <Text style={Estilos.txtdeslcCh}>
                {this.props.dados.localChegada}
              </Text>
            </View>
          </View>
          <View style={Estilos.V_DataVal}>
            <View style={Estilos.Data}>
              <Text style={Estilos.txtData}>{this.props.dados.data}</Text>
            </View>
            <View style={Estilos.Valor}>
              <Text style={Estilos.txtvalor}>
                R$ {this.props.dados.valor},00
              </Text>
            </View>
          </View>
        </View>
      </Button>
    );
  }
}

const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    nomeRepublica: state.auth.nomeRepublica,
    valorAluguel: state.auth.valorAluguel,
    bairro: state.auth.bairro,
    pessoas: state.auth.pessoas1,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    valorContas: state.auth.valorContas,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    numVagas: state.auth.numVagas,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
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
    editNome,
    editNota,
    editSaida,
    editVagas,
    editValor,
  }
)(CartaoCarona);

export default withNavigation(CartaoCaronaConnect);
