import { Formik } from 'formik';
import { Button, Input, Item } from 'native-base';
import React, { Fragment, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import ImagePicker from 'react-native-image-picker';
import TextInputMask from 'react-native-text-input-mask';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../../components/Alert';
import HeaderBack from '../../../../components/CustomHeader';
import Loading from '../../../../components/Loading';
import api from '../../../../service/api';
import { imagePickerOptions, uploadFileToFireBaseRepublicaProduto } from '../../../../utils';
import estilo, {
  AreaFotos,
  Container,
  DivisaoFotos,
  FieldSet,
  FieldSetLarge,
  Icone, LabeBotaoEnviar,
  LabelErro,
  LabelFielSet,
  LabelFotos,
  Linha,
  Subtitle,
  ViewBotao,
  ViewErro
} from './styles';

export default function CadastroProduto({ navigation }) {
  const emailUser = useSelector(state => state.user.email);

  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contadorImagem, setContadorImagem] = useState(0);
  const [erroSemFoto, setErroSemFoto] = useState(false);

  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagem3, setImagem3] = useState(null);
  const [linkimagem1, setLinkImagem1] = useState(null);
  const [linkimagem2, setLinkImagem2] = useState(null);
  const [linkimagem3, setLinkImagem3] = useState(null);
  const [valor, setValor] = useState();


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
        const referencia = uploadFileToFireBaseRepublicaProduto(imagePickerResponse);
        monitorFileUpload(referencia);
      }
    });
  }

  function monitorFileUpload(task) {
    setLoading(true);
    task.on('state_changed', snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        if (contadorImagem == 0) {
          setLinkImagem1(downloadURL);
        } else if (contadorImagem == 1) {
          setLinkImagem2(downloadURL);
        } else if (contadorImagem == 2) {
          setLinkImagem3(downloadURL);
        }
        setLoading(false);
      });
    });
  }

  function publicarProduto(values) {
    const data = {
      titulo: values.tituloProduto,
      descricao: values.descricao,
      valor: valor,
      userEmail: emailUser,
      telefone: values.contato,
      imagem1: linkimagem1,
      imagem2: linkimagem2,
      imagem3: linkimagem3
    };

    if (imagem1 == null && imagem2 == null && imagem3 == null) {
      setErroSemFoto(true);
      setLoading(false);
      return;
    }
    api
      .post('/produto', data)
      .then(Response => {
         setLoading(false)
        setSucesso(true);
      })
      .catch(error => {
         setLoading(false)
        setErro(true);
      })
     
  }


 function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });
    navigation.dispatch(resetAction);
    console.log("????")
  }
  
  function irParaTelaIncial() {
   console.log("?22?")
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
        valor: yup.number('Somente numeros!').typeError('Valor inválido').max(1000, 'Valor maximo de R$ 1.000,00').required('Campo obrigatório')
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
                  <ViewErro>
                    {touched.tituloProduto && errors.tituloProduto && (
                      <LabelErro style={estilo.textError}>{errors.tituloProduto}</LabelErro>
                    )}
                  </ViewErro>
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
                  <ViewErro>
                    {touched.descricao && errors.descricao && <LabelErro>{errors.descricao}</LabelErro>}
                  </ViewErro>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Valor</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                  <CurrencyInput
                      style={{ alignItems: 'flex-start' }}
                      value={valor}
                      onChangeValue={(formattedValue) => { setValor(formattedValue) }}
                      separator="."
                      precision={2}
                      onChangeText={handleChange('valor')}
                                          />
                  </Item>

                  <ViewErro>{touched.valor && errors.valor && <LabelErro>{errors.valor}</LabelErro>}</ViewErro>
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

                  <ViewErro>{touched.contato && errors.contato && <LabelErro>{errors.contato}</LabelErro>}</ViewErro>
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
        callback={irParaTelaIncial}
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
