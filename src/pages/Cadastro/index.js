import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import HeaderBack from '../../components/CustomHeader';
import CustomModal from '../../components/Alert';
import {
  editTipoImovel,
  editNomeRepublica,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumeroCasa,
} from '../../actions/AuthActions';
import { imagePickerOptions, uploadFileToFireBaseRepublica, uploadProgress } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import { Text, Item, Input, Label, Button, Icon, Picker, Spinner, Tabs, Tab } from 'native-base';
import Loading from '../../components/Loading';
import ViewPager from '@react-native-community/viewpager';
import api from '../../service/api';
import estilo from './style';
import { NavigationActions, StackActions } from 'react-navigation';
export class Cadastro extends Component {
  static navigationOptions = { header: null };

  //setImageURI('https://image.flaticon.com/icons/svg/61/61205.svg');

  constructor(props) {
    super(props);
    console.log('PROPS,', this.props.valorAluguel);
    this.entrar = this.entrar.bind(this);
    this.state = {
      contadorImagem: 0,
      loading: false,
      update: this.props.navigation.state.params.update,
      genero: '',
      animal: '',
      Load: false,
      erro: false,
      sucesso: false,
      imageURI0: null,
      imageURI1: null,
      imageURI2: null,
      imageURI3: null,
      imageURI4: null,
      envio: true,
      carregando: false,
      modalLoadVisible: false,
      existeRepublica: false,
      semFoto: false,
    };
    this.verificarParametro(this.props.navigation.state.params.update);
  }

  navegar() {
    this.props.navigation.goBack(null);
  }
  async verificarParametro(parametro) {
    await this.setState({ update: parametro });

    if (parametro.update == false) {
      this.atualizarPropsRedux();
    } else {
      await this.setState({
        imageURI0: this.props.imagem1,
        imageURI1: this.props.imagem2,
        imageURI2:this.props.imagem3,
      });
    }
  }
  atualizarPropsRedux(dados) {
    this.props.editNomeRepublica('');
    this.props.editValor('');
    this.props.editBairro('');
    this.props.editRua('');
    this.props.editNumeroCasa('');
    this.props.editPessoas('');
    this.props.editAnimal('');
    this.props.editDescricao('');
    this.props.editAcomodacaoQuarto('');
    this.props.editAcomodacaoRepublica('');
    this.props.editObservacao('');
    this.props.editGenero('');
    this.props.editValorConta('');
    this.props.editNumVagas('');
    this.props.editRepresentante('');
    this.props.editImg1('');
    this.props.editImg2('');
    this.props.editImg3('');
    this.props.editTipoImovel('');
  }

