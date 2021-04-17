import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import ModalConfirmacao from '../../components/ModalConfirmacao';
import style, {
  AceiteIcon, Container,

  Imagem,

  Nome,

  Nota,


  RejeiteIcon, ViewIcones, ViewImagem,

  ViewNome,

  ViewNota
} from './style';



export default function CartaoUser(props) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const [rejeitar, setRejeitar] = useState(false);
  const emailUser = useSelector(state => state.user.email);

  function retorno(number) {
    props.retorno(number, props.dados.email);
  }

  function retornoCarona(number) {
    props.retornoCarona(number, props.dados.email);
  }

  function retornoProduto(number) {
    props.retornoProduto(number, props.dados.email);
  }

  function retornoServico(number) {
    props.retornoServico(number, props.dados.email);
  }

  function mudarStatusInteressado(number) {
    if (number == 3) {
      setModalVisivel(false);
    }
    if (props.tipoRetorno == 'Republica') {
      retorno(number);
      props.callback();
    } else if (props.tipoRetorno == 'Carona') {
      retornoCarona(number);
      props.callback();
    } else if (props.tipoRetorno == 'Produto') {
      retornoProduto(number);
      props.callback();
    } else if (props.tipoRetorno == 'Servico') {
      retornoServico(number);
      props.callback();
    }
  }

  return (
    <Container>
      <View style={style.card}>
        <ViewImagem>
          <Imagem
            source={{
              uri: props.dados.fotoPerfil
            }}
          />
        </ViewImagem>

        <ViewNome>
          <Nome numberOfLines={2}>{props.dados.nome}</Nome>
        </ViewNome>
        <ViewNota>
          <Icon name="star" style={{ fontSize: 14, color: '#142850' }} />
          <Nota>{props.dados.nota}</Nota>
        </ViewNota>
        <ViewIcones>
          {props.status != 'Confirmado' && props.status != 'Rejeitado' && (
            <TouchableOpacity
              onPress={() => {
                setMensagem('Deseja confirmar ?');
                setConfirmar(true);
                setModalVisivel(true);
              }}
            >
              <AceiteIcon name="check" />
            </TouchableOpacity>
          )}
          {props.status != 'Rejeitado' && (
            <TouchableOpacity
              onPress={() => {
                setMensagem('Deseja rejeitar ?');
                setRejeitar(true);
                setModalVisivel(true);
              }}
            >
              <RejeiteIcon name="close" />
            </TouchableOpacity>
          )}
        </ViewIcones>

        {modalVisivel && (
          <ModalConfirmacao
            retornoModal={valor => mudarStatusInteressado(valor)}
            titulo={mensagem}
            botaoCancel="Cancelar"
            botaoConfirmar="Sim"
            rejeitar={rejeitar}
            confirmar={confirmar}
          />
        )}
      </View>
    </Container>
  );
}
