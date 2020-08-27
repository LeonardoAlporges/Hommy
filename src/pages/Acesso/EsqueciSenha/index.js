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

export default function EsqueciSenha({ navigation }) {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  function EnviarCodigo(values) {
    setLoading(true);
    api
      .put('/alterar/cod/', values)
      .then(response => {
        setLoading(false);
        setSucesso(true);
        navigation.navigate('ValidarCodigo', { email: values });
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function resetarPilhaNavegacao(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    navigation.dispatch(resetAction);
  }

  return (
    <View style={estilo.container}>
      <HeaderBack title="Esqueceu a senha ?" onNavigation={() => resetarPilhaNavegacao('Login')} />

      <View style={estilo.V_img}>
        <Image style={estilo.V_img} source={require('../../../assets/Img/Send_email.png')} />
      </View>

      <View style={estilo.V_title}>
        <Text style={estilo.title}>
          Informe seu e-mail cadastrado no aplicativo para que possamos lhe enviar um codigo de recuperação.
        </Text>
      </View>

      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string('')
            .email('E-mail inválido ou incorreto')
            .required('Campo obrigatório'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            <View style={estilo.view_CamposLogin}>
              <Item>
                <Icon style={estilo.icons_CamposLogin} active name="email-outline" />
                <Input
                  placeholderTextColor="#2e2e2e"
                  floatingLabel={false}
                  style={estilo.labelInput}
                  value={values.email} 
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="E-mail"
                />
              </Item>
            </View>

            {touched.email && errors.email ? (
              <View style={estilo.V_Erro}>
                <Text style={estilo.txtErro}>{errors.email}</Text>
              </View>
            ) : (
              <View style={estilo.V_ErroSem} />
            )}
            <View style={estilo.V_botao}>
              <Button
                style={estilo.botao}
                onPress={() => {
                  EnviarCodigo(values);
                }}
              >
                <Text style={estilo.txtbtn}>Recuperar senha</Text>
              </Button>
            </View>
          </Fragment>
        )}
      </Formik>
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            this.setState({ Erro: false });
          }}
        />
      )}
      {loading && <Loading />}
    </View>
  );
}
