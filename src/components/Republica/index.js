import React, {Component} from 'react';
import { ScrollView, FlatList } from 'react-native';
import axios from 'axios';

import {withNavigation} from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

import estilosRepublica from './style'
import Cartao from '../Cartao/index';
import { Fab, Icon, View } from 'native-base';

function irPara(){
  const navigation = useNavigation();
}
class Republica extends Component {

  constructor(props){
    super(props); 
    console.log('teste',this.props.navigation);
    this.state = { 
      listaRepublicas : [],
    };
    
  }

  UNSAFE_componentWillMount (){
    return axios.get('https://backendhommy.herokuapp.com/main')
      .then((responseJson) => {this.setState({listaRepublicas: responseJson.data }); })
      .catch((error) =>{
        console.error('SERVIDOR ESTA DESLIGADO');
      });
    }
  
  render(){
    const navigation = this.props.navigation;
  return (
    
    <View>
      {console.log(this.props.navigation)}
      <ScrollView style={estilosRepublica.card}>   
        <FlatList 
          style={estilosRepublica.flatList}
          data={this.state.listaRepublicas}
          renderItem={({item}) => <Cartao leonardo={item} ></Cartao>}
          keyExtractor={item => item.key}
        />
        
        
    </ScrollView>   
    
    
    </View>
    
    );
  }
};


export default withNavigation(Republica);
