import ViewPager from '@react-native-community/viewpager';
import { Formik } from 'formik';
import moment from 'moment';
import { Input, Item, Label, Picker, Text, Tab, Tabs } from 'native-base';
import React, { Fragment, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInputMask from 'react-native-text-input-mask';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import { imagePickerOptions, uploadFileToFireBaseServico } from '../../../utils';
import estilo, { AreaFotos, DivisaoFotos, FieldSet, FieldSetLarge, LabelFielSet, LabelFotos, Linha } from './styles';

export default function CadastroServico({ navigation }) {
  const avatarUser = useSelector(state => state.user.fotoPerfil);
  const emailUser = useSelector(state => state.user.email);
  const notaUser = useSelector(state => state.user.notaUser);
  const nomeUser = useSelector(state => state.user.usuario);

  const [nomeEmpresa, setNomeEmpresa] = useState(null);
  const [contadorImagem, setContadorImagem] = useState(0);
  const [nomePrestador, setNomePrestador] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [email, setEmail] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [redeSocial, setRedeSocial] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [rua, setRua] = useState(null);
  const [numero, setNumero] = useState(null);
  const [diaInicial, setDiaInicial] = useState(null);
  const [diaFinal, setDiaFinal] = useState(null);
  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagem3, setImagem3] = useState(null);
  const [linkimagem1, setLinkImagem1] = useState(null);
  const [linkimagem2, setLinkImagem2] = useState(null);
  const [linkimagem3, setLinkImagem3] = useState(null);
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const [datePicker, setDatePicker] = useState(false);
  const [horaInicialPicker, setHoraInicialPicker] = useState(false);
  const [horaFinalPicker, setHoraFinalPicker] = useState(false);
  const [horaInicial, setHoraInicial] = useState('00:00');
  const [horaFinal, setHoraFinal] = useState('00:00');
  const [placeHoraFinal, setPlaceHoraFinal] = useState(moment(new Date()).format('HH:mm'));
  const [placeHoraInicial, setPlaceHoraInicial] = useState(moment(new Date()).format('HH:mm'));

  const [botaoEnviar, setBotaoEnviar] = useState(false);

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

  function selecionarHorario(date, tipo) {
    if (tipo == 'inicial') {
      const inicial = moment(new Date(date)).format('HH:mm');

      setHoraInicialPicker(false);
      setHoraInicial(date);
      setPlaceHoraInicial(inicial);
    } else {
      const final = moment(new Date(date)).format('HH:mm');
      setHoraFinalPicker(false);
      setHoraFinal(date);
      setPlaceHoraFinal(final);
    }
  }

  function fecharPickerHoario(date, tipo) {
    if (tipo == 'inicial') {
      setHoraInicialPicker(false);
    } else {
      setHoraFinalPicker(false);
    }
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
        preencherFoto(imagePickerResponse);
        const referencia = uploadFileToFireBaseServico(imagePickerResponse);
        monitorFileUpload(referencia);
      }
    });
  }

  function monitorFileUpload(task) {
    task.on('state_changed', snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        if (contadorImagem == 0) {
          setLinkImagem1(downloadURL);
        } else if (contadorImagem == 1) {
          setLinkImagem2(downloadURL);
        } else if (contadorImagem == 2) {
          setLinkImagem3(downloadURL);
        }
      });
    });
  }

  function preencherDados(value) {
    setLoading(true);
    const data = {
      titulo: value.nomeEmpresa,
      tipo: value.tipo,
      desc: value.descricao,
      redeSocial: value.redeSocial,
      responsavel: value.nomePrestador,
      telefone: value.telefone,
      userEmail: value.email,
      cidade: value.cidade,
      bairro: value.bairro,
      rua: value.rua,
      numero: value.numero,
      inicioD: value.diaInicial,
      pontoReferencia: value.pontoReferencia,
      fimD: value.diaFinal,
      inicioH: placeHoraInicial,
      fimH: placeHoraFinal,
      image1: linkimagem1,
      image2: linkimagem2,
      image3: linkimagem3
    };

    criarNovoAnuncio(data);
    setLoading(false);
  }

  function criarNovoAnuncio(data) {
    api
      .post('/servicos', data)
      .then(Response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  return (
    <Formik
      initialValues={{
        nomeEmpresa: '',
        nomePrestador: '',
        telefone: '',
        email: '',
        cidade: '',
        tipo: '',
        desc: '',
        redeSocial: '',
        bairro: '',
        rua: '',
        numero: '',
        diaInicial: '',
        diaFnal: '',
        horaInicial: '',
        horaFinal: '',
        pontoReferencia: ''
      }}
      onSubmit={values => {
        preencherDados(values);
      }}
      validationSchema={yup.object().shape({
        nomeEmpresa: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        tipo: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        descricao: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(120, 'Maximo permitido de 120 caracteres')
          .required('Campo obrigatório'),
        redeSocial: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        nomePrestador: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        telefone: yup.string().max(9999999999999).required(' Campo obrigatórior'),
        email: yup.string().email('E-mail inválido ou incorreto').required('Campo obrigatório'),
        cidade: yup.string('').min(3, 'Minimo de 3 caracteres').max(30, 'Maximo permitido de 30 caracteres'),
        bairro: yup.string('').min(3, 'Minimo de 3 caracteres').max(30, 'Maximo permitido de 30 caracteres'),
        rua: yup.string('').min(3, 'Minimo de 3 caracteres').max(30, 'Maximo permitido de 30 caracteres'),
        numero: yup.number('Somente números').required('Campo Obrigatório'),
        pontoReferencia: yup.string('').min(3, 'Minimo de 3 caracteres').max(30, 'Maximo permitido de 30 caracteres'),

        diaInicial: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        diaFinal: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório')
      })}
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
              descricao="Seu anúncio já estar no ar, fique atento com os interesses"
              botao="Confirmar"
              callback={() => {
                irParaTelaIncial();
              }}
            />
          )}

          <HeaderBack title="Cadastro de serviço" onNavigation={() => navigation.goBack(null)} />
          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: '#142850', height: 3 }}
            tabContainerStyle={{ height: 45 }}
          >
            <Tab
              heading="INFORMAÇÕES BÁSICAS"
              tabStyle={estilo.tabs_style}
              textStyle={estilo.tabs_TextStyle}
              activeTabStyle={estilo.tabs_ActiveTabs}
              activeTextStyle={estilo.tabs_ActiveTextStyle}
            >
              <ViewPager style={{ flex: 1 }}>
                <ScrollView>
                  <View key="1">
                    <View style={estilo.V_Conteudo}>
                      <Text style={estilo.txtCarona}>
                        Preencha os campos abaixo com as informações necessárias para registrar sua empresa/serviço
                  </Text>

                      <Linha>
                        <FieldSetLarge>
                          <LabelFielSet>Nome empresa/serviço</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.nomeEmpresa}
                              onChangeText={handleChange('nomeEmpresa')}
                              placeholder=""
                              onBlur={() => setFieldTouched('nomeEmpresa')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.nomeEmpresa && errors.nomeEmpresa && (
                              <Text style={estilo.textError}>{errors.nomeEmpresa}</Text>
                            )}
                          </View>
                        </FieldSetLarge>
                      </Linha>
                      <Linha>
                        <FieldSetLarge>
                          <LabelFielSet>Nome do prestador</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.nomePrestador}
                              onChangeText={handleChange('nomePrestador')}
                              placeholder=""
                              onBlur={() => setFieldTouched('nomePrestador')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.nomePrestador && errors.nomePrestador && (
                              <Text style={estilo.textError}>{errors.nomePrestador}</Text>
                            )}
                          </View>
                        </FieldSetLarge>
                      </Linha>
                      <Linha>
                        <FieldSetLarge>
                          <LabelFielSet>Tipo de serviço prestado</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.tipo}
                              onChangeText={handleChange('tipo')}
                              placeholder="Eletricista, mecânico, pintor..."
                              onBlur={() => setFieldTouched('tipo')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.tipo && errors.tipo && <Text style={estilo.textError}>{errors.tipo}</Text>}
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
                              placeholder="Breve descrição sobre o serviço prestado."
                              onBlur={() => setFieldTouched('descricao')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.descricao && errors.descricao && (
                              <Text style={estilo.textError}>{errors.descricao}</Text>
                            )}
                          </View>
                        </FieldSetLarge>
                      </Linha>
                      <AreaFotos>
                        <LabelFotos>Fotos da sua empresa</LabelFotos>
                        <DivisaoFotos>
                          {imagem1 == null ? (
                            <View style={estilo.V_ImageFullEmpty}>
                              <Image
                                source={require('../../../assets/Img/Republica_Send_Pictures.png')}
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
                                source={require('../../../assets/Img/Republica_Send_Pictures.png')}
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
                                source={require('../../../assets/Img/Republica_Send_Pictures.png')}
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
                    </View>
                  </View>
                </ScrollView>
              </ViewPager>
            </Tab>
            <Tab
              heading="CONTATO E ENDEREÇO"
              tabStyle={estilo.tabs_style}
              textStyle={estilo.tabs_TextStyle}
              activeTabStyle={estilo.tabs_ActiveTabs}
              activeTextStyle={estilo.tabs_ActiveTextStyle}
            >
              <ViewPager style={{ flex: 1 }}>
                <ScrollView>
                  <View key="1">
                    <View style={estilo.V_Conteudo}>
                      <Linha>
                        <FieldSet>
                          <LabelFielSet>Telefone</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <TextInputMask
                              placeholderTextColor="#263b50"
                              style={estilo.labelInput}
                              keyboardType="number-pad"
                              mask={'([00]) [00000]-[0000]'}
                              value={values.telefone}
                              onChangeText={handleChange('telefone')}
                              placeholder="(__) ______-______"
                              onBlur={() => setFieldTouched('telefone')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.telefone && errors.telefone && <Text style={estilo.textError}>{errors.telefone}</Text>}
                          </View>
                        </FieldSet>
                        <FieldSet>
                          <LabelFielSet>Email</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.email}
                              onChangeText={handleChange('email')}
                              placeholder=""
                              onBlur={() => setFieldTouched('email')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.email && errors.email && <Text style={estilo.textError}>{errors.email}</Text>}
                          </View>
                        </FieldSet>
                      </Linha>
                      <Linha>
                        <FieldSetLarge>
                          <LabelFielSet>Rede Social</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.redeSocial}
                              onChangeText={handleChange('redeSocial')}
                              placeholder=""
                              onBlur={() => setFieldTouched('redeSocial')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.redeSocial && errors.redeSocial && (
                              <Text style={estilo.textError}>{errors.redeSocial}</Text>
                            )}
                          </View>
                        </FieldSetLarge>
                      </Linha>
                      <Text style={estilo.txtCarona}>
                        Preencha as informaçoes abaixo se você presta serviço em local fixo
                  </Text>
                      <Linha>
                        <FieldSet>
                          <LabelFielSet>Cidade</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Picker
                              mode="dropdown"
                              placeholder="Cidades"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.cidade}
                              onValueChange={handleChange('cidade')}
                              value={values.cidade}
                              onChangeText={handleChange('cidade')}
                              onBlur={() => setFieldTouched('cidade')}
                            >
                              <Picker.Item label="" value="null" />
                              <Picker.Item label="Alegre" value="Alegre" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.cidade && errors.cidade && <Text style={estilo.textError}>{errors.cidade}</Text>}
                          </View>
                        </FieldSet>
                        <FieldSet>
                          <LabelFielSet>Bairro</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Picker
                              mode="dropdown"
                              placeholder="Cidades"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.bairro}
                              onValueChange={handleChange('bairro')}
                              value={values.bairro}
                              onChangeText={handleChange('bairro')}
                              onBlur={() => setFieldTouched('bairro')}
                            >
                              <Picker.Item label="" value="null" />
                              <Picker.Item label="Centro" value="Centro" />
                              <Picker.Item label="Vila do Sul" value="Vila do Sul" />
                              <Picker.Item label="Guararema" value="Guararema" />
                              <Picker.Item label="Clerio Mourin" value="Clerio Mourin" />
                              <Picker.Item label="Vila Alta" value="Vila Alta" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.bairro && errors.bairro && <Text style={estilo.textError}>{errors.bairro}</Text>}
                          </View>
                        </FieldSet>
                      </Linha>
                      <Linha>
                        <FieldSet style={{ width: '65%' }}>
                          <LabelFielSet>Rua</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.rua}
                              onChangeText={handleChange('rua')}
                              placeholder=""
                              onBlur={() => setFieldTouched('rua')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.rua && errors.rua && <Text style={estilo.textError}>{errors.rua}</Text>}
                          </View>
                        </FieldSet>
                        <FieldSet style={{ width: '30%' }}>
                          <LabelFielSet>Número</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              keyboardType="number-pad"
                              value={values.numero}
                              onChangeText={handleChange('numero')}
                              placeholder=""
                              onBlur={() => setFieldTouched('numero')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.numero && errors.numero && <Text style={estilo.textError}>{errors.numero}</Text>}
                          </View>
                        </FieldSet>
                      </Linha>
                      <Linha>
                        <FieldSetLarge>
                          <LabelFielSet>Ponto de referência</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Input
                              value={values.pontoReferencia}
                              onChangeText={handleChange('pontoReferencia')}
                              placeholder=""
                              onBlur={() => setFieldTouched('pontoReferencia')}
                            />
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.redeSocial && errors.redeSocial && (
                              <Text style={estilo.textError}>{errors.redeSocial}</Text>
                            )}
                          </View>
                        </FieldSetLarge>
                      </Linha>
                      <Text style={estilo.txtCarona}>Informe seu período de trabalho nos campos abaixo</Text>
                      <Linha>
                        <FieldSet>
                          <LabelFielSet>Dia de inicio</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Picker
                              mode="dropdown"
                              placeholder="Dias da semana"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.diaInicial}
                              onValueChange={handleChange('diaInicial')}
                              value={values.diaInicial}
                              onChangeText={handleChange('diaInicial')}
                              onBlur={() => setFieldTouched('diaInicial')}
                            >
                              <Picker.Item label="" value="null" />
                              <Picker.Item label="Domingo" value="Domingo" />
                              <Picker.Item label="Segunda" value="Segunda" />
                              <Picker.Item label="Terça" value="Terça" />
                              <Picker.Item label="Quarta" value="Quarta" />
                              <Picker.Item label="Quinta" value="Quinta" />
                              <Picker.Item label="Sexta" value="Sexta" />
                              <Picker.Item label="Sábado" value="Sábado" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.diaInicial && errors.diaInicial && (
                              <Text style={estilo.textError}>{errors.diaInicial}</Text>
                            )}
                          </View>
                        </FieldSet>
                        <FieldSet>
                          <LabelFielSet>Dia de termino</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <Picker
                              mode="dropdown"
                              placeholder="Dias da semana"
                              placeholderStyle={{ color: '#bfc6ea' }}
                              placeholderIconColor="#007aff"
                              selectedValue={values.diaFinal}
                              onValueChange={handleChange('diaFinal')}
                              value={values.diaFinal}
                              onChangeText={handleChange('diaFinal')}
                              onBlur={() => setFieldTouched('diaFinal')}
                            >
                              <Picker.Item label="" value="null" />
                              <Picker.Item label="Domingo" value="Domingo" />
                              <Picker.Item label="Segunda" value="Segunda" />
                              <Picker.Item label="Terça" value="Terça" />
                              <Picker.Item label="Quarta" value="Quarta" />
                              <Picker.Item label="Quinta" value="Quinta" />
                              <Picker.Item label="Sexta" value="Sexta" />
                              <Picker.Item label="Sábado" value="Sábado" />
                            </Picker>
                          </Item>
                          <View style={estilo.V_erro}>
                            {touched.diaFinal && errors.diaFinal && <Text style={estilo.textError}>{errors.diaFinal}</Text>}
                          </View>
                        </FieldSet>
                      </Linha>
                      <Linha>
                        <FieldSet>
                          <LabelFielSet>Hora de inicio</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <TouchableOpacity
                              onPress={() => {
                                setHoraInicialPicker(true);
                              }}
                              style={estilo.InputHora}
                            >
                              <Label>{placeHoraInicial}</Label>
                              <DateTimePickerModal
                                isVisible={horaInicialPicker}
                                mode="time"
                                onConfirm={date => selecionarHorario(date, 'inicial')}
                                onCancel={date => fecharPickerHoario(date, 'inicial')}
                                locale={'pt-br'}
                                is24Hour={true}
                                onChange={handleChange('horaInicial')}
                              />
                            </TouchableOpacity>
                          </Item>
                          <View style={estilo.V_erro}>
                            {!horaInicial && botaoEnviar && <Text style={estilo.textError}>Campo obrigatório</Text>}
                          </View>
                        </FieldSet>
                        <FieldSet>
                          <LabelFielSet>Hora de termino</LabelFielSet>
                          <Item style={{ borderColor: 'transparent' }}>
                            <TouchableOpacity
                              onPress={() => {
                                setHoraFinalPicker(true);
                              }}
                              style={estilo.InputHora}
                            >
                              <Label>{placeHoraFinal}</Label>
                              <DateTimePickerModal
                                isVisible={horaFinalPicker}
                                mode="time"
                                onConfirm={date => selecionarHorario(date, 'final')}
                                onCancel={date => fecharPickerHoario(date, 'final')}
                                locale={'pt-br'}
                                is24Hour={true}
                                onCChange={handleChange('horaFinal')}
                              />
                            </TouchableOpacity>
                          </Item>
                          <View style={estilo.V_erro}>
                            {!horaFinal && botaoEnviar && <Text style={estilo.textError}>Campo obrigatório</Text>}
                          </View>
                        </FieldSet>
                      </Linha>

                      <View style={estilo.V_btn}>
                        <TouchableOpacity
                          style={estilo.btnProximo}
                          onPress={() => {
                            handleSubmit(values);
                          }}
                        >
                          <Text style={{ fontFamily: 'WorkSans-Bold', color: '#142850', fontSize: 18 }}>
                            Publicar Serviço
                      </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </ViewPager>
            </Tab>
          </Tabs>

        </Fragment >
      )
      }
    </Formik >
  );
}
