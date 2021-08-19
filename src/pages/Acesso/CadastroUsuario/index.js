import { Formik } from 'formik';
import { Input, Item, View } from 'native-base';
import React, { Fragment, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import { imagePickerOptions, uploadFileToFireBaseUser } from '../../../utils';
import estilo, {
  BotaoCadastro,
  BotaoEnviarFoto,
  BotaoFoto,
  CampoLogin,
  Container,
  Imagem,
  Invalido,
  LabelBotao,
  LabelBotaoFoto,
  LabelErro
} from './style';

export default function CadastroUsuario({ navigation }) {
  const [imagemPerfil, setImagemPerfil] = useState();
  const [imagemLink, setImagemLink] = useState();
  const [imagemPerfilPadrao, setImagemPerfilPadrao] = useState(
    'https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/pictures%2Fuser%2Fperf.png?alt=media&token=ca558498-4912-40ab-8be3-33ee17b69e68'
  );
  const [uploadImagem, setUploadImagem] = useState(false);
  const [loadingEnvioImagem, setLoadingEnvioImagem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagemParaEnvio, setImagemParaEnvio] = useState();
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [password, setPassword] = useState(true);

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });

    navigation.dispatch(resetAction);
  }

  async function enviarCadastro(value) {
    setLoading(true);
    value.fotoPerfil = imagemLink ? imagemLink : imagemPerfilPadrao;
    api
      .post('/usuario', value)
      .then(response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function gerarLinkImagemPerfil() {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Envio de imagem cancelado');
      } else if (error) {
        console.log('Erro', error)
        alert('Ocorreu um erro: ', error);
      } else {
        const referencia = uploadFileToFireBaseUser(imagePickerResponse);
        monitorFileUpload(referencia);
        setImagemPerfil(imagePickerResponse.uri);
      }
    });
  }

  function goBackScreen() {
    navigation.goBack(null);
  }

  function changePassword() {
    setPassword(!password);
  }

  function monitorFileUpload(task) {
    setLoading(true);
    task.on('state_changed', snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        setImagemLink(downloadURL);
        setLoading(false);
      });
    });
  }

  return (
    <ScrollView style={{ display: 'flex' }}>
      <HeaderBack title="Cadastro de usuário" onNavigation={() => goBackScreen()} />
      <Container>
        {imagemPerfil ? (
          <Imagem source={{ uri: imagemPerfil }} />
        ) : (
          <Imagem source={require('../../../assets/Img/pessoas.png')} />
        )}
        <BotaoEnviarFoto>
          <BotaoFoto onPress={() => gerarLinkImagemPerfil()}>
            <LabelBotaoFoto> + ENVIAR FOTO</LabelBotaoFoto>
          </BotaoFoto>
        </BotaoEnviarFoto>
        <Formik
          initialValues={{
            nome: '',
            email: '',
            confirmaEmail: '',
            password: '',
            celular: '',
            fotoPerfil: ''
          }}
          onSubmit={values => {
            enviarCadastro(values);
          }}
          validationSchema={yup.object().shape({
            nome: yup.string().required('Campo obrigatórior').max(20, 'Máximo de caracteres é 20'),
            email: yup.string().email('E-mail inválido ou incorreto').required('Campo obrigatório'),
            celular: yup.string().max(9999999999999).required(' Campo obrigatórior'),
            password: yup.string().min(8, 'Mínimo 8 dígitos necessários').required('Campo obrigatório')
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              {erro && (
                <CustomModal
                  parametro="Erro"
                  titulo="OOPS!"
                  descricao="Esse email já está cadastrado no aplicativo."
                  botao="Voltar"
                  callback={() => {
                    setErro(false);
                  }}
                />
              )}
              {sucesso && (
                <CustomModal
                  parametro="Custom"
                  titulo="Cadastro Realizado :)"
                  descricao="Seu cadastro no aplicativo foi realizado com sucesso, voce será redirecionado para tela de login."
                  botao="Confirmar"
                  callback={() => {
                    resetarPilhaNavegacao('Login');
                  }}
                />
              )}
              <CampoLogin>
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
                  <Input
                    placeholderTextColor="#263b50"
                    style={estilo.labelInput}
                    value={values.nome}
                    onChangeText={handleChange('nome')}
                    onBlur={() => setFieldTouched('nome')}
                    placeholder="Nome"
                  />
                </Item>
                <Invalido>{touched.nome && errors.nome && <LabelErro>{errors.nome}</LabelErro>}</Invalido>
              </CampoLogin>

              <CampoLogin>
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
                  <Input
                    placeholderTextColor="#263b50"
                    style={estilo.labelInput}
                    value={values.email} //EMAIL
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                <Invalido>{touched.email && errors.email && <LabelErro>{errors.email}</LabelErro>}</Invalido>
              </CampoLogin>

              <CampoLogin>
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
                  <TextInputMask
                    placeholderTextColor="#263b50"
                    style={estilo.labelInput}
                    keyboardType="number-pad"
                    mask={'([00]) [00000]-[0000]'}
                    value={values.celular} //celular
                    onChangeText={handleChange('celular')}
                    placeholder="Telefone"
                    onBlur={() => setFieldTouched('celular')}
                  />
                </Item>
                <Invalido>{touched.celular && errors.celular && <LabelErro>{errors.celular}</LabelErro>}</Invalido>
              </CampoLogin>

              <CampoLogin>
                <Item regular inlineLabel style={{ borderRadius: 5 }}>
                  <Input
                    placeholderTextColor="#263b50"
                    style={estilo.labelInput}
                    value={values.password} //Senha
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={password}
                    onBlur={() => setFieldTouched('password')}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      changePassword();
                    }}
                  >
                    <Icon name="key-outline" style={{ fontSize: 20, color: '#263b50', marginRight: 10 }} />
                  </TouchableOpacity>
                </Item>
                <Invalido>{touched.password && errors.password && <LabelErro>{errors.password}</LabelErro>}</Invalido>
              </CampoLogin>

              <View style={estilo.view_BotaoEntar}>
                <BotaoCadastro disabled={!isValid} onPress={handleSubmit}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#021334', '#006c8b', '#0094ac']}
                    style={estilo.Botaolinear}
                  >
                    <LabelBotao>CADASTRAR</LabelBotao>
                  </LinearGradient>
                </BotaoCadastro>
              </View>
            </Fragment>
          )}
        </Formik>
      </Container>
      {loading && <Loading></Loading>}
    </ScrollView>
  );
}
