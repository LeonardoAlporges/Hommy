import React, { Component, Fragment } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ViewPager from '@react-native-community/viewpager';
import api from '../../service/api';
import estilo from './style';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../components/Alert';
import { connect } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import {
  Text,
  Item,
  Input,
  Label,
  Button,
  Icon,
  DatePicker,
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
  //editNome,
  //editNota,
  editSaida,
  editVagas,
  editValor,
} from '../../actions/CaronaActions';

class CadastroCarona extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      newData: '',
      load: false,
      erro: false,
      sucesso: false,
      modalLoadVisible: false,
      update: this.props.navigation.state.params.update,
    };
    this.verificarParametro(this.props.navigation.state.params.update);
  }

  async verificarParametro(parametro) {
    await this.setState({ update: parametro });
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
      this.props.editSaida(''),
      this.props.editVagas(''),
      this.props.editValor('');
  }
  subirDate(date) {
    this.setState({ newData: new Date(date) });
    console.log('data', this.state.newData);
  }

  async entrar(values) {
    this.setState({ modalLoadVisible: true });
    console.log('valores', values);
    console.log();
    this.data = {
      localSaida: values.saida,
      localChegada: values.chegada,
      data: this.state.newData,
      valor: values.valor,
      horaSaida: values.Hsaida,
      horaChegada: values.HChegada,
      embarque: values.embarque,
      desembarque: values.desembarque,
      vagas: values.vagas,
      nome: this.props.nome,
      imagem: this.props.imagem,
      userEmail: this.props.email,
      nota: this.props.nota,
    };
    console.log('Envinado:', this.data);
    console.log('update', this.state.update);

    if (this.state.update == true) {
      console.log('Faznedo Update:', this.data);
      await api
        .put(`/carona/${'leo@hotmail.com'}`, this.data)
        .then(Response => {
          this.setState({ modalLoadVisible: false });
          this.setState({ sucesso: true });
          //this.props.navigation.navigate('TabsHeader');
        })
        .catch(e => {
          this.setState({ erro: true });
          this.setState({ modalLoadVisible: false });
          console.log(e);
        });
    } else if (this.state.update == false) {
      console.log('Criando Anuncio:', this.data);
      await api
        .post('/carona', this.data)
        .then(Response => {
          this.setState({ modalLoadVisible: false });
          this.setState({ load: false });
          this.setState({ sucesso: true });
          //this.props.navigation.navigate('TabsHeader');
        })
        .catch(e => {
          this.setState({ modalLoadVisible: false });
          this.setState({ load: false });
          this.setState({ erro: true });
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
          console.log('chamou?');
          this.entrar(values);
        }}
        validationSchema={yup.object().shape({
          saida: yup.string().required('Insira local de saida '),
          chegada: yup.string().required('Insira para onde vai'),
          valor: yup
            .string('Somente numeros!')
            .min(5, 'Valor minimo R$ 5,00')
            .max(200, 'Valor maximo de R$ 200,00')
            .required('Valor Invalido'),
          Hsaida: yup.string('Hora invalido').required('Hora invalida'),
          HChegada: yup.string('Hora invalido').required('Hora invalida'),
          embarque: yup
            .string('Somente texto')
            .max(70, 'Somente 70 caracteres sao permitidos')
            .required('Informe aonde sera o ponto de embarque'),
          desembarque: yup
            .string()
            .max(50)
            .required('Informe aonde sera o ponto de desembarque'),
          vagas: yup
            .number('Somente numeros')
            .min(1, 'Minimo é de 1 vaga')
            .max(10, ' Maximo é de 10 vaga')
            .required('Insira a quantidade de vagas disponivel'),
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
            {this.state.erro ? <CustomModal parametro="Erro" /> : <View />}
            {this.state.sucesso ? (
              <CustomModal parametro="Sucesso" />
            ) : (
              <View />
            )}
            <ViewPager style={{ flex: 1 }}>
              <ScrollView>
                <View key="1">
                  <View style={estilo.V_header}>
                    <TouchableOpacity
                      style={{ marginLeft: '5%' }}
                      onPress={() => {
                        this.props.navigation.goBack(null);
                      }}
                    >
                      <Icon name="ios-arrow-back" style={estilo.iconHeader} />
                    </TouchableOpacity>
                    <Text style={estilo.title}>Cadastro de Carona</Text>
                  </View>

                  <View style={estilo.V_Conteudo}>
                    <Text style={estilo.txtCarona}>
                      Nos passe algumas informaçoes basica para fazer o registro
                      de sua Carona
                    </Text>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
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
                        <View style={estilo.V_erro}>
                          {touched.saida && errors.saida && (
                            <Text style={estilo.textError}>{errors.saida}</Text>
                          )}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
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
                        <View style={estilo.V_erro}>
                          {touched.chegada && errors.chegada && (
                            <Text style={estilo.textError}>
                              {errors.chegada}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Data</Text>
                        <Item>
                          <Label fixedLabel />
                          <DatePicker
                            defaultDate={new Date(2020, 4, 24)}
                            minimumDate={new Date(2020, 4, 24)}
                            maximumDate={new Date(2021, 1, 1)}
                            locale={'pt-br'}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            animationType={'slide'}
                            androidMode={'calendar'}
                            placeHolderText="Selecione a data"
                            textStyle={{
                              textAlign: 'right',
                              paddingTop: 25,
                              height: 50,
                              fontSize: 11,
                              color: '#006fa9',
                            }}
                            placeHolderTextStyle={{
                              textAlign: 'right',
                              paddingTop: 25,
                              height: 50,
                              fontSize: 11,
                              color: '#989898',
                            }}
                            onDateChange={date => {
                              this.setState({ newData: new Date(date) });
                            }}
                            disabled={false}
                            //onBlur={() => setFieldTouched('data')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {touched.data && errors.data && (
                            <Text style={estilo.textError}>{errors.data}</Text>
                          )}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Valor</Text>
                        <Item>
                          <Label fixedLabel />
                          <TextInputMask
                            keyboardType="number-pad"
                            mask={'R$ [0000],00'}
                            value={values.valor}
                            onChangeText={handleChange('valor')}
                            placeholder=""
                            onBlur={() => setFieldTouched('valor')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {touched.valor && errors.valor && (
                            <Text style={estilo.textError}>{errors.valor}</Text>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Horario de saida</Text>
                        <Item>
                          <Label fixedLabel />
                          <TextInputMask
                            keyboardType="number-pad"
                            mask={'[00]:[00]'}
                            value={values.Hsaida}
                            onChangeText={handleChange('Hsaida')}
                            placeholder=""
                            onBlur={() => setFieldTouched('Hsaida')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {touched.Hsaida && errors.Hsaida && (
                            <Text style={estilo.textError}>
                              {errors.Hsaida}
                            </Text>
                          )}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Horario de chegada</Text>
                        <Item>
                          <Label fixedLabel />
                          <TextInputMask
                            keyboardType="number-pad"
                            mask={'[00]:[00]'}
                            value={values.HChegada}
                            onChangeText={handleChange('HChegada')}
                            placeholder=""
                            onBlur={() => setFieldTouched('HChegada')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {touched.HChegada && errors.HChegada && (
                            <Text style={estilo.textError}>
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
                    <View style={estilo.V_erro}>
                      {touched.embarque && errors.embarque && (
                        <Text style={estilo.textError}>{errors.embarque}</Text>
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
                    <View style={estilo.V_erro}>
                      {touched.desembarque && errors.desembarque && (
                        <Text style={estilo.textError}>
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
                    <View style={estilo.V_erro}>
                      {touched.vagas && errors.vagas && (
                        <Text style={estilo.textError}>{errors.vagas}</Text>
                      )}
                    </View>

                    <View style={estilo.V_btn}>
                      <Button
                        style={estilo.btnProximo}
                        onPress={() => {
                          handleSubmit(values);
                        }}
                      >
                        {this.state.load ? (
                          <Spinner color="#27496d" />
                        ) : (
                          <View />
                        )}
                        <Text>Prosseguir</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </ViewPager>
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalLoadVisible}
              >
                <View style={estilo.ViewFundo}>
                  <View style={estilo.ViewModal}>
                    <Spinner color="red" />
                  </View>
                </View>
              </Modal>
            </View>
          </Fragment>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => {
  return {
    //para pegar do reducer e State."NOME DO REDUCER"."NOME DA PROPIEDADE"

    saida: state.carona.saida,
    chegada: state.carona.chegada,
    data: state.carona.data,
    valor: state.carona.valor,
    Hsaida: state.carona.Hsaida,
    HChegada: state.carona.HChegada,
    embarque: state.carona.embarque,
    desembarque: state.carona.desembarque,
    vagas: state.carona.vagas,
    imagem: state.user.fotoPerfil,
    nome: state.user.usuario,
    email: state.user.email,
    nota: state.user.notaUser,

    //nota: state.carona.nota,

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
    //editNome,
    //editNota,
    editSaida,
    editVagas,
    editValor,
  }
)(CadastroCarona);

export default withNavigation(CaronaConnect);
