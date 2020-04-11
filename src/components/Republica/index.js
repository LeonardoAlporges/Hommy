import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import axios from 'axios';

import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

import estilosRepublica from './style'
import Cartao from '../Cartao/index';
import { Fab, Icon, View, Switch, Text } from 'native-base';
import _ from "lodash";

function irPara() {
  const navigation = useNavigation();
}
class Republica extends Component {


  constructor(props) {
    super(props);
    console.log('teste', this.props.navigation);
    this.state = {
      listaRepublicas: [],
      loading: false,
      query: "",
      fullData: [],
      tempData: [],
      search: '',
      filtroAnimal: false,
      filtroMQuarto: false,

    };

  }

  UNSAFE_componentWillMount() {
    return axios.get('https://backendhommy.herokuapp.com/main')
      .then((responseJson) => {
        this.setState({
          listaRepublicas: responseJson.data,
          fullData: responseJson.data,
          loading: true
        });
      })
      .catch((error) => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }

fAnimal = async (value) =>{
await this.setState({filtroAnimal: value});
this.filtro();
}

fMQuarto = async (value) =>{
  await this.setState({ filtroMQuarto: value});
  this.filtro();

  }



  filtro = () => {
    this.setState( {listaRepublicas: this.state.fullData});
    console.log(this.state.filtroAnimal);
    console.log(this.state.filtroMQuarto);
    if ((this.state.filtroAnimal) === true) {
      this.setState({ listaRepublicas: _.filter(this.state.listaRepublicas, { "animal": "Sim" })});
    }
    if ((this.state.filtroMQuarto) === true) {
      this.setState({ listaRepublicas: _.filter(this.state.listaRepublicas, { "movelQuarto": "Nenhum" })});
    }
    console.log(this.state.query);
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        {console.log(this.state.filtroAnimal)}
        {console.log(this.props.navigation)}
        <ScrollView style={estilosRepublica.card}>
          <Switch rounded style={{ alignSelf: "center", flex: 1 }} onValueChange={this.fAnimal} value={this.state.filtroAnimal} />
          <Text style={{ alignSelf: "center" }} >Tem animais?</Text>
          <Switch rounded style={{ alignSelf: "center", flex: 1 }} onValueChange={this.fMQuarto} value={this.state.filtroMQuarto} />
          <Text style={{ alignSelf: "center" }} >Sem moveis no quarto</Text>
          <FlatList
            style={estilosRepublica.flatList}
            data={this.state.listaRepublicas}
            renderItem={({ item }) => <Cartao leonardo={item} ></Cartao>}
            keyExtractor={item => item.key}
          />


        </ScrollView>


      </View>

    );
  }
};


export default withNavigation(Republica);
