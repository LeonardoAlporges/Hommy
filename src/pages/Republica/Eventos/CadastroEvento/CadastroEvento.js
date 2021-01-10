import React, { Fragment, useState, useEffect } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';

import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Item, Input, Label, Button, Icon, DatePicker, Picker } from 'native-base';
import { useSelector } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';

import api from '../../../../service/api';
import estilo from './styles';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';

import { imagePickerOptions, uploadFileToFireBaseRepublicaEventos, uploadProgress } from '../../../../utils';
import ImagePicker from 'react-native-image-picker';

import {
  Container,
  FieldSet,
  LabelFielSet,
  Linha,
  FieldSetLarge,
  ViewErro,
  LabelErro,
  Subtitle,
  InputHora,
  ViewBotao,
  LabeBotaoEnviar,
  AreaFotos,
  LabelFotos,
  DivisaoFotos
} from './styles';
import Loading from '../../../../components/Loading';

export default function CadastroEvento({ navigation }) {
  const avatarUser = useSelector(state => state.user.fotoPerfil);
  const emailUser = useSelector(state => state.user.email);
  const notaUser = useSelector(state => state.user.notaUser);
  const nomeUser = useSelector(state => state.user.usuario);

  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [botaoEnviar, setBotaoEnviar] = useState(true);
  const [contadorImagem, setContadorImagem] = useState(0);

  const [horarioDeInicio, setHorarioInicio] = useState();
  const [horarioDeInicioPicker, setHorarioInicioPicker] = useState(false);
  const [placeHorarioDeInicio, setPlaceHorarioInicio] = useState('00:00');

  const [dataLabel, setDataLabel] = useState('Selecione');
  const [dataEvento, setDataEvento] = useState();

  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagem3, setImagem3] = useState(null);
  const [linkimagem1, setLinkImagem1] = useState(null);
  const [linkimagem2, setLinkImagem2] = useState(null);
  const [linkimagem3, setLinkImagem3] = useState(null);

  function selecionarHorario(date) {
    const saida = moment(new Date(date)).format('HH:mm');
    setHorarioInicioPicker(false);
    setHorarioInicio(date);
    setPlaceHorarioInicio(saida);
  }

  function preencherFoto(linkImagem) {
    console.log(linkImagem.uri);
    if (contadorImagem == 0) {
      setImagem1(linkImagem.uri);
    } else if (contadorImagem == 1) {
      setImagem2(linkImagem.uri);
    } else if (contadorImagem == 2) {
      setImagem3(linkImagem.uri);
    } else {
      setOcutarBotaoEnvioFoto();
    }
    setContadorImagem(contadorImagem + 1);
  }

  function carregarImagemGaleria() {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Envio cancelado');
      } else if (error) {
        alert('Ocorreu algum erro: ', error);
      } else {
        console.log(imagePickerResponse);
        preencherFoto(imagePickerResponse);
        const referencia = uploadFileToFireBaseRepublicaEventos(imagePickerResponse);
        console.log(referencia);
        monitorFileUpload(referencia);
        console.log(linkimagem1);
      }
    });
  }

  function monitorFileUpload(task) {
    task.on('state_changed', snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        if (contadorImagem == 0) {
          console.log(1);
          setLinkImagem1(downloadURL);
        } else if (contadorImagem == 1) {
          setLinkImagem2(downloadURL);
        } else if (contadorImagem == 2) {
          setLinkImagem3(downloadURL);
        }
      });
    });
  }

  function publicarEvento(values) {
    console.log('Chamou');
    const data = {
      titulo: values.tituloEvento,
      valor: 100,
      userEmail: 'leo@teste.com',
      data: dataEvento,
      localCompraIngresso: values.localCompraIngresso,
      imagem1: linkimagem1,
      imagem2: linkimagem2,
      imagem3: linkimagem3,
      imagem4: linkimagem1,
      imagem5: linkimagem2
    };

    // if (imagem1 == null && imagem2 == null && imagem3 == null) {
    //   setErroSemFoto(true);
    //   setLoading(false);
    //   return;
    // }
    console.log('ANTES', data);
    api
      .post('/eventos', data)
      .then(Response => {
        console.log('DEPOIS', Response);
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        console.log(error);
        console.log(error.Response);
        setLoading(false);
        setErro(true);
      })
      .finally(setLoading(false));
  }
  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });
    navigation.dispatch(resetAction);
  }

  function irParaTelaIncial() {
    resetarPilhaNavegacao('TabsHeader');
  }

  return (
    <Formik
      initialValues={{
        tituloEvento: '',
        data: '',
        horarioDeInicio: '',
        localVenda: '',
        redeSocial: '',
        contato: ''
      }}
      onSubmit={values => {
        publicarEvento(values);
      }}
      // validationSchema={yup.object().shape({
      //   tituloEvento: yup.string().required('Campo obrigatório'),
      //   data: yup.string().required('Campo obrigatório'),
      //   horarioDeInicio: yup.string().required('Campo obrigatório'),
      //   localVenda: yup.string().required('Campo obrigatório'),
      //   redeSocial: yup.string().required('Campo obrigatório'),
      //   contato: yup.string().required('Campo obrigatório')
      // })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {loading && <Loading></Loading>}
          {erro && (
            <CustomModal
              parametro="Erro"
              callback={() => {
                setErro(false);
              }}
            />
          )}
          {sucesso && (
            <CustomModal
              parametro="Custom"
              titulo="Tudo certo!"
              descricao="Seu anúncio já estar no ar! "
              botao="Confirmar"
              callback={() => {
                irParaTelaIncial();
              }}
            />
          )}
          <ScrollView>
            <HeaderBack title="Publique seu evento" onNavigation={() => navigation.goBack(null)} />

            <Container>
              <Subtitle>Preencha os campos abaixo com as informações necessárias para registrar seu evento.</Subtitle>

              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Titulo do evento</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.tituloEvento}
                      onChangeText={handleChange('tituloEvento')}
                      placeholder=""
                      onBlur={() => setFieldTouched('tituloEvento')}
                    />
                  </Item>
                  <View style={estilo.V_error}>
                    {touched.tituloEvento && errors.tituloEvento && (
                      <Text style={estilo.textError}>{errors.tituloEvento}</Text>
                    )}
                  </View>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Hora de incio</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <InputHora
                      onPress={() => {
                        setHorarioInicioPicker(true);
                      }}
                    >
                      <Label>{placeHorarioDeInicio}</Label>
                      <DateTimePickerModal
                        isVisible={horarioDeInicioPicker}
                        mode="time"
                        onConfirm={date => selecionarHorario(date)}
                        onCancel={date => setHorarioInicioPicker(false)}
                        date={new Date()}
                        locale={'pt-br'}
                        is24Hour={true}
                        onDateChange={handleChange('horarioDeInicio')}
                      />
                    </InputHora>
                  </Item>
                  <ViewErro>
                    {values.horarioDeInicio == '' && !botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}
                  </ViewErro>
                </FieldSet>
                <FieldSet>
                  <LabelFielSet>Data</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      locale={'pt-br'}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={true}
                      animationType={'slide'}
                      androidMode={'calendar'}
                      placeHolderText={dataLabel}
                      textStyle={{
                        width: 155,
                        paddingTop: 13,
                        fontFamily: 'WorkSans',
                        fontSize: 16,
                        color: '#2e2e2e'
                      }}
                      placeHolderTextStyle={{
                        width: 155,
                        paddingTop: 13,
                        fontFamily: 'WorkSans',
                        fontSize: 16,
                        color: '#bfc6ea'
                      }}
                      onDateChange={date => {
                        console.log(date);
                        setDataEvento(date);
                      }}
                      disabled={false}
                      selectedValue={new Date(values.data)}
                      onValueChange={handleChange('data')}
                      value={new Date(values.data)}
                      onChangeText={handleChange('data')}
                      onBlur={() => setFieldTouched('data')}
                    />
                  </Item>
                  <ViewErro>{values.data == '' && !botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}</ViewErro>
                </FieldSet>
              </Linha>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Locais de venda de ingresso</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.localVenda}
                      onChangeText={handleChange('localVenda')}
                      placeholder=""
                      onBlur={() => setFieldTouched('localVenda')}
                    />
                  </Item>

                  <View style={estilo.V_error}>
                    {touched.localVenda && errors.localVenda && (
                      <Text style={estilo.textError}>{errors.localVenda}</Text>
                    )}
                  </View>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Instagram</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.redeSocial}
                      onChangeText={handleChange('redeSocial')}
                      placeholder=""
                      onBlur={() => setFieldTouched('redeSocial')}
                    />
                  </Item>

                  <View style={estilo.V_error}>
                    {touched.redeSocial && errors.redeSocial && (
                      <Text style={estilo.textError}>{errors.redeSocial}</Text>
                    )}
                  </View>
                </FieldSet>
                <FieldSet>
                  <LabelFielSet>Contato</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.contato}
                      onChangeText={handleChange('contato')}
                      placeholder=""
                      onBlur={() => setFieldTouched('contato')}
                    />
                  </Item>

                  <View style={estilo.V_error}>
                    {touched.contato && errors.contato && <Text style={estilo.textError}>{errors.contato}</Text>}
                  </View>
                </FieldSet>
              </Linha>

              <AreaFotos>
                <LabelFotos>Fotos da sua república</LabelFotos>
                <DivisaoFotos>
                  {imagem1 == null ? (
                    <View style={estilo.V_ImageFullEmpty}>
                      <Image
                        source={require('../../../../assets/Img/Republica_Send_Pictures.png')}
                        style={estilo.ImageEmpty}
                      />
                    </View>
                  ) : (
                    <View style={estilo.V_ImageFull}>
                      <Image source={{ uri: imagem1 }} style={estilo.ImageFull} />
                    </View>
                  )}
                  {imagem2 == null ? (
                    <View style={estilo.V_ImageFullEmpty}>
                      <Image
                        source={require('../../../../assets/Img/Republica_Send_Pictures.png')}
                        style={estilo.ImageEmpty}
                      />
                    </View>
                  ) : (
                    <View style={estilo.V_ImageFull}>
                      <Image source={{ uri: imagem2 }} style={estilo.ImageFull} />
                    </View>
                  )}
                  {imagem3 == null ? (
                    <View style={estilo.V_ImageFullEmpty}>
                      <Image
                        source={require('../../../../assets/Img/Republica_Send_Pictures.png')}
                        style={estilo.ImageEmpty}
                      />
                    </View>
                  ) : (
                    <View style={estilo.V_ImageFull}>
                      <Image source={{ uri: imagem3 }} style={estilo.ImageFull} />
                    </View>
                  )}
                </DivisaoFotos>
                <View style={estilo.V_BotaoImg}>
                  <TouchableOpacity
                    disabled={contadorImagem == 3}
                    style={estilo.botao_send}
                    onPress={() => {
                      carregarImagemGaleria();
                    }}
                  >
                    <Text
                      style={{
                        color: '#142850',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: 16
                      }}
                    >
                      Enviar Fotos ({contadorImagem}/3)
                    </Text>
                  </TouchableOpacity>
                </View>
              </AreaFotos>

              <ViewBotao>
                <Button style={estilo.btnProximo} onPress={handleSubmit}>
                  <LabeBotaoEnviar>Publicar Evento</LabeBotaoEnviar>
                </Button>
              </ViewBotao>
            </Container>
          </ScrollView>
        </Fragment>
      )}
    </Formik>
  );
}
