import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment, useState } from 'react';
import { Text, Image, ScrollView, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Item, Input, Button, Spinner } from 'native-base';
import { imagePickerOptions, uploadFileToFireBaseUser, uploadProgress } from '../../../utils';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../../components/Alert';
import estilo from './style';
import { View } from 'native-base';
import api from '../../../service/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../../components/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationActions, StackActions } from 'react-navigation';
import { set } from 'lodash';


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

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
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

  return (
    <ScrollView>
      <HeaderBack title="Cadastro de usuário" onNavigation={() => goBackScreen()} />
      <View style={estilo.container}>
        {imagemPerfil ? (
          <Image source={{ uri: imagemPerfil }} style={estilo.imagemStyle} />
        ) : (
          <Image source={require('../../../assets/Img/Republica_Send_Pictures.png')} style={estilo.imagemStyle} />
        )}
        <View style={estilo.V_Btn}>
          <Button style={estilo.botao_send} onPress={() => gerarLinkImagemPerfil()}>
            <Text style={estilo.textoLabel}>Enviar foto de perfil</Text>
          </Button>
        </View>
        <Formik
          initialValues={{
            nome: '',
            email: '',
            confirmaEmail: '',
            password: '',
            celular: '',
            fotoPerfil: '',
          }}
          onSubmit={values => {
            enviarCadastro(values);
          }}
          validationSchema={yup.object().shape({
            nome: yup.string().required('Insira seu nome completo '),
            email: yup
              .string()
              .email('E-mail inválido ou incorreto')
              .required('Campo obrigatório'),
            celular: yup
              .string()
              .max(9999999999999)
              .required(' Campo obrigatórior'),
            password: yup
              .string()
              .min(8, 'Mínimo 8 dígitos necessários')
              .required('Campo obrigatório'),
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
              {sucesso ? (
                <View style={estilo.V_modal}>
                  <CustomModal
                    parametro="Custom"
                    titulo="Cadastro Realizado :)"
                    descricao="Seu cadastro no aplicativo foi realizado com sucesso, voce será redirecionado para fazer login."
                    botao="Confirmar"
                    callback={() => {
                      resetarPilhaNavegacao('Login');
                    }}
                  />
                </View>
              ) : (
                <View />
              )}
              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="account-outline" />
                  <Input
                    autoFocus={true}
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.nome}
                    onChangeText={handleChange('nome')}
                    onBlur={() => setFieldTouched('nome')}
                    placeholder="Nome"
                  />
                </Item>
              </View>

              {touched.nome && errors.nome ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.nome}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="email-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.email} //EMAIL
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
              </View>
              {touched.email && errors.email ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.email}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="phone-outline" />
                  <TextInputMask
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    keyboardType="number-pad"
                    mask={'([00]) [00000]-[0000]'}
                    value={values.celular} //celular
                    onChangeText={handleChange('celular')}
                    placeholder="Telefone"
                    onBlur={() => setFieldTouched('celular')}
                  />
                </Item>
              </View>
              {touched.celular && errors.celular ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.celular}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.password} //Senha
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onBlur={() => setFieldTouched('password')}
                  />
                </Item>
              </View>
              {touched.password && errors.password ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.password}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}

              <View style={estilo.view_BotaoEntar}>
                <Button disabled={!isValid} style={estilo.botao_login} onPress={handleSubmit}>
                  <Text style={estilo.textoLabel}>Enviar</Text>
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>

      <Modal animationType="fade" transparent={true} visible={loading}>
        <View style={estilo.ViewFundo}>
          <View style={estilo.ViewModal}>
            <Spinner color="#142850" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
