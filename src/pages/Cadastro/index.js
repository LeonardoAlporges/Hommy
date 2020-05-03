import * as yup from 'yup';
import { Formik } from 'formik';

import React, { Component, Fragment } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  editValor,
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
import {
  Text,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Picker,
  CheckBox,
  ListItem,
  Body,
  Spinner,
} from 'native-base';
import ViewPager from '@react-native-community/viewpager';
import api from '../../service/api';
import estilo from './style';

export class Cadastro extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    const update = this.props.navigation.state.params.update;
    this.entrar = this.entrar.bind(this);
    this.state = {
      loading: true,
      update,
      selected2: undefined,
      selected3: undefined,
    };

    this.verificarParametro(this.props.navigation.state.params);
  }

  verificarParametro(parametro) {
    this.setState({ update: parametro });
    console.tron.log(this.state.update);
    console.tron.log('valor Parametro ', parametro);
    if (parametro.update == false) {
      this.atualizarPropsRedux();
    }
  }
  atualizarPropsRedux(dados) {
    console.tron.log('Atulizando ');
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
    this.props.editNumVagas('');
    this.props.editRepresentante('');
    this.props.editImg1('');
    this.props.editImg2('');
    this.props.editImg3('');
  }

  teste() {}
  onValueChange2(value) {
    this.setState({
      selected2: value,
    });
  }
  onValueChange3(value) {
    this.setState({
      selected3: value,
    });
  }

  entrar() {
    alert('Enviado', this.state.update);
  }

  async entrar() {
    this.data = {
      titulo: this.props.titulo,
      valor: this.props.valor,
      bairro: this.props.bairro,
      pessoas: this.props.pessoas,
      desc: this.props.desc,
      animal: this.props.animal,
      movelQuarto: this.props.movelQuarto,
      moveisComun: this.props.moveisComun,
      valorContas: this.props.valorContas,
      observacao: this.props.observacao,
      imagem: this.props.imagem,
      genero: this.props.genero,
      numVagas: this.props.numVagas,
      representante: this.props.representante,
      redeSocial: this.props.redeSocial,
      rua: this.props.rua,
      numero: this.props.numero,
    };
    console.tron.log(this.data);

    await api
      .post('/main', this.data)
      .then(Response => {
        console.log('sucesso', this.data);
      })
      .catch(e => {
        console.log(e);
      });
    //this.props.navigation.navigate('TabsHeader');
  }

  //Na linha 23 no onchangeText ele vai receber uma entrada qualquer (um txt) e vai passar esse txt para a action que vem por props
  //Da funçao connect
  render() {
    return (
      <Formik
        initialValues={{
          nome: this.props.titulo,
          bairro: this.props.bairro,
          rua: this.props.rua,
          numero: this.props.numeroCasa,
          aluguel: this.props.valorAluguel,
          contas: this.props.valorContas,
          moradores: this.props.pessoas,
          vagas: this.props.numVagas,
          genero: this.props.genero,
          animais: this.props.animal,
          aQuarto: this.props.acomodacaoQuarto,
          aRepublica: this.props.acomodacaoRepublica,
        }}
        onSubmit={values => {
          Alert.alert(JSON.stringify(values));
        }}
        validationSchema={yup.object().shape({
          nome: yup
            .string()
            .min(3)
            .required('Insira o nome da sua republica'),
          bairro: yup
            .string()
            .min(3)
            .max(15)
            .required('Insira o bairro aonde fica localizada'),
          rua: yup
            .string()
            .min(3)
            .max(25)
            .required('Insira a rua aonde fica localizada'),
          numero: yup
            .number()
            .min(1)
            .max(4)
            .required('Numero invalido'),
          aluguel: yup
            .number()
            .min(2)
            .max(5)
            .required('Valor invalido'),
          contas: yup
            .number()
            .min(2)
            .max(5)
            .required('Valor invalido'),
          moradores: yup
            .number()
            .min(1)
            .max(10)
            .required('Quantidade invalida'),
          vagas: yup
            .number()
            .min(1)
            .max(10)
            .required('Quantidade invalida'),
          genero: yup
            .string()
            .max(50)
            .required('Genero invalido'),
          animais: yup.boolean().required('Invalido'),
          aQuarto: yup
            .string()
            .min(3)
            .max(40)
            .required(),
          aRepublica: yup
            .string()
            .min(3)
            .max(40)
            .required(),
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
            <ViewPager style={{ flex: 1 }}>
              <View key="1">
                <View style={estilo.V_header}>
                  <Icon name="ios-arrow-back" style={estilo.iconHeader} />
                  <Text style={estilo.title}>Informações Basicas</Text>
                </View>

                <View style={estilo.V_Conteudo}>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      color: '#687368',
                      marginBottom: 25,
                    }}
                  >
                    Nos passe algumas informaçoes basica para fazer o registro
                    de sua republica{' '}
                  </Text>

                  <View>
                    <Text style={estilo.txtLabel}>Nome da Republica</Text>
                    <Item>
                      <Input
                        value={values.nome}
                        onChangeText={handleChange('nome')}
                        placeholder={this.props.titulo}
                        onBlur={() => setFieldTouched('nome')}
                      />
                    </Item>
                  </View>
                  <View style={{ height: 15 }}>
                    {touched.nome && errors.nome && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.nome}
                      </Text>
                    )}
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
                  <View style={{ height: 15 }}>
                    {touched.bairro && errors.bairro && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.bairro}
                      </Text>
                    )}
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
                      <View style={{ height: 15 }}>
                        {touched.rua && errors.rua && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.rua}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View floatingLabel style={{ width: '20%' }}>
                      <Label style={estilo.txtLabel}>N°</Label>
                      <Item>
                        <Input
                          value={values.numero}
                          onChangeText={handleChange('numero')}
                          placeholder=""
                          onBlur={() => setFieldTouched('numero')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.numero && errors.numero && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.numero}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '50%',
                    }}
                  >
                    <Button style={estilo.btnProximo} onPress={handleSubmit}>
                      <Text>Prosseguir</Text>
                    </Button>
                  </View>
                </View>
              </View>

              <View key="2">
                <View style={estilo.V_header}>
                  <Icon name="ios-arrow-back" style={estilo.iconHeader} />
                  <Text style={estilo.title}>Detalhes da República</Text>
                </View>
                <ScrollView>
                  <View style={estilo.V_Conteudo}>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 14,
                        color: '#687368',
                        marginBottom: 10,
                      }}
                    >
                      Agora nos passe algumas caracteristicas basica de sua
                      republica.{' '}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}
                    >
                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Aluguel</Text>
                        <Item>
                          <Label fixedLabel>R$</Label>
                          <Input
                            value={values.aluguel}
                            onChangeText={handleChange('aluguel')}
                            placeholder=""
                            onBlur={() => setFieldTouched('aluguel')}
                          />
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.aluguel && errors.aluguel && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.aluguel}
                            </Text>
                          )}
                        </View>
                      </View>

                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Média de contas</Text>
                        <Item>
                          <Label fixedLabel>R$</Label>
                          <Input
                            value={values.contas}
                            onChangeText={handleChange('contas')}
                            placeholder=""
                            onBlur={() => setFieldTouched('contas')}
                          />
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.contas && errors.contas && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.contas}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}
                    >
                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Moradores</Text>
                        <Item>
                          <Input
                            value={values.moradores}
                            onChangeText={handleChange('moradores')}
                            placeholder=""
                            onBlur={() => setFieldTouched('moradores')}
                          />
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.moradores && errors.moradores && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.moradores}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Vagas Disponivel</Text>
                        <Item>
                          <Input
                            value={values.vagas}
                            onChangeText={handleChange('vagas')}
                            placeholder=""
                            onBlur={() => setFieldTouched('vagas')}
                          />
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.vagas && errors.vagas && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.vagas}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}
                    >
                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Genero</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder=""
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected3}
                            onValueChange={this.onValueChange3.bind(this)}
                            value={values.genero}
                            onChangeText={handleChange('genero')}
                            placeholder=""
                            onBlur={() => setFieldTouched('genero')}
                          >
                            <Picker.Item label="Feminina" value="feminina" />
                            <Picker.Item label="Masculina" value="masculina" />
                            <Picker.Item label="Mista" value="mista" />
                          </Picker>
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.genero && errors.genero && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.genero}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ width: '43%' }}>
                        <Text style={estilo.txtLabel}>Aceita Animais ?</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Sim ou Nao"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                            value={values.animais}
                            onChangeText={handleChange('animais')}
                            placeholder=""
                            onBlur={() => setFieldTouched('animais')}
                          >
                            <Picker.Item label="Sim" value="sim" />
                            <Picker.Item label="Não" value="nao" />
                          </Picker>
                        </Item>
                        <View style={{ height: 15 }}>
                          {touched.animais && errors.animais && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.animais}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>
                        Acomodaçoes do Quarto
                      </Label>
                      <Item>
                        <Input
                          style={estilo.place}
                          value={values.aQuarto}
                          onChangeText={handleChange('aQuarto')}
                          placeholder=""
                          onBlur={() => setFieldTouched('aQuarto')}
                          placeholder="EX: Ar Condicionado, Janela, Criado Mudo"
                        />
                      </Item>
                    </View>
                    <View style={{ height: 15 }}>
                      {touched.aQuarto && errors.aQuarto && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.aQuarto}
                        </Text>
                      )}
                    </View>
                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>
                        Acomodaçoes da Republica
                      </Label>
                      <Item>
                        <Input
                          style={estilo.place}
                          value={values.aRepublica}
                          onChangeText={handleChange('aRepublica')}
                          placeholder=""
                          onBlur={() => setFieldTouched('aRepublica')}
                          placeholder="EX: Wifi, Maquina de Lavar, Fogao"
                        />
                      </Item>
                    </View>
                    <View style={{ height: 15 }}>
                      {touched.aRepublica && errors.aRepublica && (
                        <Text style={{ fontSize: 10, color: 'red' }}>
                          {errors.aRepublica}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '8%',
                      }}
                    >
                      <Button
                        style={estilo.btnProximo}
                        onPress={() => {
                          this.entrar();
                          //this.props.navigation.navigate('Confirmacao');
                        }}
                      >
                        <Text>Publicar</Text>
                        <Icon
                          name="ios-checkmark-circle"
                          style={estilo.iconeBtn}
                        />
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </ViewPager>
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
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    titulo: state.auth.nomeRepublica,
    valorAluguel: state.auth.valorAluguel,
    genero: state.auth.genero,
    numVagas: state.auth.numVagas,
    bairro: state.auth.bairro,
    rua: state.auth.rua,
    pessoas: state.auth.pessoas,
    numeroCasa: state.auth.numeroCasa,
    descricao: state.auth.descricao,
    animal: state.auth.animal,
    acomodacaoQuarto: state.auth.acomodacaoQuarto,
    acomodacaoRepublica: state.auth.acomodacaoRepublica,
    valorContas: state.auth.valorContas,
    observacao: state.auth.observacao,
    imagem1: state.auth.imagem1,
    imagem2: state.auth.imagem2,
    imagem3: state.auth.imagem3,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};
// passa a aonde criamos os state o conjuento de actions que vai ser utilizada e a pagina a ser renderizada
const CadastroConnect = connect(
  mapStateToProps,
  {
    editValor,
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
