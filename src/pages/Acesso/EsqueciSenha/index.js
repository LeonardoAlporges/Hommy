import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment, useState } from 'react';
import { Image, Text } from 'react-native';
import { Button, View, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import Loading from '../../../components/Loading';

import estilo from './styles';
import HeaderBack from '../../../components/CustomHeader';
import { NavigationActions, StackActions } from 'react-navigation';
import { set, functionsIn } from 'lodash';
import {
  Container,
  ViewImagem,
  ViewTitulo,
  Titulo,
  ViewSubtitulo,
  Subtitulo,
  ViewBotao,
  TextoBotao,
  ViewModal,
  CamposLogin,
  CamposLoginSenha,
  ViewErro,
  LabelErro
} from './styles';

export default function EsqueciSenha({ navigation }) {
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);

  function EnviarCodigo(values) {
    setLoading(true);
    api
      .put('/alterar/cod/', values)
      .then(response => {
        setLoading(false);
        navigation.navigate('ValidarCodigo', { email: values });
        console.log(response);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
        console.log(error);
      });
  }

  function resetarPilhaNavegacao(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });

    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <HeaderBack title="Esqueceu a senha ?" onNavigation={() => resetarPilhaNavegacao('Login')} />

      <ViewImagem>
        <Image style={estilo.V_img} source={require('../../../assets/Img/Send_email.png')} />
      </ViewImagem>

      <ViewTitulo>
        <Titulo>
          Informe seu e-mail cadastrado no aplicativo para que possamos lhe enviar um codigo de recuperação.
        </Titulo>
      </ViewTitulo>

      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={yup.object().shape({
          email: yup.string('').email('E-mail inválido ou incorreto').required('Campo obrigatório')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            <CamposLogin>
              <Item>
                <Icon style={estilo.icons_CamposLogin} active name="email-outline" />
                <Input
                  placeholderTextColor="#2e2e2e"
                  style={estilo.labelInput}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="E-mail"
                />
              </Item>
            </CamposLogin>

            {touched.email && errors.email ? (
              <ViewErro>
                <LabelErro>{errors.email}</LabelErro>
              </ViewErro>
            ) : (
              <View style={estilo.V_ErroSem} />
            )}
            <ViewBotao>
              <Button
                style={estilo.botao}
                onPress={() => {
                  EnviarCodigo(values);
                }}
              >
                <TextoBotao>Recuperar senha</TextoBotao>
              </Button>
            </ViewBotao>
          </Fragment>
        )}
      </Formik>
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            setErro(false);
          }}
        />
      )}
      {loading && <Loading />}
    </Container>
  );
}
