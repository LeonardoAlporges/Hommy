import { Formik } from 'formik';
import moment from 'moment';
import { Button, CheckBox, Input, Item, Label } from 'native-base';
import React, { Fragment, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInputMask from 'react-native-text-input-mask';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';
import Loading from '../../../../components/Loading';
import api from '../../../../service/api';
import { imagePickerOptions, uploadFileToFireBaseRepublicaEventos } from '../../../../utils';
import estilo, {
  AreaFotos,
  CheckBoxText,
  Container,
  DivisaoFotos,
  FieldSet,
  FieldSetLarge,
  Icone, InputHora,
  LabeBotaoEnviar,
  LabelErro,
  LabelFielSet,
  LabelFotos,
  Linha,
  Subtitle,
  ViewBotao,
  ViewErro,
  FieldSetXL
} from './styles';


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
  const [valor, setValor] = useState();

  const [descontoDisponivel, setDescontoDisponivel] = useState(false);


  function selecionarHorario(date) {
    const hora = moment((date)).format('HH:mm');
    setHorarioInicioPicker(false);
    setHorarioInicio(date);
    setPlaceHorarioInicio(hora);
  }

  function selecionarData(date) {
    const data = moment((date)).format('DD/MM');
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
        preencherFoto(imagePickerResponse);
        const referencia = uploadFileToFireBaseRepublicaEventos(imagePickerResponse);
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

  function publicarEvento(values) {
    const data = {
      titulo: values.tituloEvento,
      descricao : values.descricao,
      descontoDisponivel: descontoDisponivel,
      valor: valor,
      userEmail: emailUser,
      telefone: values.contato,
      data: dataEvento,
      hora: horarioDeInicio,
      localCompraIngresso: values.localVenda,
      imagem1: linkimagem1,
      imagem2: linkimagem2,
      imagem3: linkimagem3,
      descricao: values.descricao,
      instagram: values.instagram
    };

    if (imagem1 == null && imagem2 == null && imagem3 == null) {
      setErroSemFoto(true);
      setLoading(false);
      return;
    }
    console.log(data)

    api
      .post('/eventos', data)
      .then(Response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
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
    resetarPilhaNavegacao('TabsHeader');
  }

  function removerFoto(idFoto) {
    if (idFoto == 1) {
      setLinkImagem1(null);
      setImagem1(null);
    } else if (idFoto == 2) {
      setLinkImagem2(null);
      setImagem2(null);
    } else if (idFoto == 3) {
      setLinkImagem3(null);
      setImagem3(null);
    }
    setContadorImagem(contadorImagem - 1);
  }

  return (
    <Formik
      initialValues={{
        tituloEvento: '',
        data: '',
        horarioDeInicio: '',
        localVenda: '',
        valor: '',
        contato: '',
        codigoDesconto: '',
        desconto: '',
        descricao: '',
        instagram: ''
      }}
      onSubmit={values => {
        publicarEvento(values);
      }}
      validationSchema={yup.object().shape({
        tituloEvento: yup.string().required('Campo obrigatório').max(40, 'Somente 40 caracteres são permitidos'),
        descricao: yup.string().required('Campo obrigatório').max(100, 'Somente 100 caracteres são permitidos'),
        instagram: yup.string().max(100, 'Somente 100 caracteres são permitidos'),
        localVenda: yup.string().required('Campo obrigatório').max(70, 'Somente 70 caracteres são permitidos'),
        contato: yup.string().max(9999999999999).required(' Campo obrigatórior'),
        valor: yup.number('Somente numeros!').max(200, 'Valor maximo de R$ 200,00').required('Campo obrigatório'),
        codigoDesconto: yup.string().max(10, 'Somente 10 caracteres são permitidos'),
        desconto: yup.number().max(100,'Desconto somente até 100%').min(1),
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {erroSemFoto && <ModalErroFoto />}
          {loading && <Loading />}
          {erro && <ModalErro />}
          {sucesso && <ModalSucesso />}
          <ScrollView>
            <HeaderBack title="Publique seu evento" onNavigation={() => navigation.goBack(null)} />

            <Container>
              <Subtitle>Preencha os campos abaixo com as informações necessárias para registrar seu evento.</Subtitle>

              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Titulo do evento</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input multiline
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
                <FieldSetXL>
                  <LabelFielSet>Descrição</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      multiline numberOfLines={4}
                      value={values.descricao}
                      onChangeText={handleChange('descricao')}
                      placeholder=""
                      onBlur={() => setFieldTouched('descricao')}
                    />
                  </Item>
                  <View style={estilo.V_error}>
                    {touched.descricao && errors.descricao && (
                      <Text style={estilo.textError}>{errors.descricao}</Text>
                    )}
                  </View>
                </FieldSetXL>
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
                    <InputHora
                      onPress={() => {
                        setDataEventoPicker(true);
                      }}
                    >
                      <Label>{placeDataEvento}</Label>

                      <DateTimePickerModal
                        isVisible={dataEventoPicker}
                        mode="date"
                        onConfirm={date => selecionarData(date)}
                        onCancel={() => setDataEventoPicker(false)}
                        date={new Date()}
                        locale={'pt-br'}
                        is24Hour={true}
                        onDateChange={handleChange('data')}
                      />
                    </InputHora>
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
                  <LabelFielSet>Valor</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <CurrencyInput
                      placeholderTextColor="#263b50"
                      style={{ fontFamily: 'WorkSans', width: '80%', height: '100%' }}
                      value={valor}
                      onChangeValue={(formattedValue) => { setValor(formattedValue) }}
                      separator="."
                      precision={2}
                      onChangeText={handleChange('valor')}
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
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Instagram</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input multiline
                      value={values.instagram}
                      onChangeText={handleChange('instagram')}
                      placeholder=""
                      onBlur={() => setFieldTouched('instagram')}
                    />
                  </Item>
                  <View style={estilo.V_error}>
                    {touched.instagram && errors.instagram && (
                      <Text style={estilo.textError}>{errors.instagram}</Text>
                    )}
                  </View>
                </FieldSetLarge>
              </Linha>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <CheckBox
                  color="#142850"
                  style={{ alignSelf: 'stretch', marginTop: 5, }}
                  checked={descontoDisponivel}
                  onPress={() => setDescontoDisponivel(!descontoDisponivel)}
                />
                <CheckBoxText >Deseja oferecer uma porcentagem de desconto para usuarios do APP ?</CheckBoxText>
              </View>
              {descontoDisponivel && <View>
                <Linha>
                  <FieldSetLarge>
                    <LabelFielSet>Porcentagem de Desconto</LabelFielSet>
                    <Item style={{ borderColor: 'transparent' }}>
                      <Input
                        value={values.desconto}
                        onChangeText={handleChange('desconto')}
                        placeholder=""
                        onBlur={() => setFieldTouched('desconto')}
                      />
                    </Item>
                    <View style={estilo.V_error}>
                      {touched.desconto && errors.desconto && (
                        <Text style={estilo.textError}>{errors.desconto}</Text>
                      )}
                    </View>
                  </FieldSetLarge>
                </Linha>

                <Linha>
                  <FieldSetLarge>
                    <LabelFielSet>Codigo do Desconto</LabelFielSet>
                    <Item style={{ borderColor: 'transparent' }}>
                      <Input
                        value={values.codigoDesconto}
                        onChangeText={handleChange('codigoDesconto')}
                        placeholder=""
                        onBlur={() => setFieldTouched('codigoDesconto')}
                      />
                    </Item>
                    <View style={estilo.V_error}>
                      {touched.codigoDesconto && errors.codigoDesconto && (
                        <Text style={estilo.textError}>{errors.codigoDesconto}</Text>
                      )}
                    </View>
                  </FieldSetLarge>
                </Linha>
              </View>
}
              <AreaFotos>
                <LabelFotos>Fotos do seu evento</LabelFotos>
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
                      <TouchableOpacity onPress={() => { removerFoto(1) }} style={estilo.viewCloseFoto}>
                        <Icone name="close" ></Icone>
                      </TouchableOpacity>
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
                      <TouchableOpacity onPress={() => { removerFoto(2) }} style={estilo.viewCloseFoto}>
                        <Icone name="close" ></Icone>
                      </TouchableOpacity>
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
                      <TouchableOpacity onPress={() => { removerFoto(3) }} style={estilo.viewCloseFoto}>
                        <Icone name="close" ></Icone>
                      </TouchableOpacity>
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
