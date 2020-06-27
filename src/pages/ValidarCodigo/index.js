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

class ValidarCodigo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erro: false,
      sucesso: false,
      codigoValidado: true,
    };
  }
  static navigationOptions = { header: null };
  state = {};

  onClickCard = () => {
    this.props.navigation.navigate('Detalhes');
  };

  EnviarCodigo = values => {
    this.setState({ codigoValidado: !this.state.codigoValidado });
    // api
    //   .put('/alterar/cod/', values.codigo)
    //   .then(responseJson => {
    //     console.log(responseJson);
    //     console.log('Enviando', values);
    //     this.setState({ sucesso: true });
    //     this.props.navigation.navigate('');
    //   })
    //   .catch(error => {
    //     this.setState({ Erro: true });
    //     console.log(error);
    //   });
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
          <Text style={estilo.title}>
            Digite o E-mail da conta que você deseja recuperar
          </Text>
        </View>

        <Formik
          initialValues={{
            codigo: '',
            novaSenha: '',
            confirmacaoSenha: '',
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
              {this.state.erro && <CustomModal parametro="Erro" />}
              {!this.state.codigoValidado && (
                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon
                      style={estilo.icons_CamposLogin}
                      active
                      name="key-outline"
                    />
                    <TextInputMask
                      mask={'[0]-[0]-[0]-[0]-[0]-[0]'}
                      placeholderTextColor="#2e2e2e"
                      style={estilo.labelInput}
                      value={values.codigo} //NOME
                      onChangeText={handleChange('codigo')}
                      onBlur={() => setFieldTouched('codigo')}
                      placeholder="0-0-0-0-0-0"
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
                      this.EnviarCodigo(values);
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
                      value={values.codigo} //NOME
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
                      value={values.codigo}
                      onChangeText={handleChange('confirmacaoSenha')}
                      onBlur={() => setFieldTouched('confirmacaoSenha')}
                      placeholder="Confirmação Senha"
                    />
                  </Item>
                </View>
              )}
              <View>
                {touched.confirmacaoSenha && errors.confirmacaoSenha ? (
                  <View style={estilo.V_Erro}>
                    <Text style={estilo.txtErro}>
                      {errors.confirmacaoSenha}
                    </Text>
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
                      this.EnviarCodigo(values);
                    }}
                  >
                    <Text style={estilo.txtbtn}>Verificar código</Text>
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
              onAction={() => {
                this.props.navigation.navigate('Confirmacao', { update: true });
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
