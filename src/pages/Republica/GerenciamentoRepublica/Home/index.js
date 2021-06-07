import { Formik } from 'formik';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input, Item } from 'native-base';

import CurrencyInput from 'react-native-currency-input';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInputMask from 'react-native-text-input-mask';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';
import Loading from '../../../../components/Loading';
import api from '../../../../service/api';
import { imagePickerOptions, uploadFileToFireBaseRepublicaEventos } from '../../../../utils';
import estilo, {
  CadastroView,
  Container,
  EntraCodigoView,
  Apresentacao,
  DadosView,
  Icone,
  SubTitulo,
  Titulo,
  LabelView,
  IconeView,
  Linha, FieldSetLarge, LabelFielSet, BotaoView, Botao, LabelBotao, Separador
} from './styles';

export default function GerenciamentoRepublica({ navigation }) {
  const emailUser = useSelector(state => state.user.email);
  const [erro, setErro] = useState(false);
  const [nomeRepublica, setNomeRepublica] = useState('');
  const [codigoRepublica, setCodigoRepublica] = useState('');
  const [loading, setLoading] = useState(true);
  const [existeRepublica, setJaExiteRepublica] = useState(false);


  useEffect(() => {
    setLoading(true);
    verificarSeJaCadastrou();
    if (existeRepublica) {
      navigation.navigate('MenuLateral');
    }
  }, []);

  function entrarComCodigo() {
    setLoading(true);
    const data = {
      email: emailUser
    };
    api
      .put(`/gerenciaRepublica/membros/${codigoRepublica}`, data)
      .then(response => {
        const idRepublica = response.data._id
        navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
      })
      .catch(error => {
        setErro(true);
      }).finally(() => { setLoading(false) })
  }

  function verificarSeJaCadastrou() {
    setLoading(true);
    api
      .get(`/gerenciaRepublica/${emailUser}`)
      .then(response => {
        if (response.data != null) {
          setJaExiteRepublica(true);
          const idRepublica = response.data._id;
          navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
        }
      })
      .catch(error => {
        setErro(true);
      })
      .finally(setLoading(false));
  }

  async function cadastrarNovaRepublica() {
    setLoading(true);
    const data = {
      email: emailUser,
      nomeRepublica: nomeRepublica
    };
    await api
      .post(`/gerenciaRepublica`, data)
      .then(response => {
        console.log("Republica:", response);
        let idRepublica = response.data._id
        navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
      })
      .catch(error => {
        setErro(true);
      })
      .finally(setLoading(false));
  }

  return (
    <Container>
      <HeaderBack title="Gerenciamento de republica" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
        <Separador>
          <CadastroView>
            <Apresentacao>
              <IconeView>
                <Icone name="home" />
              </IconeView>
              <LabelView>
                <Titulo> Não tenho uma Republica Cadastrada. </Titulo>
                <SubTitulo> Quero Cadastrar agora mesmo. </SubTitulo>
              </LabelView>
            </Apresentacao>
            <DadosView>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Nome da república</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input onChangeText={text => setNomeRepublica(text)} />
                  </Item>
                </FieldSetLarge>
              </Linha>             
                <BotaoView>
                  <Botao onPress={() => { cadastrarNovaRepublica() }}><LabelBotao>CADASTRAR</LabelBotao></Botao>
                </BotaoView>
            </DadosView>
          </CadastroView>
          <EntraCodigoView>
            <Apresentacao>
              <IconeView>
                <Icone name="login" />
              </IconeView>
              <LabelView>
                <Titulo>Já tenho uma republica cadastrada </Titulo>
                <SubTitulo>Entrar com código de convite!</SubTitulo>
              </LabelView>
            </Apresentacao>
            <DadosView>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Código da república</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input 
                      onChangeText={text => setCodigoRepublica(text)}
                    />
                  </Item>
                </FieldSetLarge>
              </Linha>              
                <BotaoView>
                  <Botao onPress={() => entrarComCodigo()}>
                    <LabelBotao>ENTRAR</LabelBotao>
                  </Botao>
                </BotaoView>
            </DadosView>
          </EntraCodigoView>
        </Separador>
    </Container>
  )
}