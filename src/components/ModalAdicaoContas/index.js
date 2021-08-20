import { Formik } from 'formik';
import moment from 'moment';
import { Input, Item, Label } from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import api from '../../service/api';
import CustomModal from '../Alert';
import { Botao, BotaoFechar, Container, FieldSetLarge, Iconefechar, InputHora, LabelBotao, LabelErro, LabelFielSet, Linha, Titulo, ViewErro, ViewModal, ViewTitulo } from './styles';

export default function ModalAdicaoContas(props) {

  const emailUser = useSelector(state => state.user.email);

  const [modalVisivel, setModalVisible] = useState(true);

  useEffect(() => {
    console.log("MODA:", props)
  }, [])

  const [erro, setErro] = useState(false);

  const [dataVencimento, setDataVencimento] = useState();
  const [dataVencimentoPicker, setDataVencimentoPicker] = useState(false);
  const [placeDataVencimento, setPlaceDataVencimento] = useState('Selecione');

  function onClose() {
    props.onClose();
  }

  function selecionarData(date) {
    const data = moment(new Date(date)).format('DD/MM');
    setPlaceDataVencimento(data);
    setDataVencimentoPicker(false);
    setDataVencimento(date);
  }

  function adicionarConta(values) {
    const data = {
      descricao: values.descricao,
      valor: values.valor,
      vencimento: dataVencimento,
      idRepublica: props.idRepublica
    };
    api
      .post(`/contas/`, data)
      .then(response => {
        console.log(response);
        onClose();
      })
      .catch(error => {
        setErro(true);
      });
  }

  return (
    <Formik
      initialValues={{
        descricao: '',
        valor: ''
      }}
      onSubmit={values => {
        adicionarConta(values);
      }}

      validationSchema={yup.object().shape({
        descricao: yup.string().required('Campo obrigatório'),
        valor: yup.number('Somente numeros!').required('Campo obrigatório'),
      })}
    >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <Fragment>
          {erro && (
            <CustomModal
              parametro="Erro"
              descricao="Opss! Ocorreu um erro estranho :O"
              callback={() => {
                setErro(false);
              }}
            />
          )}

          <Modal animationType="fade" visible={modalVisivel} transparent={true} >
            <Container>
              <ViewModal>
                <ViewTitulo>
                  <Titulo>
                    Conta do Mês
                  </Titulo>
                  <BotaoFechar onPress={() => onClose()}>
                    <Iconefechar name="close" />
                  </BotaoFechar>
                </ViewTitulo>
                <Linha>
                  <FieldSetLarge>
                    <LabelFielSet>Descrição</LabelFielSet>
                    <Item
                      style={{
                        paddingLeft: 7,
                        borderColor: 'transparent'
                      }}
                    >
                      <Input
                        value={values.descricao}
                        onChangeText={handleChange('descricao')}
                        placeholder=""
                        onBlur={() => setFieldTouched('descricao')}
                      />
                    </Item>

                  </FieldSetLarge>
                  <ViewErro>{touched.descricao && errors.descricao && <LabelErro>{errors.descricao}</LabelErro>}</ViewErro>
                </Linha>
                <Linha>
                  <FieldSetLarge>
                    <LabelFielSet>Valor</LabelFielSet>
                    <Item style={{ borderColor: 'transparent' }}>
                      <Input
                        value={values.valor}
                        onChangeText={handleChange('valor')}
                        placeholder=""
                        onBlur={() => setFieldTouched('valor')}
                      />
                    </Item>

                  </FieldSetLarge>
                  <ViewErro>{touched.valor && errors.valor && <LabelErro>{errors.valor}</LabelErro>}</ViewErro>
                </Linha>
                <Linha>
                  <FieldSetLarge>
                    <LabelFielSet>Vencimento</LabelFielSet>
                    <Item style={{ borderColor: 'transparent' }}>
                      <InputHora
                        onPress={() => {
                          setDataVencimentoPicker(true);
                        }}
                      >
                        <Label>{placeDataVencimento}</Label>
                        <DateTimePickerModal
                          isVisible={dataVencimentoPicker}
                          mode="date"
                          onConfirm={date => selecionarData(date)}
                          onCancel={() => setDataVencimentoPicker(false)}
                          date={new Date()}
                          locale={'pt-br'}
                          onDateChange={handleChange('data')}
                        />
                      </InputHora>
                    </Item>
                  </FieldSetLarge>
                  <ViewErro>{values.data == '' && !botaoEnviar && <LabelErro>Campo obrigatório</LabelErro>}</ViewErro>
                </Linha>
                <View style={{ marginTop: '5%' }}>
                  <Botao onPress={() => {
                    handleSubmit(values);
                  }} >
                    <LabelBotao>Salvar</LabelBotao>
                  </Botao >
                </View>



              </ViewModal>
            </Container>
          </Modal>
        </Fragment>
      )}
    </Formik>
  );

}