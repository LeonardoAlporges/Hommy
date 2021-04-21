import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import CustomModal from '../../../../components/Alert';
import CartaoProdutos from '../../../../components/CartaoProdutos';
import Loading from '../../../../components/Loading';
import ModalAvaliacao from '../../../../components/ModalAvaliacao';
import ModalConfirmacao from '../../../../components/ModalConfirmacao';
import api from '../../../../service/api';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


import style, {
  Analise,
  Barra,
  Confirmado,
  Container,
  Finalizado, Label,
  LabelConfirmacao,
  LabelData,
  LabelFinalizado,
  LabelReijeicao,
  Rejeitado,
  ViewData,
  ViewLabel
} from './styles';

export default function MeusAgendamentosProduto(props) {
  const email = useSelector(state => state.user.email);
  const [listaAgendamento, setListaAgendamendo] = useState([]);
  const [listaAgendamentoProduto, setListaAgendamentoProduto] = useState([]);
  const [listaAgendamentoServico, setListaAgendamentoServico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [republicaID, setRepublicaID] = useState(null);
  const [produtoID, setProdutoID] = useState(null);
  const [servicoID, setServicoID] = useState(null);
  const [reload, setReload] = useState();
  const [avaliar, setAvaliar] = useState(false);
  const [usuarioAvaliado, setUsuarioAvaliado] = useState('');

 
  function removerMeuAgendamentoProduto(valorRetorno, idproduto) {
    
    return api
      .delete(`/produto/agendamento/${idproduto}`)
      .then(response => {
        
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }


  function abrirAvaliacao(usuario) {
    setAvaliar(true);
    setUsuarioAvaliado(usuario);
  }

  return (
    <Container>
      <ViewLabel>
        <Label>Produtos</Label>
        <Barra />
      </ViewLabel>
      <FlatList
        data={props.agendamentos}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View>
            <CartaoProdutos dados={item.produto} />
            <ViewData>
              {item.agenda.status == 'Análise' && 
                <Analise>
                  <LabelData>{item.agenda.status}</LabelData>
                </Analise>
              }
              {item.agenda.status == 'Confirmado' && 
                <Confirmado>
                  <LabelConfirmacao>{item.agenda.status}</LabelConfirmacao>
                </Confirmado>
              }
              {item.agenda.status == 'Rejeitado' && 
                <Rejeitado>
                  <LabelReijeicao>{item.agenda.status}</LabelReijeicao>
                </Rejeitado>
              } 
               {item.agenda.status == 'Finalizado' && 
                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.produto.userEmail) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
              }
              {item.agenda.status != 'Finalizado' && 
                <View style={style.viewData2}>
                  <LabelData>{moment(item.agenda.data).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(item.agenda.hora).format('hh:mm')}</LabelData>
                </View>
              }
              <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center' }}
                onPress={() => {
                  setProdutoID(item.produto._id);
                  setModalRemocaoAgendamento(true);
                }}
              >
                <Icon name="close" style={style.iconDel} />
              </TouchableOpacity>
            </ViewData> 
          </View>
        )}
        keyExtractor={item => item.produto._id}
      />
      {loading && <Loading />}
      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            removerMeuAgendamentoProduto(valor, produtoID);
            setModalRemocaoAgendamento(false);
          }}
          titulo="Cancelar visita?"
          mensagem="A pessoa responsável pelo produto será notificada da sua desistência."
          botaoCancel="Não"
          botaoConfirmar="Sim"
          confirmar={true}
        />
      )}
      {erro && <CustomModal parametro="Erro" callback={() => { setErro(false) }} />}
      {avaliar && <ModalAvaliacao usuario={usuarioAvaliado} />}
    </Container>
  );
}

