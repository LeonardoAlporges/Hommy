import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Estilo from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
import CustomModal from '../../components/Alert';
import api from '../../service/api';
import Loading from '../../components/Loading';

const moment = require('moment');
moment.locale('pt', {
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado'.split('_'),
});

class DetalhesCarona extends Component {
  constructor(props) {
    super(props);
    console.log('?', this.props);
    this.state = {
      interesse: false,
      Erro: false,
      Load: false,
      data: moment(this.props.data).format('dddd, DD MMMM'),
      horaSaida: moment(new Date(this.props.Hsaida)).format('HH:mm'),
      horaChegada: moment(new Date(this.props.HChegada)).format('HH:mm'),
      desativarBotaoInteresse: this.props.navigation.state.params.desativarBotaoInteresse,
    };
  }

  async clickInteresse() {
    this.setState({ Load: true });
    const envio = { email: this.props.email };
    await api
      .put(`/carona/meusInteresses/${this.props.id}`, envio)
      .then(Response => {
        console.log(Response);
        this.setState({ interesse: true, Load: false });
      })
      .catch(e => {
        this.setState({ Erro: true, Load: false });
      });
    this.setState({ Load: false });
  }

  static navigationOptions = { header: null };
  render() {
    return (
      <ScrollView style={{ paddingBottom: 50 }}>
        {this.state.Load && <Loading />}
        {this.state.interesse && (
          <View style={Estilo.V_modal}>
            <CustomModal
              parametro="Custom"
              titulo="Obrigado pelo interesse"
              descricao="Você sera adicionado a uma lista de interesse e sera notificado assim que o ofertante confirma sua vaga."
              botao="Confirmar"
              callback={() => {
                this.props.navigation.navigate('Viagens');
              }}
            />
          </View>
        )}
        {this.state.Erro && (
          <View style={Estilo.V_modal}>
            <CustomModal
              parametro="Erro"
              descricao="Você já tem um agendamento cadastrado nessa carona."
              callback={() => {
                this.setState({ Erro: false });
              }}
            />
          </View>
        )}
        <View style={Estilo.V_Margin}>
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
              <Text style={Estilo.Nome}>{this.props.nome} </Text>
              <View style={Estilo.V_nota}>
                <Icon style={Estilo.iconNota} name="star-outline" />
                <Text style={Estilo.Nota}>{this.props.nota}</Text>
              </View>
            </View>
            <View />
          </View>

          <View style={Estilo.V_Infor}>
            <View style={Estilo.V_data}>
              <Text style={Estilo.data}>{this.state.data}</Text>
            </View>
            <View style={Estilo.V_partida}>
              <Text style={Estilo.txtPartida}>Saida</Text>
            </View>
            <View style={Estilo.V_Hora}>
              <Text style={Estilo.Txthora}>
                {this.state.horaSaida} - {this.props.saida}
              </Text>
            </View>
            <View style={Estilo.V_partida}>
              <Text style={Estilo.txtPartida}>Previsão Chegada</Text>
            </View>
            <View style={Estilo.V_Hora}>
              <Text style={Estilo.Txthora}>
                {this.state.horaChegada} - {this.props.chegada}
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
          {!this.state.desativarBotaoInteresse ? (
            <View style={Estilo.ViewButon}>
              <View style={Estilo.V_Btn}>
                <Button
                  style={Estilo.Botao}
                  onPress={() => {
                    this.clickInteresse();
                  }}
                >
                  <Text style={Estilo.txtBotao}>Tenho Interesse</Text>
                </Button>
              </View>
            </View>
          ) : (
            <View style={{ height: 40 }} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    id: state.carona.idCarona,
    email: state.user.email,
    nome: state.carona.nome,
    nota: state.user.notaUser,
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
    emailOfertante: state.carona.emailOfertante,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};

const CaronaConnect = connect(
  mapStateToProps,
  null
)(DetalhesCarona);

export default withNavigation(CaronaConnect);
