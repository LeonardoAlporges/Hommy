import { Button, Fab } from 'native-base';
import React, { Component } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import CartaoServico from '../../../components/CartaoServico';
import EmptyState from '../../../components/EmptyState';
import api from '../../../service/api';
import Estilo from './style';

class Servicos extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = { listaServicos: [], active: false };
  }
  servicosRedux() {
    this.props.navigation.navigate('CadastroServico');
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/servicos')
      .then(responseJson => {
        this.setState({ listaServicos: responseJson.data });
      })
      .catch(error => {
        console.error('SERVIDOR ESTA DESLIGADO');
      });
  }
  irParaCadastro() {
    this.props.navigation.navigate('CadastroServico');
  }

  render() {
    return (
      <View style={Estilo.V_externa}>
        { this.state.listaServicos == 0 &&
          <EmptyState
            titulo="Tudo tão vazio por aqui... "
            mensagem="Parece que não há publicações até o momento."
          />
        }
        <ScrollView>
          <View style={Estilo.card}>
            <FlatList
              style={Estilo.flatList}
              data={this.state.listaServicos}
              renderItem={({ item }) => <CartaoServico dados={item} />}
              keyExtractor={item => item._id}
            />
          </View>
        </ScrollView>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={Estilo.S_FAB}
          position="bottomRight"
          onPress={() => {
            this.servicosRedux();
          }}
        >
          {this.state.active ? <Icon name="minus" /> : <Icon name="plus" />}

          {/* <Button
            style={Estilo.corFAB}
            onPress={() => {
              this.servicosRedux();
            }}
          >
            <Icon name="plus" style={Estilo.corIconFab} />
          </Button> */}
        </Fab>
      </View>
    );
  }
}

export default withNavigation(Servicos);
