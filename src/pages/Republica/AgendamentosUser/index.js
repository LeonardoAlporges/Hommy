import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import CartaoProdutos from '../../../components/CartaoProdutos';
import { CartaoServico } from '../../../components/CartaoServico';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalAvaliacao from '../../../components/ModalAvaliacao';
import ModalConfirmacao from '../../../components/ModalConfirmacao';
import api from '../../../service/api';
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
  Subtitulo,
  ViewData,
  ViewDetalhes,
  ViewLabel
} from './styles';

export default function AgendamentoUser({ navigation }) {
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

  useEffect(() => {
    carregarMeusAgendamentos();
  }, [reload]);

  function carregarMeusAgendamentos() {
    api
      .get(`/agendamento/${email}`)
      .then(response => {
        console.log(response.data)
        setListaAgendamendo(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });

    api
      .get(`/produto/agendamento/interessado/${email}`)
      .then(response => {
        console.log("Response", response)
        setListaAgendamentoProduto(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });

    api
      .get(`/servicos/agendamento/interessado/${email}`)
      .then(response => {
        setListaAgendamentoServico(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }


  function removerMeuAgendamento(valorRetorno, idRepublica) {
    if (valorRetorno == 3) {
      return null;
    }
    return api
      .delete(`/agendamento/${idRepublica}`, {
        data: { email: email }
      })
      .then(response => {
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function removerMeuAgendamentoProduto(valorRetorno, idproduto) {
    if (valorRetorno == 3) {
      return null;
    }
    return api
      .delete(`/produto/agendamento/${idproduto}`)
      .then(response => {
        console.log(response)
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function removerMeuAgendamentoServico(valorRetorno, idServico) {
    if (valorRetorno == 3) {
      return null;
    }
    return api
      .delete(`/servicos/agendamento/${idServico}`)
      .then(response => {
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function abrirAvaliacao(usuario) {
    setAvaliar(true);
    console.log("TESTE",usuario);
    setUsuarioAvaliado(usuario);
  }

  return (
    <Container>
      <HeaderBack title="Meus agendamentowedaws" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}

      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            if (republicaID != null) {
              removerMeuAgendamento(valor, republicaID);
            } else if (produtoID != null) {
              removerMeuAgendamentoProduto(valor, produtoID);
            } else if (produtoID != null) {
              removerMeuAgendamentoServico(valor, servicoID)
            }

            setModalRemocaoAgendamento(false);
          }}
          titulo="Cancelar visita?"
          mensagem="A pessoa responsável pela república será notificada da sua desistência."
          botaoCancel="Não"
          botaoConfirmar="Sim"
          mensagem="Deseja deletar esse Agendamento ?"
          confirmar={true}
        />
      )}
      {listaAgendamento.length == 0 && listaAgendamentoProduto.length == 0 && listaAgendamentoServico.length == 0 && !loading && (
        <EmptyState
          titulo="Você não possui visitas agendadas."
          mensagem="O que está esperando? Navegue pelo aplicativo e encontre uma vaga na república ideal. "
        />
      )}
      <View style={{ widht: '100%', height: 20, paddingHorizontal: 20, marginBottom: 10, marginTop: 5 }}>
        <Subtitulo>Fique atento no status das anuncios nas quais você agendou uma visita.</Subtitulo>
      </View>
      {/*---------------- Agendamentos Republica ------------------------*/}
      <ViewLabel>
        <Label>Republicas</Label>
        <Barra />
      </ViewLabel>
      {listaAgendamento.length != 0 &&
        <FlatList
          data={listaAgendamento}
          renderItem={({ item }) => (
            <View>
              <Cartao data={item.republica} interessado />
              <ViewData>
                {item.status == 'Análise' && (
                  <Analise>
                    <LabelData>{item.status}</LabelData>
                  </Analise>
                )}
                {item.status == 'Confirmado' && (
                  <Confirmado>
                    <LabelConfirmacao>{item.status}</LabelConfirmacao>
                  </Confirmado>
                )}
                {item.status == 'Rejeitado' && (
                  <Rejeitado>
                    <LabelReijeicao>{item.status}</LabelReijeicao>
                  </Rejeitado>
                )}
                {item.status == 'Finalizado' && (
                  <Finalizado>
                    <LabelFinalizado onPress={() => { 
                     
                      abrirAvaliacao(item.user.email) 
                      }}>Avaliar Anunciante  </LabelFinalizado>
                  </Finalizado>
                )}

                {item.status != 'Finalizado' && (
                  <View style={style.viewData2}>
                    <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                    <Text>As</Text>
                    <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
                  </View>
                )}
                <TouchableOpacity
                  style={{ width: 30, height: 30, justifyContent: 'center' }}
                  onPress={() => {
                    setRepublicaID(item.republica._id);
                    setModalRemocaoAgendamento(true);
                  }}
                >
                  <Icon name="close" style={style.iconDel} />
                </TouchableOpacity>
            </ViewData>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      }
      {/*---------------- Agendamentos Produtos ------------------------*/}
      <ViewLabel>
        <Label>Produtos</Label>
        <Barra />
      </ViewLabel>

      <FlatList
        data={listaAgendamentoProduto}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View >
            <CartaoProdutos dados={item.produto} />
            <ViewData>
              {item.status == 'Análise' && (
                <Analise>
                  <LabelData>{item.agenda.status}</LabelData>
                </Analise>
              )}
              {item.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>{item.agenda.status}</LabelConfirmacao>
                </Confirmado>
              )}
              {item.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>{item.agenda.status}</LabelReijeicao>
                </Rejeitado>
              )}{item.status == 'Finalizado' && (
                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.produto.userEmail) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
              )} {item.status != 'Finalizado' && (
                <View style={style.viewData2}>
                  <LabelData>{moment(item.agenda.data).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(item.agenda.hora).format('hh:mm')}</LabelData>
                </View>)}
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

      {/*---------------- Agendamentos Serviço ------------------------*/}
      <ViewLabel>
        <Label>Serviços</Label>
        <Barra />
      </ViewLabel>

      <FlatList
        data={listaAgendamentoServico}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View >
            <CartaoServico dados={item.servico} />
            <ViewData>
              {item.status == 'Análise' && (
                <Analise>
                  <LabelData>{item.agenda.status}</LabelData>
                </Analise>
              )}
              {item.status == 'Confirmado' && (
                <Confirmado>
                  <LabelConfirmacao>{item.agenda.status}</LabelConfirmacao>
                </Confirmado>
              )}
              {item.status == 'Rejeitado' && (
                <Rejeitado>
                  <LabelReijeicao>{item.agenda.status}</LabelReijeicao>
                </Rejeitado>
              )}{item.status == 'Finalizado' && (
                <Finalizado>
                  <LabelFinalizado onPress={() => { abrirAvaliacao(item.servico.userEmail) }}>Avaliar Anunciante</LabelFinalizado>
                </Finalizado>
              )}
              {item.status != 'Finalizado' && (
                <View style={style.viewData2}>
                  <LabelData>{moment(item.agenda.data).format('DD/MM/YY')}</LabelData>
                  <Text>As</Text>
                  <LabelData>{moment(item.agenda.hora).format('hh:mm')}</LabelData>
                </View>
              )}
              <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center' }}
                onPress={() => {
                  setServicoID(item.servico._id);
                  setModalRemocaoAgendamento(true);
                }}
              >
                <Icon name="close" style={style.iconDel} />
              </TouchableOpacity>
            </ViewData>
          </View>
        )}
        keyExtractor={item => item.servico._id}
      />
      {erro && (
        <ViewDetalhes>
          <CustomModal
            parametro="Erro"
            callback={() => {
              setErro(false);
            }}
          />
        </ViewDetalhes>
      )}
      {avaliar && (
        <ModalAvaliacao usuario={usuarioAvaliado}></ModalAvaliacao>
      )}
    </Container>
  );
}
