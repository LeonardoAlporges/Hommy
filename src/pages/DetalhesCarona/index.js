import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Estilo from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
// import { Container } from './styles';

class DetalhesCarona extends Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={Estilo.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack(null);
            }}
          >
            <Icon style={Estilo.iconHer} name="arrow-left" />
          </TouchableOpacity>
        </View>
        <View style={Estilo.V_HeaderUser}>
          <Image
            source={{
              uri: this.props.imagem,
            }}
            style={Estilo.V_imagem}
          />
          <View style={Estilo.V_Nome}>
            <Text style={Estilo.Nome}>{this.props.nome}</Text>
            <View style={Estilo.V_nota}>
              <Text style={Estilo.Nota}>{this.props.nome}</Text>
              <Icon style={Estilo.iconNota} name="star-outline" />
            </View>
          </View>
          <View />
        </View>
        <View style={Estilo.V_Infor}>
          <View style={Estilo.V_data}>
            <Text style={Estilo.data}> Ter 07 de Abril</Text>
          </View>
          <View style={Estilo.V_partida}>
            <Text style={Estilo.txtPartida}>Saida</Text>
          </View>
          <View style={Estilo.V_Hora}>
            <Text style={Estilo.Txthora}>
              {this.props.Hsaida} - {this.props.saida}
            </Text>
          </View>
          <View style={Estilo.V_partida}>
            <Text style={Estilo.txtPartida}>Previsão Chegada</Text>
          </View>
          <View style={Estilo.V_Hora}>
            <Text style={Estilo.Txthora}>
              {this.props.HChegada} - {this.props.chegada}
            </Text>
          </View>
          <View style={Estilo.V_valor}>
            <Text style={Estilo.Txtvalor1}>Preço para 1 passageiro</Text>
            <Text style={Estilo.Txtvalor}>R$ {this.props.valor},00</Text>
          </View>
        </View>
        <View style={Estilo.barra} />
        <View style={Estilo.Pontos}>
          <View style={Estilo.V_ptEm}>
            <Text style={Estilo.T_ptEm}>Ponto de Embarque</Text>
          </View>
          <View style={Estilo.V_label}>
            <Text style={Estilo.T_label}>•{this.props.embarque}</Text>
          </View>
          <View style={Estilo.V_ptEm}>
            <Text style={Estilo.T_ptEm}>Ponto Final</Text>
          </View>
          <View style={Estilo.V_label}>
            <Text style={Estilo.T_label}>•{this.props.desembarque}</Text>
          </View>
        </View>
        <View style={Estilo.ViewButon}>
          <Button
            style={Estilo.Botao}
            onPress={() => {
              Linking.openURL(
                'https://api.whatsapp.com/send?1=pt_BR&phone=5527997488849'
              );
            }}
            title="Leo"
          >
            <Icon style={Estilo.iconBtn} name="whatsapp" />
            <Text style={Estilo.txtBotao}>Entre em contato</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    nome: state.carona.nome,
    nota: state.carona.nota,
    saida: state.carona.saida,
    chegada: state.carona.chegada,
    data: state.carona.data,
    valor: state.carona.valor,
    Hsaida: state.carona.Hsaida,
    HChegada: state.carona.HChegada,
    embarque: state.carona.embarque,
    desembarque: state.carona.desembarque,
    vagas: state.carona.vagas,
    imagem: state.carona.imagem,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};

const CaronaConnect = connect(
  mapStateToProps,
  null
)(DetalhesCarona);

export default withNavigation(CaronaConnect);
