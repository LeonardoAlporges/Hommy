import { Formik } from 'formik';
import { Button, Input, Item } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import api from '../../../service/api';
import estilo, {
  CamposLogin,
  Container,
  LabelErro,
  TextoBotao,
  Titulo,
  ViewBotao,
  ViewErro,
  ViewImagem,
  ViewTitulo
} from './styles';

export default function ValidarCodigo({ navigation }) {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [email, setEmail] = useState(navigation.state.params.email);
  const [codigoErrado, setCodigoErrado] = useState(false);

  useEffect(() => {}, [codigoValido]);

  function verificarCodigoDigitado(values) {
    const data = {
      email: email.email,
      numConfirm: values
    };

    api
      .put('/alterar/confirm', data)
      .then(response => {
        setCodigoValido(true);
      })
      .catch(error => {
        if (error.response.data.code == 204) {
          setCodigoErrado(true);
        } else {
          setErro(true);
        }
      });
  }

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });
    navigation.dispatch(resetAction);
  }

  function enviarNovaSenha(values) {
    const data = {
      email: email.email,
      pass: values.novaSenha
    };

    api
      .put('/alterar/senha', data)
      .then(response => {
        setSucesso(true);
      })
      .catch(error => {
        setErro(true);
      });
  }

  return (
    <Container>
      <HeaderBack title={'Recuperação de senha'} onNavigation={() => resetarPilhaNavegacao('Login')} />

      <ViewImagem>
        <Image
          style={estilo.V_img}
          source={
            codigoValido
              ? require('../../../assets/Img/Insira_Senha.png')
              : require('../../../assets/Img/Send_email.png')
          }
        />
      </ViewImagem>

      <ViewTitulo>
        {codigoValido ? (
          <Titulo>
            Cadastre uma nova senha de acesso. Sua senha antiga será apagada, crie uma nova para se conectar ao
            aplicativo.
          </Titulo>
        ) : (
          <Titulo>Um código para prosseguir foi enviado ao seu e-mail. Por favor, informe-o no campo abaixo.</Titulo>
        )}
      </ViewTitulo>

      <Formik
        initialValues={{
          codigo: yup.string().min(6, 'Mínimo 6 dígitos necessários').max(6, 'Somente 6 dígitos são permitido'),
          novaSenha: yup.string('').min(8, 'Mínimo 8 dígitos necessários').required('Insira uma senha para sua conta')
        }}
        validationSchema={yup.object().shape({
          codigo: yup
            .string()
            .min(6, 'Mínimo 6 dígitos necessários')
            .max(6, 'Somente 6 digitos permitido')
            .required('Campo obrigatório'),
          novaSenha: yup.string().min(8, 'Mínimo 8 dígitos necessários').required('Campo obrigatório'),
          confirmacaoSenha: yup.string().min(8, 'Mínimo 8 dígitos necessários').required('Campo obrigatório')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            {erro && (
              <CustomModal
                parametro="Erro "
                descricao="Opss! Ocorreu um erro estranho :O"
                callback={() => {
                  setErro(false);
                }}
              />
            )}

            {codigoErrado && (
              <CustomModal
                parametro="Custom"
                titulo="Código incorreto"
                descricao="Verifique se digitou tudo certo. Não foi possível continuar a recuperação de sua senha com este código."
                botao="Verificar"
                callback={() => {
                  setCodigoErrado(false);
                }}
              />
            )}

            {!codigoValido && (
              <CamposLogin>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <TextInputMask
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    keyboardType="number-pad"
                    mask={'[999999'}
                    value={values.codigo}
                    onChangeText={handleChange('codigo')}
                    placeholder="000000"
                    onBlur={() => setFieldTouched('alucodigoguel')}
                  />
                </Item>
              </CamposLogin>
            )}
            <View>
              {touched.codigo && errors.codigo ? (
                <ViewErro>
                  <LabelErro>{errors.codigo}</LabelErro>
                </ViewErro>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>
            {!codigoValido && (
              <ViewBotao>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    verificarCodigoDigitado(values.codigo);
                  }}
                >
                  <TextoBotao>Prosseguir</TextoBotao>
                </Button>
              </ViewBotao>
            )}

            {codigoValido && (
              <CamposLogin>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.novaSenha} //NOME
                    onChangeText={handleChange('novaSenha')}
                    onBlur={() => setFieldTouched('novaSenha')}
                    placeholder="Nova senha"
                  />
                </Item>
              </CamposLogin>
            )}
            <View>
              {touched.novaSenha && errors.novaSenha ? (
                <ViewErro>
                  <LabelErro>{errors.novaSenha}</LabelErro>
                </ViewErro>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </View>

            {codigoValido && (
              <ViewBotao>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    enviarNovaSenha(values);
                  }}
                >
                  <TextoBotao>Enviar nova senha</TextoBotao>
                </Button>
              </ViewBotao>
            )}
          </Fragment>
        )}
      </Formik>

      {sucesso && (
        <CustomModal
          parametro="Custom"
          titulo="Senha cadastrada com sucesso."
          descricao="Sua senha foi redefinida. Você já pode voltar a navegar pelo nosso aplicativo!"
          botao="Ok, concluir."
          callback={() => {
            resetarPilhaNavegacao('Login');
          }}
        />
      )}
    </Container>
  );
}
