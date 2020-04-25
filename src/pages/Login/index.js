import * as yup from 'yup';
import { Formik } from 'formik';

import { connect } from 'react-redux';

import React, { Component, Fragment } from 'react';
import { View, Image, Text, Alert } from 'react-native';

import { Icon, Input, Item, Button } from 'native-base';

import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';

import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './style';
import { asyncStorage } from 'reactotron-react-native';

import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editTelefone,
  editFoto,
} from '../../actions/UserAction';

class Login extends Component {
  static navigationOptions = { header: null };
  state = {
    user: [],
  };

  async setToken(dados) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));

      console.tron.log('Token salvo com sucesso');
    } catch (error) {
      console.tron.log('Erro ao salvar token');
    }
  }

  enviarlogin = async value => {
    await api
      .post('/session', value)
      .then(responseJson => {
        this.setToken(responseJson.data);
        console.tron.log('login ?', responseJson);
        this.setState({ user: responseJson.data.usuario });
        console.tron.log('user:', this.state.user);
        this.props.editNome(responseJson.data.usuario.nome);
        this.props.editEmail(responseJson.data.usuario.email);
        this.props.editCpf(responseJson.data.usuario.cpf);
        this.props.editIdUser(responseJson.data.usuario.token);
        this.props.editLogado(responseJson.data.usuario.nome);
        this.props.editTelefone(responseJson.data.usuario.celular);
        this.props.editFoto(responseJson.data.usuario.fotoPerfil);
        this.props.navigation.navigate('TabsHeader');
      })
      .catch(error => {
        console.error('Usuario Não Encontrado');
      });
  };

  Verlogin = values => {
    this.enviarlogin(values);
  };

  render() {
    return (
      <View style={style.container}>
        <TouchableOpacity>
          <Image
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
            }}
            style={{ width: 100, height: 100, marginTop: '10%' }}
          />
        </TouchableOpacity>
        <Text style={style.txt_Titulo}>Hoomy</Text>

        <Text style={style.txt_FormaDeLogin}>
          Faça login com sua rede social
        </Text>
        <View style={style.view_OutrosLogin}>
          <Icon style={style.icons_OutroLogin} name="logo-facebook" />
          <Icon style={style.icons_OutroLogin} name="logo-twitter" />
          <Icon style={style.icons_OutroLogin} name="logo-googleplus" />
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            this.Verlogin(values);
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('Not a valid e-mail')
              .required('Insira um Email valido'),
            password: yup
              .number()
              .min(6)
              .required('Insira uma senha'),
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
              <View style={style.view_CamposLogin}>
                <Item>
                  <Icon name="md-person" style={style.icons_CamposLogin} />
                  <Input
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              <View style={style.view_CamposLogin}>
                <Item>
                  <Icon name="md-key" style={style.icons_CamposLogin} />
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onBlur={() => setFieldTouched('password')}
                  />
                </Item>
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <View style={style.V_cadastrar}>
                <TouchableOpacity>
                  <Text style={style.touchTx}>Esqueci minha senha!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('CadastroUsuario');
                  }}
                >
                  <Text>Cadastre-se </Text>
                </TouchableOpacity>
              </View>
              <View style={style.V_botoes}>
                <Button
                  style={style.botao_login}
                  onPress={handleSubmit}
                  disabled={!isValid}
                  title="Leo"
                >
                  <Icon style={{ fontSize: 25 }} name="ios-arrow-forward" />
                </Button>
                <Button
                  style={style.botao_login}
                  onPress={() => {
                    this.props.navigation.navigate('CadastroUsuario');
                  }}
                  disabled={!isValid}
                  title="Leo"
                >
                  <Icon style={{ fontSize: 25 }} name="md-person-add" />
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    );
  }
}

const loginConnect = connect(
  null,
  {
    editNome,
    editEmail,
    editCpf,
    editIdUser,
    editLogado,
    editTelefone,
    editFoto,
  }
)(Login);

export default withNavigation(loginConnect);
