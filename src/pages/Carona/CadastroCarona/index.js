import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ViewPager from '@react-native-community/viewpager';
import api from '../../../service/api';
import estilo from './style';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../../components/Alert';
import { connect, useSelector } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, Item, Input, Label, Button, Icon, DatePicker, Spinner, Picker } from 'native-base';

import { NavigationActions, StackActions } from 'react-navigation';
import { set } from 'lodash';
export default function CadastroCarona({ navigation }) {
  useEffect(() => {
    console.log(navigation);
  }, []);
  const avatarUser = useSelector(state => state.user.fotoPerfil);
  const emailUser = useSelector(state => state.user.email);
  const notaUser = useSelector(state => state.user.notaUser);
  const nomeUser = useSelector(state => state.user.usuario);

  const [dataViagem, setDataViagem] = useState();
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [atualizacao, setAtualizacao] = useState(navigation.state.params.update);
  const [dadosCarona, setdadosCarona] = useState(navigation.state.params.carona);

  const [datePicker, setDatePicker] = useState(false);
  const [horarioSaidaPicker, setHorarioSaidaPicker] = useState(false);
  const [horarioChegadaPicker, setHorarioChegadaPicker] = useState(false);
  const [horaChegada, setHoraChegada] = useState('00:00');
  const [horaSaida, setHoraSaida] = useState('00:00');
  const [placeHoraSaida, setPlaceHoraSaida] = useState('00:00');
  const [placeHoraChegada, setPlaceHoraChegada] = useState('00:00');
  const [botaoEnviar, setBotaoEnviar] = useState(false);
  const [dataLabel, setDataLabel] = useState('Selecione a data');

  useEffect(() => {
    if (atualizacao) {
      selecionarHorario(dadosCarona.horaSaida, 'Saida');
      selecionarHorario(dadosCarona.horaChegada, 'Chegada');
      console.log(dadosCarona);
    } else {
    }
  }, []);

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

  function alterarData(date) {
    setDataViagem(new Date(date));
  }

  function verificarTipoDeRequisicao(values) {
    setLoading(true);

    const nomeFragmentado = nomeUser.split(' ');
    const data = {
      localSaida: values.saida,
      localChegada: values.chegada,
      data: dataViagem,
      valor: values.valor,
      horaSaida: horaSaida,
      horaChegada: horaChegada,
      embarque: values.embarque,
      desembarque: values.desembarque,
      vagas: values.vagas,
      nome: nomeFragmentado[0],
      imagem: avatarUser,
      userEmail: emailUser,
      nota: notaUser
    };

    if (atualizacao) {
      atulizarAnuncioCarona(data);
    } else if (!atualizacao) {
      criarNovoAnuncioCarona(data);
    }

    setLoading(false);
  }

  function atulizarAnuncioCarona(dados) {
    api
      .put(`/carona/${caronaID}`, dados)
      .then(Response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function criarNovoAnuncioCarona(dados) {
    api
      .post('/carona', dados)
      .then(Response => {
        setLoading(false);
        setSucesso(true);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });
  }

  function selecionarHorario(date, tipo) {
    if (tipo == 'Saida') {
      const saida = moment(new Date(date)).format('HH:mm');
      setHoraSaida(date);
      setPlaceHoraSaida(saida);
      setHorarioSaidaPicker(false);
    } else {
      const chegada = moment(new Date(date)).format('HH:mm');
      setHoraChegada(date);
      setPlaceHoraChegada(chegada);
      setHorarioChegadaPicker(false);
    }
  }

  function fecharPickerHoario(date, tipo) {
    if (tipo == 'Saida') {
      setHorarioSaidaPicker(false);
    } else {
      setHorarioSaidaPicker(false);
    }
  }

  return (
    <Formik
      initialValues={{
        saida: dadosCarona ? dadosCarona.localSaida : '',
        chegada: dadosCarona ? dadosCarona.localChegada : '',
        data: dadosCarona ? dadosCarona.data : '',
        valor: dadosCarona ? dadosCarona.valor : '',
        Hsaida: dadosCarona ? dadosCarona.horaSaida : '',
        HChegada: dadosCarona ? dadosCarona.horaChegada : '',
        embarque: dadosCarona ? dadosCarona.embarque : '',
        desembarque: dadosCarona ? dadosCarona.desembarque : '',
        vagas: dadosCarona ? dadosCarona.vagas.toString() : ''
      }}
      onSubmit={values => {
        verificarTipoDeRequisicao(values);
        botaoEnviar(false);
      }}
      validationSchema={yup.object().shape({
        saida: yup.string().required('Campo obrigatório'),
        chegada: yup.string().required('Campo obrigatório'),
        valor: yup
          .number('Somente numeros!')
          .min(5, 'Valor minimo R$ 5,00')
          .max(200, 'Valor maximo de R$ 200,00')
          .required('Campo obrigatório'),
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
          .required('Campo obrigatório')
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
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
          <ViewPager style={{ flex: 1 }}>
            <ScrollView>
              <View key="1">
                <HeaderBack
                  title="Cadastre sua viagem"
                  onNavigation={() => navigation.goBack(null)}
                />

                <View style={estilo.V_Conteudo}>
                  <Text style={estilo.txtCarona}>
                    Preencha os campos abaixo com as informações necessárias para registrar sua
                    carona.
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
                        {touched.saida && errors.saida && (
                          <Text style={estilo.textError}>{errors.saida}</Text>
                        )}
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
                        {touched.chegada && errors.chegada && (
                          <Text style={estilo.textError}>{errors.chegada}</Text>
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
                          minimumDate={new Date()}
                          locale={'pt-br'}
                          timeZoneOffsetInMinutes={undefined}
                          modalTransparent={true}
                          animationType={'slide'}
                          androidMode={'calendar'}
                          placeHolderText={dataLabel}
                          textStyle={{
                            textAlign: 'left',
                            paddingTop: 25,
                            height: 50,
                            fontSize: 11,
                            color: '#006fa9'
                          }}
                          placeHolderTextStyle={{
                            textAlign: 'right',
                            paddingTop: 28,

                            height: 50,
                            fontSize: 11,
                            color: '#2e2e2e'
                          }}
                          onDateChange={date => {
                            setDataViagem(date);
                          }}
                          disabled={false}
                          selectedValue={new Date(values.data)}
                          onValueChange={handleChange('data')}
                          value={new Date(values.data)}
                          onChangeText={handleChange('data')}
                          onBlur={() => setFieldTouched('data')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {dataViagem && botaoEnviar && (
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
                            height: '100%'
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
                        {touched.valor && errors.valor && (
                          <Text style={estilo.textError}>{errors.valor}</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View style={estilo.rowStyle}>
                    <View style={estilo.campoStyle}>
                      <Text style={estilo.txtLabel}>Horário de saida</Text>
                      <Item>
                        <TouchableOpacity
                          onPress={() => {
                            setHorarioSaidaPicker(true);
                          }}
                          style={estilo.InputHora}
                        >
                          <Label>{placeHoraSaida}</Label>
                          <DateTimePickerModal
                            isVisible={horarioSaidaPicker}
                            mode="time"
                            onConfirm={date => selecionarHorario(date, 'Saida')}
                            onCancel={date => fecharPickerHoario(date, 'Saida')}
                            date={new Date()}
                            locale={'pt-br'}
                            is24Hour={true}
                            onDateChange={handleChange('HSaida')}
                            on
                          />
                        </TouchableOpacity>
                      </Item>

                      <View style={estilo.V_erro}>
                        {!horaSaida && botaoEnviar && (
                          <Text style={estilo.textError}>Campo obrigatório</Text>
                        )}
                      </View>
                    </View>

                    <View style={estilo.campoStyle}>
                      <Text style={estilo.txtLabel}>Horario de chegada</Text>
                      <Item>
                        <TouchableOpacity
                          onPress={() => {
                            setHorarioChegadaPicker(true);
                          }}
                          style={estilo.InputHora}
                        >
                          <Label>{placeHoraChegada}</Label>
                          <DateTimePickerModal
                            isVisible={horarioChegadaPicker}
                            onConfirm={date => selecionarHorario(date, 'Chegada')}
                            onCancel={date => fecharPickerHoario(date, 'Chegada')}
                            mode="time"
                            date={new Date()}
                            locale={'pt-br'}
                            is24Hour={true}
                            onChange={handleChange('Chegada')}
                          />
                        </TouchableOpacity>
                      </Item>

                      <View style={estilo.V_erro}>
                        {!horaChegada && botaoEnviar && (
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
                        placeholder=""
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
                    {touched.vagas && errors.vagas && (
                      <Text style={estilo.textError}>{errors.vagas}</Text>
                    )}
                  </View>

                  <View style={estilo.V_btn}>
                    <Button
                      style={estilo.btnProximo}
                      onPress={() => {
                        setBotaoEnviar(true);
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
            <Modal animationType="fade" transparent={true} visible={loading}>
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
