import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useState, Fragment, useEffect } from 'react';
import { View, Image, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Icon, Input, Item, Button, Spinner, Label } from 'native-base';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import api from '../../../service/api';
import style, {
  Container,
  Logo,
  LabelRedeSocial,
  Invalido,
  BotesLogin,
  Hr,
  Ou,
  Divisoria,
  Botao,
  LabelBotoes,
  CampoLogin,
  RecuperaSenha,
  LabelEsqueciSenha,
  BotaoLogin,
  BotesPrincipal,
  BotaoCadastro,
  LabelLogin,
  LabelCadastro
} from './style';

import CustomModal from '../../../components/Alert';

export function Login({ navigation }) {
  const [modalErroLogin, setmodalErroLogin] = useState(false);
  const [modalErroSenha, setmodalErroSenha] = useState(false);
  const [password, setPassword] = useState(true);
  const tokenAparelho = useSelector(state => state.user.tokenUser);
  const [loading, setloading] = useState(false);

  async function salvarDadosStorage(dados) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));
    } catch (error) {
      console.log(error);
    }
  }

  function resetarPilhaNavegacao(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });
    navigation.dispatch(resetAction);
  }

  function fazerLogin(value) {
    setloading(true);
    const data = {
      email: value.email,
      password: value.password,
      tokenD: tokenAparelho
    };
    console.log('tokenAparelho:', tokenAparelho);
    api
      .post('/session', data)
      .then(response => {
        salvarDadosStorage(response.data);
        resetarPilhaNavegacao('TabsHeader');
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        if (error.response.data.code == 206) {
          setmodalErroSenha(true);
        } else if (error.response.data.code == 203) {
          setmodalErroLogin(true);
        }
      });
  }
  function changePassword() {
    setPassword(!password);
  }

  return (
    <View>
      {modalErroLogin && (
        <CustomModal
          visivel={modalErroLogin}
          parametro="Custom"
          imagem="NaoEncontrado"
          titulo="E-mail não encontrado."
          descricao="Por favor verifique as informações inseridas e tente novamente."
          botao="Voltar"
          callback={() => {
            setmodalErroLogin(false);
          }}
        />
      )}
      {modalErroSenha && (
        <CustomModal
          visivel={modalErroSenha}
          parametro="Custom"
          imagem="NaoEncontrado"
          titulo="Senha invalida."
          descricao="Por favor verifique as informações inseridas e tente novamente."
          botao="Voltar"
          callback={() => {
            setmodalErroSenha(false);
          }}
        />
      )}

      <Container>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#021334', '#006c8b', '#0094ac']}
          style={style.linear}
        >
          <Logo
            resizeMode="contain"
            style={{ width: 200, height: 100 }}
            source={require('../../../assets/Img/logo-white.png')}
          />
        </LinearGradient>
        <LabelRedeSocial>FAÇA LOGIN COM SUA REDE SOCIAL</LabelRedeSocial>
        <BotesLogin>
          <Botao transparent>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/Img/Login/google.png')}
            />
            <LabelBotoes>Google</LabelBotoes>
          </Botao>
          <Botao transparent>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/Img/Login/facebook.png')}
            />
            <LabelBotoes>Facebook</LabelBotoes>
          </Botao>
          <Botao transparent>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/Img/Login/twitter.png')}
            />
            <LabelBotoes>Twitter</LabelBotoes>
          </Botao>
        </BotesLogin>
        <Hr>
          <Divisoria />
          <Ou>OU</Ou>
          <Divisoria />
        </Hr>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => {
            fazerLogin(values);
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string('')
              .email('E-mail inválido ou incorreto')
              .required('Campo obrigatório'),
            password: yup
              .string('')
              .min(8, 'Mínimo 8 dígitos necessários')
              .required('Campo obrigatório')
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
            <>
              <CampoLogin>
                <Item regular inlineLabel>
                  <Input
                    underline="false"
                    placeholder="Digite seu e-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                <Invalido>
                  {touched.email && errors.email && (
                    <Text style={style.txtError}>{errors.email}</Text>
                  )}
                </Invalido>
              </CampoLogin>

              <CampoLogin>
                <Item regular inlineLabel>
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    underline="false"
                    placeholder="Digite sua senha"
                    secureTextEntry={password}
                    onBlur={() => setFieldTouched('password')}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      changePassword();
                    }}
                  >
                    <Icon name="eye" style={{ color: '#31aab8' }} />
                  </TouchableOpacity>
                </Item>
                <Invalido>
                  {touched.password && errors.password && (
                    <Text style={style.txtError}>{errors.password}</Text>
                  )}
                </Invalido>
              </CampoLogin>
              <RecuperaSenha>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EsqueciSenha');
                  }}
                >
                  <LabelEsqueciSenha>Esqueci minha senha!</LabelEsqueciSenha>
                </TouchableOpacity>
              </RecuperaSenha>

              <BotesPrincipal>
                <BotaoCadastro
                  transparent
                  onPress={() => {
                    navigation.navigate('CadastroUsuario');
                  }}
                >
                  <LabelCadastro>Cadastre-se</LabelCadastro>
                </BotaoCadastro>
                <BotaoLogin onPress={handleSubmit}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#021334', '#006c8b', '#0094ac']}
                    style={style.Botaolinear}
                  >
                    <LabelLogin>Login</LabelLogin>
                  </LinearGradient>
                </BotaoLogin>
              </BotesPrincipal>
            </>
          )}
        </Formik>
      </Container>
      <Modal animationType="slide" transparent visible={loading}>
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Spinner color="#142850" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default withNavigation(Login);
