import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { Text, Alert, Image } from 'react-native';
import { Icon, Item, Input, Button } from 'native-base';
import estilo from './style';
import { View } from 'native-base';

export default class CadastroUsuario extends Component {
  MudarTela = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <View style={estilo.container}>
        <Image
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
          }}
          style={{ width: 100, height: 100, marginTop: '10%' }}
        />
        <Text style={estilo.txt_Titulo}>Hoomy</Text>
        <Formik
          initialValues={{
            nome: '',
            email: '',
            confirmaEmail: '',
            password: '',
          }}
          onSubmit={values => {
            Alert.alert(JSON.stringify(values)), this.MudarTela();
          }}
          validationSchema={yup.object().shape({
            nome: yup.string().required('Insira um Apelido para sua conta'),
            email: yup
              .string()
              .email('Insira um Email valido')
              .required('Insira um Email para sua conta'),
            password: yup
              .string()
              .min(6)
              .required('Insira uma senha para sua conta'),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="md-person"
                  />
                  <Input
                    value={values.nome} //NOME
                    onChangeText={handleChange('nome')}
                    onBlur={() => setFieldTouched('nome')}
                    placeholder="Nome"
                  />
                </Item>
              </View>

              {touched.nome && errors.nome && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.nome}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="ios-mail"
                  />
                  <Input
                    value={values.email} //EMAIL
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
              </View>
              {touched.email && errors.email && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.email}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="md-key" />
                  <Input
                    value={values.password} //Senha
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={true}
                  />
                </Item>
              </View>
              {touched.password && errors.password && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.password}</Text>
                </View>
              )}

              <View style={estilo.view_BotaoEntar}>
                <Button
                  style={estilo.botao_login}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Leo"
                >
                  <Icon style={{ fontSize: 25 }} name="ios-arrow-forward" />
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}
