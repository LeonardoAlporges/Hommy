import React, { Component } from 'react';
import { ScrollView, FlatList, View, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Spinner } from 'native-base';
import Estilo from './style';
import CustomModal from '../../components/Alert';
import CartaoCarona from '../../components/CartaoCarona';
import api from '../../service/api';

class Caronas extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      listaCaronas: [],
      loading: true,
      erro: false,
    };
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/carona')
      .then(responseJson => {
        this.setState({ listaCaronas: responseJson.data });
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
              Aproveite essa oportunidade publique sua oferta de carona agora
              mesmo{' '}
            </Text>
          </View>
        ) : (
          <ScrollView style={Estilo.card}>
            <FlatList
              style={Estilo.flatList}
              data={this.state.listaCaronas}
              renderItem={({ item }) => <CartaoCarona dados={item} />}
              keyExtractor={item => item._id}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default withNavigation(Caronas);
