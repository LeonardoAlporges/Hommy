import React, { useEffect, useState } from 'react';
import { FlatList, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import { Card, Categoria, IconeSeta, Nome, Numero, V_Card, V_Categoria } from './styles';

export default function TelefoneUteis({ navigation }) {
  const [telefones, setTelefones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [reloading, setReloading] = useState(false);

  function getListTelefone() {
    setReloading(true);
    return api
      .get('/telefone')
      .then(responseJson => {
        setTelefones(responseJson.data);

        setLoading(false);
        setReloading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
        setReloading(false);
      });
  }

  useEffect(() => {
    getListTelefone();
  }, []);

  function AbrirUrl(tel) {
    Linking.openURL(`tel:${tel}`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <HeaderBack title="Telefone Uteis" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading></Loading>}
      {telefones.length == 0 && (
        <EmptyState
          titulo="Tudo tão vazio por aqui... "
          mensagem="Parece que não há publicações no momento. Mas não desanime, logo logo novas vagas surgirão. "
        />
      )}
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            setErro(false);
          }}
        />
      )}

      {telefones.length != 0 && (
        <ScrollView>
          <V_Categoria>
            <Categoria>{telefones[0].categoria}</Categoria>
          </V_Categoria>
          <FlatList
            data={telefones[0].numeros}
            renderItem={({ item }) => (
              <V_Card>
                <TouchableOpacity
                  onPress={() => {
                    AbrirUrl(item.telefone);
                  }}
                >
                  <Card>
                    <Nome>{item.nome}</Nome>
                    <Numero>{item.telefone}</Numero>
                    <IconeSeta>
                      <Icon style={{ fontSize: 20, color: '#142850' }} name="arrow-right" />
                    </IconeSeta>
                  </Card>
                </TouchableOpacity>
              </V_Card>
            )}
            keyExtractor={item => item._id}
            refreshing={reloading}
            onRefresh={getListTelefone}
          />
          <V_Categoria>
            <Categoria>{telefones[1].categoria}</Categoria>
          </V_Categoria>
          <FlatList
            data={telefones[1].numeros}
            renderItem={({ item }) => (
              <V_Card>
                <TouchableOpacity
                  onPress={() => {
                    AbrirUrl(item.telefone);
                  }}
                >
                  <Card>
                    <Nome>{item.nome}</Nome>
                    <Numero>{item.telefone}</Numero>
                    <IconeSeta>
                      <Icon style={{ fontSize: 20, color: '#142850' }} name="arrow-right" />
                    </IconeSeta>
                  </Card>
                </TouchableOpacity>
              </V_Card>
            )}
            keyExtractor={item => item._id}
            refreshing={reloading}
            onRefresh={getListTelefone}
          />
          <V_Categoria>
            <Categoria>{telefones[2].categoria}</Categoria>
          </V_Categoria>
          <FlatList
            data={telefones[2].numeros}
            renderItem={({ item }) => (
              <V_Card>
                <TouchableOpacity
                  onPress={() => {
                    AbrirUrl(item.telefone);
                  }}
                >
                  <Card>
                    <Nome>{item.nome}</Nome>
                    <Numero>{item.telefone}</Numero>
                    <IconeSeta>
                      <Icon style={{ fontSize: 20, color: '#142850' }} name="arrow-right" />
                    </IconeSeta>
                  </Card>
                </TouchableOpacity>
              </V_Card>
            )}
            keyExtractor={item => item._id}
            refreshing={reloading}
            onRefresh={getListTelefone}
          />
          <V_Categoria>
            <Categoria>{telefones[3].categoria}</Categoria>
          </V_Categoria>
          <FlatList
            data={telefones[3].numeros}
            renderItem={({ item }) => (
              <V_Card>
                <TouchableOpacity
                  onPress={() => {
                    AbrirUrl(item.telefone);
                  }}
                >
                  <Card>
                    <Nome>{item.nome}</Nome>
                    <Numero>{item.telefone}</Numero>
                    <IconeSeta>
                      <Icon style={{ fontSize: 20, color: '#142850' }} name="arrow-right" />
                    </IconeSeta>
                  </Card>
                </TouchableOpacity>
              </V_Card>
            )}
            keyExtractor={item => item._id}
            refreshing={reloading}
            onRefresh={getListTelefone}
          />
        </ScrollView>
      )}
    </View>
  );
}
