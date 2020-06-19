import React, { Component } from 'react';
import { View } from 'react-native';
import { DatePicker, Item, Label, Text, Button } from 'native-base';
import Cartao from '../../components/Cartao';
import style from './styles';
import { extend } from 'lodash';
import HeaderBack from '../../components/CustomHeader';
import { connect } from 'react-redux';
import api from '../../service/api';
import CustomModal from '../../components/Alert';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
class Agendar extends Component {
  static navigationOptions = { header: null };
  state = {
    newData: '',
    aviso: false,
    dados: this.props.navigation.state.params.data,
    time: '00:00',
    sendTime: '',
    isDatePickerVisible: false,
  };

  navegar = () => {
    this.props.navigation.goBack(null);
  };

  Agendar = () => {
    const agendamento = {
      email: this.props.email,
      data: this.state.newData,
      hora: this.state.sendTime,
    };
    console.log(agendamento);

    api
      .put(`/agendamento/${this.state.dados.userEmail}`, agendamento)
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ aviso: true });
        this.props.onAction();
      })
      .catch(error => {
        console.log(error);
      });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
  };

  handleConfirm = date => {
    console.log('A date has been picked: ', date);
    const markedDate = moment(new Date(date)).format('h:mm');
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="calendar" style={style.IconCaledarA} />
            <DatePicker
              defaultDate={new Date(2020, 4, 24)}
              minimumDate={new Date(2020, 4, 24)}
              maximumDate={new Date(2021, 1, 1)}
              locale={'pt-br'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              animationType={'slide'}
              androidMode={'default'}
              placeHolderText="Selecione a data"
              textStyle={{
                paddingTop: 15,
                textAlign: 'center',
                height: 50,
                fontSize: 16,
                color: '#142850',
                fontWeight: 'bold',
                fontFamily: 'Roboto',
              }}
              placeHolderTextStyle={{
                paddingTop: 15,
                textAlign: 'center',
                height: 50,
                fontSize: 16,
                color: '#989898',
                fontWeight: 'bold',
                fontFamily: 'Roboto',
              }}
              onDateChange={date => {
                this.setState({ newData: new Date(date) });
              }}
              disabled={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#142850',
                marginRight: 10,
              }}
            >
              {this.state.time}
            </Text>
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

        {this.state.aviso ? (
          <View style={style.V_Detalhes}>
            <CustomModal
              parametro="Custom"
              titulo="Visita agendada"
              descricao="O representante da republica ira analisar o dia de seu agendamento em até 24 Hrs."
              botao="Confirmar"
              callback={() => {
                this.props.navigation.navigate('AgendamentoUser', {
                  usuario: true,
                });
              }}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
  };
};

const AgendarConnect = connect(
  mapStateToProps,
  null
)(Agendar);

export default AgendarConnect;
