import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { Text, Image, ScrollView, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Item, Input, Button, Spinner } from 'native-base';
import {
  imagePickerOptions,
  uploadFileToFireBaseUser,
  uploadProgress,
} from '../../utils';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';
import estilo from './style';
import { View } from 'native-base';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../components/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

class CadastroUsuario extends Component {
  static navigationOptions = { header: null };

  state = {
    imageURI: '',
    upload: false,
    modalLoadVisible: false,
    load: false,
    erro: false,
  };

  EnviarCadastro = async value => {
    console.log('OKK', value);
    this.setState({ modalLoadVisible: true, erro: false });
    value.fotoPerfil = this.state.imageURI;

    await api
      .post('/usuario', value)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ modalLoadVisible: false });
        this.props.navigation.navigate('Confirmacao');
      })
      .catch(error => {
        console.log(error);
        this.setState({ modalLoadVisible: false, erro: true });
      });
  };

  monitorFileUpload = task => {
    task.on('state_changed', snapshot => {
      const progress = uploadProgress(
        snapshot.bytesTransferred / snapshot.totalBytes
      );
      console.log(snapshot);
      switch (snapshot.state) {
        case 'running':
          this.setState({
            imageURI: null,
            upload: true,
            load: true,
          });

          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL);
            this.setState({ imageURI: downloadURL, upload: true, load: false });
          });
          break;
        default:
          break;
      }
    });
  };

  uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Envio cancelado');
      } else if (error) {
        alert('Ocorreu um erro: ', error);
      } else {
        const uploadTask = uploadFileToFireBaseUser(imagePickerResponse);
        this.monitorFileUpload(uploadTask);
      }
    });
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };
  render() {
    return (
      <ScrollView>
        <HeaderBack
          title="Cadastro de usuario"
          onNavigation={() => this.navegar()}
        />
        <View style={estilo.container}>
          {this.state.upload ? (
            <View>
              {this.state.load ? (
                <Spinner color="#27496d" />
              ) : (
                <Image
                  source={{ uri: this.state.imageURI }}
                  style={estilo.imagemStyle}
                />
              )}
            </View>
          ) : (
            <Image
              source={require('../../assets/Img/Republica_Send_Pictures.png')}
              style={estilo.imagemStyle}
            />
          )}
          <View style={estilo.V_Btn}>
            <Button style={estilo.botao_send} onPress={this.uploadFile}>
              <Text style={estilo.textoLabel}>Enviar foto de perfil</Text>
            </Button>
          </View>
          <Formik
            initialValues={{
              nome: '',
              email: '',
              confirmaEmail: '',
              password: '',
              celular: '',
              fotoPerfil: '',
            }}
            onSubmit={values => {
              this.EnviarCadastro(values);
            }}
            validationSchema={yup.object().shape({
              nome: yup
                .string('Somente texto')
                .required('Insira seu nome completo '),
              email: yup
                .string('Somente texto')
                .email('Insira um Email valido')
                .required('Insira um Email para sua conta'),
              celular: yup
                .string('prença corretamente')
                .max(9999999999999)
                .required(' Insira um numero de celular'),
              password: yup
                .string('Somente texto')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .required('Insira uma senha para sua conta'),
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
                {this.state.sucesso ? (
                  <View style={estilo.V_modal}>
                    <CustomModal parametro="Sucesso" />
                  </View>
                ) : (
                  <View />
                )}
                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon
                      style={estilo.icons_CamposLogin}
                      active
                      name="account-outline"
                    />
                    <Input
                      autoFocus={true}
                      placeholderTextColor="#2e2e2e"
                      style={estilo.labelInput}
                      value={values.nome} //NOME
                      onChangeText={handleChange('nome')}
                      onBlur={() => setFieldTouched('nome')}
                      placeholder="Nome"
                    />
                  </Item>
                </View>

                {touched.nome && errors.nome ? (
                  <View style={estilo.V_Erro}>
                    <Text style={estilo.txtErro}>{errors.nome}</Text>
                  </View>
                ) : (
                  <View style={estilo.V_ErroSem} />
                )}

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
                      value={values.email} //EMAIL
                      onChangeText={handleChange('email')}
                      placeholder="E-mail"
                      onBlur={() => setFieldTouched('email')}
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

                <View style={estilo.view_CamposLogin}>
                  <Item>
                    <Icon
                      style={estilo.icons_CamposLogin}
                      active
                      name="phone-outline"
                    />
                    <TextInputMask
                      placeholderTextColor="#2e2e2e"
                      style={estilo.labelInput}
                      keyboardType="number-pad"
                      mask={'([00]) [00000]-[0000]'}
                      value={values.celular} //celular
                      onChangeText={handleChange('celular')}
                      placeholder="Telefone"
                      onBlur={() => setFieldTouched('celular')}
                    />
                  </Item>
                </View>
                {touched.celular && errors.celular ? (
                  <View style={estilo.V_Erro}>
                    <Text style={estilo.txtErro}>{errors.celular}</Text>
                  </View>
                ) : (
                  <View style={estilo.V_ErroSem} />
                )}

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
                      value={values.password} //Senha
                      onChangeText={handleChange('password')}
                      placeholder="Senha"
                      secureTextEntry={true}
                    />
                  </Item>
                </View>
                {touched.password && errors.password ? (
                  <View style={estilo.V_Erro}>
                    <Text style={estilo.txtErro}>{errors.password}</Text>
                  </View>
                ) : (
                  <View style={estilo.V_ErroSem} />
                )}
                {console.log(isValid)}
                <View style={estilo.view_BotaoEntar}>
                  <Button
                    disabled={!isValid}
                    style={estilo.botao_login}
                    onPress={() => this.EnviarCadastro(values)}
                  >
                    <Text style={estilo.textoLabel}>Enviar</Text>
                  </Button>
                </View>
              </Fragment>
            )}
          </Formik>
        </View>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalLoadVisible}
          >
            <View style={estilo.ViewFundo}>
              <View style={estilo.ViewModal}>
                <Spinner color="red" />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}
export default withNavigation(CadastroUsuario);
