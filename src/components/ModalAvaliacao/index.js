import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import api from '../../service/api';
import Estilos, { Avaliacao, Avalie, Botao, Container, Icones, LabelBotao, Start, TipoAvaliacao, Toque } from './styles';


export default function ModalAvaliacao(props) { 
  return (
    <View>
       <ModalUsuario user={props.usuario} />
    </View>
  );
}

export function ModalUsuario(props) {

  const [n1, setN1] = useState(false);
  const [n2, setN2] = useState(false);
  const [n3, setN3] = useState(false);
  const [n4, setN4] = useState(false);
  const [n5, setN5] = useState(false);
  const [nota, setNota] = useState(0);
  const [modalVisivel,setModalVisivel]= useState(true); 

  function limparAnterior(){
    setN1(false);
    setN2(false);
    setN3(false);
    setN4(false);
    setN5(false);
    setNota(0);
  }

  function onClick(number) {
    limparAnterior();

    if (number >= 1) {
      setN1(true);
      setNota(1);
    }
    if (number >= 2) {
      setN2(true);
      setNota(2);
    }
    if (number >= 3) {
      setN3(true);
      setNota(3);
    }
    if (number >= 4) {
      setN4(true);
      setNota(4);
    }
    if (number >= 5) {
      setN5(true);
      setNota(5);
    }
  } 

  function avaliar() {
    api
    .put(`/userNota/${props.usuario}`, { nota: nota })
    .then(responseJson => { })
    .catch(error => { });
  
    setModalVisivel(false)
  } 


  return (
    <Modal animationType="fade" visible={modalVisivel} transparent={true}>
      <Container>
        <View style={Estilos.ViewModal}>
          <Avalie>Avalie o Representante do Anuncio</Avalie>
          <Avaliacao>
            <TipoAvaliacao>Pessimo</TipoAvaliacao>
            <TipoAvaliacao>Muito Bom</TipoAvaliacao>
          </Avaliacao>
          <Icones>
            <Toque onPress={() => onClick(1) }>
              <Start name="star" active={n1}/>
            </Toque>
            <Toque onPress={() => onClick(2) }>
              <Start name="star" active={n2}/>
            </Toque>
            <Toque onPress={() => onClick(3) }>
              <Start name="star" active={n3}/>
            </Toque>
            <Toque onPress={() => onClick(4) }>
              <Start name="star" active={n4}/>
            </Toque>
            <Toque onPress={() => onClick(5) }>
              <Start name="star" active={n5}/>
            </Toque>
          </Icones>
          <Botao onPress={() => enviarRetorno() }>
            <LabelBotao>Avaliar</LabelBotao>
          </Botao>
        </View>
      </Container>
    </Modal>
  );

}