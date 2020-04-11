import React, {Component} from 'react';
import { Image, Text, TouchableHighlight,StyleSheet} from 'react-native';
import { Card, CardItem, Left, Body, Right, Button, Item, View } from 'native-base';

import { withNavigation } from 'react-navigation';
import { selecionarItem } from '../../actions/DetalhesActions';
import { connect } from 'react-redux';

import {
  editTitulo, editSenha, editValor, editBairro, editPessoas, editDesc, editAnimal,
  editMovelQuarto, editMovelComun, editValorConta, editObservacao, editImg, editGenero,
  editNumVagas, editRepresentante, editRedeSocial, editRua, editNumero
} from '../../actions/AuthActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Estilos from './styles';

class Cartao extends Component { 
  constructor(props) {
    super(props);
    this.onClickCard = this.onClickCard.bind(this)
    

  }
  UNSAFE_componentWillMount(){
    
  }
  onClickCard = () => {
    const dados  = this.props.leonardo
    console.log('ww',this.props.leonardo.titulo)
    this.props.editTitulo(this.props.leonardo.titulo);
    this.props.editValor(this.props.leonardo.valor)
    this.props.editBairro(this.props.leonardo.bairro)
    this.props.editRua(this.props.leonardo.rua)
    this.props.editNumero(this.props.leonardo.numero)
    this.props.editPessoas(this.props.leonardo.numero)
    this.props.editAnimal(this.props.leonardo.numero)
    this.props.editDesc(this.props.leonardo.desc)
    this.props.editMovelQuarto(this.props.leonardo.moveisQuarto)
    this.props.editMovelComun(this.props.leonardo.moveisComun)
    this.props.editObservacao(this.props.leonardo.observacao)
    this.props.editGenero(this.props.leonardo.numero)
    this.props.editNumVagas(this.props.leonardo.numero)
    this.props.editRepresentante(this.props.leonardo.representante)
    this.props.editRedeSocial(this.props.leonardo.redeSocial)
    this.props.editImg(this.props.leonardo.imagem)


    this.props.navigation.navigate('Detalhes')
  }

  render(){
    return (
      
      <TouchableHighlight underlayColor='#fff' onPress={this.onClickCard} style={Estilos.touch_card}>
      <View style={Estilos.V_cartao}>
        <View style={Estilos.V_imagem}>
        <Image source={{ uri:this.props.leonardo.imagem }} style={Estilos.V_imagem} />
        </View>


        <View style={Estilos.V_TituloDesc}>
          <View style={Estilos.V_titulo}>
            <Text style={Estilos.txtTitulo}>{this.props.leonardo.titulo}</Text>
          </View>
          <View  style={{paddingTop:10,width:'90%',height:45,maxHeight:45}}>
            <Text>{this.props.leonardo.desc}</Text>
          </View>
          <View style={Estilos.V_desc}>
            
            <View style={{flexDirection:'row',width:'50%'}}>
              <Icon style={Estilos.txtIcon} name="currency-usd"></Icon>
              <Text style={Estilos.txtDesc}>150,00</Text>
            </View>
            <View style={{flexDirection:'row',width:'50%'}}>
              <Icon style={Estilos.txtIcon} name="account-group-outline"></Icon>
              <Text style={Estilos.txtDesc}>{this.props.leonardo.pessoas} Vagas</Text>
            </View> 
            
          </View>
        </View>
      </View>
    </TouchableHighlight>
 
  );
  }  
};

const mapStateToProps = state => {
  return {
      
      //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
      titulo: state.auth.titulo,
      valor: state.auth.valor,
      bairro: state.auth.bairro,
      pessoas: state.auth.pessoas1,
      desc: state.auth.desc,
      animal: state.auth.animal,
      movelQuarto: state.auth.movelQuarto,
      moveisComun: state.auth.moveisComun,
      valorContas: state.auth.valorContas,
      observacao: state.auth.observacao,
      imagem: state.auth.imagem,
      // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};


const cardConnect = connect(mapStateToProps, { editTitulo, editSenha, editTitulo, editValor, editBairro, editPessoas, editDesc, editAnimal, editMovelQuarto, editMovelComun, editValorConta, editObservacao, editImg, editGenero, editNumVagas, editRepresentante, editRedeSocial, editRua, editNumero })(Cartao);

export default withNavigation(cardConnect);