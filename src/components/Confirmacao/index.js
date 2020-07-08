import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Image, Text } from 'react-native';
import { Button, View, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { withNavigation } from 'react-navigation';
import CustomModal from '../Alert';

import estilo from './style';
import HeaderBack from '../CustomHeader';

class Confirmacao extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      erro: false,
      sucesso: false,
      //update: this.props.navigation.state.params.update,
      titleBotao: '',
      confirmacao: true,
    };
  }

  onClickCard = () => {
    this.props.navigation.navigate('Detalhes');
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  ValidarCodigo = values => {
    this.setState({ confirmacao: false });
  };

  render() {
    return (
      <View style={estilo.container}>
        <HeaderBack title={'Confirmar Email'} onNavigation={() => this.navegar()} />

        <View style={estilo.V_img}>
          <Image style={estilo.V_img} source={require('../../assets/Img/Send_email.png')} />
        </View>

        <View style={estilo.V_title}>
          <Text style={estilo.title}>
            Enviamos um codigo de 6 digitos para seu email, insira ele abaixo para confirmar seu E-mail!
          </Text>
        </View>

        <Formik
          initialValues={{
            codigo: '',
            password: '',
          }}
          validationSchema={yup.object().shape({
            codigo: yup.string('Somente texto').required('Insira seu nome completo '),
            password: yup
              .string('Insira sua senha')
              .min(4, 'Senha minima é de 4 digitos')
              .required('Insira uma senha'),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              {this.state.erro && (
                <CustomModal
                  parametro="Erro"
                  callback={() => {
                    this.setState({ erro: false });
                  }}
                />
              )}

              {this.state.confirmacao ? (
                <View>
                  <View style={estilo.view_CamposLogin}>
                    <Item>
                      <Icon style={estilo.icons_CamposLogin} active name="key-outline" />
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
                  <View>
                    {touched.codigo && errors.codigo ? (
                      <View style={estilo.V_Erro}>
                        <Text style={estilo.txtErro}>{errors.codigo}</Text>
                      </View>
                    ) : (
                      <View style={estilo.V_ErroSem} />
                    )}
                  </View>

                  <View style={estilo.V_botao}>
                    <Button
                      style={estilo.botao}
                      onPress={() => {
                        this.ValidarCodigo(values);
                      }}
                    >
                      <Text style={estilo.txtbtn}>Confirmar</Text>
                    </Button>
                  </View>
                </View>
              ) : (
                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon name="key-outline" style={estilo.icons_CamposLogin} />
                    <Input
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder="Nova senha"
                      secureTextEntry={true}
                      onBlur={() => setFieldTouched('password')}
                    />
                  </Item>
                  {touched.password && errors.password && (
                    <View style={estilo.V_Erro}>
                      <Text style={estilo.txtErro}>{errors.password}</Text>
                    </View>
                  )}
                  <View style={estilo.V_botao}>
                    <Button
                      style={estilo.botao}
                      onPress={() => {
                        this.ValidarCodigo(values);
                      }}
                    >
                      <Text style={estilo.txtbtn}>Confirmar</Text>
                    </Button>
                  </View>
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
                this.props.navigation.navigate('Login');
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

export default withNavigation(Confirmacao);
