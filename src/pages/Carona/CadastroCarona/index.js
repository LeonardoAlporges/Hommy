import React, { Component, Fragment } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ViewPager from '@react-native-community/viewpager';
import api from '../../../service/api';
import estilo from './style';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../../components/Alert';
import { connect } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, Item, Input, Label, Button, Icon, DatePicker, Spinner, Picker } from 'native-base';
import {
  editChegada,
  editData,
  editDesembarque,
  editEmbarque,
  editHChegada,
  editHSaida,
  editImagem,
  editSaida,
  editVagas,
  editValor,
  editIdCarona,
} from '../../../actions/CaronaActions';

import { NavigationActions, StackActions } from 'react-navigation';
class CadastroCarona extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      newData: '',
      erro: false,
      sucesso: false,
      modalLoadVisible: false,
      update: this.props.navigation.state.params.update,
      isDatePickerVisibleSaida: false,
      isDatePickerVisible: false,
      sendTimeChegada: '00:00',
      timeChegada: '00:00',
      sendTimeSaida: '00:00',
      timeSaida: '00:00',
      botaoEnviar: false,
      dataLabel: 'Selecione a data',
    };
  }

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

  subirDate(date) {
    this.setState({ newData: new Date(date) });
  }

  async entrar(values) {
    this.setState({ modalLoadVisible: true });

    const nick = this.props.nome.split(' ');
    this.data = {
      localSaida: values.saida,
      localChegada: values.chegada,
      data: this.state.newData,
      valor: values.valor,
      horaSaida: this.state.sendTimeSaida,
      horaChegada: this.state.sendTimeChegada,
      embarque: values.embarque,
      desembarque: values.desembarque,
      vagas: values.vagas,
      nome: nick[0],
      imagem: this.props.imagem,
      userEmail: this.props.email,
      nota: this.props.nota,
    };
    console.log('?', this.data);

    try {
      if (this.state.update == true) {
        await api
          .put(`/carona/${this.props.idCarona}`, this.data)
          .then(Response => {
            this.setState({ modalLoadVisible: false });
            this.setState({ sucesso: true });
          })
          .catch(error => {
            this.setState({ erro: true });
            this.setState({ modalLoadVisible: false });
            console.log(this.props.idCarona);
            console.log(error);
          });
      } else if (this.state.update == false) {
        await api
          .post('/carona', this.data)
          .then(Response => {
            console.log('Response');
            this.setState({ modalLoadVisible: false });
            this.setState({ sucesso: true });
          })
          .catch(error => {
            this.setState({ modalLoadVisible: false });
            this.setState({ erro: true });
            console.log(error);
          });
      }
      this.setState({ modalLoadVisible: false });
    } catch (error) {}
  }
  navegar() {
    this.props.navigation.goBack(null);
  }

  Confirmar = (date, tipo) => {
    if (tipo == 'Saida') {
      const saida = moment(new Date(date)).format('HH:mm');
      this.setState({
        sendTimeSaida: date,
        timeSaida: saida,
        isDatePickerVisibleSaida: false,
      });
    } else {
      const chegada = moment(new Date(date)).format('HH:mm');
      this.setState({
        sendTimeChegada: date,
        timeChegada: chegada,
        isDatePickerVisible: false,
      });
    }
  };
  FecharPicker = (date, tipo) => {
    if (tipo == 'Saida') {
      this.setState({
        isDatePickerVisibleSaida: false,
      });
    } else {
      this.setState({
        isDatePickerVisible: false,
      });
    }
  };

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
          vagas: this.props.vagas.toString(10),
        }}
        onSubmit={values => {
          console.log('?');

          this.entrar(values);
          this.setState({ botaoEnviar: true });
          console.log('???', this.state.botaoEnviar);
        }}
        validationSchema={yup.object().shape({
          saida: yup.string().required('Campo obrigatório'),
          chegada: yup.string().required('Campo obrigatório'),
          valor: yup
            .number('Somente numeros!')
            .min(5, 'Valor minimo R$ 5,00')
            .max(200, 'Valor maximo de R$ 200,00')
            .required('Campo obrigatório'),
          //Hsaida: yup.string('Hora invalido').required('Campo obrigatóyyyrio'),
          //HChegada: yup.string().required('Campo obrigatório'),
          //data: yup.string().required('Campo obrigatório'),
          embarque: yup
            .string('Somente texto')
            .max(40, 'Somente 40 caracteres são permitidos')
            .required('Campo obrigatório'),
          desembarque: yup
            .string()
            .max(40, 'Somente 40 caracteres são permitidos')
            .required('Campo obrigatório'),
          vagas: yup
            .number('Somente numeros')
            .min(1, 'Minimo é de 1 vaga')
            .max(10, ' Maximo é de 10 vaga')
            .required('Campo obrigatório'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
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
                descricao="Seu anúncio já estar no ar, fique atento com os interesses"
                botao="Confirmar"
                callback={() => {
                  this.goToHome();
                }}
              />
            )}
            <ViewPager style={{ flex: 1 }}>
              <ScrollView>
                <View key="1">
                  <HeaderBack title="Cadastre sua viagem" onNavigation={() => this.navegar()} />

                  <View style={estilo.V_Conteudo}>
                    <Text style={estilo.txtCarona}>
                      Preencha os campos abaixo com as informações necessárias para registrar sua carona.
                    </Text>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Local de Saída</Text>

                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Cidades"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.saida}
                            onValueChange={handleChange('saida')}
                            value={values.saida}
                            onChangeText={handleChange('saida')}
                            placeholder=""
                            onBlur={() => setFieldTouched('saida')}
                          >
                            <Picker.Item label="" value="null" />
                            <Picker.Item label="Alegre" value="Alegre" />
                            <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                            <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                            <Picker.Item label="Celina" value="Celina" />
                            <Picker.Item label="Guacui" value="Guacui" />
                            <Picker.Item label="Guarapari" value="Guarapari" />
                            <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                            <Picker.Item label="Piuma" value="Piuma" />
                            <Picker.Item label="Rive" value="Rive" />
                            <Picker.Item label="Serra" value="Serra" />
                            <Picker.Item label="Vila Velha" value="Vila Velha" />
                            <Picker.Item label="Vitoria" value="Vitoria" />
                          </Picker>
                        </Item>

                        <View style={estilo.V_erro}>
                          {touched.saida && errors.saida && <Text style={estilo.textError}>{errors.saida}</Text>}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Local de Chegada</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Cidades"
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            selectedValue={values.chegada}
                            onValueChange={handleChange('chegada')}
                            value={values.chegada}
                            onChangeText={handleChange('chegada')}
                            onBlur={() => setFieldTouched('chegada')}
                          >
                            <Picker.Item label="" value="null" />
                            <Picker.Item label="Alegre" value="Alegre" />
                            <Picker.Item label="Bom Jesus do Norte" value="Bom Jesus do Norte" />
                            <Picker.Item label="Cachoeiro" value="Cachoeiro" />
                            <Picker.Item label="Celina" value="Celina" />
                            <Picker.Item label="Guacui" value="Guacui" />
                            <Picker.Item label="Guarapari" value="Guarapari" />
                            <Picker.Item label="Muniz Freire" value="Muniz Freire" />
                            <Picker.Item label="Piuma" value="Piuma" />
                            <Picker.Item label="Rive" value="Rive" />
                            <Picker.Item label="Serra" value="Serra" />
                            <Picker.Item label="Vila Velha" value="Vila Velha" />
                            <Picker.Item label="Vitoria" value="Vitoria" />
                          </Picker>
                        </Item>

                        <View style={estilo.V_erro}>
                          {touched.chegada && errors.chegada && <Text style={estilo.textError}>{errors.chegada}</Text>}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Data</Text>
                        <Item>
                          <Label fixedLabel />
                          <DatePicker
                            minimumDate={new Date()}
                            locale={'pt-br'}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            animationType={'slide'}
                            androidMode={'calendar'}
                            placeHolderText={this.state.dataLabel}
                            textStyle={{
                              textAlign: 'left',
                              paddingTop: 25,
                              height: 50,
                              fontSize: 11,
                              color: '#006fa9',
                            }}
                            placeHolderTextStyle={{
                              textAlign: 'right',
                              paddingTop: 28,

                              height: 50,
                              fontSize: 11,
                              color: '#2e2e2e',
                            }}
                            onDateChange={date => {
                              this.setState({ newData: new Date(date) });
                            }}
                            disabled={false}
                            selectedValue={values.data}
                            onValueChange={handleChange('data')}
                            value={values.data}
                            onChangeText={handleChange('data')}
                            onBlur={() => setFieldTouched('data')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {this.state.newData == '' && this.state.botaoEnviar && (
                            <Text style={estilo.textError}>Campo obrigatório</Text>
                          )}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Valor</Text>
                        <Item>
                          <Label fixedLabel>R$</Label>
                          <TextInputMask
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            keyboardType="number-pad"
                            mask={'[0000]'}
                            value={values.valor}
                            onChangeText={handleChange('valor')}
                            placeholder=""
                            onBlur={() => setFieldTouched('valor')}
                          />
                        </Item>
                        <View style={estilo.V_erro}>
                          {touched.valor && errors.valor && <Text style={estilo.textError}>{errors.valor}</Text>}
                        </View>
                      </View>
                    </View>

                    <View style={estilo.rowStyle}>
                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Horário de saida</Text>
                        <Item>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                isDatePickerVisibleSaida: true,
                              });
                            }}
                            style={estilo.InputHora}
                          >
                            <Label>{this.state.timeSaida}</Label>
                            <DateTimePickerModal
                              isVisible={this.state.isDatePickerVisibleSaida}
                              mode="time"
                              onConfirm={date => this.Confirmar(date, 'Saida')}
                              onCancel={date => this.FecharPicker(date, 'Saida')}
                              date={new Date()}
                              locale={'pt-br'}
                              is24Hour={true}
                              onDateChange={handleChange('HSaida')}
                              on
                            />
                          </TouchableOpacity>
                        </Item>

                        <View style={estilo.V_erro}>
                          {this.state.timeSaida == '00:00' && this.state.botaoEnviar && (
                            <Text style={estilo.textError}>Campo obrigatório</Text>
                          )}
                        </View>
                      </View>

                      <View style={estilo.campoStyle}>
                        <Text style={estilo.txtLabel}>Horario de chegada</Text>
                        <Item>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                isDatePickerVisible: true,
                              });
                            }}
                            style={estilo.InputHora}
                          >
                            <Label>{this.state.timeChegada}</Label>
                            <DateTimePickerModal
                              isVisible={this.state.isDatePickerVisible}
                              onConfirm={date => this.Confirmar(date, 'Chegada')}
                              onCancel={date => this.FecharPicker(date, 'Chegada')}
                              mode="time"
                              date={new Date()}
                              locale={'pt-br'}
                              is24Hour={true}
                              onChange={handleChange('Chegada')}
                            />
                          </TouchableOpacity>
                        </Item>

                        <View style={estilo.V_erro}>
                          {this.state.timeChegada == '00:00' && this.state.botaoEnviar && (
                            <Text style={estilo.textError}>Campo obrigatório</Text>
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
                      {touched.embarque && errors.embarque && <Text style={estilo.textError}>{errors.embarque}</Text>}
                    </View>

                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>Ponto final de Desembarque</Label>
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
                        <Text style={estilo.textError}>{errors.desembarque}</Text>
                      )}
                    </View>

                    <View style={estilo.campos} inlineLabel>
                      <Label style={estilo.txtLabel}>Vagas no carro</Label>
                      <Item>
                        <Input
                          keyboardType="number-pad"
                          value={values.vagas}
                          onChangeText={handleChange('vagas')}
                          placeholder=""
                          onBlur={() => setFieldTouched('vagas')}
                        />
                      </Item>
                    </View>
                    <View style={estilo.V_erro}>
                      {touched.vagas && errors.vagas && <Text style={estilo.textError}>{errors.vagas}</Text>}
                    </View>

                    <View style={estilo.V_btn}>
                      <Button
                        style={estilo.btnProximo}
                        onPress={() => {
                          this.setState({ botaoEnviar: true });
                          console.log(values);
                          handleSubmit(values);
                        }}
                      >
                        <Text>Publicar carona</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </ViewPager>
            <View>
              <Modal animationType="fade" transparent={true} visible={this.state.modalLoadVisible}>
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
    idCarona: state.carona.idCarona,
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
    editSaida,
    editVagas,
    editValor,
    editIdCarona,
  }
)(CadastroCarona);

export default withNavigation(CaronaConnect);
