import React, { useEffect, useState } from 'react';
import { View, Modal } from 'react-native';
import Estilos from './style';

import { Container, Imagem, Titulo, Descricao, Botao, LabelBotao } from './style';

export default function CustomModal(props) {
  const [modalVisivel, setModalVisivel] = useState(props.visivel);
  const [icone, setIcone] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [botao, setBotao] = useState();
  const [imagem, setImagem] = useState();

  function callback() {
    props.callback();
  }

  function navegar() {
    setModalVisivel(false);
    callback();
    if (props.onAction != null) {
      props.onAction();
    }
  }

  function verificarImagem() {
    if (imagem == '') {
      setIcone(require('../../assets/Img/Succes.png'));
    } else if (imagem == 'NaoEncontrado') {
      setIcone('../../assets/Img/Nao_Encontrado.png');
    } else if (imagem == 'EnvieImagem') {
      setIcone(require('../../assets/Img/Enviar_Foto.png'));
    } else if (imagem == 'Faltando') {
      setIcone(require('../../assets/Img/Vazio.png'));
    }
  }
  function verificarParametro() {
    if (props.parametro == 'Custom') {
      if (props.imagem == '' || !props.imagem) {
        setIcone(require('../../assets/Img/Succes.png'));
      }
      setTitulo(props.titulo);
      setDescricao(props.descricao);
      setBotao(props.botao);
    }
    if (props.parametro == 'Sucesso') {
      setIcone(require('../../assets/Img/Succes.png'));
      setTitulo('Tudo certo!');
      setDescricao('Concluído com sucesso');
      setBotao('Ok');
    }
    if (props.parametro == 'Erro') {
      setIcone(require('../../assets/Img/Fail_Connection.png'));
      setTitulo('OOPS!');
      setDescricao(props.descricao);
      setBotao('Voltar');
      if (!props.descricao) {
        setDescricao('Alguma coisa deu errado. Por favor, verifique sua conexão com a internet.');
      }
    }
  }
  useEffect(() => {
    verificarImagem();
    verificarParametro();
  }, []);

  return (
    <Modal animationType="fade" visible={modalVisivel} transparent={true}>
      <Container>
        <View style={Estilos.ViewModal}>
          <Imagem source={icone} />
          <Titulo>{titulo}</Titulo>
          <Descricao>{descricao}</Descricao>
          <Botao
            onPress={async () => {
              navegar();
            }}
          >
            <LabelBotao>{botao}</LabelBotao>
          </Botao>
        </View>
      </Container>
    </Modal>
  );
}
