import * as yup from 'yup';
import { Formik } from 'formik';
import React, { useState, Fragment, useEffect } from 'react';
import { View, Image, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Icon, Input, Item, Button, Spinner } from 'native-base';
import CustomModal from '../../../components/Alert';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../service/api';
import style from './style';
import { NavigationActions, StackActions } from 'react-navigation';

export function Login({ navigation }) {
  useEffect(() => {
    console.log(navigation);
  });

  const [modalErroLogin, setmodalErroLogin] = useState(false);
  const [modalErroSenha, setmodalErroSenha] = useState(false);
  const [loading, setloading] = useState(false);

  async function salvarDadosStorage(dados) {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(dados.token));
      await AsyncStorage.setItem('user', JSON.stringify(dados.usuario));
    } catch (error) {
      console.log(error);
    }
  }

  function resetarPilhaNavegacao(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });
    navigation.dispatch(resetAction);
  }

  function fazerLogin(value) {
    setloading(true);
    const data = {
      email: value.email,
      password: value.password,
      tokenD: 'awdawdkdja12312daw',
      //navigation.state.params.token
    };
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
      });
  }

  return (
    <ScrollView>
      {modalErroLogin && (
        <CustomModal
          visivel={modalErroLogin}
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
          visivel={modalErroSenha}
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

      <View style={style.container}>
        <TouchableOpacity>
          <Image
            source={{
              uri:
                'https://firebsestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
            }}
            style={style.imgStyle}
          />
        </TouchableOpacity>
        <Text style={style.txt_Titulo}>Hommy</Text>
    
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
              .required('Campo obrigatório'),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
            <Fragment>
              <View style={style.view_CamposLogin}>
                <Item>
                  <Icon name="md-person" style={style.icons_CamposLogin} />
                  <Input
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
                {touched.email && errors.email && <Text style={style.txtError}>{errors.email}</Text>}
              </View>

              <View style={style.view_CamposLogin}>
                <Item>
                  <Icon name="md-key" style={style.icons_CamposLogin} />
                  <Input
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onBlur={() => setFieldTouched('password')}
                  />
                </Item>
                <View style={{ marginVertical: 10, height: 30 }}>
                  {touched.password && errors.password && <Text style={style.txtError}>{errors.password}</Text>}
                </View>
              </View>

              <View style={style.V_cadastrar}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EsqueciSenha');
                  }}
                >
                  <Text style={style.touchTx}>Esqueci minha senha!</Text>
                </TouchableOpacity>
              </View>

              <View>
                <Button style={style.botao_login} onPress={handleSubmit}>
                  <Text style={style.labelBotao}>Login</Text>
                </Button>

                <Button
                  style={style.botao_cadastro}
                  onPress={() => {
                    navigation.navigate('CadastroUsuario');
                  }}
                >
                  <Text style={style.labelBotao}>Cadastre-se</Text>
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={style.ViewFundo}>
          <View style={style.ViewModal}>
            <Spinner color="#142850" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default withNavigation(Login);
