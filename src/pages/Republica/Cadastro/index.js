import { Formik } from 'formik';
import { Button, Icon, Input, Item, Label, Picker, Tab, Tabs } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import { deleteFileRepublica, imagePickerOptions, uploadFileToFireBaseRepublica } from '../../../utils';
import estilo, {
  AreaFotos,
  DivisaoFotos,
  FieldSet,
  FieldSetLarge,
  FieldSetNumero,
  FieldSetRua,
  Icone,
  LabelFielSet,
  LabelFotos,
  Linha
} from './style';


export default function Cadastro({ navigation }) {
  const email = useSelector(state => state.user.email);
  const telefone = useSelector(state => state.user.telefone);
  const nome = useSelector(state => state.user.usuario);
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
  const [linkimagem1, setLinkImagem1] = useState(null);
  const [linkimagem2, setLinkImagem2] = useState(null);
  const [linkimagem3, setLinkImagem3] = useState(null);
  const [nomeImagem1, setNomeImagem1] = useState("");
  const [nomeImagem2, setNomeImagem2] = useState("");
  const [nomeImagem3, setNomeImagem3] = useState("");
  
  const [usuarioLogado, setUsuarioLogado] = useState();
  const [aluguel, setAluguel] = useState();
  const [conta, setConta] = useState();


  useEffect(() => {

    if (atualizarCadastro) {
      var cont = 0;
      if (dadosRepublica.imagem1 != null) {
        setImagem1(dadosRepublica.imagem1);
        setLinkImagem1(dadosRepublica.imagem1);
        cont++;
      }

      if (dadosRepublica.imagem2 != null) {
        setImagem2(dadosRepublica.imagem2);
        setLinkImagem2(dadosRepublica.imagem2);
        cont++;
      }

      if (dadosRepublica.imagem3 != null) {
        setImagem3(dadosRepublica.imagem3);
        cont++;
      }
      setContadorImagem(cont)
    }

  }, []);

  function preencherFoto(linkImagem) {
    console.log(linkImagem,linkImagem.fileName)
    if (imagem1 == null) {
      setNomeImagem1(linkImagem.fileName)
      setImagem1(linkImagem.uri);
    } else if (imagem2 == null) {
      setNomeImagem2(linkImagem.fileName)
      setImagem2(linkImagem.uri);
    } else if (imagem3 == null) {
      setNomeImagem3(linkImagem.fileName)
      setImagem3(linkImagem.uri);
    }
    console.log("IMAGEM1",nomeImagem1)
    console.log("IMAGEM2",nomeImagem2)
    console.log("IMAGEM3",nomeImagem3)
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
        console.log("TETSTE")
        const referencia = uploadFileToFireBaseRepublica(imagePickerResponse);
        monitorFileUpload(referencia);
      }
    });
  }

  function monitorFileUpload(task) {
    task.on('state_changed', snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        if (linkimagem1 == null) {
          setLinkImagem1(downloadURL);
        } else if (linkimagem2 == null) {
          setLinkImagem2(downloadURL);
        } else if (linkimagem3 == null) {
          setLinkImagem3(downloadURL);
        }
      });
    });
  }

  function removerFoto(idFoto) {
    if (idFoto == 1) {
      deleteFileRepublica()
      setLinkImagem1(null);
      setImagem1(null);
      
    } else if (idFoto == 2) {
      setLinkImagem2(null);
      setImagem2(null);
      deleteFileRepublica( )
    } else if (idFoto == 3) {
      setLinkImagem3(null);
      setImagem3(null);
      deleteFileRepublica( )
    }
    setContadorImagem(contadorImagem - 1);
  }

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });
    navigation.dispatch(resetAction);
  }

  function irParaTelaInicial() {
    resetarPilhaNavegacao('TabsHeader');
  }

  async function enviarCadatroCarona(values) {
    setLoading(true);
    setContadorImagem(0);
    if (imagem1 == null && imagem2 == null && imagem3 == null) {
      setErroSemFoto(true);
      setLoading(false);
      return;
    }

    const data = {
      imagem1: linkimagem1,
      imagem2: linkimagem2,
      imagem3: linkimagem3,
      nomeImagem1:nomeImagem1,
      nomeImagem2:nomeImagem2,
      nomeImagem3:nomeImagem3,
      nomeRepublica: values.nome,
      valorAluguel:aluguel,
      bairro: values.bairro,
      rua: values.rua,
      pontoReferencia: values.pontoReferencia,
      numeroCasa: values.numero,
      pessoas: values.moradores,
      descricao: values.desc,
      animal: values.animais,
      acomodacaoQuarto: values.aQuarto,
      acomodacaoRepublica: values.aRepublica,
      valorContas: conta,
      genero: values.genero,
      numVagas: values.numeroVagas,
      telefone: telefone,
      representante: nome,
      imovel: values.tipoImovel,
      descricao: values.descricao,
      userEmail: email
    };
    if (!atualizarCadastro) {
      postaNovaRepublica(data);
    } else {
      atualizarRepublica(data);
    }
  }

  function postaNovaRepublica(dados) {
    api
      .post('/republica', dados)
      .then(response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        if (error.response.status == 401 || error.response.status == 404 || error.response.status == 400) {
          setErroExisteRepublica(true);
          setLoading(false);
        } else {
          setErro(true);
          setLoading(false);
        }
      });
  }

  async function atualizarRepublica(dados) {
    await api
      .put(`/republica/${email}`, dados)
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
        nome: dadosRepublica ? dadosRepublica.nomeRepublica : '',
        bairro: dadosRepublica ? dadosRepublica.bairro : '',
        rua: dadosRepublica ? dadosRepublica.rua : '',
        numero: dadosRepublica ? dadosRepublica.numeroCasa : '',
        aluguel: dadosRepublica ? dadosRepublica.valorAluguel.toString() : '',
        pontoReferencia: dadosRepublica ? dadosRepublica.pontoReferencia : '',
        contas: dadosRepublica ? dadosRepublica.valorContas.toString() : '',
        moradores: dadosRepublica ? dadosRepublica.pessoas : '',
        genero: dadosRepublica ? dadosRepublica.genero : '',
        animais: dadosRepublica ? dadosRepublica.animal : '',
        aQuarto: dadosRepublica ? dadosRepublica.acomodacaoQuarto : '',
        aRepublica: dadosRepublica ? dadosRepublica.acomodacaoRepublica : '',
        numeroVagas: dadosRepublica ? dadosRepublica.numVagas : '',
        tipoImovel: dadosRepublica ? dadosRepublica.imovel : '',
        descricao: dadosRepublica ? dadosRepublica.descricao : ''
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
          .max(50, 'Maximo permitido de 25 caracteres')
          .required('Campo obrigatório'),
        rua: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(50, 'Maximo permitido de 50 caracteres')
          .required('Campo obrigatório'),
        pontoReferencia: yup
          .string('')
          .min(3, 'Minimo de 3 caracteres')
          .max(40, 'Maximo permitido de 40 caracteres')
          .required('Campo obrigatório'),
        numero: yup
          .number('Somente numeros')
          .min(1, 'Valor minimo 1')
          .max(10000, 'Valor maximo ')
          .required('Campo obrigatório'),
        descricao: yup.string('').min(3, 'Minimo de 3 caracteres').max(70, 'No máximo 70 caracteres'),
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
          .required('Campo obrigatório')
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
              descricao="Verifique se você ja possui república cadastradas em seu email"
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
              heading="SOBRE A REPUBLÍCA"
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
                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Nome da república</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          value={values.nome}
                          onChangeText={handleChange('nome')}
                          placeholder=""
                          onBlur={() => setFieldTouched('nome')}
                        />
                      </Item>

                      <View style={estilo.V_error}>
                        {touched.nome && errors.nome && <Text style={estilo.textError}>{errors.nome}</Text>}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Bairro</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Picker
                          mode="dropdown"
                          placeholder="Bairro"
                          placeholderStyle={{ color: '#bfc6ea' }}
                          placeholderIconColor="#007aff"
                          selectedValue={values.bairro}
                          onValueChange={handleChange('bairro')}
                          value={values.bairro}
                          onChangeText={handleChange('bairro')}
                          onBlur={() => setFieldTouched('bairro')}
                        >
                          <Picker.Item label="" value="null" />
                          <Picker.Item label="Bilau(Guararema)" value="Bilau" />
                          <Picker.Item label="Colina" value="Colina" />
                          <Picker.Item label="Conceição" value="Conceição" />
                          <Picker.Item label="Nova Alegre(Vila Alta)" value="Nova Alegre" />
                          <Picker.Item label="Centro" value="Centro" />
                          <Picker.Item label="Vila Reis" value="Vila Reis" />
                          <Picker.Item label="Campo de Aviação" value="Campo de Aviação" />
                          <Picker.Item label="Vila do Sul" value="Vila do Sul" />
                          <Picker.Item label="São Manoel" value="São Manoel" />
                          <Picker.Item label="Charqueada" value="Charqueada" />
                        </Picker>
                      </Item>

                      <View style={estilo.V_error}>
                        {touched.bairro && errors.bairro && <Text style={estilo.textError}>{errors.bairro}</Text>}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <Linha>
                    <FieldSetRua>
                      <LabelFielSet>Rua</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
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
                    </FieldSetRua>
                    <FieldSetNumero>
                      <LabelFielSet>N°</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
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
                    </FieldSetNumero>
                  </Linha>

                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Descrição do Ambiente</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          style={{ fontFamily: 'WorkSans' }}
                          value={values.descricao}
                          onChangeText={handleChange('descricao')}
                          placeholderTextColor="#2e2e2e"
                          placeholderTextColor="#989898"
                          placeholder="EX.:Local para estudo..."
                          onBlur={() => setFieldTouched('descricao')}
                        />
                      </Item>
                      <View style={estilo.V_error}>
                        {touched.descricao && errors.descricao && (
                          <Text style={estilo.textError}>{errors.descricao}</Text>
                        )}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Ponto de Referencia</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          style={{ fontFamily: 'WorkSans' }}
                          value={values.pontoReferencia}
                          onChangeText={handleChange('pontoReferencia')}
                          placeholderTextColor="#2e2e2e"
                          placeholderTextColor="#989898"
                          placeholder="EX.:Ao lado do BC Supermercado"
                          onBlur={() => setFieldTouched('pontoReferencia')}
                        />
                      </Item>
                      <View style={estilo.V_error}>
                        {touched.pontoReferencia && errors.pontoReferencia && (
                          <Text style={estilo.textError}>{errors.pontoReferencia}</Text>
                        )}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <AreaFotos>
                    <LabelFotos>Fotos da sua república</LabelFotos>
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
                            <TouchableOpacity onPress={() => { removerFoto(1) }} style={estilo.viewCloseFoto}>
                              <Icone name="close" ></Icone>
                            </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => { removerFoto(2) }} style={estilo.viewCloseFoto}>
                              <Icone name="close" ></Icone>
                            </TouchableOpacity>
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
                </View>
              </ScrollView>
            </Tab>
            <Tab
              heading="CARACTERISTICAS"
              tabStyle={estilo.tabs_style}
              textStyle={estilo.tabs_TextStyle}
              activeTabStyle={estilo.tabs_ActiveTabs}
              activeTextStyle={estilo.tabs_ActiveTextStyle}
            >
              <View key="2">
                <ScrollView>
                  <View style={estilo.V_Conteudo}>
                    <Text style={estilo.textRepublica}>Nos campos abaixo preencha os detalhes de sua república.</Text>
                    <Linha>
                      <FieldSet>
                        <LabelFielSet>Aluguel</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Label
                            style={{
                              marginLeft: 10,
                              fontSize: 16,
                              fontFamily: 'WorkSans',
                              color: '#bfc6ea'
                            }}
                            fixedLabel
                          >
                            R$
                          </Label>
                          <CurrencyInput
                             placeholderTextColor="#263b50"
                             style={{ fontFamily: 'WorkSans', width: '80%', height: '100%' }}
                            value={aluguel}
                            onChangeValue={(formattedValue) => { setAluguel(formattedValue)}}
                            separator="."
                            precision={2}
                            onChangeText={handleChange('aluguel')}

                          />
                         
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.aluguel && errors.aluguel && <Text style={estilo.textError}>{errors.aluguel}</Text>}
                        </View>
                      </FieldSet>
                      <FieldSet>
                        <LabelFielSet>Média de contas</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Label
                            style={{
                              marginLeft: 10,
                              fontSize: 16,
                              fontFamily: 'WorkSans',
                              color: '#bfc6ea'
                            }}
                            fixedLabel
                          >
                            R$
                          </Label>
                          <CurrencyInput
                             placeholderTextColor="#263b50"
                             style={{ fontFamily: 'WorkSans', width: '80%', height: '100%' }}
                            value={conta}
                            onChangeValue={(formattedValue) => { setConta(formattedValue)}}
                            separator="."
                            precision={2}
                            onChangeText={handleChange('contas')}
                          />
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.contas && errors.contas && <Text style={estilo.textError}>{errors.contas}</Text>}
                        </View>
                      </FieldSet>
                    </Linha>
                    <Linha>
                      <FieldSet>
                        <LabelFielSet>Gênero</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ fontFamily: 'WorkSans' }}
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
                      </FieldSet>

                      <FieldSet>
                        <LabelFielSet>Aceita Animais ?</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ fontFamily: 'WorkSans' }}
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
                      </FieldSet>
                    </Linha>
                    <Linha>
                      <FieldSet>
                        <LabelFielSet>Imóvel</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ fontFamily: 'WorkSans' }}
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
                      </FieldSet>
                      <FieldSet>
                        <LabelFielSet>Vagas</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
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
                      </FieldSet>
                    </Linha>
                    <Linha>
                      <FieldSetLarge>
                        <LabelFielSet>Mobilia quarto</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Input
                            style={estilo.place}
                            value={values.aQuarto}
                            placeholderStyle={{ fontFamily: 'WorkSans' }}
                            onChangeText={handleChange('aQuarto')}
                            onBlur={() => setFieldTouched('aQuarto')}
                            placeholder="Ex.:Cama, Ventilador, Janela"
                            placeholderTextColor="#989898"
                          />
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.aQuarto && errors.aQuarto && <Text style={estilo.textError}>{errors.aQuarto}</Text>}
                        </View>
                      </FieldSetLarge>
                    </Linha>
                    <Linha>
                      <FieldSetLarge>
                        <LabelFielSet>Mobilia comun</LabelFielSet>
                        <Item style={{ borderColor: 'transparent' }}>
                          <Input
                            style={estilo.place}
                            value={values.aRepublica}
                            placeholderStyle={{ fontFamily: 'WorkSans' }}
                            onChangeText={handleChange('aRepublica')}
                            onBlur={() => setFieldTouched('aRepublica')}
                            placeholderTextColor="#989898"
                            placeholder="Ex.:Wifi, Maquina de Lavar, Fogao"
                          />
                        </Item>
                        <View style={estilo.V_error}>
                          {touched.aRepublica && errors.aRepublica && (
                            <Text style={estilo.textError}>{errors.aRepublica}</Text>
                          )}
                        </View>
                      </FieldSetLarge>
                    </Linha>

                    <View style={estilo.V_BotaoSend}>
                      <Button style={estilo.botao_send} onPress={handleSubmit}>
                        {atualizarCadastro ? (
                          <Text style={{ color: '#142850', fontFamily: 'WorkSans-Bold', fontSize: 18 }}>
                            {' '}
                            Atualizar república
                          </Text>
                        ) : (
                            <Text style={{ color: '#142850', fontFamily: 'WorkSans-Bold', fontSize: 18 }}>
                              Cadastrar república
                            </Text>
                          )}
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
