import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Formik } from 'formik';
import { Input, Item, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import * as userAction from '../../../actions/UserAction';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import style, {
  BackgroundLoad,
  Botao,
  BotaoCadastro,
  BotaoLogin,
  BotesLogin,
  BotesPrincipal,
  CampoLogin,
  Click,
  Container,
  Divisoria,
  Hr,
  Invalido,
  LabelBotoes,
  LabelCadastro,
  LabelErro,
  LabelEsqueciSenha,
  LabelLogin,
  LabelRedeSocial,
  Logo,
  ModalLoad,
  Ou,
  RecuperaSenha
} from './style';

export function Login({ navigation }) {
  const [modalErroLogin, setmodalErroLogin] = useState(false);
  const [modalErroSenha, setmodalErroSenha] = useState(false);
  const [modalErroGoogle, setmodalErroGoogle] = useState(false);
  const [modalErroCampos, setmodalErroCampos] = useState(false);
  const [modalErro, setModalErro] = useState(false);

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
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '896135200677-l6couqinr2mhpsj6jni1f37udjfra7ek.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);

  function fazerLoginRedeSocial(email, nome, foto, id) {
    const data = {
      email: email,
      password: id,
      tokenAparelho: tokenAparelho,
      nome: nome,
      fotoPerfil: foto,
      isGoogle: true
    };
    api
      .post('/verifica/fb/google', data)
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


  const signIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      setloading(true);
      fazerLoginRedeSocial(userInfo.user.email, userInfo.user.name, userInfo.user.photo, userInfo.user.id);
    } catch (error) {
      setmodalErroGoogle(true);
      setloading(false);
    }
  };

  async function salvarDadosStorage(dados) {
    try {
      dispatch(userAction.editNome(dados.usuario.nome));
      dispatch(userAction.editEmail(dados.usuario.email));
      dispatch(userAction.editFoto(dados.usuario.fotoPerfil));
      dispatch(userAction.editNota(dados.usuario.nota));
      dispatch(userAction.editTelefone(dados.celular));

      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));
    } catch (error) { }
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

    if (!data.email && !data.password) {
      setmodalErroCampos(true);
    }
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
        setModalErro(true);
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
      {modalErroGoogle && (
        <CustomModal
          parametro="Custom"
          imagem="NaoEncontrado"
          titulo="Ops.."
          descricao="Não foi possivel fazer login com google ."
          botao="Voltar"
          callback={() => {
            setmodalErroGoogle(false);
          }}
        />
      )}

      {modalErroCampos && (
        <CustomModal
          parametro="Custom"
          imagem="NaoEncontrado"
          titulo="Alerta"
          descricao="Email ou senha não informado corretamente"
          botao="Voltar"
          callback={() => {
            setmodalErroCampos(false);
          }}
        />
      )}
      {modalErro && (
        <CustomModal
          parametro="Custom"
          titulo="Erro"
          descricao="Não foi possivel fazer login. Verifique sua conexão com a internet!"
          botao="Voltar"
          callback={() => {
            setModalErro(false);
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
        <LabelRedeSocial>FAÇA LOGIN COM GOOGLE</LabelRedeSocial>

        <BotesLogin>
          <Botao transparent onPress={signIn}>
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/Img/Login/google.png')}
            />
            <LabelBotoes>Google</LabelBotoes>
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
            email: yup.string('').email('E-mail inválido ou incorreto').required('Campo obrigatório'),
            password: yup.string('').min(8, 'Mínimo 8 dígitos necessários').required('Campo obrigatório')
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
                <Invalido>{touched.email && errors.email && <LabelErro>{errors.email}</LabelErro>}</Invalido>
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
                    <Icon name="key-outline" style={{ color: '#31aab8', fontSize: 20, marginRight: 10 }} />
                  </TouchableOpacity>
                </Item>
                <Invalido>{touched.password && errors.password && <LabelErro>{errors.password}</LabelErro>}</Invalido>
              </CampoLogin>
              <RecuperaSenha>
                <Click
                  onPress={() => {
                    navigation.navigate('EsqueciSenha');
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
