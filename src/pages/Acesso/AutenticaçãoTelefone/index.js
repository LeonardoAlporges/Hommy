import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import { Button, Input, Item } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import estilo, {
  CamposLogin,
  CamposLoginSenha,
  Container,
  LabelErro,
  TextoBotao,
  Titulo,
  ViewBotao,
  ViewErro,
  ViewImagem,
  ViewTitulo
} from './styles';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [codigoErrado, setCodigoErrado] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {}, [confirm]);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    var confirmation;
    try {
      confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setCodigoValido(true);
    } catch (error) {
      setErro(true);
    }
  }

  async function confirmCode(values) {
    try {
      await confirm.confirm(values.codigo);
      setSucesso(true);
    } catch (error) {
      setErro(true);
    }
  }

  return (
    <Container>
      <HeaderBack title={'Confirmação por telefone'} onNavigation={() => resetarPilhaNavegacao('Login')} />

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
            Digite seu telefone para enviarmos o código de confirmação por SMS para você verificar seu número de
            celular.
          </Titulo>
        ) : (
          <Titulo>
            Um código para prosseguir foi enviado via SMS. Por favor, informe seu código de confirmação no campo abaixo.
          </Titulo>
        )}
      </ViewTitulo>

      <Formik
        initialValues={{
          codigo: yup.string('').min(6, 'Mínimo 6 dígitos necessários').max(6, 'Somente 6 dígitos são permitido'),
          numeroTelefone: yup
            .string('')
            .min(11, 'Mínimo 11 dígitos necessários')
            .max(11, 'Máximo 11 dígitos necessários')
            .required('Insira uma senha para sua conta')
        }}
        validationSchema={yup.object().shape({
          codigo: yup
            .string()
            .min(6, 'Mínimo 6 dígitos necessários')
            .max(6, 'Somente 6 digitos permitido')
            .required('Campo obrigatório'),
          numeroTelefone: yup
            .string()
            .min(10, 'Mínimo 11 dígitos necessários')
            .max(11, 'Máximo 11 dígitos necessários')
            .required('Campo obrigatório')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            {erro && (
              <CustomModal
                parametro="Erro"
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
                    value={values.codigo} //NOME
                    onChangeText={handleChange('numeroTelefone')}
                    onBlur={() => setFieldTouched('numeroTelefone')}
                    placeholder="Telefone"
                    mask={'([00]) [00000]-[0000]'}
                    keyboardType="number-pad"
                  />
                </Item>
              </CamposLogin>
            )}
            <View>
              {touched.numeroTelefone && errors.numeroTelefone ? (
                <ViewErro>
                  <LabelErro>{errors.numeroTelefone}</LabelErro>
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
                    signInWithPhoneNumber('+55' + values.numeroTelefone);
                  }}
                >
                  <TextoBotao>Prosseguir</TextoBotao>
                </Button>
              </ViewBotao>
            )}

            {codigoValido && (
              <CamposLoginSenha>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.codigo} //NOME
                    onChangeText={handleChange('codigo')}
                    onBlur={() => setFieldTouched('codigo')}
                    placeholder="000-000"
                  />
                </Item>
              </CamposLoginSenha>
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

            {codigoValido && (
              <ViewBotao>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    confirmCode(values);
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
