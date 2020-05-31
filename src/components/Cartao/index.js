import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  editNomeRepublica,
  editValorAluguel,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumeroCasa,
  editTipoImovel,
} from '../../actions/AuthActions';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Estilos from './styles';

class Cartao extends Component {
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this);
  }

  onClickCard = () => {
    const dados = this.props.leonardo;
    console.log(dados.valorContas);
    this.props.editNomeRepublica(this.props.leonardo.nomeRepublica);
    this.props.editValorAluguel(this.props.leonardo.valorAluguel);
    this.props.editBairro(this.props.leonardo.bairro);
    this.props.editRua(this.props.leonardo.rua);
    this.props.editNumeroCasa(this.props.leonardo.numeroCasa);
    this.props.editPessoas(this.props.leonardo.pessoas);
    this.props.editAnimal(this.props.leonardo.animal);
    this.props.editDescricao(this.props.leonardo.descricao);
    this.props.editAcomodacaoQuarto(this.props.leonardo.acomodacaoQuarto);
    this.props.editAcomodacaoRepublica(this.props.leonardo.acomodacaoRepublica);
    this.props.editValorConta(this.leonardo.valorContas);
    this.props.editObservacao(this.props.leonardo.observacao);
    this.props.editGenero(this.props.leonardo.genero);
    this.props.editNumVagas(this.props.leonardo.numVagas);
    this.props.editRepresentante(this.props.leonardo.representante);
    this.props.editTipoImovel(this.props.leonardo.tipoImovel);
    this.props.editImg1(this.props.leonardo.imagem1);
    this.props.editImg2(this.props.leonardo.imagem2);
    this.props.editImg3(this.props.leonardo.imagem3);

    this.props.navigation.navigate('Detalhes');
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={this.onClickCard}
        style={Estilos.touch_card}
      >
        <View style={Estilos.V_cartao}>
          <View style={Estilos.V_imagem}>
            <Image
              source={{ uri: this.props.leonardo.imagem1 }}
              style={Estilos.V_imagem}
            />
          </View>
          <View style={Estilos.V_TituloDesc}>
            <View style={Estilos.V_titulo}>
              <Text style={Estilos.txtTitulo}>
                {this.props.leonardo.nomeRepublica}
              </Text>
            </View>
            <View style={Estilos.V_obs}>
              <Text numberOfLines={2}>{this.props.leonardo.descricao}</Text>
            </View>
            <View style={Estilos.V_desc}>
              <View style={Estilos.V_valor}>
                <Icon2 style={Estilos.txtIcon} name="dollar" />
                <Text style={Estilos.txtDesc}>
                  R$ {this.props.leonardo.valorAluguel}
                </Text>
              </View>
              <View style={Estilos.V_vagas}>
                <Icon style={Estilos.txtIcon} name="people" />
                <Text style={Estilos.txtDesc}>
                  {this.props.leonardo.numVagas} Vagas
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
    numeroCasa: state.auth.numeroCasa,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};

const cardConnect = connect(
  mapStateToProps,
  {
    editTipoImovel,
    editNomeRepublica,
    editValorAluguel,
    editBairro,
    editPessoas,
    editDescricao,
    editAnimal,
    editAcomodacaoQuarto,
    editAcomodacaoRepublica,
    editValorConta,
    editObservacao,
    editImg1,
    editImg2,
    editImg3,
    editGenero,
    editNumVagas,
    editRepresentante,
    editRua,
    editNumeroCasa,
  }
)(Cartao);

export default withNavigation(cardConnect);
