import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Image, Text } from 'react-native';
import { Button, View, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';
import api from '../../service/api';
import Loading from '../../components/Loading';

import estilo from './styles';
import HeaderBack from '../../components/CustomHeader';
import { NavigationActions, StackActions } from 'react-navigation';

class EsqueciSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Erro: false,
      sucesso: false,
      Load: false,
    };
  }
  static navigationOptions = { header: null };

  EnviarCodigo = values => {
    this.setState({ Load: true });
    api
      .put('/alterar/cod/', values)
      .then(responseJson => {
        console.log(responseJson);
        console.log('Enviando', values);
        this.setState({ sucesso: true, Load: false });
        this.props.navigation.navigate('ValidarCodigo', { email: values });
      })
      .catch(error => {
        this.setState({ Erro: true, Load: false });
        console.log(error);
      });
  };
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }
  navegar = () => {
    this.resetNavigation('Login');
  };

  render() {
    return (
      <View style={estilo.container}>
        <HeaderBack title="Esqueceu a senha ?" onNavigation={() => this.navegar()} />

        <View style={estilo.V_img}>
          <Image style={estilo.V_img} source={require('../../assets/Img/Send_email.png')} />
        </View>

        <View style={estilo.V_title}>
          <Text style={estilo.title}>
            Informe seu e-mail cadastrado no aplicativo para que possamos lhe enviar um codigo de recuperação.
          </Text>
        </View>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string('')
              .email('E-mail inválido ou incorreto')
              .required('Campo obrigatório'),
          })}
        >
          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <Fragment>
              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon style={estilo.icons_CamposLogin} active name="email-outline" />
                  <Input
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.email} //NOME
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    placeholder="E-mail"
                  />
                </Item>
              </View>

              {touched.email && errors.email ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.email}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
              <View style={estilo.V_botao}>
                <Button
                  style={estilo.botao}
                  onPress={() => {
                    this.EnviarCodigo(values);
                  }}
                >
                  <Text style={estilo.txtbtn}>Recuperar senha</Text>
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
        {this.state.Erro && (
          <CustomModal
            parametro="Erro"
            callback={() => {
              this.setState({ Erro: false });
            }}
          />
        )}
        {this.state.Load && <Loading />}
      </View>
    );
  }
}

export default withNavigation(EsqueciSenha);
