import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { connect, useSelector } from 'react-redux';
import HeaderBack from '../../../components/CustomHeader';
import CustomModal from '../../../components/Alert';

import { imagePickerOptions, uploadFileToFireBaseRepublica, uploadProgress } from '../../../utils';
import ImagePicker from 'react-native-image-picker';
import { Text, Item, Input, Label, Button, Icon, Picker, Spinner, Tabs, Tab } from 'native-base';
import Loading from '../../../components/Loading';
import ViewPager from '@react-native-community/viewpager';
import api from '../../../service/api';
import estilo from './style';
import { NavigationActions, StackActions } from 'react-navigation';

export default function Cadastro({ navigation }) {
  const email = useSelector(state => state.user.email);
  const telefone = useSelector(state => state.user.telefone);

  const [atualizarCadastro, setAtualizarCadastro] = useState(navigation.state.params.update);
  const [dadosRepublica, setDadosRepublica] = useState(navigation.state.params.dadosRepublica);
  const [contadorImagem, setContadorImagem] = useState(0);
  const [loading, setLoading] = useState();
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroExisteRepublica, setErroExisteRepublica] = useState(false);
  const [erroSemFoto, setErroSemFoto] = useState(false);
  const [imagem1, setImagem1] = useState(null);
  const [imagem2, setImagem2] = useState(null);
  const [imagem3, setImagem3] = useState(null);

  useEffect(() => {
    verificarParametro();
  }, []);

  function verificarParametro() {
    if (atualizarCadastro) {
      setImagem1(dadosRepublica.imagem1);
      setImagem1(dadosRepublica.imagem2);
      setImagem1(dadosRepublica.imagem3);
    }
  }

  function preencherFoto(linkImagem) {
    if (secontadorImagem == 0) {
      setImagem1(linkImagem);
    } else if (contadorImagem == 1) {
      setImagem2(linkImagem);
    } else if (contadorImagem == 2) {
      setImagem3(linkImagem);
    } else {
      setOcutarBotaoEnvioFoto();
    }
  }

  function carregarImagemGaleria() {
    ImagePicker.launchImageLibrary(imagePickerOptions, imagePickerResponse => {
      const { didCancel, error } = imagePickerResponse;
      if (didCancel) {
        alert('Envio cancelado');
      } else if (error) {
        alert('Ocorreu algum erro: ', error);
      } else {
        preencherFoto(imagePickerResponse.uri);
      }
    });
  }

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
    });
    navigation.dispatch(resetAction);
  }

  function irParaTelaInicial() {
    resetarPilhaNavegacao('TabsHeader');
  }

  async function enviarCadatroCarona(values) {
    setLoading(true);
    if (imagem1 == null && imagem2 == null && imagem3 == null) {
      setErroSemFoto(true);
      setLoading(false);
      return;
    }
    const linkImagem1 = uploadFileToFireBaseRepublica(imagem1);
    const linkImagem2 = uploadFileToFireBaseRepublica(imagem2);
    const linkImagem3 = uploadFileToFireBaseRepublica(imagem3);
    const data = {
      imagem1: linkImagem1,
      imagem2: linkImagem2,
      imagem3: linkImagem3,
      nomeRepublica: values.nome,
      valorAluguel: values.aluguel,
      bairro: values.bairro,
      rua: values.rua,
      numeroCasa: values.numero,
      pessoas: values.moradores,
      descricao: values.desc,
      animal: values.animais,
      acomodacaoQuarto: values.aQuarto,
      acomodacaoRepublica: values.aRepublica,
      valorContas: values.contas,
      genero: values.genero,
      numVagas: values.numeroVagas,
      telefone: telefone,
      representante: dadosRepublica.representante,
      imovel: values.tipoImovel,
      descricao: values.descricao,
      userEmail: email,
    };
    if (atualizarCadastro == true) {
      postaNovaRepublica(data);
    } else if (atualizarCadastro == false) {
      atualizarRepublica(data);
    }
  }

  function postaNovaRepublica(dados) {
    api
      .post('/main', dados)
      .then(response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        if (error.response.status == 401 || error.response.status == 404) {
          setErroExisteRepublica(true);
        } else {
          setErro(true);
          setLoading(false);
        }
      });
  }

  function atualizarRepublica(dados) {
    api
      .put(`/main/${email}`, dados)
      .then(Response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(e => {
        setErro(true);
        setLoading(false);
      });
  }

  return (
    <Formik
      initialValues={{
        nome: dadosRepublica ? dadosRepublica.titulo : '',
        bairro: dadosRepublica ? dadosRepublica.bairro : '',
        rua: dadosRepublica ? dadosRepublica.rua : '',
        numero: dadosRepublica ? dadosRepublica.numeroCasa : '',
        aluguel: dadosRepublica ? dadosRepublica.valorAluguel : '',
        contas: dadosRepublica ? dadosRepublica.valorContas : '',
        moradores: dadosRepublica ? dadosRepublica.pessoas : '',
        genero: dadosRepublica ? dadosRepublica.genero : '',
        animais: dadosRepublica ? dadosRepublica.animal : '',
        aQuarto: dadosRepublica ? dadosRepublica.acomodacaoQuarto : '',
        aRepublica: dadosRepublica ? dadosRepublica.acomodacaoRepublica : '',
        numeroVagas: dadosRepublica ? dadosRepublica.numeroVagas : '',
        tipoImovel: dadosRepublica ? dadosRepublica.tipoImovel : '',
        descricao: dadosRepublica ? dadosRepublica.descricao : '',
      }}
      onSubmit={values => {
        enviarCadatroCarona(values);
      }}
      validationSchema={yup.object().shape({
        nome: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(30, 'Maximo permitido de 30 caracteres')
          .required('Campo obrigatório'),
        bairro: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(25, 'Maximo permitido de 25 caracteres')
          .required('Campo obrigatório'),
        rua: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(25, 'Maximo permitido de 25 caracteres')
          .required('Campo obrigatório'),
        numero: yup
          .number('Somente numeros')
          .min(1, 'Valor minimo 1')
          .max(10000, 'Valor maximo ')
          .required('Campo obrigatório'),
        descricao: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(70, 'No máximo 70 caracteres'),
        aluguel: yup
          .number('Somente numeros')
          .min(10, 'Valor minimo R$ 10')
          .max(2000, 'Valor máximo de R$ 2000')
          .required('Campo obrigatório'),
        contas: yup
          .number('Somente numero')
          .min(10, 'Valor minimo R$ 10')
          .max(600, 'Valor maximo R$ 600')
          .required('Campo obrigatório'),
        genero: yup.string('').required('Campo obrigatório'),
        animais: yup.string('').required('Campo obrigatório'),
        tipoImovel: yup.string('').required('Campo obrigatório'),
        numeroVagas: yup.string('').required('Campo obrigatório'),
        aQuarto: yup
          .string('')
          .min(3, 'No mínimo 3 caracteres')
          .max(70, 'No máximo 70 caracteres')
          .required('Campo obrigatório'),
        aRepublica: yup
          .string('')
          .min(3, 'No mínimo 3 caracteres')
          .max(70, 'No máximo 70 caracteres')
          .required('Campo obrigatório'),
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {erroSemFoto && (
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
          )}
          {erroExisteRepublica && (
            <CustomModal
              parametro="Custom"
              imagem="NaoEncontrado"
              titulo="Algo deu errado"
              descricao="Verifique se você ja possui republica cadastradas em seu email"
              botao="Entendido"
              callback={() => {
                setErroExisteRepublica(false);
              }}
            />
          )}

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
              descricao="Seu anuncio já está no ar, fique atento com os agendamentos"
              botao="Entendido"
              callback={() => {
                irParaTelaInicial();
              }}
            />
          )}
          {loading && <Loading />}
          <HeaderBack title=" Cadastre sua república" onNavigation={() => navigation.goBack(null)} />
          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: '#142850', height: 3 }}
            tabContainerStyle={{ height: 45 }}
          >
            <Tab
              heading="Informações"
              tabStyle={estilo.tabs_style}
              textStyle={estilo.tabs_TextStyle}
              activeTabStyle={estilo.tabs_ActiveTabs}
              activeTextStyle={estilo.tabs_ActiveTextStyle}
            >
              <ScrollView>
                <View style={estilo.V_Conteudo}>
                  <Text style={estilo.textRepublica}>
                    Insira as informações necessárias para registrar uma nova república.
                  </Text>
                  <View style={estilo.V_ImageLabel}>
                    <Text style={estilo.txtLabel}>Envie Fotos de Sua República</Text>
                  </View>
                  <View style={estilo.V_ImageEmpty}>
                    <ScrollView horizontal={true}>
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
                    </ScrollView>
                  </View>
                  <View style={estilo.V_BotaoImg}>
                    <Button
                      disabled={contadorImagem == 3}
                      style={estilo.botao_send}
                      onPress={() => {
                        carregarImagemGaleria();
                      }}
                    >
                      <Text>Enviar Fotos ({contadorImagem}/3)</Text>
                    </Button>
                  </View>
                  <View>
                    <Text style={estilo.txtLabel}>Nome da República</Text>
                    <Item>
                      <Input
                        value={values.nome}
                        onChangeText={handleChange('nome')}
                        placeholder=""
                        onBlur={() => setFieldTouched('nome')}
                      />
                    </Item>
                  </View>
                  <View style={estilo.V_error}>
                    {touched.nome && errors.nome && <Text style={estilo.textError}>{errors.nome}</Text>}
                  </View>

                  <View style={estilo.campos} inlineLabel>
                    <Label style={estilo.txtLabel}>Bairro</Label>
                    <Item>
                      <Input
                        value={values.bairro}
                        onChangeText={handleChange('bairro')}
                        placeholder=""
                        onBlur={() => setFieldTouched('bairro')}
                      />
                    </Item>
                  </View>
                  <View style={estilo.V_error}>
                    {touched.bairro && errors.bairro && <Text style={estilo.textError}>{errors.bairro}</Text>}
                  </View>

                  <View style={estilo.ruaNum}>
                    <View floatingLabel style={{ width: '70%' }}>
                      <Label style={estilo.txtLabel}>Rua </Label>
                      <Item>
                        <Input
                          value={values.rua}
                          onChangeText={handleChange('rua')}
                          placeholder=""
                          onBlur={() => setFieldTouched('rua')}
                        />
                      </Item>
                      <View style={estilo.V_error}>
                        {touched.rua && errors.rua && <Text style={estilo.textError}>{errors.rua}</Text>}
                      </View>
                    </View>

                    <View floatingLabel style={{ width: '20%' }}>
                      <Label style={estilo.txtLabel}>N°</Label>
                      <Item>
                        <Input
                          keyboardType="number-pad"
                          value={values.numero}
                          onChangeText={handleChange('numero')}
                          placeholder=""
                          onBlur={() => setFieldTouched('numero')}
                        />
                      </Item>
                      <View style={estilo.V_error}>
                        {touched.numero && errors.numero && <Text style={estilo.textError}>{errors.numero}</Text>}
                      </View>
                    </View>
                  </View>

                  <View style={estilo.camposAmb} inlineLabel>
                    <Label style={estilo.txtLabel}>Descrição do Ambiente</Label>
                    <Item>
                      <Input
                        value={values.descricao}
                        onChangeText={handleChange('descricao')}
                        placeholderTextColor="#2e2e2e"
                        //style={estilo.textoValue}
                        placeholderTextColor="#989898"
                        placeholder="...Perto da UFES, local para estudo..."
                        onBlur={() => setFieldTouched('descricao')}
                      />
                    </Item>
                  </View>
                  <View style={estilo.V_error}>
                    {touched.descricao && errors.descricao && <Text style={estilo.textError}>{errors.descricao}</Text>}
                  </View>
                </View>
              </ScrollView>
            </Tab>
            <Tab
              heading="Detalhes"
              tabStyle={estilo.tabs_style}
              textStyle={estilo.tabs_TextStyle}
              activeTabStyle={estilo.tabs_ActiveTabs}
              activeTextStyle={estilo.tabs_ActiveTextStyle}
            >
              <View key="2">
                <ScrollView>
                  <View style={estilo.V_Conteudo}>
                    <Text style={estilo.textRepublica}>Nos campos abaixo preencha os detalhes de sua república.</Text>

                    <View style={estilo.V_Caracteristicas}>
                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Aluguel</Text>
                        <Item>
                          <Label fixedLabel>R$</Label>
                          <Input
                            keyboardType="number-pad"
                            value={values.aluguel}
                            onChangeText={handleChange('aluguel')}
                            placeholder=""
                            onBlur={() => setFieldTouched('aluguel')}
                          />
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.aluguel && errors.aluguel && <Text style={estilo.textError}>{errors.aluguel}</Text>}
                        </View>
                      </View>

                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Média de Contas</Text>
                        <Item>
                          <Label fixedLabel>R$</Label>
                          <Input
                            keyboardType="number-pad"
                            value={values.contas}
                            onChangeText={handleChange('contas')}
                            placeholder=""
                            onBlur={() => setFieldTouched('contas')}
                          />
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.contas && errors.contas && <Text style={estilo.textError}>{errors.contas}</Text>}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.V_Caracteristicas}>
                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Gênero</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder=""
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.genero}
                            onValueChange={handleChange('genero')}
                            value={values.genero}
                            onChangeText={handleChange('genero')}
                            placeholder=""
                            onBlur={() => setFieldTouched('genero')}
                          >
                            <Picker.Item label=" " value="Não informado" />
                            <Picker.Item label="Feminina" value="Feminina" />
                            <Picker.Item label="Masculina" value="Masculina" />
                            <Picker.Item label="Mista" value="Mista" />
                          </Picker>
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.genero && errors.genero && <Text style={estilo.textError}>{errors.genero}</Text>}
                        </View>
                      </View>
                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Aceita Animais ?</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Sim ou Nao"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.animais}
                            onValueChange={handleChange('animais')}
                            value={values.animais}
                            onChangeText={handleChange('animais')}
                            placeholder=""
                            onBlur={() => setFieldTouched('animais')}
                          >
                            <Picker.Item label=" " value="Não informado" />
                            <Picker.Item label="Sim" value="sim" />
                            <Picker.Item label="Não" value="nao" />
                          </Picker>
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.animais && errors.animais && <Text style={estilo.textError}>{errors.animais}</Text>}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.V_Caracteristicas}>
                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Tipo de Imóvel</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder=""
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.tipoImovel}
                            onValueChange={handleChange('tipoImovel')}
                            value={values.tipoImovel}
                            onChangeText={handleChange('tipoImovel')}
                            placeholder=""
                            onBlur={() => setFieldTouched('tipoImovel')}
                          >
                            <Picker.Item label=" " value="Não informado" />
                            <Picker.Item label="Casa" value="Casa" />
                            <Picker.Item label="Apartamento" value="Apartamento" />
                          </Picker>
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.tipoImovel && errors.tipoImovel && (
                            <Text style={estilo.textError}>{errors.tipoImovel}</Text>
                          )}
                        </View>
                      </View>
                      <View style={estilo.V_Campos}>
                        <Text style={estilo.txtLabel}>Vagas Disponíveis</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Sim ou Nao"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.numeroVagas}
                            onValueChange={handleChange('numeroVagas')}
                            value={values.numeroVagas}
                            //onChangeText={handleChange('numeroVagas')}
                            placeholder="Não Informado"
                            onBlur={() => setFieldTouched('numeroVagas')}
                          >
                            <Picker.Item label="" value="Não informado" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                          </Picker>
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.numeroVagas && errors.numeroVagas && (
                            <Text style={estilo.textError}>{errors.numeroVagas}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>Mobília do Quarto</Label>
                      <Item>
                        <Input
                          style={estilo.place}
                          value={values.aQuarto}
                          onChangeText={handleChange('aQuarto')}
                          onBlur={() => setFieldTouched('aQuarto')}
                          placeholder="...Cama, Ventilador, Janela"
                          placeholderTextColor="#989898"
                        />
                      </Item>
                    </View>
                    <View style={estilo.V_error}>
                      {touched.aQuarto && errors.aQuarto && <Text style={estilo.textError}>{errors.aQuarto}</Text>}
                    </View>

                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>Mobília e eletrodomésticos de uso comum</Label>
                      <Item>
                        <Input
                          style={estilo.place}
                          value={values.aRepublica}
                          onChangeText={handleChange('aRepublica')}
                          onBlur={() => setFieldTouched('aRepublica')}
                          placeholderTextColor="#989898"
                          placeholder="...Wifi, Maquina de Lavar, Fogao"
                        />
                      </Item>
                    </View>
                    <View style={estilo.V_error}>
                      {touched.aRepublica && errors.aRepublica && (
                        <Text style={estilo.textError}>{errors.aRepublica}</Text>
                      )}
                    </View>
                    <View style={estilo.V_BotaoImg}>
                      <Button style={estilo.botao_send} onPress={handleSubmit}>
                        <Text>Publicar sua republica</Text>
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </Tab>
          </Tabs>
        </Fragment>
      )}
    </Formik>
  );
}
