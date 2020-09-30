import React, { Component, Fragment, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import ViewPager from '@react-native-community/viewpager';
import api from '../../../service/api';
import estilo from './styles';
import { withNavigation } from 'react-navigation';
import CustomModal from '../../../components/Alert';
import { useSelector } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, Item, Input, Label, Button, Icon, DatePicker, Spinner, Picker } from 'native-base';

import { NavigationActions, StackActions } from 'react-navigation';
import { set } from 'lodash';

import { FieldSet, LabelFielSet, Linha, FieldSetLarge } from './styles';
export default function CadastroServico({ navigation }) {
  const avatarUser = useSelector(state => state.user.fotoPerfil);
  const emailUser = useSelector(state => state.user.email);
  const notaUser = useSelector(state => state.user.notaUser);
  const nomeUser = useSelector(state => state.user.usuario);

  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState([]);
  const [loading, setLoading] = useState(false);

  const [botaoEnviar, setBotaoEnviar] = useState(false);

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
  //CRIAR A FUNÇAO PARA MANDAR O SERVIÇO
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

  return (
    <Formik
      initialValues={
        {
          //COLOCAR O VALORES DOS CAMPOS AQUI VOU POR 1 DE EXEMPLO
          //nomeEmpresa :  '',
          //nomePrestador :  '',
        }
      }
      onSubmit={values => {
        //Funçao para enviar
        verificarTipoDeRequisicao(values);
      }}
      validationSchema={yup.object().shape({
        //VALIDAÇÕES PARA OS CAMPOS
        saida: yup.string().required('Campo obrigatório'),
        chegada: yup.string().required('Campo obrigatório')
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
                  title="Cadastro de serviço"
                  onNavigation={() => navigation.goBack(null)}
                />

                <View style={estilo.V_Conteudo}>
                  <Text style={estilo.txtCarona}>
                    Preencha os campos abaixo com as informações necessárias para registrar sua
                    empresa/serviço
                  </Text>

                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Nome empresa/serviço</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          keyboardType="number-pad"
                          value={values.vagas}
                          onChangeText={handleChange('nome')}
                          placeholder=""
                          onBlur={() => setFieldTouched('vagas')}
                        />
                      </Item>
                      {/* COLOCAR ESSES VIEW AQUI EM BAIXO EM TODOS OS CAMPOS PARA APLICAR A VALIDAÇÂO */}
                      {/* COLOCAR ESSES VIEW AQUI EM BAIXO EM TODOS OS CAMPOS PARA APLICAR A VALIDAÇÂO */}
                      {/* COLOCAR ESSES VIEW AQUI EM BAIXO EM TODOS OS CAMPOS PARA APLICAR A VALIDAÇÂO */}
                      {/* COLOCAR ESSES VIEW AQUI EM BAIXO EM TODOS OS CAMPOS PARA APLICAR A VALIDAÇÂO */}
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <Linha>
                    <FieldSetLarge>
                      <LabelFielSet>Nome do prestador</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          keyboardType="number-pad"
                          value={values.vagas}
                          onChangeText={handleChange('vagas')}
                          placeholder=""
                          onBlur={() => setFieldTouched('vagas')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSetLarge>
                  </Linha>
                  <Linha>
                    <FieldSet>
                      <LabelFielSet>Telefone</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <TextInputMask
                          placeholderTextColor="#263b50"
                          style={estilo.labelInput}
                          keyboardType="number-pad"
                          mask={'([00]) [00000]-[0000]'}
                          value={values.celular} //celular
                          onChangeText={handleChange('celular')}
                          placeholder="(__)______-______"
                          onBlur={() => setFieldTouched('celular')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSet>
                    <FieldSet>
                      <LabelFielSet>Email</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          value={values.embarque}
                          onChangeText={handleChange('embarque')}
                          placeholder=""
                          onBlur={() => setFieldTouched('embarque')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSet>
                  </Linha>
                  <Text style={estilo.txtCarona}>
                    preencha as informaçoes abaixo se você presta serviço em local fixo
                  </Text>
                  <Linha>
                    <FieldSet>
                      <LabelFielSet>Cidade</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
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
                        </Picker>
                      </Item>
                    </FieldSet>
                    <FieldSet>
                      <LabelFielSet>Bairro</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
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
                          <Picker.Item label="Centro" value="Centro" />
                          <Picker.Item label="Vila do Sul" value="Vila do Sul" />
                          <Picker.Item label="Guararema" value="Guararema" />
                          <Picker.Item label="Clerio Mourin" value="Clerio Mourin" />
                          <Picker.Item label="Vila Alta" value="Vila Alta" />
                        </Picker>
                      </Item>
                    </FieldSet>
                  </Linha>
                  <Linha>
                    <FieldSet style={{ width: '65%' }}>
                      <LabelFielSet>Rua</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          value={values.embarque}
                          onChangeText={handleChange('embarque')}
                          placeholder=""
                          onBlur={() => setFieldTouched('embarque')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSet>
                    <FieldSet style={{ width: '30%' }}>
                      <LabelFielSet>Numero</LabelFielSet>
                      <Item style={{ borderColor: 'transparent' }}>
                        <Input
                          value={values.embarque}
                          onChangeText={handleChange('embarque')}
                          placeholder=""
                          onBlur={() => setFieldTouched('embarque')}
                        />
                      </Item>
                      <View style={estilo.V_erro}>
                        {touched.vagas && errors.vagas && (
                          <Text style={estilo.textError}>{errors.vagas}</Text>
                        )}
                      </View>
                    </FieldSet>
                  </Linha>
                  {/* COLOCAR ESSES BUTTON CHECK PARA O CARA ESCOLHER O HORARIO DISPONIVEL 
                      E QUANDO O CARA CLICAR ELE ADICIONA NO ARRAY DE HORARIO DISPONIVEL
                      [Segunda,Terça,Quarta,Quinta,Sexta...]
                  */}
                  <Linha>
                    <Button>
                      <Text>Segunda</Text>
                    </Button>
                    <Button>
                      <Text>Terça </Text>
                    </Button>
                    <Button>
                      <Text>Quarta</Text>
                    </Button>
                  </Linha>
                  <Linha>
                    <Button>
                      <Text>Segunda</Text>
                    </Button>
                    <Button>
                      <Text>Terça </Text>
                    </Button>
                    <Button>
                      <Text>Quarta</Text>
                    </Button>
                  </Linha>

                  <View style={estilo.V_btn}>
                    <Button
                      style={estilo.btnProximo}
                      onPress={() => {
                        handleSubmit(values);
                      }}
                    >
                      <Text style={{ fontFamily: 'WorkSans-Bold', color: '#142850', fontSize: 18 }}>
                        Publicar carona
                      </Text>
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
