import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import { NavigationActions, StackActions } from 'react-navigation';
import estilo from './styles';
import HeaderBack from '../../../components/CustomHeader';

export default function ValidarCodigo({ navigation }) {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [email, setEmail] = useState(navigation.state.params.email);
  const [codigoErrado, setCodigoErrado] = useState(false);
  const [teste, setTeste] = useState();

  useEffect(() => {}, [codigoValido]);

  function verificarCodigoDigitado(values) {
    setTeste(true);

    const data = {
      email: email.email,
      numConfirm: values,
    };
    console.log(data);
    api
      .put('/alterar/confirm', data)
      .then(response => {
        setTeste(true);
        setCodigoValido(true);
      })
      .catch(error => {
        setTeste(false);
        if (error.response.status == 401 || error.response.status == 404) {
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
    <View style={estilo.container}>
      <HeaderBack title={'Recuperação de senha'} onNavigation={() => resetarPilhaNavegacao('Login')} />

      <View style={estilo.V_img}>
        <Image
          style={estilo.V_img}
          source={
            codigoValido
              ? require('../../../assets/Img/Insira_Senha.png')
              : require('../../../assets/Img/Send_email.png')
          }
        />
      </View>

      <View style={estilo.V_title}>
        {codigoValido ? (
          <Text style={estilo.title}>
            Cadastre uma nova senha de acesso. Sua senha antiga será apagada, crie uma nova para se conectar ao
            aplicativo.
          </Text>
        ) : (
          <Text style={estilo.title}>
            Um código para prosseguir foi enviado ao seu e-mail. Por favor, informe-o no campo abaixo.
          </Text>
        )}
      </View>

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
                callback={() => {
                  setErro(false);
                }}
              />
            )}

            {codigoErrado && (
              <CustomModal
                parametro="Custom"
                imagem="NaoEncontrado"
                titulo="Código incorreto"
                descricao="Verifique se digitou tudo certo. Não foi possível continuar a recuperação de sua senha com este código."
                botao="Verificar"
                callback={() => {
                  setCodigoErrado(false);
                }}
              />
            )}

            {!codigoValido && (
              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.codigo} //NOME
                    onChangeText={handleChange('codigo')}
                    onBlur={() => setFieldTouched('codigo')}
                    placeholder="000000"
                  />
                </Item>
              </View>
            )}
            <View>
              {touched.codigo && errors.codigo ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.codigo}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>
            {!codigoValido && (
              <View style={estilo.V_botao}>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    verificarCodigoDigitado(values.codigo);
                  }}
                >
                  <Text style={estilo.txtbtn}>Prosseguir</Text>
                </Button>
              </View>
            )}

            {codigoValido && (
              <View style={estilo.view_CamposLoginSenha}>
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
              </View>
            )}
            <View>
              {touched.novaSenha && errors.novaSenha ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.novaSenha}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>

            {codigoValido && (
              <View style={estilo.V_botao}>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    enviarNovaSenha(values);
                  }}
                >
                  <Text style={estilo.txtbtn}>Enviar nova senha</Text>
                </Button>
              </View>
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
    </View>
  );
}
