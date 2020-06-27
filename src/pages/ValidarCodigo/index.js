import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';
import api from '../../service/api';

import estilo from './styles';
import HeaderBack from '../../components/CustomHeader';
import { values } from 'lodash';

class ValidarCodigo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erro: false,
      sucesso: false,
      codigoValidado: false,
      email: this.props.navigation.state.params.email,
    };
  }
  static navigationOptions = { header: null };

  onClickCard = () => {
    this.props.navigation.navigate('Detalhes');
  };

  VerificarCodigo = values => {
    const data = {
      email: this.state.email.email,
      numConfirm: values,
    };
    console.log('?', data);
    api
      .put('/alterar/confirm', data)
      .then(responseJson => {
        console.log('Resposta', responseJson);
        console.log('Enviado', data);
        this.setState({ codigoValidado: true });
      })
      .catch(error => {
        this.setState({ Erro: true });
        console.log(error);
      });
  };

  EnviarNovaSenha = values => {
    const data = {
      email: this.state.email.email,
      pass: values.novaSenha,
    };

    console.log('Senha:', data);
    api
      .put('/alterar/senha', data)
      .then(responseJson => {
        console.log('Resposta', responseJson);
        console.log('Enviado', data);
        this.setState({ sucesso: true });
      })
      .catch(error => {
        this.setState({ Erro: true });
        console.log(error);
      });
  };

  navegar = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={estilo.container}>
        <HeaderBack
          title={'Validar codigo'}
          onNavigation={() => this.navegar()}
        />

        <View style={estilo.V_img}>
          <Image
            style={estilo.V_img}
            source={require('../../assets/Img/Send_email.png')}
          />
        </View>

        <View style={estilo.V_title}>
          {this.state.codigoValidado ? (
            <Text style={estilo.title}>
              Agora digite uma nova senha para sua conta que voce ache segura
            </Text>
          ) : (
            <Text style={estilo.title}>
              Digite o codigo de verificação enviado para seu E-mail
            </Text>
          )}
        </View>

        <Formik
          initialValues={{
            codigo: yup
              .string()
              .min(6, 'Digite os 6 numeros ')
              .max(6, 'Somente os 6 numeros permitido'),
            novaSenha: yup
              .string('')
              .min(8, 'Password is too short - should be 8 chars minimum.')
              .required('Insira uma senha para sua conta'),
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={yup.object().shape({
            codigo: yup.string().required(),
            novaSenha: yup.string().required(),
            confirmacaoSenha: yup.string().required(),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              {this.state.Erro && <CustomModal parametro="Erro" />}
              {!this.state.codigoValidado && (
                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon
                      style={estilo.icons_CamposLogin}
                      active
                      name="key-outline"
                    />
                    <Input
                      placeholderTextColor="#2e2e2e"
                      style={estilo.labelInput}
                      value={values.codigo} //NOME
                      onChangeText={handleChange('codigo')}
                      onBlur={() => setFieldTouched('codigo')}
                      placeholder="000000"
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
              {!this.state.codigoValidado && (
                <View style={estilo.V_botao}>
                  <Button
                    style={estilo.botao}
                    onPress={() => {
                      this.VerificarCodigo(values.codigo);
                    }}
                  >
                    <Text style={estilo.txtbtn}>Verificar código</Text>
                  </Button>
                </View>
              )}

              {this.state.codigoValidado && (
                <View style={estilo.view_CamposLoginSenha}>
                  <Item>
                    <Icon
                      style={estilo.icons_CamposLogin}
                      active
                      name="key-outline"
                    />
                    <Input
                      placeholderTextColor="#2e2e2e"
                      style={estilo.labelInput}
                      value={values.novaSenha} //NOME
                      onChangeText={handleChange('novaSenha')}
                      onBlur={() => setFieldTouched('novaSenha')}
                      placeholder="Nova senha"
                    />
                  </Item>
                </View>
              )}
              <View>
                {touched.novaSenha && errors.novaSenha ? (
                  <View style={estilo.V_Erro}>
                    <Text style={estilo.txtErro}>{errors.novaSenha}</Text>
                  </View>
                ) : (
                  <View style={estilo.V_ErroSem} />
                )}
              </View>

              {this.state.codigoValidado && (
                <View style={estilo.V_botao}>
                  <Button
                    style={estilo.botao}
                    onPress={() => {
                      this.EnviarNovaSenha(values);
                    }}
                  >
                    <Text style={estilo.txtbtn}>Enviar nova senha</Text>
                  </Button>
                </View>
              )}
            </Fragment>
          )}
        </Formik>

        {this.state.sucesso ? (
          <View style={estilo.V_modal}>
            <CustomModal
              parametro="Sucesso"
              callback={() => {
                this.props.navigation.navigate('Login');
                this.setState({ sucesso: false });
              }}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

export default withNavigation(ValidarCodigo);
