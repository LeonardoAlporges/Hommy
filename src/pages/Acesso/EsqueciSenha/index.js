import { Formik } from 'formik';
import { Button, Input, Item } from 'native-base';
import React, { Fragment, useState } from 'react';
import { Image,Text, View  } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
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
  ViewTitulo,
  Linha,
  LabelFielSet,
  FieldSetLarge,
} from './styles';

export default function EsqueciSenha({ navigation }) {
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);

  function EnviarCodigo(values) {
    console.log(api.getUri)
    setLoading(true);
    api
      .put('/alterar/cod', values)
      .then(response => {
        console.log(response)
        setLoading(false);
        navigation.navigate('ValidarCodigo', { email: values });
      })
      .catch(error => {
        console.log(error.response)
        setLoading(false);
        setErro(true);
      });
  }

  function resetarPilhaNavegacao(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })]
    });

    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <HeaderBack title="Esqueceu a senha ?" onNavigation={() => resetarPilhaNavegacao('Login')} />

      <ViewImagem>
        <Image style={estilo.V_img} source={require('../../../assets/Img/Send_email.png')} />
      </ViewImagem>

      <ViewTitulo>
        <Titulo>
          Informe seu e-mail cadastrado no aplicativo para que possamos lhe enviar um codigo de recuperação.
        </Titulo>
      </ViewTitulo>

      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={yup.object().shape({
          email: yup.string('').email('E-mail inválido ou incorreto').required('Campo obrigatório')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>

            <Linha>
              <FieldSetLarge>
                <LabelFielSet>Email</LabelFielSet>
                <Item style={{ borderColor: 'transparent' }}>
                  <Input
                    style={{ fontFamily: 'WorkSans' }}
                    value={values.pontoReferencia}
                    onChangeText={handleChange('email')}
                    placeholderTextColor="#2e2e2e"
                    placeholderTextColor="#989898"
                    placeholder="Insira seu  Email"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                <View style={estilo.V_error}>
                  {touched.email && errors.email && (
                    <Text style={estilo.textError}>{errors.email}</Text>
                  )}
                </View>
              </FieldSetLarge>
            </Linha>
            <ViewBotao>
              <Button
                style={estilo.botao}
                onPress={() => {
                  EnviarCodigo(values);
                }}
              >
                <TextoBotao>Recuperar senha</TextoBotao>
              </Button>
            </ViewBotao>
          </Fragment>
        )}
      </Formik>
      {erro && (
        <CustomModal
          parametro="Erro"
          callback={() => {
            setErro(false);
          }}
        />
      )}
      {loading && <Loading />}
    </Container>
  );
}
