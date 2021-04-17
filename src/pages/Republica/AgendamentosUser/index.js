import moment from 'moment';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import CartaoProdutos from '../../../components/CartaoProdutos';
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
  Label,
  LabelConfirmacao,
  LabelData,
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
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [modalRemocaoAgendamento, setModalRemocaoAgendamento] = useState(false);
  const [republicaID, setRepublicaID] = useState(null);
  const [produtoID, setProdutoID] = useState(null);
  const [reload, setReload] = useState();
  const [avaliar,setAvaliar] = useState(false);
  const [tipoAvaliacao,setTipoAvaliacao] = useState('');

  useEffect(() => {
    carregarMeusAgendamentos();
  }, [reload]);

  function carregarMeusAgendamentos() {
    setListaAgendamendo([]);
    api
      .get(`/agendamento/${email}`)
      .then(response => {
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
        setReload(!reload);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function abrirAvaliacao(tipo){
    setAvaliar(true);
    setTipoAvaliacao(tipo);
  }

  return (
    <Container>
      <HeaderBack title="Meus agendamentos" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}

      {modalRemocaoAgendamento && (
        <ModalConfirmacao
          retornoModal={valor => {
            if (republicaID != null) {
              removerMeuAgendamento(valor, republicaID);
            } else if (produtoID != null) {
              removerMeuAgendamentoProduto(valor, produtoID);
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
      {listaAgendamento.length == 0 && listaAgendamentoProduto.length == 0 && !loading && (
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
          <View style={{ flex: 1 }}>
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
                <Confirmado>
                  <LabelConfirmacao>{item.status}</LabelConfirmacao>
                </Confirmado>
              )}

              {item.status != 'Finalizado' ? (
                <View>
                  <View style={style.viewData2}>
                    <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                    <Text>As</Text>
                    <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
                  </View>

                  <TouchableOpacity
                    style={{ width: 30, height: 30, justifyContent: 'center' }}
                    onPress={() => {
                      setRepublicaID(item.republica._id);
                      setModalRemocaoAgendamento(true);
                    }}
                  >
                    <Icon name="close" style={style.iconDel} />
                  </TouchableOpacity>
                </View> ) 
                :
                (
                <View >
                    <TouchableOpacity
                      style={{ width:100, height: 30, justifyContent: 'center',alignItems:'center', flexDirection: 'row',backgroundColor:'yellow',borderRadius:10 }}
                      onPress={() => {
                        abrirAvaliacao('republica');
                      }}
                    >
                      <Text style={{ fontSize: 16, fontFamily: 'WorkSans', color: '#000',marginRight:10}}>Avaliar</Text>
                      <Icon name="star" style={style.iconDel} />
                    </TouchableOpacity>

                </View>
              )}
            </ViewData>
          </View>
        )}
        keyExtractor={item => item._id}
      />
                    }
      {/*---------------- Agendamentos Produtos ------------------------*/}
      <ViewLabel>
        <Label>Protutos</Label>
        <Barra />
      </ViewLabel>

      <FlatList
        data={listaAgendamentoProduto}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
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
              )}

              <View style={style.viewData2}>
                <LabelData>{moment(new Date(item.agenda.data)).format('DD/MM/YY')}</LabelData>
                <Text>As</Text>
                <LabelData>{moment(new Date(item.agenda.hora)).format('hh:mm')}</LabelData>
              </View>

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

      {/* <FlatList
        data={listaAgendamentoServiços}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <CartaoProdutos data={item.republica} />
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

              <View style={style.viewData2}>
                <LabelData>{moment(new Date(item.data)).format('DD/MM/YY')}</LabelData>
                <Text>As</Text>
                <LabelData>{moment(new Date(item.hora)).format('hh:mm')}</LabelData>
              </View>

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
      /> */}
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
        <ModalAvaliacao tipo={tipoAvaliacao}></ModalAvaliacao>
      )}
    </Container>
  );
}
