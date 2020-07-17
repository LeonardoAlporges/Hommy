import React, { Component } from 'react';
import { Image, Text, View, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import 'moment/locale/br';
import {
  editIdCarona,
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
  editEmailOfertante,
} from '../../actions/CaronaActions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Estilos from './style';
import { Button } from 'native-base';

class CartaoCarona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: moment(this.props.dados.data).format('DD/MM'),
      horaSaida: moment(new Date(this.props.dados.horaSaida)).format('HH:mm'),
      horaChegada: moment(new Date(this.props.dados.horaChegada)).format('HH:mm'),
    };
  }

  Click = () => {
    const dados = this.props.dados;
    this.props.editIdCarona(dados._id);
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
    this.props.editEmailOfertante(dados.userEmail);
    var desativarBotaoInteresse = false;

    if (dados.userEmail == this.props.email) {
      desativarBotaoInteresse = true;
    }
    this.props.navigation.navigate('DetalhesCarona', { desativarBotaoInteresse });
  };

  render() {
    return (
      <Button transparent underlayColor="#fff" onPress={this.Click} style={Estilos.touch_card}>
        <View style={Estilos.V_cartao}>
          <View style={Estilos.V_ImgNome}>
            <View style={Estilos.V_imagem}>
              <Image source={{ uri: this.props.dados.imagem }} style={Estilos.imagem} />
            </View>
            <Text style={Estilos.txtnome}>{this.props.dados.nome}</Text>
            <View style={Estilos.V_nota}>
              <Text> {this.props.dados.nota} </Text>
              <Icon name="star" style={Estilos.icon} />
            </View>
          </View>
          <View style={Estilos.V_local}>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcSaHora}>{this.state.horaSaida}</Text>
              <Icon name="action-redo" style={Estilos.txtIcon} />
              <View style={Estilos.V_TxtSaida}>
                <Text numberOfLines={2} style={Estilos.txtdeslcSa}>
                  {this.props.dados.localSaida}
                </Text>
              </View>
            </View>
            <View style={Estilos.V_LocLabel}>
              <Text style={Estilos.txtdeslcChHora}>{this.state.horaChegada}</Text>
              <Icon name="flag" style={Estilos.txtIcon} />
              <Text style={Estilos.txtdeslcCh}>{this.props.dados.localChegada}</Text>
            </View>
          </View>
          <View style={Estilos.V_DataVal}>
            <View style={Estilos.Data}>
              <Icon style={Estilos.txtIcon} name="event" />
              <Text style={Estilos.txtData}>{this.state.data}</Text>
            </View>
            <View style={Estilos.Valor}>
              <Icon2 style={Estilos.txtIcon} name="dollar-sign" />
              <Text style={Estilos.txtvalor}>R$ {this.props.dados.valor}</Text>
            </View>
          </View>
        </View>
      </Button>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};
const CartaoCaronaConnect = connect(
  mapStateToProps,
  {
    editIdCarona,
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
    editEmailOfertante,
  }
)(CartaoCarona);

export default withNavigation(CartaoCaronaConnect);
