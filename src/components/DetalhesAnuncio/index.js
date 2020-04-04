import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button, Card, CardItem, Body, Header, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { selecionarItem } from '../../actions/DetalhesActions';
import estilo from './style';
import ViewPager from '@react-native-community/viewpager';

class DetalhesAnuncio extends Component {

    render() {
        return (
            <ScrollView style={{ marginBottom: 55 }}>
                <ViewPager style={estilo.image} showPageIndicator="true">
                   
                        <View key="1"  showPageIndicator={true}>
                            <Image source={{ uri: 'https://amandarebecaarq.com.br/wp-content/uploads/2017/03/Perspectiva-3-1200x720.png' }} style={estilo.image} />
                        </View>

                        <View key="2"  showPageIndicator={true}>
                            <Image source={{ uri: 'http://cmreforma.com.br/wp-content/uploads/2017/02/image-3-1200x720-1024x614.jpeg' }} style={estilo.image} />
                        </View>        
                        <View key="4"  showPageIndicator={true}>
                            <Image source={{ uri: 'https://amandarebecaarq.com.br/wp-content/uploads/2017/03/Perspectiva-2-1200x720.png' }} style={estilo.image} />
                        </View>
                    
                </ViewPager>
                
                <View style={estilo.V_titulo}>
                    <Text style={estilo.titulo}>{this.props.titulo}</Text>
                </View>
                
                <View  style={estilo.V_descricao}>
                    <Text style={estilo.descricao}>{this.props.desc}</Text>
                </View>
                <View style={estilo.barra}></View>

                <View style={estilo.V_caracteristicaTitle}>
                    <Text style={estilo.caracteristicaTitle}>Caracteristicas</Text>
                </View>
                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Tipo</Text>
                </View>
                <View style={estilo.V_caracteristicaItens}>
                    <View style={estilo.item}>
                        <Icon name="home" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>Apartamento</Text>
                    </View>
                    <View style={estilo.item}>
                        <Icon name="ios-people" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>Masculina - 4</Text>
                    </View> 
                </View>
                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Acomodações</Text>
                </View>
                <View style={estilo.V_caracteristicaAcomodacao}>
                    <View style={estilo.itemAcomodacao}>
                        <Icon name="ios-easel" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>3 Camas,1 Suite, 1 Televisao, Wifi, Banheiro, Sala, Cozinha, Area de serviço</Text>
                    </View>
                </View>
                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Utensilios</Text>
                </View>
                <View style={estilo.V_caracteristicaAcomodacao}>
                    <View style={estilo.itemAcomodacao}>
                        <Icon name="md-list-box" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>Geladeira, Fogao, Maquina de Lavar, Varal, Microondas, Panelas</Text>
                    </View>
                </View>

                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Contato</Text>
                </View>
                <View style={estilo.V_vagas}>
                    <View style={estilo.vagas}>
                        <Icon name="md-call" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>(27) 99748-8849 Leonardo </Text>
                    </View>
                </View>
                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Disponibilidade</Text>
                </View>
                <View style={estilo.V_vagas}>
                    <View style={estilo.vagas}>
                        <Icon name="md-person-add" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>4 Vagas</Text>
                    </View>
                </View>
                <View style={estilo.V_tipo}>
                    <Text style={estilo.tipo}>Localização</Text>
                </View>
                <View style={estilo.V_vagas}>
                    <View style={estilo.vagas}>
                        <Icon name="ios-pin" style={estilo.icone}></Icon>
                        <Text style={estilo.txtlabel}>R. Anísio Fernandes Coelho, Alegre, ES</Text>
                    </View>
                </View>
                <View style={estilo.V_mapa}>
                    <Image style={estilo.imageMapa} source={{uri : 'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Imagens%2Fmapa.jpeg?alt=media&token=d0ca424e-74af-4b42-9b0e-a9a2cac2fa49'}}/>
                </View>
                <Button style={estilo.botao} onPress={() => {alert('Em breve aqui voce sera redirecionado para a tela de discagem de seu celular :)')}}>
                    <Icon name="ios-call" style={{color: "rgba(29,161,242,1)"}}></Icon>
                    <Text style={{color: "rgba(29,161,242,1)"}} >Entrar em Contato</Text>
                </Button>
                
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
    }
}

const connectDetalails = connect(mapsStateToProps, null)(DetalhesAnuncio)

export default withNavigation(connectDetalails);




