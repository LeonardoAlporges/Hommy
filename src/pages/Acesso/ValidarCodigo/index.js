import React, { Component, Fragment, useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import { Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions } from 'react-navigation';

import estilo from './styles';
import HeaderBack from '../../../components/CustomHeader';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
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

export default function ValidarCodigo({ navigation }) {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [email, setEmail] = useState(navigation.state.params.email);
  const [codigoErrado, setCodigoErrado] = useState(false);

  useEffect(() => {}, [codigoValido]);

  function verificarCodigoDigitado(values) {
    const data = {
      email: email.email,
      numConfirm: values,
    };
    console.log(data);
    api
      .put('/alterar/confirm', data)
      .then(response => {
        setCodigoValido(true);
      })
      .catch(error => {
        console.log(error.response)
        if (error.response.data.code == 204) {
          setCodigoErrado(true);
        } else {
          setErro(true);
        }
      });
  }

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
    });
    navigation.dispatch(resetAction);
  }

  function enviarNovaSenha(values) {
    const data = {
      email: email.email,
      pass: values.novaSenha,
    };
    console.log('leo', data);
    api
      .put('/alterar/senha', data)
      .then(response => {
        setSucesso(true);
      })
      .catch(error => {
        setErro(true);
      });
  }

  return (
    <Container>
      <HeaderBack title={'Recuperação de senha'} onNavigation={() => resetarPilhaNavegacao('Login')} />

      <ViewImagem>
        <Image
          style={estilo.V_img}
          source={
            codigoValido
              ? require('../../../assets/Img/Insira_Senha.png')
              : require('../../../assets/Img/Send_email.png')
          }
        />
      </ViewImagem>

      <ViewTitulo>
        {codigoValido ? (
          <Titulo>
            Cadastre uma nova senha de acesso. Sua senha antiga será apagada, crie uma nova para se conectar ao
            aplicativo.
          </Titulo>
        ) : (
          <Titulo>
            Um código para prosseguir foi enviado ao seu e-mail. Por favor, informe-o no campo abaixo.
          </Titulo>
        )}
      </ViewTitulo>

      <Formik
        initialValues={{
          codigo: yup
            .string()
            .min(6, 'Mínimo 6 dígitos necessários')
            .max(6, 'Somente 6 dígitos são permitido'),
          novaSenha: yup
            .string('')
            .min(8, 'Mínimo 8 dígitos necessários')
            .required('Insira uma senha para sua conta'),
        }}
        validationSchema={yup.object().shape({
          codigo: yup
            .string()
            .min(6, 'Mínimo 6 dígitos necessários')
            .max(6, 'Somente 6 digitos permitido')
            .required('Campo obrigatório'),
          novaSenha: yup
            .string()
            .min(8, 'Mínimo 8 dígitos necessários')
            .required('Campo obrigatório'),
          confirmacaoSenha: yup
            .string()
            .min(8, 'Mínimo 8 dígitos necessários')
            .required('Campo obrigatório'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            {erro && (
              <CustomModal
                parametro="Erro "
                descricao="Opss! Ocorreu um erro estranho :O"
                callback={() => {
                  setErro(false);
                }}
              />
            )}

            {codigoErrado && (
              <CustomModal
                parametro="Custom"
                titulo="Código incorreto"
                descricao="Verifique se digitou tudo certo. Não foi possível continuar a recuperação de sua senha com este código."
                botao="Verificar"
                callback={() => {
                  setCodigoErrado(false);
                }}
              />
            )}

            {!codigoValido && (
              <CamposLogin>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.codigo} //NOME
                    onChangeText={handleChange('codigo')}
                    onBlur={() => setFieldTouched('codigo')}
                    placeholder="000000"
                    keyboardType="numeric"
                  />
                </Item>
              </CamposLogin>
            )}
            <View>
              {touched.codigo && errors.codigo ? (
                <ViewErro>
                  <LabelErro>{errors.codigo}</LabelErro>
                </ViewErro>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>
            {!codigoValido && (
              <ViewBotao>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    verificarCodigoDigitado(values.codigo);
                  }}
                >
                  <TextoBotao>Prosseguir</TextoBotao>
                </Button>
              </ViewBotao>
            )}

            {codigoValido && (
              <CamposLogin>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.novaSenha} //NOME
                    onChangeText={handleChange('novaSenha')}
                    onBlur={() => setFieldTouched('novaSenha')}
                    placeholder="Nova senha"
                  />
                </Item>
              </CamposLogin>
            )}
            <View>
              {touched.novaSenha && errors.novaSenha ? (
                <ViewErro>
                  <LabelErro>{errors.novaSenha}</LabelErro>
                </ViewErro>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>

            {codigoValido && (
              <ViewBotao>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    enviarNovaSenha(values);
                  }}
                >
                  <TextoBotao>Enviar nova senha</TextoBotao>
                </Button>
              </ViewBotao>
            )}
          </Fragment>
        )}
      </Formik>

      {sucesso && (
        <CustomModal
          parametro="Custom"
          titulo="Senha cadastrada com sucesso."
          descricao="Sua senha foi redefinida. Você já pode voltar a navegar pelo nosso aplicativo!"
          botao="Ok, concluir."
          callback={() => {
            resetarPilhaNavegacao('Login');
          }}
        />
      )}
    </Container>
  );
}
