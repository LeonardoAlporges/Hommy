import 'moment/locale/br';
import { Button } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import CustomModal from '../../../components/Alert';
import Cartao from '../../../components/Cartao';
import HeaderBack from '../../../components/CustomHeader';
import Loading from '../../../components/Loading';
import api from '../../../service/api';
import style, {
  Container,
  TextoAgendamento,
  TextoClock,
  TextoClockPlace,
  TextoDescricao,
  ViewBotao,
  ViewBotaoCalendario,
  ViewClock,
  ViewDate,
  ViewDescricao,
  ViewDetalhes,
  ViewInputs
} from './styles';

export default function Agendar({ navigation }) {
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_')
  });

  const email = useSelector(state => state.user.email);
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataAgendamento, setDataAgendamento] = useState(new Date());
  const [labelData, setLabelData] = useState('Selecionar Data');
  const [dataPicker, setDataPicker] = useState(false);

  const [dadosRepublica, setDadosRepuublica] = useState(navigation.state.params.data);
  const [labeHoraAgendamento, setLabelHoraAgendamento] = useState('00:00');
  const [horaAgendamento, setHoraAgendamento] = useState();
  const [alertaFaltaDados, setAlertaFaltaDados] = useState(false);
  const [horaPicker, setHoraPicker] = useState(false);

  const [selecionOuDataHora,setSelecionOuDataHora ] = useState(0);

  function agendarVisita() {
    setLoading(true);
    if (selecionOuDataHora < 2) {
      setLoading(false);
      return 0;
    }
    const agendamento = {
      email: email,
      data: dataAgendamento,
      hora: horaAgendamento
    };

    api
      .put(`/agendamento/${dadosRepublica._id}`, agendamento)
      .then(response => {
        setSucesso(true);
        setLoading(false);
      })
      .catch(error => {
        setErro(true);
        setLoading(false);
      });
  }

  async function selecionarHorario(hora) {
    setSelecionOuDataHora(selecionOuDataHora++);
    setHoraPicker(false);
    const horaLabel = moment(new Date(hora)).format('HH:mm');
    setHoraAgendamento(hora);
    setLabelHoraAgendamento(horaLabel);
  }

  async function selecionarData(date) {
    setSelecionOuDataHora(selecionOuDataHora++);
    setDataPicker(false);
    const dataLabel = moment(new Date(date)).format('DD [de] MMMM');
    setDataAgendamento(date);
    setLabelData(dataLabel);
    
  }

  function picker() {
    setHoraPicker(true);
  }

  function pickerData() {
    setDataPicker(true);
  }

  return (
    <Container>
      <HeaderBack title="Agendar visita" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      <View style={{ width: '100%', height: 140, marginTop: 20 }}>
        <Cartao mostraBotao={true} data={dadosRepublica} />
      </View>
      <ViewDescricao>
        <TextoDescricao>
          Escolha um dia e hórario para fazer uma visita na república, lembrando que depois de sua visita aprovada o não
          comparecimento ao local na hora marcada poderá lhe trazer más avaliações.
        </TextoDescricao>
      </ViewDescricao>

      <ViewInputs>
        <ViewBotaoCalendario>
          <Button
            style={style.botaoCalendar}
            onPress={() => {
              pickerData();
            }}
          >
            <Icon name="calendar" style={style.IconCaledar} />
          </Button>
        </ViewBotaoCalendario>
        <ViewDate>
          <TextoClockPlace>{labelData}</TextoClockPlace>
          <DateTimePickerModal
            isVisible={dataPicker}
            mode="date"
            onConfirm={hora => selecionarData(hora)}
            onCancel={() => {
              setDataPicker(false);
            }}
            date={new Date()}
            locale="pt_BR"
          />
        </ViewDate>
        <ViewClock>
          {labeHoraAgendamento == '00:00' ? (
            <TextoClockPlace>{labeHoraAgendamento}</TextoClockPlace>
          ) : (
            <TextoClock>{labeHoraAgendamento}</TextoClock>
          )}

          <ViewBotaoCalendario>
            <Button
              style={style.botaoCalendar}
              onPress={() => {
                picker();
              }}
            >
              <Icon name="clock" style={style.IconCaledar} />
            </Button>
          </ViewBotaoCalendario>
        </ViewClock>
      </ViewInputs>

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

      <ViewBotao>
        <Button
        disabled={selecionOuDataHora < 2}
          style={style.botao}
          onPress={() => {
            agendarVisita();
          }}
        >
          <TextoAgendamento>Agendar uma visita</TextoAgendamento>
        </Button>
      </ViewBotao>

      {sucesso && (
        <ViewDetalhes>
          <CustomModal
            parametro="Custom"
            titulo="Visita agendada :)"
            descricao="O representante da república irá analisar o dia de seu agendamento em até 48 Hrs."
            botao="Confirmar"
            callback={() => {
              navigation.navigate('AgendamentoUser', {
                usuario: true
              });
            }}
          />
        </ViewDetalhes>
      )}
      {alertaFaltaDados && (
        <ViewDetalhes>
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
        </ViewDetalhes>
      )}
      {erro && (
        <ViewDetalhes>
          <CustomModal
            parametro="Erro"
            descricao="Você já tem um agendamento cadastrado nessa república."
            callback={() => {
              setErro(false);
            }}
          />
        </ViewDetalhes>
      )}
    </Container>
  );
}
