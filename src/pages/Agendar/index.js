import React, { Component } from 'react';
import { View } from 'react-native';
import { DatePicker, Text, Button } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';
import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Loading from '../../components/Loading';

class Agendar extends Component {
  static navigationOptions = { header: null };
  state = {
    Erro: false,
    Load: false,
    Sucsess: false,
    newData: '',
    dados: this.props.navigation.state.params.data,
    time: '00:00',
    sendTime: '',
    isDatePickerVisible: false,
    date: new Date(),
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  Agendar = () => {
    this.setState({ Load: true });
    const agendamento = {
      email: this.props.email,
      data: this.state.newData,
      hora: this.state.sendTime,
    };

    if ((agendamento.data || agendamento.hora) == '') {
      this.setState({ Erro: true });
      return 0;
    }

    api
      .put(`/agendamento/${this.props.idRepublica}`, agendamento)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ Sucsess: true, Load: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ Load: false, Erro: true });
      });
  };

  showDatePicker = () => {
    console.log('DADOS:', this.state.dados);
    this.setState({ isDatePickerVisible: true });
  };
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleConfirm = date => {
    const markedDate = moment(new Date(date)).format('HH:mm');
    this.setState({ sendTime: date });
    this.setState({ time: markedDate });
    this.hideDatePicker();
  };

  render() {
    return (
      <View style={style.Container}>
        <HeaderBack
          title="Agendar visita"
          onNavigation={() => this.navegar()}
        />
        {this.state.Load && <Loading />}
        <View style={{ width: '100%', height: 140 }}>
          <Cartao data={this.state.dados} />
        </View>
        <View style={style.V_descr}>
          <Text style={style.textDescrição}>
            Escolha um dia e horario para fazer uma visita há republica
            {this.state.dados.nomeRepublica} lembrando que depois de sua visita
            aprova o nao comparecimento ao local na hora marcada podera lher
            trazer más avaliações
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
                this.setState({ newData: new Date(date) });
              }}
              disabled={false}
            />
          </View>
          <View style={style.ViewClock}>
            <Text style={style.textClock}>{this.state.time}</Text>
            <View style={style.V_botaoCalendar}>
              <Button style={style.botaoCalendar} onPress={this.showDatePicker}>
                <Icon name="clock" style={style.IconCaledar} />
              </Button>
            </View>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={this.state.isDatePickerVisible}
          mode="time"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
          date={new Date()}
          locale="pt_BR"
          is24Hour={true}
        />

        <View style={style.V_botao}>
          <Button
            style={style.botao}
            onPress={() => {
              this.Agendar();
            }}
          >
            <Text style={style.txtWhatsapp}>Agendar uma visita</Text>
          </Button>
        </View>

        {this.state.Sucsess && (
          <View style={style.V_Detalhes}>
            <CustomModal
              parametro="Custom"
              titulo="Visita agendada :)"
              descricao="O representante da republica ira analisar o dia de seu agendamento em até 48 Hrs."
              botao="Confirmar"
              callback={() => {
                this.props.navigation.navigate('AgendamentoUser', {
                  usuario: true,
                });
              }}
            />
          </View>
        )}
        {this.state.Erro && (
          <View style={style.V_Detalhes}>
            <CustomModal
              parametro="Erro"
              callback={() => {
                this.setState({ Erro: false });
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    idRepublica: state.auth.idRepublica,
  };
};

const AgendarConnect = connect(
  mapStateToProps,
  null
)(Agendar);

export default AgendarConnect;
