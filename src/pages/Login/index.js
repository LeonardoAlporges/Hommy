import * as yup from 'yup';
import { Formik } from 'formik';

import { connect } from 'react-redux';

import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

import { Icon, Input, Item, Button } from 'native-base';
import CustomModal from '../../components/Alert';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../service/api';

import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './style';

import {
  editNome,
  editEmail,
  editCpf,
  editIdUser,
  editLogado,
  editNota,
  editTelefone,
  editFoto,
} from '../../actions/UserAction';

class Login extends Component {
  static navigationOptions = { header: null };
  state = {
    user: [],
    erro: false,
    sucesso: false,
  };

  async setToken(dados) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));

      console.log('Token salvo com sucesso');
    } catch (error) {
      console.log('Erro ao salvar token');
    }
  }

  enviarlogin = async value => {
    await api
      .post('/session', value)
      .then(responseJson => {
        this.setToken(responseJson.data);
        console.log('login ?', responseJson);
        this.setState({ user: responseJson.data.usuario });
        console.log('user:', this.state.user);
        this.props.editNome(responseJson.data.usuario.nome);
        this.props.editEmail(responseJson.data.usuario.email);
        this.props.editCpf(responseJson.data.usuario.cpf);
        this.props.editIdUser(responseJson.data.usuario.token);
        this.props.editLogado(responseJson.data.usuario.nome);
        this.props.editTelefone(responseJson.data.usuario.celular);
        this.props.editFoto(responseJson.data.usuario.fotoPerfil);
        this.props.editNota(responseJson.data.usuario.nota);
        this.setState({ sucesso: true });
        this.props.navigation.navigate('TabsHeader');
      })
      .catch(error => {
        this.setState({ erro: true });
        console.error('Usuario Não Encontrado', error);
      });
  };

  Verlogin = values => {
    this.enviarlogin(values);
  };

  render() {
    return (
      <ScrollView>
        {this.state.erro ? <CustomModal parametro="Erro" /> : <View />}
        {this.state.sucesso ? (
          <View style={style.V_modal}>
            <CustomModal parametro="Sucesso" />
          </View>
        ) : (
          <View />
        )}

        <View style={style.container}>
          <TouchableOpacity>
            <Image
              source={{
                uri:
                  'https://firebsestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
              }}
              style={style.imgStyle}
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
                .string()
                .min(4)
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
                    <Text style={style.txtError}>{errors.email}</Text>
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
                    <Text style={style.txtError}>{errors.password}</Text>
                  )}
                </View>
                <View style={style.V_cadastrar}>
                  <TouchableOpacity>
                    <Text style={style.touchTx}>Esqueci minha senha!</Text>
                  </TouchableOpacity>
                </View>
                <View style={style.V_botoes}>
                  <Button
                    style={style.botao_login}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    title="Leo"
                  >
                    <Text style={style.labelBotao}>Login</Text>
                    {/* <Icon style={style.iconStyle} name="ios-arrow-forward" /> */}
                  </Button>
                </View>
              </Fragment>
            )}
          </Formik>
          <Button
            style={style.botao_cadastro}
            onPress={() => {
              this.props.navigation.navigate('CadastroUsuario');
            }}
            title="Leo"
          >
            <Text style={style.labelBotao}>Cadastre-se</Text>
            {/* <Icon style={style.iconStyle} name="md-person-add" /> */}
          </Button>
        </View>
      </ScrollView>
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
    editNota,
  }
)(Login);

export default withNavigation(loginConnect);
