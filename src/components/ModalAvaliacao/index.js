import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import api from '../../service/api';

import style from './styles';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function ModalAvaliacao(props) {
  const [n1, setN1] = useState(false);
  const [n2, setN2] = useState(false);
  const [n3, setN3] = useState(false);
  const [n4, setN4] = useState(false);
  const [n5, setN5] = useState(false);
  const [valor, setValor] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(true);


  atualizarCor = valor => {
    if (valor == 1) {
      setN1(true);
      setValor(valor);
    }
    if (valor == 2) {
      setN2(true);
      setValor(valor);
    }
    if (valor == 3) {
      setN3(true);
      setValor(valor);
    }
    if (valor == 4) {
      setN4(true);
      setValor(valor);
    }
    if (valor == 5) {
      setN5(true);
      setValor(valor);
    }
  };

  Avaliar = () => {
    api
      .put(`/userNota/${props.email}`, { nota: valor })
      .then(responseJson => { })
      .catch(error => { });
    setModalVisivel(true), props.retornoModal();
  };
    return (
      <Modal
        animationType="fade"
        visible={modalVisivel}
        transparent={true}
        onRequestClose={() => {
          setModalVisivel(false)
        }}
        onDismiss={() => {
          setModalVisivel(false)
        }}
      >
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Text style={style.titulo}>Avalie {props.nome}</Text>
            <View style={style.tipoAva}>
              <Text style={style.descricao}> Pessimo</Text>
              <Text style={style.descricao}> Muito bom</Text>
            </View>
            <View style={style.iconesAva}>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  atualizarCor(1);
                }}
              >
                {valor > 0 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                    <Icon name="star" style={style.icon} />
                  )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  atualizarCor(2);
                }}
              >
                {valor > 1 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                    <Icon name="star" style={style.icon} />
                  )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  atualizarCor(3);
                }}
              >
                {valor > 2 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                    <Icon name="star" style={style.icon} />
                  )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  atualizarCor(4);
                }}
              >
                {valor > 3 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                    <Icon name="star" style={style.icon} />
                  )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  atualizarCor(5);
                }}
              >
                {valor > 4 ? (
                  <Icon name="star" style={style.iconActive} />
                ) : (
                    <Icon name="star" style={style.icon} />
                  )}
              </TouchableOpacity>
            </View>

            <Button
              style={style.botao}
              onPress={async () => {
                Avaliar();
              }}
            >
              <Text style={style.botaoTxt}>Confirmar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
