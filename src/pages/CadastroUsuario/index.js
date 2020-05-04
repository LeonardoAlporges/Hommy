import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { Text, Alert, Image, Modal } from 'react-native';
import { Item, Input, Button } from 'native-base';
import estilo from './style';
import { View } from 'native-base';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CadastroUsuario extends Component {
  state = {
    isModalVisible: false,
  };

  static navigationOptions = { header: null };

  EnviarCadastro = async value => {
    await api
      .post('/usuario', value)
      .then(responseJson => {
        console.log('Cadastro', responseJson);
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        this.setState({ isModalVisible: true });
        console.log('Usuario Nao cadastrado');
      });
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
            telefone: '',
          }}
          onSubmit={values => {
            this.EnviarCadastro(values);
          }}
          validationSchema={yup.object().shape({
            nome: yup
            .string()
            .required('Insira um Apelido para sua conta'),
            email: yup
              .string()
              .email('Insira um Email valido')
              .required('Insira um Email para sua conta'),
            telefone: yup
              .number()
              .max(9999999999999)
              .required(' Insira um telefone'),
            password: yup
              .string()
              .min(4)
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
                    name="account-outline"
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
                    name="email-outline"
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
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="phone-outline"
                  />
                  <Input
                    value={values.telefone} //telefone
                    onChangeText={handleChange('telefone')}
                    placeholder="Telefone"
                    onBlur={() => setFieldTouched('telefone')}
                  />
                </Item>
              </View>
              {touched.telefone && errors.telefone && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.telefone}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="key-outline"
                  />
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
                  <Icon style={{ fontSize: 25 }} name="check" />
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
        <Modal transparent={true} visible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              flex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: '#ffff',

                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: '55%',
                marginHorizontal: '10%',
                padding: 40,
                borderRadius: 10,
                height: 100,
                flex: 1,
              }}
            >
              <Image
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Pictures%20Ilustrations%2FBug.png?alt=media&token=23b94406-dab1-4f51-9082-6c9429a27e07',
                }}
                style={{ width: 175, height: 175, marginTop: '80%' }}
              />
              <Text
                style={{
                  width: 200,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '5%',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'Roboto',
                  color: '#000',
                }}
              >
                Nome de Usuario ou Email ja cadastrados
              </Text>

              <Button
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',

                  bottom: 25,
                  width: '70%',
                  backgroundColor: 'rgba(29,161,242,1)',
                  color: '#fff',
                }}
                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}
              >
                <Text>Voltar</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
