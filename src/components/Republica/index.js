import React, { Component } from 'react';
import { ScrollView, FlatList, View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import estilosRepublica from './style';
import { Spinner } from 'native-base';
import Cartao from '../Cartao/index';
import api from '../../service/api';
import CustomModal from '../../components/Alert';

class Republica extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      listaRepublicas: [],
      loading: true,
      erro: false,
    };
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/main')
      .then(responseJson => {
        this.setState({ listaRepublicas: responseJson.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log('SERVIDOR ESTA DESLIGADO');
        this.setState({ loading: false });
        this.setState({ erro: true });
      });
    this.setState({ loading: false });
  }

  render() {
    return (
      <View>
        {this.state.loading ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner color="#27496d" />
          </View>
        ) : this.state.erro ? (
          <View
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: '10%',
            }}
          >
            <CustomModal parametro="Erro" />
            <Image
              style={{ height: 200, width: 200 }}
              source={require('../../assets/Img/Empty.png')}
            />
            <Text
              style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'Roboto' }}
            >
              Nenhum Anuncio Disponivel
            </Text>
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '400',
                fontFamily: 'Roboto',
                width: '80%',
              }}
            >
              Aproveite essa oportunidade publique a de vaga da sua republica
              agora mesmo{' '}
            </Text>
          </View>
        ) : (
          <ScrollView style={estilosRepublica.card}>
            <FlatList
              style={estilosRepublica.flatList}
              data={this.state.listaRepublicas}
              renderItem={({ item }) => <Cartao leonardo={item} />}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default withNavigation(Republica);
