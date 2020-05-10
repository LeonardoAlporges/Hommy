import React, { Component, Fragment } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ViewPager from '@react-native-community/viewpager';
import api from '../../service/api';
import estilo from './style';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  Text,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Picker,
  CheckBox,
  DatePicker,
  ListItem,
  Body,
  Spinner,
} from 'native-base';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editNome,
  editNota,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';

class CadastroCarona extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      update: this.props.navigation.state.params.update,
    };
    this.verificarParametro(this.props.navigation.state.params.update);
  }

  async verificarParametro(parametro) {
    await this.setState({ update: parametro });
    console.log('VErificar parametro', this.state.update);
    console.log('valor Parametro ', parametro);
    if (parametro.update == false) {
      this.atualizarPropsRedux();
    }
  }

  atualizarPropsRedux(dados) {
    this.props.editChegada(''),
      this.props.editData(''),
      this.props.editDesembarque(''),
      this.props.editEmbarque(''),
      this.props.editHChegada(''),
      this.props.editHSaida(''),
      this.props.editImagem(''),
      this.props.editNome(''),
      this.props.editNota(''),
      this.props.editSaida(''),
      this.props.editVagas(''),
      this.props.editValor('');
  }

  async entrar(values) {
    console.log('valores', values);
    this.data = {
      saida: values.saida,
      chegada: values.chegada,
      data: values.data,
      valor: values.valor,
      Hsaida: values.Hsaida,
      HChegada: values.HChegada,
      embarque: values.embarque,
      desembarque: values.desembarque,
      vagas: values.vagas,
    };
    console.log('Envinado:', this.data);
    console.log('update', this.state.update);

    if (this.state.update == true) {
      console.log('Faznedo Update:', this.data);
      await api
        .put(`/carona/${'leo@hotmail.com'}`, this.data)
        .then(Response => {
          console.log('sucesso', this.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else if (this.state.update == false) {
      console.log('Criando Anuncio:', this.data);
      await api
        .post('/carona', this.data)
        .then(Response => {
          console.log('sucesso', this.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          saida: this.props.saida,
          chegada: this.props.chegada,
          data: this.props.data,
          valor: this.props.valor,
          Hsaida: this.props.Hsaida,
          HChegada: this.props.HChegada,
          embarque: this.props.embarque,
          desembarque: this.props.desembarque,
          vagas: this.props.vagas,
        }}
        onSubmit={values => {
          this.entrar(values);
        }}
        validationSchema={yup.object().shape({
          saida: yup.string().required('Insira local de saida '),
          chegada: yup.string().required('Insira para onde vai'),
          valor: yup
            .number()
            .min(5)
            .max(200)
            .required('Valor invalido'),
          Hsaida: yup.string().required('Quantidade invalida'),
          HChegada: yup.string().required('Quantidade invalida'),
          embarque: yup
            .string()
            .max(50)
            .required('Insira aonde voce vai pegar os passageiros'),
          desembarque: yup
            .string()
            .max(50)
            .required('Insira aonde voce vai deixar os passageiros'),
          vagas: yup
            .number()
            .min(1)
            .max(10)
            .required('insira as vagas'),
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
                  <Text style={estilo.title}>Informações Caronas</Text>
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
                    de sua Carona
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}
                  >
                    <View style={{ width: '43%' }}>
                      <Text style={estilo.txtLabel}>Saida</Text>
                      <Item>
                        <Label fixedLabel />
                        <Input
                          value={values.saida}
                          onChangeText={handleChange('saida')}
                          placeholder=""
                          onBlur={() => setFieldTouched('saida')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.saida && errors.saida && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.saida}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ width: '43%' }}>
                      <Text style={estilo.txtLabel}>Chegada</Text>
                      <Item>
                        <Label fixedLabel />
                        <Input
                          value={values.chegada}
                          onChangeText={handleChange('chegada')}
                          placeholder=""
                          onBlur={() => setFieldTouched('chegada')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.chegada && errors.chegada && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.chegada}
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
                      <Text style={estilo.txtLabel}>Data</Text>
                      <Item>
                        <Label fixedLabel />
                        <DatePicker
                          defaultDate={new Date(2018, 4, 4)}
                          minimumDate={new Date(2018, 1, 1)}
                          maximumDate={new Date(2018, 12, 31)}
                          locale={'en'}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={false}
                          animationType={'fade'}
                          androidMode={'default'}
                          placeHolderText="Select date"
                          textStyle={{ color: 'green' }}
                          placeHolderTextStyle={{ color: '#d3d3d3' }}
                          onDateChange={handleChange('data')}
                          disabled={false}
                          onBlur={() => setFieldTouched('data')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.data && errors.data && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.data}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ width: '43%' }}>
                      <Text style={estilo.txtLabel}>Valor</Text>
                      <Item>
                        <Label fixedLabel />
                        <Input
                          value={values.valor}
                          onChangeText={handleChange('valor')}
                          placeholder=""
                          onBlur={() => setFieldTouched('valor')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.valor && errors.valor && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.valor}
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
                      <Text style={estilo.txtLabel}>Horario de saida</Text>
                      <Item>
                        <Label fixedLabel />
                        <Input
                          value={values.Hsaida}
                          onChangeText={handleChange('Hsaida')}
                          placeholder=""
                          onBlur={() => setFieldTouched('Hsaida')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.Hsaida && errors.Hsaida && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.Hsaida}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View style={{ width: '43%' }}>
                      <Text style={estilo.txtLabel}>Horario de chegada</Text>
                      <Item>
                        <Label fixedLabel />
                        <Input
                          value={values.HChegada}
                          onChangeText={handleChange('HChegada')}
                          placeholder=""
                          onBlur={() => setFieldTouched('HChegada')}
                        />
                      </Item>
                      <View style={{ height: 15 }}>
                        {touched.HChegada && errors.HChegada && (
                          <Text style={{ fontSize: 10, color: 'red' }}>
                            {errors.HChegada}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={estilo.txtLabel}>Ponto de Embarque</Text>
                    <Item>
                      <Input
                        value={values.embarque}
                        onChangeText={handleChange('embarque')}
                        placeholder={this.props.titulo}
                        onBlur={() => setFieldTouched('embarque')}
                      />
                    </Item>
                  </View>
                  <View style={{ height: 15 }}>
                    {touched.embarque && errors.embarque && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.embarque}
                      </Text>
                    )}
                  </View>

                  <View style={estilo.campos} inlineLabel>
                    <Label style={estilo.txtLabel}>
                      Ponto final de Desembarque
                    </Label>
                    <Item>
                      <Input
                        value={values.desembarque}
                        onChangeText={handleChange('desembarque')}
                        placeholder=""
                        onBlur={() => setFieldTouched('desembarque')}
                      />
                    </Item>
                  </View>
                  <View style={{ height: 15 }}>
                    {touched.desembarque && errors.desembarque && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.desembarque}
                      </Text>
                    )}
                  </View>

                  <View style={estilo.campos} inlineLabel>
                    <Label style={estilo.txtLabel}>Vagas no carro</Label>
                    <Item>
                      <Input
                        value={values.vagas}
                        onChangeText={handleChange('vagas')}
                        placeholder=""
                        onBlur={() => setFieldTouched('vagas')}
                      />
                    </Item>
                  </View>
                  <View style={{ height: 15 }}>
                    {touched.vagas && errors.vagas && (
                      <Text style={{ fontSize: 10, color: 'red' }}>
                        {errors.vagas}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '10%',
                    }}
                  >
                    <Button style={estilo.btnProximo} onPress={handleSubmit}>
                      <Text>Prosseguir</Text>
                    </Button>
                  </View>
                </View>
              </View>
            </ViewPager>
          </Fragment>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"
    nome: state.carona.nome,
    nota: state.carona.nota,
    saida: state.carona.saida,
    chegada: state.carona.chegada,
    data: state.carona.data,
    valor: state.carona.valor,
    Hsaida: state.carona.Hsaida,
    HChegada: state.carona.HChegada,
    embarque: state.carona.embarque,
    desembarque: state.carona.desembarque,
    vagas: state.carona.vagas,
    imagem: state.carona.imagem,
    // Ou seja agora e como se tivessemos duas props dentro do compoennte cadastro
  };
};

const CaronaConnect = connect(
  mapStateToProps,
  {
    editChegada,
    editData,
    editDesembarque,
    editEmbarque,
    editHChegada,
    editHSaida,
    editImagem,
    editNome,
    editNota,
    editSaida,
    editVagas,
    editValor,
  }
)(CadastroCarona);

export default withNavigation(CaronaConnect);