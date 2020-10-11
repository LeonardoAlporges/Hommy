import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';

import api from '../../../service/api';
import Cartao from '../../../components/Cartao';
import { withNavigation } from 'react-navigation';
import EmptyState from '../../../components/EmptyState';
import HeaderBack from '../../../components/CustomHeader';
import CustomModal from '../../../components/Alert';
import Loading from '../../../components/Loading';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import CartaoCarona from '../../../components/CartaoCarona';

import {
  Container,
  V_Subtitulo,
  Subtitulo,
  BarraSeparacao,
  ViewOpcoes,
  BotaoDelete,
  BotaoEditar,
  BotaoInteressado,
  LabelBotaoEditar,
  V_Label,
  Label
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
          console.log(error);
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
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
    api
      .get(`/userRepublica/${email}`)
      .then(responseJson => {
        setListaRepublicas(responseJson.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
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
      {loading && <Loading />}
      {listaCaronas.length == 0 && listaRepublicas.length == 0 && (
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
      <HeaderBack title="Meus anúncios" onNavigation={() => navigation.goBack(null)} />
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
