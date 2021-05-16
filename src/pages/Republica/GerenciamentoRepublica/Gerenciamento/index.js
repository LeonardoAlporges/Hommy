import AsyncStorage from '@react-native-community/async-storage';
import { DatePicker, Input, Item, Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import HeaderBack from '../../../../components/CustomHeader';
import api from '../../../../service/api';
import Contas from '../Contas'
import Membros from '../Membros';
import Tarefas from '../Tarefas'
import {
  Container,
  Apresentacao,
  DadosView,
  Icone,
  SubTitulo,
  Titulo,
  LabelView,
  IconeView,
  IconeDelete,
} from './styles';

export default function Gerenciamento(props, { navigation }) {
  // const moment = require('moment');
  // moment.locale('pt', {
  //   months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  // });
  // const [codigoRepublica, setCodigoRepublica] = useState();
  // const anoCorrente = moment().format('YYYY');
  // const [idRepublica, setIdRepublica] = useState();
  // const email = useSelector(state => state.user.email);
  // const [adiconarContaButao, setAdiconarContaButao] = useState(true);
  // const [adiconarTarefaButao, setAdiconarTarefaButao] = useState(true);
  // const [nomeTarefa, setNomeTarefa] = useState('');
  // const [emailMebroSelecionado, setEmailMebroSelecionado] = useState('');
  // const [existeRepublica, setExisteRepublica] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [nomeRepublica, setNomeRepublica] = useState('');
  // const [valorConta, setValorConta] = useState('');
  // const [nomeConta, setNomeConta] = useState('');
  // const [erro, setErro] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [dataVencimento, setDataVencimento] = useState(new Date());
  // const [listaDeContas, setListaDeContas] = useState([]);
  // const [listaDeMebros, setListaDeMebros] = useState([]);
  // const [listaDeTarefas, setListaDeTarefas] = useState([]);
  // const [republica, setRepublica] = useState();
  // const [emailMembroConvite, setEmailMembroConvite] = useState();
  // const [mesSelecionado, setMesSelecionado] = useState(moment().format('MMMM'));
  // const [valorGeralContas, setValorGeralContas] = useState(0);
  // const [adiconarMembroButao, setAdiconarMembroButao] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [idTipoSelecionado, setIdTipoSelecionado] = useState();
  // const [tipoDeInformacao, setTipoDeInformacao] = useState();
  // const [responsavelTarefa, setResponsavelTarefa] = useState();

  //const screenHeight = Dimensions.get('window').height;

  function excluirRepublica() {
    api
      .delete(`/gerenciaRepublica/${idRepublica}`)
      .then(response => {
        setExisteRepublica(false);
      })
      .catch(error => {
        setErro(true);
      });
  }
  return (
    <Container altura={Dimensions.get('window').height} >
      <HeaderBack title="Gerenciamento de republica" onNavigation={() => navigation.goBack(null)} />
      <Apresentacao>
        <IconeView>
          <Icone name="home" />
        </IconeView>
        <LabelView>
          <SubTitulo>
            Republica
          </SubTitulo>
          <Titulo>
            Só Fadinha
          </Titulo>

        </LabelView>
        <IconeView>
          <IconeDelete name="trash" />
        </IconeView>
      </Apresentacao>
      <ScrollView  style={{marginBottom:'5%'}}>
        <Contas></Contas>
        <Tarefas></Tarefas>
        <Membros></Membros>
      </ScrollView>


    </Container>
  );
}
