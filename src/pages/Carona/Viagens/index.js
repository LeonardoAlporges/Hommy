import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, ScrollView } from 'react-native';

import style from './style';
import { Button } from 'native-base';
import api from '../../../service/api';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import HeaderBack from '../../../components/CustomHeader';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import CartaoCarona from '../../../components/CartaoCarona';
import ModalAvaliacao from '../../../components/ModalAvaliacao';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';

export default function Viagens({ navigation }) {
  const emailUsuario = useSelector(state => state.user.email);
  const [reload, setReload] = useState(false);
  const [listaCarona, setListaCarona] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAvaliacao, setModalAvaliacao] = useState(false);
  const [botaoAvaliacao, setBotaoAvaliacao] = useState(false);
  const [nomeAvaliado, setNomeAvaliado] = useState();
  const [emailAvaliado, setEmailAvaliado] = useState();
  const [modalDesinteresse, setModalDesinteresse] = useState(false);
  const [idCarona, setIdCarona] = useState();
  useEffect(() => {
    setListaCarona([]);
    buscarListaCaronaInteressada();
  }, [reload]);

  function avaliarMotorista(item) {
    setEmailAvaliado(item.userEmail);
    setNomeAvaliado(item.nome);
    setModalAvaliacao(true);
  }

  function removerInteresse(valor, idCarona) {
    if (valor == 0 || valor == 3) {
      return null;
    }
    setLoading(true);
    return api
      .delete(`/carona/meusInteresses/${idCarona}`, {
        data: { email: emailUsuario },
      })
      .then(response => {
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }

  function buscarListaCaronaInteressada() {
    return api
      .get(`/carona/meusInteresses/${emailUsuario}`)
      .then(response => {
        setListaCarona(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }

  function fecharModalAvaliacao() {
    setModalAvaliacao(false);
    setBotaoAvaliacao(false);
  }
  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
    });

    navigation.dispatch(resetAction);
  }

  return (
    <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
      <HeaderBack title="Meus interesses" onNavigation={() => resetarPilhaNavegacao('TabsHeader')} />
      {loading && <Loading />}
      {listaCarona.length == 0 && (
        <View style={{ backgroundColor: '#fff' }}>
          <EmptyState
            titulo="Você não demonstrou interesse em caronas recentemente."
            mensagem="Vamos nessa! Navegue pelo aplicativo e encontre alguém com quem possa viajar."
          />
        </View>
      )}
      {listaCarona.length != 0 && (
        <View>
          <View style={{ widht: '100%', marginTop: 10, marginBottom: 10, height: 20, paddingHorizontal: 20 }}>
            <Text style={style.subtitulo}>Gerencie as caronas nas quais você solicitou uma visita.</Text>
          </View>
          <View style={style.V_label}>
            <Text style={style.label}>Seus interesses</Text>
            <View style={style.barra} />
          </View>
        </View>
      )}
      {modalDesinteresse && (
        <ModalConfirmacao
          retornoModal={valor => {
            removerInteresse(valor, idCarona);
            setModalDesinteresse(false);
          }}
          titulo=" Cancelar carona?"
          mensagem="O motorista será notificado de que você não possui mais interesse em viajar com ele."
          botaoConfirmar="Sim"
          botaoCancel="Não"
          confirmar={true}
        />
      )}

      <ScrollView style={style.card}>
        <FlatList
          style={style.flatList}
          data={listaCarona}
          renderItem={({ item }) => (
            <View>
              <CartaoCarona dados={item.carona} />
              <View style={style.ViewStatus}>
                {item.status == 'Análise' && (
                  <View style={style.Analise}>
                    <Text style={style.data}>Em análise</Text>
                  </View>
                )}
                {item.status == 'Confirmado' && (
                  <View style={style.Confirmado}>
                    <Text style={style.dataConf}>Confirmada</Text>
                  </View>
                )}
                {item.status == 'Rejeitado' && (
                  <View style={style.Rejeitado}>
                    <Text style={style.dataRej}>Rejeitada </Text>
                  </View>
                )}
                {item.status == 'Realizada' && (
                  <View style={style.V_Botao}>
                    <Button
                      disabled={!botaoAvaliacao}
                      style={style.botao}
                      onPress={() => {
                        avaliarMotorista(item);
                      }}
                    >
                      <Icon name="star" style={style.icon} />
                      <Text style={style.title}>Avaliar carona</Text>
                    </Button>
                  </View>
                )}
                <TouchableOpacity
                  style={style.ViewBotaoClose}
                  onPress={() => {
                    setModalDesinteresse(true);
                    setIdCarona(item.carona._id);
                  }}
                >
                  <Icon style={style.iconeClose} name="close" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
      {modalAvaliacao && (
        <ModalAvaliacao nome={nomeAvaliado} email={emailAvaliado} retornoModal={() => fecharModalAvaliacao()} />
      )}
    </View>
  );
}
