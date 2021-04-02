import { Button, Fab } from 'native-base';
import React, { Component } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import CartaoEvento from '../../../../components/CartaoEvento';
import EmptyState from '../../../../components/EmptyState';
import api from '../../../../service/api';
import Estilo from './style';

class Eventos extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = { listaEvento: [], active: false };
  }
  servicosRedux() {
    this.props.navigation.navigate('CadastroEvento');
  }

  UNSAFE_componentWillMount() {
    return api
      .get('/eventos')
      .then(responseJson => {
        console.log(responseJson)
        this.setState({ listaEvento: responseJson.data });
      })
      .catch(error => {});
  }
  irParaCadastro() {
    this.props.navigation.navigate('CadastroEvento');
  }

  render() {
    return (
      <View style={Estilo.V_externa}>
        {this.state.listaEvento == 0 &&
        <EmptyState
        titulo="Tudo tão vazio por aqui... "
        mensagem="Parece que não há publicações até o momento. Mas não desanime, logo logo novos eventos surgirão. "
      />
      
      }
        <ScrollView>
          <View style={Estilo.card}>
            <FlatList
              style={Estilo.flatList}
              data={this.state.listaEvento}
              renderItem={({ item }) => <CartaoEvento dados={item} />}
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
            this.setState({ active: !this.state.active });
          }}
        >
          {this.state.active ? <Icon name="minus" /> : <Icon name="plus" />}

          <Button
            style={Estilo.corFAB}
            onPress={() => {
              this.servicosRedux();
            }}
          >
            <Icon name="plus" style={Estilo.corIconFab} />
          </Button>
        </Fab>
      </View>
    );
  }
}

export default withNavigation(Eventos);
