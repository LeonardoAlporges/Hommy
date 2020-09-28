import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useState, Fragment, useEffect } from 'react';
import { View, Image, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Icon, Input, Item, Button, Spinner, Label } from 'native-base';
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
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
  LabelCadastro,
  BackgroundLoad,
  LabelErro,
  ModalLoad,
  Click
} from './style';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { facebookLogin } from '../../../utils/facebook';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';

import CustomModal from '../../../components/Alert';
import * as userAction from '../../../actions/UserAction';
import { set } from 'lodash';

export function Login({ navigation }) {
  const [modalErroLogin, setmodalErroLogin] = useState(false);
  const [modalErroSenha, setmodalErroSenha] = useState(false);
  const [password, setPassword] = useState(true);
  const tokenAparelho = useSelector(state => state.user.tokenUser);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const [faceUser, setFaceUser] = useState();
  const [faceErro, setFaceErro] = useState();
  const [social_id, setSocial_id] = useState();
  const [faceEmail, setFaceEmail] = useState();
  const [faceUsername, setFaceUsername] = useState();
  const [faceSocialOrigem, setFaceSocialOrigem] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '896135200677-l6couqinr2mhpsj6jni1f37udjfra7ek.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);

  function fazerLoginRedeSocial(email, nome, foto, id) {
    console.log('FAZENDO LOGIN', email, nome, foto, id);
    const data = {
      email: email,
      password: id,
      //tokenAparelho:tokenAparelho,
      nome: nome,
      fotoPerfil: foto
    };
    api
      .post('/verifica/fb/google', data)
      .then(response => {
        salvarDadosStorage(response.data);
        resetarPilhaNavegacao('TabsHeader');
        setloading(false);
      })
      .catch(error => {
        console.log(error.response);
        setloading(false);
        console.log(error.response.data.code);
      });
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      fazerLoginRedeSocial(
        userInfo.user.email,
        userInfo.user.name,
        userInfo.user.photo,
        userInfo.user.id
      );
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      alert(error);
    }
  };

  useEffect(() => {
    pegar();
  }, []);

  async function pegar() {
    const dados = JSON.parse(await AsyncStorage.getItem('@Facebook:accessData'));
    console.log(dados);
  }

  async function salvarDadosStorage(dados) {
    try {
      dispatch(userAction.editNome(dados.usuario.nome));
      dispatch(userAction.editEmail(dados.usuario.email));
      dispatch(userAction.editFoto(dados.usuario.fotoPerfil));
      dispatch(userAction.editNota(dados.usuario.nota));
      dispatch(userAction.editTelefone(dados.celular));

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

  function login_facebook() {
    facebookLogin()
      .then(response => {
        console.log('Facebook: ', response);
        fazerLoginRedeSocial(response.email, response.name, response.picture.data.url, response.id);
      })
      .catch(e => console.log('erro', e));
  }

  // function handleFacebookLogin() {
  //   LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log('Login success with permissions: ' + result.grantedPermissions.toString());
  //         login_facebook();
  //         AccessToken.AccessToken.getCurrentAccessToken().then(data => {
  //           console.log('Data:', data);
  //         });
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error);
  //     }
  //   );
  // }

  function fazerLogin(value) {
    setloading(true);
    const data = {
      email: value.email,
      password: value.password,
      tokenD: tokenAparelho
    };
    api
      .post('/session', data)
      .then(response => {
        salvarDadosStorage(response.data);
        resetarPilhaNavegacao('TabsHeader');
        setloading(false);
      })
      .catch(error => {
        console.log(error.response);
        setloading(false);
        console.log(error.response.data.code);
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
          <Botao transparent onPress={signIn}>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/Img/Login/google.png')}
            />
            <LabelBotoes>Google</LabelBotoes>
          </Botao>
          <Botao transparent onPress={login_facebook}>
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
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
                  <Input
                    underline="false"
                    placeholder="Digite seu e-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                <Invalido>
                  {touched.email && errors.email && <LabelErro>{errors.email}</LabelErro>}
                </Invalido>
              </CampoLogin>

              <CampoLogin>
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
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
                  {touched.password && errors.password && <LabelErro>{errors.password}</LabelErro>}
                </Invalido>
              </CampoLogin>
              <RecuperaSenha>
                <Click
                  onPress={() => {
                    navigation.navigate('AutenticacaoTelefone');
                  }}
                >
                  <LabelEsqueciSenha>Esqueci minha senha!</LabelEsqueciSenha>
                </Click>
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
      {loading && (
        <Modal animationType="slide" transparent visible={loading}>
          <BackgroundLoad>
            <ModalLoad>
              <Spinner color="#142850" />
            </ModalLoad>
          </BackgroundLoad>
        </Modal>
      )}
    </View>
  );
}

export default withNavigation(Login);
