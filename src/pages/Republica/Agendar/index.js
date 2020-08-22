import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { DatePicker, Text, Button } from 'native-base';
import Cartao from '../../../components/Cartao';
import style from './styles';
import HeaderBack from '../../../components/CustomHeader';
import { connect, useSelector } from 'react-redux';
import api from '../../../service/api';
import CustomModal from '../../../components/Alert';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Loading from '../../../components/Loading';

export default function Agendar({ navigation }) {
  const email = useSelector(state => state.user.email);
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataAgendamento, setDataAgendamento] = useState();
  const [dadosRepublica, setDadosRepuublica] = useState(navigation.state.params.data);
  const [labeHoraAgendamento, setLabelHoraAgendamento] = useState('00:00');
  const [horaAgendamento, setHoraAgendamento] = useState();
  const [alertaFaltaDados, setAlertaFaltaDados] = useState(false);
  const [horaPicker, setHoraPicker] = useState(false);

  function agendarVisita() {
    setLoading(true);
    if ((dataAgendamento || horaAgendamento) == null || (dataAgendamento || horaAgendamento) == false) {
      setLoading(false);
      return 0;
    }
    const agendamento = {
      email: email,
      data: dataAgendamento,
      hora: horaAgendamento,
    };
    console.log(agendamento);
    console.log(dadosRepublica._id);
    api
      .put(`/agendamento/${dadosRepublica._id}`, agendamento)
      .then(response => {
        setSucesso(true);
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        setErro(true);
        setLoading(false);
        console.log(error);
      });
  }

  function selecionarHorario(hora) {
    const horaLabel = moment(new Date(hora)).format('HH:mm');
    setHoraAgendamento(hora);
    setLabelHoraAgendamento(horaLabel);
    setHoraPicker(false);
  };

  return (
    <View style={style.Container}>
      <HeaderBack title="Agendar visita" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      <View style={{ width: '100%', height: 140, marginTop: 20 }}>
        <Cartao mostraBotao={true} data={dadosRepublica} />
      </View>
      <View style={style.V_descr}>
        <Text style={style.textDescrição}>
          Escolha um dia e hórario para fazer uma visita na república, lembrando que depois de sua visita aprovada o não
          comparecimento ao local na hora marcada poderá lhe trazer más avaliações.
        </Text>
      </View>

      <View style={style.V_Inputs}>
        <View style={style.ViewDate}>
          <Icon name="calendar" style={style.IconCaledarA} />
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            locale={'pt-br'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            animationType={'slide'}
            androidMode={'default'}
            placeHolderText="Selecione a data"
            textStyle={style.textStyledate}
            placeHolderTextStyle={style.placeHolder}
            onDateChange={date => {
              setDataAgendamento(date);
            }}
            disabled={false}
          />
        </View>
        <View style={style.ViewClock}>
          {labeHoraAgendamento == '00:00' ? (
            <Text style={style.textClockPlace}>{labeHoraAgendamento}</Text>
          ) : (
              <Text style={style.textClock}>{labeHoraAgendamento}</Text>
            )}

          <View style={style.V_botaoCalendar}>
            <Button
              style={style.botaoCalendar}
              onPress={() => {
                setHoraPicker(true);
              }}
            >
              <Icon name="clock" style={style.IconCaledar} />
            </Button>
          </View>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={horaPicker}
        mode="time"
        onConfirm={hora => selecionarHorario(hora)}
        onCancel={() => {
          setHoraPicker(false);
        }}
        date={new Date()}
        locale="pt_BR"
        is24Hour={true}
      />

      <View style={style.V_botao}>
        <Button
          style={style.botao}
          onPress={() => {
            agendarVisita();
          }}
        >
          <Text style={style.txtWhatsapp}>Agendar uma visita</Text>
        </Button>
      </View>

      {sucesso && (
        <View style={style.V_Detalhes}>
          <CustomModal
            parametro="Custom"
            titulo="Visita agendada :)"
            descricao="O representante da república irá analisar o dia de seu agendamento em até 48 Hrs."
            botao="Confirmar"
            callback={() => {
              navigation.navigate('AgendamentoUser', {
                usuario: true,
              });
            }}
          />
        </View>
      )}
      {alertaFaltaDados && (
        <View style={style.V_Detalhes}>
          <CustomModal
            parametro="Custom"
            imagem="Faltando"
            titulo="Não está esquecendo nada nao ?"
            descricao="Para uma agendamento é essencial que tenha uma data e um horario "
            botao="Entendido"
            callback={() => {
              setAlertaFaltaDados(false);
            }}
          />
        </View>
      )}
      {erro && (
        <View style={style.V_Detalhes}>
          <CustomModal
            parametro="Erro"
            descricao="Você já tem um agendamento cadastrado nessa república."
            callback={() => {
              setErro(false);
            }}
          />
        </View>
      )}
    </View>
  );
}
