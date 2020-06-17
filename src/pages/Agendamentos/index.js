import React, { Component } from 'react';
import { View } from 'react-native';
import { DatePicker, Item, Label, Text, Button } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';
import { extend } from 'lodash';
import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import { FlatList } from 'react-native-gesture-handler';

class Agendamentos extends Component {
  static navigationOptions = { header: null };
  state = {
    listaAgendamento: [],
  };

  UNSAFE_componentWillMount() {
    this.Agendar();
  }
  navegar = () => {
    this.props.navigation.goBack(null);
  };

  Agendar = () => {
    api
      .get(`/confirmAgendamento/leonar@gmail.com`)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ listaAgendamento: responseJson.data });
      })
      .catch(error => {});
  };

  render() {
    return (
      <View style={style.Container}>
        <HeaderBack
          title="Agendamentos de visita"
          onNavigation={() => this.navegar()}
        />
        <Text>Solicitaçoes</Text>
        <FlatList
          data={this.state.listaAgendamento}
          renderItem={({ item }) => (
            <View style={{ margin: 20 }}>
              <Text>{item.data}</Text>
              <Text>{item.email}</Text>
              <Text>{item.status}</Text>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

const AgendamentoConnect = connect(
  mapStateToProps,
  null
)(Agendamentos);

export default AgendamentoConnect;
