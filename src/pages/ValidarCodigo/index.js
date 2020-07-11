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
import { NavigationActions, StackActions } from 'react-navigation';
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
      ErroCodigo: false,
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

    api
      .put('/alterar/confirm', data)
      .then(responseJson => {
        console.log(responseJson);

        this.setState({ codigoValidado: true });
      })
      .catch(error => {
        console.log(error, error.status);
        if (error.response.status == 401 || error.response.status == 404) {
          this.setState({ ErroCodigo: true });
        } else {
          this.setState({ Erro: true });
        }
      });
  };
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }
  EnviarNovaSenha = values => {
    const data = {
      email: this.state.email.email,
      pass: values.novaSenha,
    };
    api
      .put('/alterar/senha', data)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ sucesso: true });
      })
      .catch(error => {
        this.setState({ Erro: true });
      });
  };

  navegar = () => {
    this.resetNavigation('Login');
  };

  render() {
    return (
      <View style={estilo.container}>
        <HeaderBack title={'Recuperação de senha'} onNavigation={() => this.navegar()} />

        <View style={estilo.V_img}>
          <Image style={estilo.V_img} source={require('../../assets/Img/Send_email.png')} />
        </View>

        <View style={estilo.V_title}>
          {this.state.codigoValidado ? (
            <Text style={estilo.title}>
              Cadastre uma nova senha de acesso. Sua senha antiga será apagada, crie uma nova para se conectar ao
              aplicativo.
            </Text>
          ) : (
            <Text style={estilo.title}>
              Um código para prosseguir foi enviado ao seu e-mail. Por favor, informe-o no campo abaixo.
            </Text>
          )}
        </View>

        <Formik
          initialValues={{
            codigo: yup
              .string()
              .min(6, 'Mínimo 6 dígitos necessários')
              .max(6, 'Somente 6 dígitos são permitido'),
            novaSenha: yup
              .string('')
              .min(8, 'Mínimo 8 dígitos necessários')
              .required('Insira uma senha para sua conta'),
          }}
          onSubmit={values => {}}
          validationSchema={yup.object().shape({
            codigo: yup.string().required(),
            novaSenha: yup.string().required(),
            confirmacaoSenha: yup.string().required(),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              {this.state.Erro && (
                <CustomModal
                  parametro="Erro "
                  callback={() => {
                    this.setState({ Erro: false });
                  }}
                />
              )}

              {this.state.ErroCodigo && (
                <CustomModal
                  parametro="Custom"
                  imagem="NaoEncontrado"
                  titulo="Código incorreto"
                  descricao="Verifique se digitou tudo certo. Não foi possível continuar a recuperação de sua senha com este código."
                  botao="Verificar"
                  callback={() => {
                    this.setState({ ErroCodigo: false });
                  }}
                />
              )}

              {!this.state.codigoValidado && (
                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
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
                    <Text style={estilo.txtbtn}>Prosseguir</Text>
                  </Button>
                </View>
              )}

              {this.state.codigoValidado && (
                <View style={estilo.view_CamposLoginSenha}>
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

        {this.state.sucesso && (
          <View style={estilo.V_modal}>
            <CustomModal
              parametro="Custom"
              titulo="Senha cadastrada com sucesso."
              descricao="Sua senha foi redefinida. Você já pode voltar a navegar pelo nosso aplicativo!"
              botao="Ok, concluir."
              callback={() => {
                this.resetNavigation('Login');
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(ValidarCodigo);
