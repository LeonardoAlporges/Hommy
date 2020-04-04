import React, {Component} from 'react';
import { Image, Text, TouchableHighlight,StyleSheet} from 'react-native';
import { Card, CardItem, Left, Body, Right, Button, Item, View, Icon } from 'native-base';

import { withNavigation } from 'react-navigation';

import estilo from './style';


class Confirmacao extends Component { 
  
  onClickCard = () => {
    this.props.navigation.navigate('Detalhes')
  }

  render(){
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#ffff'}}>
        <View style={estilo.V_img}>
          <Image style={estilo.V_img} source={{ uri : 'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Group%20453%403x.png?alt=media&token=0c1081e3-fb91-4ab1-980f-2e82cc8b65cc' }}></Image>
        </View>
        
        <View style={estilo.V_title}>
          <Text style={estilo.title}>Anuncio Publicado!</Text>
        </View>
          
        <View style={estilo.V_Subtitle}>
          <Text style={estilo.subtitle} >Iremos analisar seu anuncio e em algumas horas vc terá seu anuncio oline.</Text>
        </View>
        <View style={estilo.V_botao}>
            <Button style={estilo.botao} onPress={() => {this.props.navigation.navigate('TabsHeader')}}>
                <Text style={estilo.txtbtn}>Volta para o inico</Text>
            </Button>
        </View>
      </View>
 
  );
  }  
};

export default withNavigation(Confirmacao);