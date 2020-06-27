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

import estilo from './styles';
import HeaderBack from '../../components/CustomHeader';

class EsqueciSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erro: false,
      sucesso: false,
    };
  }
  static navigationOptions = { header: null };
  state = {};

  onClickCard = () => {
    this.props.navigation.navigate('Detalhes');
  };

  EnviarCodigo = values => {
    api
      .put('/alterar/cod/', values)
      .then(responseJson => {
        console.log(responseJson);
        console.log('Enviando', values);
        this.setState({ sucesso: true });
        this.props.navigation.navigate('ValidarCodigo');
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
          title={'Confirmar Email'}
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
            email: '',
          }}
          validationSchema={yup.object().shape({
            email: yup.string('Somente texto').required('E-mail invalido'),
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
              {this.state.erro ? <CustomModal parametro="Erro" /> : <View />}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="email-outline"
                  />
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
                  <Text style={estilo.txtbtn}>Solicitar codigo</Text>
                </Button>
              </View>
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

export default withNavigation(EsqueciSenha);