  monitorFileUpload = task => {
    this.setState({ contadorImagem: this.state.contadorImagem + 1 });
    task.on('state_changed', snapshot => {
      const progress = uploadProgress(snapshot.bytesTransferred / snapshot.totalBytes);

      switch (snapshot.state) {
        case 'running':
          this.setState({ imageURI: null });
          this.setState({ loading: true });
          break;
        case 'success':
          snapshot.ref.getDownloadURL().then(downloadURL => {
            if (this.state.contadorImagem == 1) {
              this.setState({ imageURI0: downloadURL });
            } else if (this.state.contadorImagem == 2) {
              this.setState({ imageURI1: downloadURL });
            } else if (this.state.contadorImagem == 3) {
              this.setState({ imageURI2: downloadURL });
            } else {
              this.setState({ envio: false });
            }
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
        alert('Ocorreu algum erro: ', error);
      } else {
        const uploadTask = uploadFileToFireBaseRepublica(imagePickerResponse);
        this.monitorFileUpload(uploadTask);
      }
    });
  };
  resetNavigation(Rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Rota })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  goToHome() {
    this.resetNavigation('TabsHeader');
  }

  async entrar(values) {
    this.setState({ Load: true });
    if (this.state.imageURI0 == null && this.state.imageURI1 == null && this.state.imageURI2 == null) {
      this.setState({ semFoto: true, Load: false });
      return;
    }
    this.data = {
      imagem1: this.state.imageURI0,
      imagem2: this.state.imageURI1,
      imagem3: this.state.imageURI2,
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
      telefone: this.props.telefone,
      representante: this.props.representante,
      imovel: values.tipoImovel,
      descricao: values.descricao,
      userEmail: this.props.email,
    };

    try {
      if (this.state.update == true) {
        await api
          .put(`/main/${this.props.email}`, this.data)
          .then(Response => {
            console.log(Response);
            this.setState({ Load: false });
            this.setState({ sucesso: true });
          })
          .catch(e => {
            this.setState({ Load: false });
            this.setState({ erro: true });
          });
      } else if (this.state.update == false) {
        await api
          .post('/main', this.data)
          .then(ResponseJson => {
            console.log(ResponseJson);
            this.setState({ Load: false });
            this.setState({ sucesso: true });
          })
          .catch(error => {
            if (error.response.status == 401 || error.response.status == 404) {
              this.setState({ existeRepublica: true });
            } else {
              this.setState({ erro: true });
            }

            this.setState({ Load: false });
            this.setState({ erro: true });
          });
      }
    } catch (error) { }
  }

  render() {
    return (
      <Formik
        initialValues={{
          nome: this.props.titulo,
          bairro: this.props.bairro,
          rua: this.props.rua,
          numero: this.props.numeroCasa,
          aluguel: (this.props.valorAluguel).toString(10),
          contas: (this.props.valorContas).toString(10),
          moradores: this.props.pessoas,
          genero: this.props.genero,
          animais: this.props.animal,
          aQuarto: this.props.acomodacaoQuarto,
          aRepublica: this.props.acomodacaoRepublica,
          numeroVagas: this.props.numeroVagas,
          tipoImovel: this.props.tipoImovel,
          descricao: this.props.descricao,
        }}
        onSubmit={values => {
          this.setState({ carregando: true });
          this.entrar(values);
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
            .min(3)
            .max(70, 'No máximo 70 caracteres')
            .required('Campo obrigatório'),
          aRepublica: yup
            .string('')
            .min(3)
            .max(70, 'No máximo 70 caracteres')
            .required('Campo obrigatório'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            {this.state.semFoto && (
              <CustomModal
                parametro="Custom"
                imagem="EnvieImagem"
                titulo="Não ta esquecendo nada ?"
                descricao="Uma boa imagem é a alma de qualquer anuncio. Que tal adicionar pelo menos 1?"
                botao="Ok"
                callback={() => {
                  this.setState({ semFoto: false });
                }}
              />
            )}
            {this.state.existeRepublica && (
              <CustomModal
                parametro="Custom"
                imagem="NaoEncontrado"
                titulo="Algo deu errado"
                descricao="Verifique se você ja possui republica cadastradas em seu email"
                botao="Entendido"
                callback={() => {
                  this.setState({ existeRepublica: false });
                }}
              />
            )}

            {this.state.erro && (
              <CustomModal
                parametro="Erro"
                callback={() => {
                  this.setState({ erro: false });
                }}
              />
            )}
            {this.state.sucesso && (
              <CustomModal
                parametro="Custom"
                titulo="Tudo certo!"
                descricao="Seu anuncio já estar no ar, fique atento com os agendamentos"
                botao="Entendido"
                callback={() => {
                  this.goToHome();
                }}
              />
            )}
            {this.state.Load && <Loading />}
            <HeaderBack title=" Cadastre sua repúblicaa" onNavigation={() => this.navegar()} />
            <Tabs
              initialPage={0}
              tabBarUnderlineStyle={{ backgroundColor: '#142850', height: 3 }}
              tabContainerStyle={{ height: 45 }}
            >
              <Tab
                heading="Informaçoes"
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
                        {this.state.imageURI0 == null ? (
                          <View style={estilo.V_ImageFullEmpty}>
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <View style={estilo.V_ImageFull}>
                              <Image source={{ uri: this.state.imageURI0 }} style={estilo.ImageFull} />
                            </View>
                          )}
                        {this.state.imageURI1 == null ? (
                          <View style={estilo.V_ImageFullEmpty}>
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <View style={estilo.V_ImageFull}>
                              <Image source={{ uri: this.state.imageURI1 }} style={estilo.ImageFull} />
                            </View>
                          )}
                        {this.state.imageURI2 == null ? (
                          <View style={estilo.V_ImageFullEmpty}>
                            <Image
                              source={require('../../assets/Img/Republica_Send_Pictures.png')}
                              style={estilo.ImageEmpty}
                            />
                          </View>
                        ) : (
                            <View style={estilo.V_ImageFull}>
                              <Image source={{ uri: this.state.imageURI2 }} style={estilo.ImageFull} />
                            </View>
                          )}
                      </ScrollView>
                    </View>
                    <View style={estilo.V_BotaoImg}>
                      <Button
                        disabled={this.state.contadorImagem == 3}
                        style={estilo.botao_send}
                        onPress={() => {
                          this.uploadFile();
                        }}
                      >
                        {/* //<Icon name="account-outline" style={estilo.icon_send} /> */}
                        <Text>Enviar Fotos ({this.state.contadorImagem}/3)</Text>
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
                      {touched.descricao && errors.descricao && (
                        <Text style={estilo.textError}>{errors.descricao}</Text>
                      )}
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
                            {touched.aluguel && errors.aluguel && (
                              <Text style={estilo.textError}>{errors.aluguel}</Text>
                            )}
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
                            {touched.animais && errors.animais && (
                              <Text style={estilo.textError}>{errors.animais}</Text>
                            )}
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
                          {/* //<Icon name="account-outline" style={estilo.icon_send} /> */}
                          <Text>Publica republica</Text>
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
}

//Conexao react e Redux
//Recomendação do redux, que recebe state do store e retorna um json com props que vao ser acessivel dentro do compoennte
const mapStateToProps = state => {
  return {
    representante: state.user.usuario,
    email: state.user.email,
    telefone: state.user.telefone,
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    titulo: state.auth.nomeRepublica,
    valorAluguel: state.auth.valorAluguel,
    valorContas: state.auth.valorContas,
    genero: state.auth.genero,
    numeroVagas: state.auth.numVagas,
    bairro: state.auth.bairro,
    rua: state.auth.rua,
    pessoas: state.auth.pessoas,
    numeroCasa: state.auth.numeroCasa,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    tipoImovel: state.auth.tipoImovel,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};
// passa a aonde criamos os state o conjuento de actions que vai ser utilizada e a pagina a ser renderizada
const CadastroConnect = connect(
  mapStateToProps,
  {
    editTipoImovel,
    editNomeRepublica,
    editBairro,
    editPessoas,
    editDescricao,
    editAnimal,
    editAcomodacaoQuarto,
    editAcomodacaoRepublica,
    editValorConta,
    editObservacao,
    editImg1,
    editImg2,
    editImg3,
    editGenero,
    editNumVagas,
    editRepresentante,
    editRua,
    editNumeroCasa,
  }
)(Cadastro);

// depois da um export default no CadastroConnect

export default CadastroConnect;
