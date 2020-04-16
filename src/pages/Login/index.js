import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { Icon, Input, Item, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import moduleName from '../../';
import api from '../../service/api';

import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './style';
import { asyncStorage } from 'reactotron-react-native';

class Login extends Component {
  static navigationOptions = { header: null };

  async setToken() {
    try {
      await AsyncStorage.setItem('token', 'LaMJpEcAcCm');
      console.tron.log('Token salvo com sucesso');
    } catch (error) {
      console.tron.log('Erro ao salvar token');
    }
  }

  enviarlogin = value => {
    Alert.alert('enc');
    api
      .post('/session', value)
      .then(responseJson => {
        console.tron.log('login ?', responseJson);
      })
      .catch(error => {
        console.error('NAO ENCONTRADO');
      });
  };

  Verlogin = values => {
    this.enviarlogin(values);
    this.setToken();
    console.tron.log(values);
    Alert.alert('Login Efetuado');
    this.props.navigation.navigate('TabsHeader');
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
                    this.props.navigation.navigate('Cadastro');
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
                    this.props.navigation.navigate('Cadastro');
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

export default withNavigation(Login);
