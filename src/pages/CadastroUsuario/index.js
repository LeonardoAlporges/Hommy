import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment, useState } from 'react';
import { Text, Alert, Image, Modal, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Item, Input, Button } from 'native-base';
import {
  imagePickerOptions,
  uploadFileToFireBaseUser,
  uploadProgress,
} from '../../utils';
import CustomModal from '../../components/Alert';
import estilo from './style';
import { View } from 'native-base';
import api from '../../service/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CadastroUsuario = ({ navigation }) => {
  navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  EnviarCadastro = async value => {
    value.fotoPerfil = imageURI.uri;
    console.log('Valor de envio', value);
    await api
      .post('/usuario', value)
      .then(responseJson => {
        console.log('Cadastro', responseJson);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('ero', error);
        //this.setState({ isModalVisible: true });
        console.log('Usuario Nao cadastrado');
      });
    console.log('Acabou ew');
  };

  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });

  const [imageURI, setImageURI] = useState({
    uri:
      'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/leo.png?alt=media&token=82587fae-0527-42f4-8ba1-4f9d1d8e3395',
  });

  //setImageURI('https://image.flaticon.com/icons/svg/61/61205.svg');

  const monitorFileUpload = task => {
    task.on('state_changed', snapshot => {
      const progress = uploadProgress(
        snapshot.bytesTransferred / snapshot.totalBytes
      );
      switch (snapshot.state) {
        case 'running':
          setImageURI(null);
          setUpload({ loading: true });
          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            setImageURI({ uri: downloadURL });
            setUpload({ loading: false });
          });
          break;
        default:
          break;
      }
    });
  };

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Post canceled');
      } else if (error) {
        alert('An error occurred: ', error);
      } else {
        const uploadTask = uploadFileToFireBaseUser(imagePickerResponse);
        monitorFileUpload(uploadTask);
      }
    });
  };

  return (
    <ScrollView>
      <View style={estilo.container}>
        {upload.loading ? (
          <Image source={imageURI} style={estilo.imagemStyle} />
        ) : (
          <Image
            source={require('../../assets/Img/Republica_Send_Pictures.png')}
            style={estilo.imagemStyle}
          />
        )}
        <View style={estilo.V_Btn}>
          <Button style={estilo.botao_send} onPress={uploadFile}>
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
            console.log('Handle'), this.EnviarCadastro(values);
          }}
          validationSchema={yup.object().shape({
            nome: yup.string().required('Insira um Apelido para sua conta'),
            email: yup
              .string()
              .email('Insira um Email valido')
              .required('Insira um Email para sua conta'),
            celular: yup
              .number()
              .max(9999999999999)
              .required(' Insira um celular'),
            password: yup
              .string()
              .min(4)
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
                    value={values.nome} //NOME
                    onChangeText={handleChange('nome')}
                    onBlur={() => setFieldTouched('nome')}
                    placeholder="Nome"
                  />
                </Item>
              </View>

              {touched.nome && errors.nome && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.nome}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="email-outline"
                  />
                  <Input
                    value={values.email} //EMAIL
                    onChangeText={handleChange('email')}
                    placeholder="E-mail"
                    onBlur={() => setFieldTouched('email')}
                  />
                </Item>
              </View>
              {touched.email && errors.email && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.email}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="phone-outline"
                  />
                  <Input
                    value={values.celular} //celular
                    onChangeText={handleChange('celular')}
                    placeholder="Telefone"
                    onBlur={() => setFieldTouched('celular')}
                  />
                </Item>
              </View>
              {touched.celular && errors.celular && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.celular}</Text>
                </View>
              )}

              <View style={estilo.view_CamposLogin}>
                <Item>
                  <Icon
                    style={estilo.icons_CamposLogin}
                    active
                    name="key-outline"
                  />
                  <Input
                    value={values.password} //Senha
                    onChangeText={handleChange('password')}
                    placeholder="Senha"
                    secureTextEntry={true}
                  />
                </Item>
              </View>
              {touched.password && errors.password && (
                <View style={estilo.V_Erro}>
                  <Text style={estilo.txtErro}>{errors.password}</Text>
                </View>
              )}

              <View style={estilo.view_BotaoEntar}>
                <Button
                  style={estilo.botao_login}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text style={estilo.textoLabel}>Enviar</Text>
                </Button>
              </View>
            </Fragment>
          )}
        </Formik>
        {/* <Modal transparent={true} visible={this.state.isModalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: '#ffff',

              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: '55%',
              marginHorizontal: '10%',
              padding: 40,
              borderRadius: 10,
              height: 100,
              flex: 1,
            }}
          >
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/republicas.appspot.com/o/Pictures%20Ilustrations%2FBug.png?alt=media&token=23b94406-dab1-4f51-9082-6c9429a27e07',
              }}
              style={{ width: 175, height: 175, marginTop: '80%' }}
            />
            <Text
              style={{
                width: 200,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5%',
                fontSize: 20,
                fontWeight: '600',
                fontFamily: 'Roboto',
                color: '#000',
              }}
            >
              Nome de Usuario ou Email ja cadastrados
            </Text>

            <Button
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',

                bottom: 25,
                width: '70%',
                backgroundColor: 'rgba(29,161,242,1)',
                color: '#fff',
              }}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              <Text>Voltar</Text>
            </Button>
          </View>
        </View>
      </Modal> */}
      </View>
    </ScrollView>
  );
};
export default CadastroUsuario;
