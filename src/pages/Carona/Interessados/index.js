import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import style from './style';
import api from '../../../service/api';
import CartaoUser from '../../../components/CartaoUser';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import { connect, useSelector } from 'react-redux';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import CustomModal from '../../../components/Alert';
import { set } from 'lodash';

export default function Interessados({ navigation }) {
  const email = useSelector(state => state.user.email);

  const [usuarioLogado, setUsuarioLogado] = useState();
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioConfirmado, setUsuarioConfirmado] = useState([]);
  const [reload, setReload] = useState();
  const [idCarona, setIdCarona] = useState(navigation.state.params.idCarona);

  useEffect(() => {
    buscarListaInteressado();
  }, [reload]);

  function buscarListaInteressado() {
    setUsuarios([]);
    console.log(email);
    api
      .get(`/carona/confirmar/${email}`)
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setErro(true);
        setLoading(false);
      });
  }

  function alterarStatusInteressado(number, user) {
    console.log(number);
    setLoading(true);
    if (number === 1) {
      confirmarInteressado(user);
    } else if (number === 0) {
      recusarInteressado(user);
    }
    setReload(!reload);
    setLoading(false);
  }

  function recusarInteressado(user) {
    const data = {
      email: user,
      status: 'Rejeitado',
    };
    console.log(data);
    api
      .put(`/carona/confirmar/${idCarona}`, data)
      .then(response => {
        setLoading(false);
        setReload(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
        console.log("teste" + error);
      });      
      
  }

  function confirmarInteressado(user) {
    const data = {
      email: user,
      status: 'Confirmado',
    };
    api
      .put(`/carona/confirmar/${idCarona}`, data)
      .then(response => {
        setLoading(false);
        setReload(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  return (
    <View style={{ backgroundColor: '#ffffff', width: '100%', height: '100%' }}>
      <HeaderBack title="Solicitações" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      {usuarios.length == 0 && (
        <EmptyState
          titulo="Ah não! "
          mensagem="Sua carona ainda não foi solicitada por nenhum usuário. Aguarde, logo você encontrará um parceiro para sua viagem."
        />
      )}
      <ScrollView>
        <View style={{ widht: '100%', height: 40, paddingHorizontal: 20 }}>
          <Text style={style.subtitulo}>
            Logo abaixo estão listadas as pessoas que demonstraram interesse em viajar com você.
          </Text>
        </View>
        <View style={style.V_label}>
          <Text style={style.label}>Interessados</Text>
          <View style={style.barra} />
        </View>
        <View style={style.Listas}>
          <FlatList
            style={style.flatList}
            data={usuarios}
            renderItem={({ item }) => (
              <View>
                <CartaoUser
                  status={item[0].status}
                  callback={(number, user) => alterarStatusInteressado(number, user)}
                  dados={item[0].user}
                  dadosGerais={item}
                  tipoRetorno="Carona"
                />
                <View style={{ marginTop: 10 }}>
                  {item[0].status == 'Confirmado' && (
                    <View style={style.botaoStatusConf}>
                      <Text style={style.textStatusConf}>Confirmada</Text>
                    </View>
                  )}
                  {item[0].status == 'Análise' && (
                    <View style={style.botaoStatusAna}>
                      <Text style={style.textStatusAna}>Em análise</Text>
                    </View>
                  )}
                  {item[0].status == 'Rejeitado' && (
                    <View style={style.botaoStatusRej}>
                      <Text style={style.textStatusRej}>Rejeitada </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            keyExtractor={item => item[0]._id}
          />
        </View>
      </ScrollView>
      {erro && (
        <CustomModal
          parametro="Erro"
          descricao="Opss! Ocorreu um erro estranho :O"
          callback={() => {
            setErro(false);
          }}
        />
      )}
    </View>
  );
}
