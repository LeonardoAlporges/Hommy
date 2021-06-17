import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';

import api from '../../../service/api';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import HeaderBack from '../../../components/CustomHeader';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import CartaoCarona from '../../../components/CartaoCarona';
import ModalAvaliacao from '../../../components/ModalAvaliacao';

import {
  Container,
  V_Subtitulo,
  V_Label,
  Subtitulo,
  Label,
  BarraSeparacao,
  V_Status,
  V_Confirmado,
  V_Analise,
  V_Rejeitado,
  V_Close,
  LabelAnalise,
  LabelRejeitado,
  LabelConfirmado
} from './style';

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

  useEffect(() => { buscarListaCaronaInteressada() }, [])

  function avaliarMotorista(item) {
    setEmailAvaliado(item.userEmail);
    setNomeAvaliado(item.nome);
    setModalAvaliacao(true);
  }

  function removerInteresse(valor, idCarona) {
    if (valor == 0 || valor == 3) {
      return null;
    }
    console.log("REMOVENDO :",valor,idCarona);
    return api
      .delete(`/carona/meusInteresses/${idCarona}`, {
        data: { email: emailUsuario }
      })
      .then(response => {
        console.log("OK:",response);
        buscarListaCaronaInteressada();
        setListaCarona([]);
        setLoading(false);
      })
      .catch(error => {
        console.log("ERRO:",error.response);
        setLoading(false);
      });
  }

  function buscarListaCaronaInteressada() {
    console.log("NOVA BUSCA")
    return api
      .get(`/carona/meusInteresses/${emailUsuario}`)
      .then(response => {
        console.log("NOVA OK :",response)
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
      actions: [NavigationActions.navigate({ routeName: rota })]
    });

    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <HeaderBack title="Meus interesses" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      {listaCarona.length == 0 && (
        <EmptyState
          titulo="Você não demonstrou interesse em caronas recentemente."
          mensagem="Vamos nessa! Navegue pelo aplicativo e encontre alguém com quem possa viajar."
        />
      )}
      {listaCarona.length != 0 && (
        <View>
          <V_Subtitulo>
            <Subtitulo>Gerencie as caronas nas quais você solicitou uma visita.</Subtitulo>
          </V_Subtitulo>
          <V_Label>
            <Label>Seus interesses</Label>
            <BarraSeparacao />
          </V_Label>
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

      <ScrollView>
        <FlatList
          data={listaCarona}
          renderItem={({ item }) => (
            <View>
              <CartaoCarona dados={item.carona} />
              <V_Status>
                {item.status == 'Análise' && (
                  <V_Analise>
                    <LabelAnalise>Em análise</LabelAnalise>
                  </V_Analise>
                )}
                {item.status == 'Confirmado' && (
                  <V_Confirmado>
                    <LabelConfirmado>Confirmada</LabelConfirmado>
                  </V_Confirmado>
                )}
                {item.status == 'Rejeitado' && (
                  <V_Rejeitado>
                    <LabelRejeitado>Rejeitada </LabelRejeitado>
                  </V_Rejeitado>
                )}
                <V_Close
                  onPress={() => {
                    setModalDesinteresse(true);
                    setIdCarona(item.carona._id);
                  }}
                >
                  <Icon style={{ fontSize: 20 }} name="close" />
                </V_Close>
              </V_Status>
            </View>
          )}
        />
      </ScrollView>
      {/* {modalAvaliacao && (
        <ModalAvaliacao nome={nomeAvaliado} email={emailAvaliado} retornoModal={() => fecharModalAvaliacao()} />
      )} */}
    </Container>
  );
}
