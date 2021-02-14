import { Formik } from 'formik';
import { Button, Icon, Input, Item, Label, Picker } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInputMask from 'react-native-text-input-mask';
import CurrencyInput from 'react-native-currency-input';
import { NavigationActions, StackActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomModal from '../../../components/Alert';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import estilo, {
  Container,
  FieldSet,
  FieldSetLarge,
  InputHora,
  LabeBotaoEnviar,
  LabelErro,
  LabelFielSet,
  Linha,
  Subtitle,
  ViewBotao,
  ViewErro
} from './style';

export default function CadastroCarona({ navigation }) {

  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });
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
  const [placeHoraSaida, setPlaceHoraSaida] = useState();
  const [placeHoraChegada, setPlaceHoraChegada] = useState();
  const [botaoEnviar, setBotaoEnviar] = useState(false);
  const [valor, setValor] = useState();


  const [dataAgendamento, setDataAgendamento] = useState(new Date());
  const [labelData, setLabelData] = useState('Selecionar Data');
  const [dataPicker, setDataPicker] = useState(false);

  useEffect(() => {
    if (atualizacao) {
      selecionarHorario(dadosCarona.horaSaida, 'Saida');
      selecionarHorario(dadosCarona.horaChegada, 'Chegada');
    }
  }, []);

  function resetarPilhaNavegacao(rota) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })]
    });
    navigation.dispatch(resetAction);
  }

  async function selecionarData(date) {
    setDataPicker(false);
    const dataLabel = moment(new Date(date)).format('DD [de] MMMM');
    setDataAgendamento(date);
    setLabelData(dataLabel);
  }

  function irParaTelaIncial() {
    resetarPilhaNavegacao('TabsHeader');
  }

  function verificarTipoDeRequisicao(values) {
    setLoading(true);

    const nomeFragmentado = nomeUser.split(' ');
    const data = {
      localSaida: values.saida,
      localChegada: values.chegada,
      data: dataAgendamento,
      valor: valor,
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
      })
      .finally(setLoading(false));
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
      setHorarioSaidaPicker(false);
      setHoraSaida(date);
      setPlaceHoraSaida(saida);
    } else {
      const chegada = moment(new Date(date)).format('HH:mm');
      setHorarioChegadaPicker(false);
      setHoraChegada(date);
      setPlaceHoraChegada(chegada);
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
        desembarque: yup.string().max(40, 'Somente 40 caracteres são permitidos').required('Campo obrigatório'),
        vagas: yup
          .number('Somente numeros')
          .min(1, 'Minimo é de 1 vaga')
          .max(10, ' Maximo é de 10 vaga')
          .required('Campo obrigatório')
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {loading && <Loading></Loading>}
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
          <ScrollView>
            <HeaderBack title="Publique sua carona" onNavigation={() => navigation.goBack(null)} />

            <Container>
              <Subtitle>Preencha os campos abaixo com as informações necessárias para registrar sua carona.</Subtitle>

              <Linha>
                <FieldSet>
                  <LabelFielSet>Local de saida</LabelFielSet>
                  <Item
                    style={{
                      paddingLeft: 7,
                      borderColor: 'transparent'
                    }}
                  >
                    <Picker
                      mode="dropdown"
                      placeholder="Cidades"
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={values.saida}
                      onValueChange={handleChange('saida')}
                      value={values.saida}
                      onChangeText={handleChange('saida')}
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
                  <ViewErro>{touched.saida && errors.saida && <LabelErro>{errors.saida}</LabelErro>}</ViewErro>
                </FieldSet>
                <FieldSet>
                  <LabelFielSet>Local de Chegada</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
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
                  <ViewErro>{touched.chegada && errors.chegada && <LabelErro>{errors.chegada}</LabelErro>}</ViewErro>
                </FieldSet>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Data</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <InputHora
                      onPress={() => {
                        setDataPicker(true);
                      }}
                    >
                      <Label>{labelData}</Label>
                      <DateTimePickerModal
                        isVisible={dataPicker}
                        mode="date"
                        onConfirm={date => selecionarData(date)}
                        onCancel={date => setDataPicker(false)}
                        date={new Date()}
                        locale={'pt-br'}
                      />
                    </InputHora>
                  </Item>
                  <ViewErro>{!horaSaida && botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}</ViewErro>
                </FieldSet>

                <FieldSet>
                  <LabelFielSet>Valor</LabelFielSet>
                  <Item regular style={{ borderColor: 'transparent' }}>
                    <Label
                      fixedLabel
                      style={{
                        marginLeft: 45,
                        fontFamily: 'WorkSans',
                        fontSize: 16,
                        color: '#bfc6ea'
                      }}
                    >
                      R$
                    </Label>
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
                  <ViewErro>{touched.valor && errors.valor && <LabelErro>{errors.valor}</LabelErro>}</ViewErro>
                </FieldSet>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Hora de saida</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <InputHora
                      onPress={() => {
                        setHorarioSaidaPicker(true);
                      }}
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

                      />
                    </InputHora>
                  </Item>
                  <ViewErro>{!horaSaida && botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}</ViewErro>
                </FieldSet>
                <FieldSet>
                  <LabelFielSet>Hora de chegada</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <InputHora
                      onPress={() => {
                        setHorarioChegadaPicker(true);
                      }}
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
                    </InputHora>
                  </Item>
                  <ViewErro>{!horaChegada && botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}</ViewErro>
                </FieldSet>
              </Linha>
              <Linha>
                <FieldSet>
                  <LabelFielSet>Vagas no carro</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      keyboardType="number-pad"
                      value={values.vagas}
                      onChangeText={handleChange('vagas')}
                      placeholder=""
                      onBlur={() => setFieldTouched('vagas')}
                    />
                  </Item>
                  <ViewErro>{touched.vagas && errors.vagas && <LabelErro>{errors.vagas}</LabelErro>}</ViewErro>
                </FieldSet>
              </Linha>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Ponto de embarque</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.embarque}
                      onChangeText={handleChange('embarque')}
                      placeholder=""
                      onBlur={() => setFieldTouched('embarque')}
                    />
                  </Item>
                  <ViewErro>{touched.embarque && errors.embarque && <LabelErro>{errors.embarque}</LabelErro>}</ViewErro>
                </FieldSetLarge>
              </Linha>
              <Linha>
                <FieldSetLarge>
                  <LabelFielSet>Ponto final de desembarque</LabelFielSet>
                  <Item style={{ borderColor: 'transparent' }}>
                    <Input
                      value={values.desembarque}
                      onChangeText={handleChange('desembarque')}
                      placeholder=""
                      onBlur={() => setFieldTouched('desembarque')}
                    />
                  </Item>
                  <ViewErro>
                    {touched.desembarque && errors.desembarque && <LabelErro>{errors.desembarque}</LabelErro>}
                  </ViewErro>
                </FieldSetLarge>
              </Linha>

              <ViewBotao>
                <Button
                  style={estilo.btnProximo}
                  onPress={() => {
                    handleSubmit(values);
                  }}
                >
                  <LabeBotaoEnviar>Publicar carona</LabeBotaoEnviar>
                </Button>
              </ViewBotao>
            </Container>
          </ScrollView>
        </Fragment>
      )}
    </Formik>
  );
}
