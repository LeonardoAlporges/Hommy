import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import MeusAgendamentosServico from '../../Servicos/MeusAgendamentos';
import MeusAgendamentosRepublica from '../MeusAgendamentos';
import MeusAgendamentosProduto from '../Produtos/MeusAgendamentos';
import {
  Container,
  Subtitulo
} from './styles';

export default function AgendamentoUser({ navigation }) {
  const email = useSelector(state => state.user.email);
  const [listaAgendamentoRepublica, setListaAgendamendoRepublica] = useState([]);
  const [listaAgendamentoProduto, setListaAgendamentoProduto] = useState([]);
  const [listaAgendamentoServico, setListaAgendamentoServico] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    carregarAgendamentoRepublica();
    carregarAgendamentoProduto();
    carregarAgendamentoServico();
  },[]);

  function carregarAgendamentoRepublica() {
    setListaAgendamendoRepublica([]);
    api
      .get(`/agendamento/${email}`)
      .then(response => {
        setListaAgendamendoRepublica(response.data);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function carregarAgendamentoProduto() {
    setListaAgendamentoProduto([]);
    api
      .get(`/produto/agendamento/interessado/${email}`)
      .then(response => {
        console.log("Produto",response);
        setListaAgendamentoProduto(response.data);
      })
      .catch(error => {
        setErro(true);
      });
  }

  function carregarAgendamentoServico() {
    setListaAgendamentoServico([]);
    api
      .get(`/servicos/agendamento/interessado/${email}`)
      .then(response => {
        console.log("Serviço",response)
        setListaAgendamentoServico(response.data);
      })
      .catch(error => {
        setErro(true);
      });
    setLoading(false);
  }

  return (
    <Container>
      <HeaderBack title="Meus agendamentos" onNavigation={() => navigation.goBack(null)} />
      <View style={{ widht: '100%', paddingHorizontal: 20, marginBottom: 10, marginTop: 5 }}>
        <Subtitulo>Fique atento no status das anuncios nas quais você agendou uma visita.</Subtitulo>
      </View>
      {loading && <Loading />}
      {erro && <CustomModal parametro="Erro" callback={() => {setErro(false)}}></CustomModal>}
      {loading && listaAgendamentoRepublica.length == 0 && listaAgendamentoProduto.length == 0 && listaAgendamentoServico.length == 0 &&
        <EmptyState
          titulo="Nada por aqui !"
          mensagem="Você ainda nao agendou nenhuma vista em nenhum anuncio"
        />
      }
      <MeusAgendamentosRepublica agendamentos={listaAgendamentoRepublica} callback={() => carregarAgendamentoRepublica()} />
      <MeusAgendamentosProduto agendamentos={listaAgendamentoProduto} callback={() => carregarAgendamentoProduto()}/>
      <MeusAgendamentosServico agendamentos={listaAgendamentoServico} callback={() => carregarAgendamentoServico()} />
    </Container>
  );
}
