import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking, FlatList, ScrollView } from 'react-native';
import HeaderBack from '../../components/CustomHeader';
import style from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../service/api';
import { Spinner } from 'native-base';
import CustomModal from '../../components/Alert';
import EmptyState from '../../components/EmptyState';

export default class TelefoneUteis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telefones: [],
      loading: true,
      active: false,
      erro: false,
      refreshing: false,
      titulo0: '',
      titulo1: '',
      titulo2: '',
      titulo3: '',
      numeros0: [],
      numeros1: [],
      numeros2: [],
      numeros3: [],
    };
  }

  getListTelefone = () => {
    this.setState({ refreshing: true });
    return api
      .get('/telefone')
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          telefones: responseJson.data,
          fullData: responseJson.data,
          loading: false,
          refreshing: false,
          titulo0: responseJson.data[0].categoria,
          titulo1: responseJson.data[1].categoria,
          titulo2: responseJson.data[2].categoria,
          titulo3: responseJson.data[3].categoria,
          numeros0: responseJson.data[0].numeros,
          numeros1: responseJson.data[1].numeros,
          numeros2: responseJson.data[2].numeros,
          numeros3: responseJson.data[3].numeros,
        });
        console.log(this.state.telefones);
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ erro: true });
        this.setState({ refreshing: false });
      });
  };
  async componentDidMount() {
    await this.getListTelefone();
    await console.log(this.state.telefones[0]);
  }
  AbrirUrl = tel => {
    Linking.openURL(`tel:${tel}`);
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: '#f8f8f8' }}>
        <HeaderBack title="Telefone Uteis" onNavigation={() => this.navegar()} />
        {this.state.loading ? (
          <View style={style.V_Load}>
            <Spinner style={{}} color="#142850" />
          </View>
        ) : this.state.erro ? (
          <View style={style.V_republicas}>
            <CustomModal
              parametro="Erro"
              callback={() => {
                this.setState({ erro: false });
              }}
            />
          </View>
        ) : this.state.telefones.length != 0 ? (
          <ScrollView>
            <View style={style.Divisao}>
              <Text style={style.Text}>{this.state.titulo3}</Text>
            </View>
            <FlatList
              data={this.state.numeros3}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.AbrirUrl(item.telefone);
                    }}
                  >
                    <View style={style.Cards}>
                      <Text style={style.Nome}>{item.nome}</Text>
                      <Text style={style.Numero}>{item.telefone}</Text>
                      <View style={style.Botao}>
                        <Icon style={style.Icone} name="arrow-right" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{this.state.titulo0}</Text>
            </View>
            <FlatList
              data={this.state.numeros0}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.AbrirUrl(item.telefone);
                    }}
                  >
                    <View style={style.Cards}>
                      <Text style={style.Nome}>{item.nome}</Text>
                      <Text style={style.Numero}>{item.telefone}</Text>
                      <View style={style.Botao}>
                        <Icon style={style.Icone} name="arrow-right" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{this.state.titulo1}</Text>
            </View>
            <FlatList
              data={this.state.numeros1}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.AbrirUrl(item.telefone);
                    }}
                  >
                    <View style={style.Cards}>
                      <Text style={style.Nome}>{item.nome}</Text>
                      <Text style={style.Numero}>{item.telefone}</Text>
                      <View style={style.Botao}>
                        <Icon style={style.Icone} name="arrow-right" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{this.state.titulo2}</Text>
            </View>
            <FlatList
              data={this.state.numeros2}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.AbrirUrl(item.telefone);
                    }}
                  >
                    <View style={style.Cards}>
                      <Text style={style.Nome}>{item.nome}</Text>
                      <Text style={style.Numero}>{item.telefone}</Text>
                      <View style={style.Botao}>
                        <Icon style={style.Icone} name="arrow-right" />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={this.state.refreshing}
              onRefresh={this.getListTelefone}
            />
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            <EmptyState
              titulo="Tudo tão vazio por aqui... "
              mensagem="Parece que não há publicações no momento. Mas não desanime, logo logo novas vagas surgirão. "
            />
          </View>
        )}
      </View>
    );
  }
}
