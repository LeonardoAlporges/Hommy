import React, { useState, useEffect } from 'react';
import HeaderBack from '../../../components/CustomHeader';
import { View, Text, TouchableOpacity, Linking, FlatList, ScrollView } from 'react-native';
import style from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../service/api';
import { Spinner } from 'native-base';
import CustomModal from '../../../components/Alert';
import EmptyState from '../../../components/EmptyState';

export default function TelefoneUteis ({ navigation }) {
  const [telefones, setTelefones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [erro, setErro] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [titulo0, setTitulo0] = useState('');
  const [titulo1, setTitulo1] = useState('');
  const [titulo2, setTitulo2] = useState('');
  const [titulo3, setTitulo3] = useState('');
  const [numeros0, setNumeros0] = useState('');
  const [numeros1, setNumeros1] = useState('');
  const [numeros2, setNumeros2] = useState('');
  const [numeros3, setNumeros3] = useState('');  

 function getListTelefone (){
    setReloading(true)
    return api
      .get('/telefone')
      .then(responseJson => {
        console.log(responseJson);
        setTelefones(responseJson.data);
        setLoading(false);
        setReloading(false);
        setTitulo0(responseJson.data[0].categoria);
        setTitulo1(responseJson.data[1].categoria);
        setTitulo2(responseJson.data[2].categoria);
        setTitulo3(responseJson.data[3].categoria);
        setnumeros0(responseJson.data[0].numeros);
        setnumeros1(responseJson.data[1].numeros);
        setnumeros2(responseJson.data[2].numeros);
        setnumeros3(responseJson.data[3].numeros);
        console.log(telefones);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
        setReloading(false);
      });
  };

  useEffect(async() => {
    await getListTelefone();
    await console.log(telefones[0]);
  }, []);

  AbrirUrl = tel => {
    Linking.openURL(`tel:${tel}`);
  };

    return (
      <View style={{ height: '100%', backgroundColor: '#f8f8f8' }}>
        <HeaderBack title="Telefone Uteis" onNavigation={() => navigation.goBack(null)} />
        {loading ? (
          <View style={style.V_Load}>
            <Spinner style={{}} color="#142850" />
          </View>
        ) : erro ? (
          <View style={style.V_republicas}>
            <CustomModal
              parametro="Erro"
              callback={() => {
                setErro(false)
              }}
            />
          </View>
        ) : telefones.length != 0 ? (
          <ScrollView>
            <View style={style.Divisao}>
              <Text style={style.Text}>{titulo3}</Text>
            </View>
            <FlatList
              data={numeros3}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      AbrirUrl(item.telefone);
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
              refreshing={reloading}
              onRefresh={getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{titulo0}</Text>
            </View>
            <FlatList
              data={numeros0}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      AbrirUrl(item.telefone);
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
              refreshing={refreshing}
              onRefresh={getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{titulo1}</Text>
            </View>
            <FlatList
              data={numeros1}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      AbrirUrl(item.telefone);
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
              refreshing={refreshing}
              onRefresh={getListTelefone}
            />
            <View style={style.Divisao}>
              <Text style={style.Text}>{titulo2}</Text>
            </View>
            <FlatList
              data={numeros2}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20, marginBottom: 2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      AbrirUrl(item.telefone);
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
              refreshing={refreshing}
              onRefresh={getListTelefone}
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
