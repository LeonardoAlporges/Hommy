import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import CartaoCarona from '../../../components/CartaoCarona';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';
import {
  BarraSeparacao,
  BotaoDelete,
  BotaoEditar,
  BotaoInteressado,
  Container,
  Label,
  LabelBotaoEditar,
  ViewOpcoes,
  V_Label
} from './style';

function Anuncios({ navigation }) {
  const [listaRepublicas, setListaRepublicas] = useState([]);
  const [listaCaronas, setListaCaronas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [item, setItem] = useState('');
  const [tipo, setTipo] = useState('');
  const [anuncio, setAnuncio] = useState(0);
  const email = useSelector(state => state.user.email);

  function DeleteAnuncio(valor, item, tipo) {
    if (valor == 0) {
      return null;
    }
    if (tipo == 'Republica' && valor == 1) {
      api
        .delete(`/republica/${item._id}`)
        .then(responseJson => {
          setListaRepublicas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setLoading(false);
          setErro(true);
        });
    } else if (tipo == 'Carona' && valor == 1) {
      api
        .delete(`/carona/${item._id}`)
        .then(responseJson => {
          setListaCaronas([]);
          setLoading(false);
          getlist();
        })
        .catch(error => {
          setReloading(false);
          setLoading(false);
        });
    }
  }

  function getlist() {
    setLoading(true);
    api
      .get(`/userCarona/${email}`)
      .then(responseJson => {
        setListaCaronas(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false), setAnuncio(anuncio++)
      });
    api
      .get(`/userRepublica/${email}`)
      .then(responseJson => {
        setListaRepublicas(responseJson.data);
      })
      .catch(error => {
        setLoading(false);
      })
      .finally( () => {
        setLoading(false), setAnuncio(anuncio++)
      });
  }

  useEffect(() => {
    getlist();
  }, [reloading]);

  function editRepublica(edit) {
    const dados = edit;
    navigation.navigate('Cadastro', { update: true, dadosRepublica: dados });
  }

  function editCaronas(edit) {
    const dados = edit;
    navigation.navigate('CadastroCaronas', { update: true, carona: dados });
  }

  return (
    <Container>
      <HeaderBack title="Meus anúncios" onNavigation={() => navigation.navigate('TabsHeader', { menuAberto: true })} />
      {loading && <Loading />}
      {listaCaronas.length == 0 && listaRepublicas.length == 0 && !loading && (anuncio == 2) && (
        <EmptyState
          titulo="Sem anúncios"
          mensagem="Você ainda não anunciou nada. Nos diga quando houver vagas em sua república ou ofereça uma carona."
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
      {modalConfirmacao && (
        <ModalConfirmacao
          retornoModal={valor => {
            DeleteAnuncio(valor, item, tipo);
            setModalConfirmacao(false);
          }}
          titulo="Excluir anúncio?"
          mensagem="Sua publicação será apagada e mais ninguém poderá vê-la."
          botaoCancel="Cancelar"
          botaoConfirmar="Excluir"
          confirmar={true}
        />
      )}
      <ScrollView>
        {listaRepublicas.length != 0 && (
          <View>
            <V_Label>
              <Label>Suas Republica</Label>
              <BarraSeparacao />
            </V_Label>

            <FlatList
              data={listaRepublicas}
              renderItem={({ item }) => (
                <View>
                  <Cartao data={item} />
                  <ViewOpcoes>
                    <BotaoDelete
                      onPress={() => {
                        setItem(item);
                        setTipo('Republica');
                        setModalConfirmacao(true);
                      }}
                    >
                      <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                    </BotaoDelete>
                    <BotaoEditar
                      onPress={() => {
                        editRepublica(item);
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="pencil" />
                      <LabelBotaoEditar>Editar</LabelBotaoEditar>
                    </BotaoEditar>
                    <BotaoInteressado
                      onPress={() => {
                        navigation.navigate('Agendamentos', {
                          usario: false,
                          idRepublica: item._id
                        });
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                      <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                    </BotaoInteressado>
                  </ViewOpcoes>
                </View>
              )}
              keyExtractor={item => item._id}
              refreshing={reloading}
              onRefresh={getlist}
            />
          </View>
        )}

        {listaCaronas.length != 0 && (
          <View>
            <V_Label>
              <Label>Suas Caronas</Label>
              <BarraSeparacao />
            </V_Label>
            <FlatList
              data={listaCaronas}
              renderItem={({ item }) => (
                <View>
                  <CartaoCarona dados={item} />
                  <ViewOpcoes>
                    <BotaoDelete
                      onPress={() => {
                        setItem(item);
                        setTipo('Carona');
                        setModalConfirmacao(true);
                      }}
                    >
                      <Icon style={{ fontSize: 16, color: '#fff' }} name="close" />
                    </BotaoDelete>

                    <BotaoEditar
                      onPress={() => {
                        editCaronas(item);
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="pencil" />
                      <LabelBotaoEditar>Editar</LabelBotaoEditar>
                    </BotaoEditar>

                    <BotaoInteressado
                      onPress={() => {
                        navigation.navigate('Interessados', {
                          usario: false,
                          idCarona: item._id
                        });
                      }}
                    >
                      <Icon style={{ fontSize: 16, marginRight: 10, color: '#ffffff' }} name="list" />
                      <LabelBotaoEditar>Ver interessados</LabelBotaoEditar>
                    </BotaoInteressado>
                  </ViewOpcoes>
                </View>
              )}
              keyExtractor={item => item._id}
            />
          </View>
        )}
      </ScrollView>
    </Container>
  );
}

export default withNavigation(Anuncios);
