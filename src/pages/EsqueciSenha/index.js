import * as yup from 'yup';
import { Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { Image, Text } from 'react-native';
import { Button, View, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';

import estilo from './styles';
import HeaderBack from '../../components/CustomHeader';

class EsqueciSenha extends Component {
  static navigationOptions = { header: null };
  state = {
    erro: false,
    sucesso: false,
  };
  onClickCard = () => {
    this.props.navigation.navigate('Detalhes');
  };

  render() {
    return (
      <View style={estilo.container}>
        <HeaderBack title={'Confirmar Email'} />

        <View style={estilo.V_img}>
          <Image
            style={estilo.V_img}
            source={require('../../assets/Img/Send_email.png')}
          />
        </View>

        <View style={estilo.V_title}>
          <Text style={estilo.title}>
            Enviamos um codigo de 6 digitos para seu email, insira ele abaixo
            para confirmar seu E-mail!
          </Text>
        </View>

        <Formik
          initialValues={{
            codigo: '',
          }}
          validationSchema={yup.object().shape({
            codigo: yup
              .string('Somente texto')
              .required('Insira seu nome completo '),
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
                    name="key-outline"
                  />
                  <TextInputMask
                    mask={'[0]-[0]-[0]-[0]-[0]-[0]'}
                    placeholderTextColor="#2e2e2e"
                    style={estilo.labelInput}
                    value={values.codigo} //NOME
                    onChangeText={handleChange('codigo')}
                    onBlur={() => setFieldTouched('codigo')}
                    placeholder="Nome"
                  />
                </Item>
              </View>

              {touched.codigo && errors.codigo ? (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.codigo}</Text>
                </View>
              ) : (
                <View style={estilo.V_ErroSem} />
              )}
            </Fragment>
          )}
        </Formik>
        <View style={estilo.V_botao}>
          <Button
            style={estilo.botao}
            onPress={() => {
              this.setState({ sucesso: true });
            }}
          >
            <Text style={estilo.txtbtn}>Confirmar</Text>
          </Button>
        </View>
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

export default withNavigation(EsqueciSenha);
