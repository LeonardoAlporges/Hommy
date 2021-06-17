import { Formik } from 'formik';
import { Input, Item } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { Image } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import api from '../../../service/api';
import estilo, {
  Botao, CamposLogin,
  Container,
  Invalido,
  LabelErro,
  TextoBotao,
  Titulo,
  ViewBotao,
  ViewImagem,
  ViewTitulo,
  Linha,
  LabelFielSet,
  FieldSetLarge,
} from './styles';

export default function ValidarCodigo({ navigation }) {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [codigoValido, setCodigoValido] = useState(false);
  const [email, setEmail] = useState(navigation.state.params.email);
  const [codigoErrado, setCodigoErrado] = useState(false);

  useEffect(() => { }, [codigoValido]);

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
    console.log("?")
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
          codigo: '',
          novaSenha: ''
        }}
        onSubmit={values => {
          enviarNovaSenha(values);
        }
        }
        validationSchema={yup.object().shape({
          codigo: yup.string().max(6, 'Maximo 8 dígitos'),
          novaSenha: yup.string().min(8, 'Mínimo 8 dígitos necessários').required('Campo obrigatório'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, isValid, handleSubmit }) => (
          <Fragment>
            {erro && (
              <CustomModal
                parametro="Erro"
                descricao="Opss! Algo de errado nao está certo"
                callback={() => {
                  setErro(false);
                }}
              />
            )}

            {codigoErrado && (
              <CustomModal
                parametro="Custom"
                titulo="Código incorreto"
                descricao="Verifique se digitou tudo certo. Não foi possível continuar a recuperação de senha com esse código."
                botao="Verificar"
                callback={() => {
                  setCodigoErrado(false);
                }}
              />
            )}

            {!codigoValido && (
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Codigo</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      keyboardType="number-pad"
                      style={{ fontFamily: 'WorkSans' }}
                      value={values.pontoReferencia}
                      onChangeText={handleChange('codigo')}
                      placeholderTextColor="#2e2e2e"
                      placeholderTextColor="#989898"
                      placeholder="Codigo de 6 digitos"
                      onBlur={() => setFieldTouched('codigo')}
                    />
                  </Item>
                </FieldSetLarge>
              </Linha>
            )}
            <Invalido>{errors.codigo && <LabelErro>{errors.codigo}</LabelErro>}</Invalido>

            {!codigoValido && (
              <ViewBotao>
                <Botao
                  onPress={() => {
                    verificarCodigoDigitado(values.codigo);
                  }}
                >
                  <TextoBotao>Continuar</TextoBotao>
                </Botao>
              </ViewBotao>
            )}

            {codigoValido && (
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Nova senha</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      keyboardType="number-pad"
                      style={{ fontFamily: 'WorkSans' }}
                      value={values.pontoReferencia}
                      onChangeText={handleChange('novaSenha')}
                      placeholderTextColor="#2e2e2e"
                      placeholderTextColor="#989898"
                      placeholder="Nova Senha"
                      onBlur={() => setFieldTouched('novaSenha')}
                    />
                  </Item>
                </FieldSetLarge>
              </Linha>
            )}
            <Invalido>{errors.novaSenha && <LabelErro>{errors.novaSenha}</LabelErro>}</Invalido>

            {codigoValido && (
              <ViewBotao>
                <Botao
                  onPress={() => handleSubmit(values)}
                >
                  <TextoBotao>Enviar nova senha</TextoBotao>
                </Botao>
              </ViewBotao>
            )}
          </Fragment>
        )}
      </Formik>

      {sucesso && (
        <CustomModal
          parametro="Custom"
          titulo="Sucesso."
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