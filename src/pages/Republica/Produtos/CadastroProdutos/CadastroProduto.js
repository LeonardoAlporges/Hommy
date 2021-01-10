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

export default function CadastroProduto({ navigation }) {
  const avatarUser = useSelector(state => state.user.fotoPerfil);
  const emailUser = useSelector(state => state.user.email);
  const notaUser = useSelector(state => state.user.notaUser);
  const nomeUser = useSelector(state => state.user.usuario);

  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [botaoEnviar, setBotaoEnviar] = useState(true);
  const [contadorImagem, setContadorImagem] = useState(0);
  const [erroSemFoto, setErroSemFoto] = useState(false);

  const [horarioDeInicio, setHorarioInicio] = useState();
  const [horarioDeInicioPicker, setHorarioInicioPicker] = useState(false);
  const [placeHorarioDeInicio, setPlaceHorarioInicio] = useState('00:00');

  const [dataEvento, setDataEvento] = useState();
  const [dataEventoPicker, setDataEventoPicker] = useState(false);
  const [placeDataEvento, setPlaceDataEvento] = useState('Selecione');

  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagem3, setImagem3] = useState(null);
  const [linkimagem1, setLinkImagem1] = useState(null);
  const [linkimagem2, setLinkImagem2] = useState(null);
  const [linkimagem3, setLinkImagem3] = useState(null);

  function selecionarHorario(date) {
    const hora = moment(new Date(date)).format('HH:mm');
    setHorarioInicioPicker(false);
    setHorarioInicio(date);
    setPlaceHorarioInicio(hora);
  }

  function selecionarData(date) {
    const data = moment(new Date(date)).format('DD/MM');
    setDataEventoPicker(false);
    setDataEvento(date);
    setPlaceDataEvento(data);
  }

  function preencherFoto(linkImagem) {
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

  function publicarProduto(values) {
    const data = {
      titulo: values.tituloProduto,
      descricao: values.descricao,
      valor: values.valor,
      userEmail: 'leo@teste.com',
      telefone: values.contato,
      imagem1: linkimagem1,
      imagem2: linkimagem2,
      imagem3: linkimagem1
    };

    if (imagem1 == null && imagem2 == null && imagem3 == null) {
      setErroSemFoto(true);
      setLoading(false);
      return;
    }
    console.log('ANTES', data);
    api
      .post('/produto', data)
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
    setSucesso(false);
    //resetarPilhaNavegacao('TabsHeader');
  }

  return (
    <Formik
      initialValues={{
        tituloProduto: '',
        descricao: '',
        valor: '',
        contato: ''
      }}
      onSubmit={values => {
        publicarProduto(values);
      }}
      validationSchema={yup.object().shape({
        tituloProduto: yup.string().required('Campo obrigatório').max(40, 'Somente 40 caracteres são permitidos'),
        descricao: yup.string().required('Campo obrigatório').max(100, 'Somente 100 caracteres são permitidos'),
        contato: yup.string().max(9999999999999).required(' Campo obrigatórior'),
        valor: yup.number('Somente numeros!').max(200, 'Valor maximo de R$ 200,00').required('Campo obrigatório')
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {erroSemFoto && <ModalErroFoto />}
          {loading && <Loading />}
          {erro && <ModalErro />}
          {sucesso && <ModalSucesso />}
          <ScrollView>
            <HeaderBack title="Venda seus Itens" onNavigation={() => navigation.goBack(null)} />

            <Container>
              <Subtitle>Preencha os campos abaixo com as informações necessárias para registrar seu Produto.</Subtitle>

              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Titulo</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.tituloEvento}
                      onChangeText={handleChange('tituloProduto')}
                      placeholder=""
                      onBlur={() => setFieldTouched('tituloProduto')}
                    />
                  </Item>
                  <View style={estilo.V_error}>
                    {touched.tituloProduto && errors.tituloProduto && (
                      <Text style={estilo.textError}>{errors.tituloProduto}</Text>
                    )}
                  </View>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Descrição</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.descricao}
                      onChangeText={handleChange('descricao')}
                      placeholder=""
                      onBlur={() => setFieldTouched('descricao')}
                    />
                  </Item>
                  <View style={estilo.V_error}>
                    {touched.descricao && errors.descricao && <Text style={estilo.textError}>{errors.descricao}</Text>}
                  </View>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Valor</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.redeSocial}
                      onChangeText={handleChange('valor')}
                      placeholder=""
                      onBlur={() => setFieldTouched('valor')}
                    />
                  </Item>

                  <View style={estilo.V_error}>
                    {touched.valor && errors.valor && <Text style={estilo.textError}>{errors.valor}</Text>}
                  </View>
                </FieldSet>
                <FieldSet>
                  <LabelFielSet>Contato</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <TextInputMask
                      placeholderTextColor="#263b50"
                      keyboardType="number-pad"
                      mask={'([00]) [00000]-[0000]'}
                      value={values.contato}
                      onChangeText={handleChange('contato')}
                      onBlur={() => setFieldTouched('contato')}
                    />
                  </Item>

                  <View style={estilo.V_error}>
                    {touched.contato && errors.contato && <Text style={estilo.textError}>{errors.contato}</Text>}
                  </View>
                </FieldSet>
              </Linha>

              <AreaFotos>
                <LabelFotos>Fotos do seu produto</LabelFotos>
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
                  <LabeBotaoEnviar>Publicar Produto</LabeBotaoEnviar>
                </Button>
              </ViewBotao>
            </Container>
          </ScrollView>
        </Fragment>
      )}
    </Formik>
  );

  function ModalSucesso() {
    return (
      <CustomModal
        parametro="Custom"
        titulo="Tudo certo!"
        descricao="Seu anúncio já estar no ar! "
        botao="Confirmar"
        callback={() => {
          irParaTelaIncial();
        }}
      />
    );
  }
  function ModalErro() {
    return (
      <CustomModal
        parametro="Erro"
        callback={() => {
          setErro(false);
        }}
      />
    );
  }
  function ModalErroFoto() {
    return (
      <CustomModal
        parametro="Custom"
        imagem="EnvieImagem"
        titulo="Não ta esquecendo nada ?"
        descricao="Uma boa imagem é a alma de qualquer anuncio. Que tal adicionar pelo menos 1?"
        botao="Ok"
        callback={() => {
          setErroSemFoto(false);
        }}
      />
    );
  }
}
