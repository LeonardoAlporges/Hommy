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
import { NavigationActions, StackActions } from 'react-navigation';
class CadastroUsuario extends Component {
  static navigationOptions = { header: null };

  state = {
    imageURI: '',
    upload: false,
    modalLoadVisible: false,
    load: false,
    erro: false,
    Sucesso: false,
  };

  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  EnviarCadastro = async value => {
    this.setState({ modalLoadVisible: true, erro: false });
    value.fotoPerfil = this.state.imageURI;
    if (value.fotoPerfil == '') {
      value.fotoPerfil =
        'https://firebasestorage.googleapis.com/v0/b/hommy-d0890.appspot.com/o/pictures%2Fuser%2Funnamed.png?alt=media&token=fa5dad7d-3792-49ec-9545-4d65a2fa1498';
    }
    await api
      .post('/usuario', value)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ modalLoadVisible: false, Sucesso: true });
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
                <Spinner color="#142850" />
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
                .string('Insira sua senha')
                .min(8, 'Senha minima é de 8 digitos')
                .required('Insira uma senha'),
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
                {this.state.erro && (
                  <CustomModal
                    parametro="Erro"
                    callback={() => {
                      this.setState({ erro: false });
                    }}
                  />
                )}
                {this.state.Sucesso ? (
                  <View style={estilo.V_modal}>
                    <CustomModal
                      parametro="Custom"
                      titulo="Cadastro Realizado :)"
                      descricao="Seu cadastro no aplicativofoi realizado com sucesso, voce sera redirecionado para fazer login."
                      botao="Confirmar"
                      callback={() => {
                        resetNavigation('Login');
                      }}
                    />
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
                      onBlur={() => setFieldTouched('password')}
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
