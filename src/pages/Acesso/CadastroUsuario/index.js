import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Fragment, useState } from 'react';
import { ScrollView, Modal, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Item, Input, Button, Spinner, Icon } from 'native-base';
import { imagePickerOptions, uploadFileToFireBaseUser, uploadProgress } from '../../../utils';

import CustomModal from '../../../components/Alert';
import estilo from './style';
import { View } from 'native-base';
import api from '../../../service/api';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../../components/CustomHeader';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

import {
  Container,
  Imagem,
  BotaoEnviarFoto,
  BotaoFoto,
  LabelBotaoFoto,
  CampoLogin,
  Invalido,
  LabelErro,
  BotaoCadastro,
  LabelBotao,
  BackgroundLoad,
  ModalLoad
} from './style';

export default function CadastroUsuario({ navigation }) {
  const [imagemPerfil, setImagemPerfil] = useState();
  const [imagemPerfilPadrao, setImagemPerfilPadrao] = useState(
    'https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/pictures%2Fuser%2Funnamed.png?alt=media&token=fa5dad7d-3792-49ec-9545-4d65a2fa1498'
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
    await uploadFileToFireBaseUser(imagemParaEnvio);
    value.fotoPerfil = imagemPerfil ? imagemPerfil : imagemPerfilPadrao;
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
        alert('Ocorreu um erro: ', error);
      } else {
        setImagemParaEnvio(imagePickerResponse);
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
            nome: yup.string().required('Campo obrigatórior').max(20, 'Máxim de caracteres é 20'),
            email: yup.string().email('E-mail inválido ou incorreto').required('Campo obrigatório'),
            celular: yup.string().max(9999999999999).required(' Campo obrigatórior'),
            password: yup
              .string()
              .min(8, 'Mínimo 8 dígitos necessários')
              .required('Campo obrigatório')
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              {erro && (
                <CustomModal
                  parametro="Erro"
                  titulo="OOPS!"
                  descricao="Seu email já está cadastrado no aplicativo."
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
                  descricao="Seu cadastro no aplicativo foi realizado com sucesso, voce será redirecionado para fazer login."
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
                <Invalido>
                  {touched.nome && errors.nome && <LabelErro>{errors.nome}</LabelErro>}
                </Invalido>
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
                <Invalido>
                  {touched.email && errors.email && <LabelErro>{errors.email}</LabelErro>}
                </Invalido>
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
                <Invalido>
                  {touched.celular && errors.celular && <LabelErro>{errors.celular}</LabelErro>}
                </Invalido>
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
                    <Icon name="eye" style={{ color: '#263b50' }} />
                  </TouchableOpacity>
                </Item>
                <Invalido>
                  {touched.password && errors.password && <LabelErro>{errors.password}</LabelErro>}
                </Invalido>
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
      {loading && (
        <Modal animationType="slide" transparent visible={loading}>
          <BackgroundLoad>
            <ModalLoad>
              <Spinner color="#142850" />
            </ModalLoad>
          </BackgroundLoad>
        </Modal>
      )}
    </ScrollView>
  );
}
