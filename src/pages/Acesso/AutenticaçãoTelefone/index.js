import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment, useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import { NavigationActions, StackActions } from 'react-navigation';
import estilo from './styles';
import HeaderBack from '../../../components/CustomHeader';
import auth from '@react-native-firebase/auth';
import TextInputMask from 'react-native-text-input-mask';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [codigoErrado, setCodigoErrado] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => { }, [confirm]);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    var confirmation;
    try {
      confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setCodigoValido(true);
    } catch (error){
      setErro(true)      
    }
    console.log(confirmation);    
  }

  async function confirmCode(values) {
    try {
      await confirm.confirm(values.codigo);
      setSucesso(true);
    } catch (error) {
      setErro(true)
    }
  }

  return (
    <View style={estilo.container}>
      <HeaderBack title={'Confirmação por telefone'} onNavigation={() => resetarPilhaNavegacao('Login')} />

      <View style={estilo.V_img}>
        <Image
          style={estilo.V_img}
          source={
            codigoValido
              ? require('../../../assets/Img/Insira_Senha.png')
              : require('../../../assets/Img/Send_email.png')
          }
        />
      </View>

      <View style={estilo.V_title}>
        {codigoValido ? (
          <Text style={estilo.title}>
            Digite seu telefone para enviarmos o código de confirmação por SMS para você verificar seu número de celular.
          </Text>
        ) : (
            <Text style={estilo.title}>
              Um código para prosseguir foi enviado via SMS. Por favor, informe seu código de confirmação no campo abaixo.
            </Text>
          )}
      </View>

      <Formik
        initialValues={{
          codigo: yup
            .string('')
            .min(6, 'Mínimo 6 dígitos necessários')
            .max(6, 'Somente 6 dígitos são permitido'),
          numeroTelefone: yup
            .string('')
            .min(11, 'Mínimo 11 dígitos necessários')
            .max(11, 'Máximo 11 dígitos necessários')
            .required('Insira uma senha para sua conta'),
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
              <View style={estilo.view_CamposLogin}>
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
              </View>
            )}
            <View>
              {touched.numeroTelefone && errors.numeroTelefone ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.numeroTelefone}</Text>
                </View>
              ) : (
                  <View style={estilo.V_ErroSem} />
                )}
            </View>
            {!codigoValido && (
              <View style={estilo.V_botao}>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    signInWithPhoneNumber("+55" + values.numeroTelefone);
                  }}
                >
                  <Text style={estilo.txtbtn}>Prosseguir</Text>
                </Button>
              </View>
            )}

            {codigoValido && (
              <View style={estilo.view_CamposLoginSenha}>
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
              </View>
            )}
            <View>
              {touched.codigo && errors.codigo ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.codigo}</Text>
                </View>
              ) : (
                  <View style={estilo.V_ErroSem} />
                )}
            </View>

            {codigoValido && (
              <View style={estilo.V_botao}>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    confirmCode(values);
                  }}
                >
                  <Text style={estilo.txtbtn}>Enviar nova senha</Text>
                </Button>
              </View>
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
    </View>
  );
}