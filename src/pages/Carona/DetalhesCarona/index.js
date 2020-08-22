import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Estilo from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'native-base';
import CustomModal from '../../../components/Alert';
import api from '../../../service/api';
import Loading from '../../../components/Loading';
import { useSelector } from 'react-redux';

export function DetalhesCarona({ navigation }) {
  const moment = require('moment');
  moment.locale('pt', {
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    weekdays: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sabado'.split('_'),
  });
  const [botaoInteresse, setBotaoInteresse] = useState(navigation.state.params.desativarBotaoInteresse);
  const [dados, setDados] = useState(navigation.state.params.dados); 

  const email = useSelector(state => state.user.email);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(moment(dados.data).format('dddd, DD MMMM'));
  const [horaSaida, setHoraSaida] = useState(moment(dados.Hsaida).format('HH:mm'));
  const [horaChegada, setHoraChegada] = useState(moment(dados.HChegada).format('HH:mm'));

  async function demonstrarInteresse() {
    setLoading(true);
    const dado = { email: email};
    console.log("DAODS:",dado,dados)
    await api
      .put(`/carona/meusInteresses/${dados._id}`, dado)
      .then(Response => {
        setSucesso(true);
        setLoading(false);
      })
      .catch(e => {
        setErro(true);
        setLoading(false);
      });
    setLoading(false);
  }

  return (
    <ScrollView style={{ paddingBottom: 50 }}>
      {loading && <Loading />}
      {sucesso && (
        <View style={Estilo.V_modal}>
          <CustomModal
            parametro="Custom"
            titulo="Obrigado pelo interesse"
            descricao="Você será adicionado a uma lista de interesse e será notificado assim que o ofertante confirmar sua vaga."
            botao="Confirmar"
            callback={() => {
              navigation.navigate('Viagens');
            }}
          />
        </View>
      )}
      {erro && (
        <View style={Estilo.V_modal}>
          <CustomModal
            parametro="Erro"
            descricao="Você já tem um agendamento cadastrado nessa carona."
            callback={() => {
              setErro(false);
            }}
          />
        </View>
      )}
      <View style={Estilo.V_Margin}>
        <View style={Estilo.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
          >
            <Icon style={Estilo.iconHer} name="arrow-left" />
          </TouchableOpacity>
        </View>

        <View style={Estilo.V_HeaderUser}>
          <Image
            source={{
              uri: dados.imagem,
            }}
            style={Estilo.V_imagem}
          />
          <View style={Estilo.V_Nome}>
            <Text style={Estilo.Nome}>{dados.nome} </Text>
            <View style={Estilo.V_nota}>
              <Icon style={Estilo.iconNota} name="star-outline" />
              <Text style={Estilo.Nota}>{dados.nota}</Text>
            </View>
          </View>
          <View />
        </View>

        <View style={Estilo.V_Infor}>
          <View style={Estilo.V_data}>
            <Text style={Estilo.data}>{data}</Text>
          </View>
          <View style={Estilo.V_partida}>
            <Text style={Estilo.txtPartida}>Saída</Text>
          </View>
          <View style={Estilo.V_Hora}>
            <Text style={Estilo.Txthora}>
              {horaSaida} - {dados.localSaida}
            </Text>
          </View>
          <View style={Estilo.V_partida}>
            <Text style={Estilo.txtPartida}>Previsão Chegada</Text>
          </View>
          <View style={Estilo.V_Hora}>
            <Text style={Estilo.Txthora}>
              {horaChegada} - {dados.localChegada}
            </Text>
          </View>

          <View style={Estilo.V_valor}>
            <Text style={Estilo.Txtvalor1}>Preço para 1 passageiro</Text>
            <Text style={Estilo.Txtvalor}>R$ {dados.valor},00</Text>
          </View>
        </View>
        <View style={Estilo.barra} />
        <View style={Estilo.Pontos}>
          <View style={Estilo.V_ptEm}>
            <Text style={Estilo.T_ptEm}>Ponto de Embarque</Text>
          </View>
          <View style={Estilo.V_label}>
            <Text style={Estilo.T_label}>•{dados.embarque}</Text>
          </View>
          <View style={Estilo.V_ptEm}>
            <Text style={Estilo.T_ptEm}>Ponto Final</Text>
          </View>
          <View style={Estilo.V_label}>
            <Text style={Estilo.T_label}>•{dados.desembarque}</Text>
          </View>
        </View>
        {!botaoInteresse ? (
          <View style={Estilo.ViewButon}>
            <View style={Estilo.V_Btn}>
              <Button
                style={Estilo.Botao}
                onPress={() => {
                  demonstrarInteresse();
                }}
              >
                <Text style={Estilo.txtBotao}>Tenho Interesse</Text>
              </Button>
            </View>
          </View>
        ) : (
            <View style={{ height: 40 }} />
          )}
      </View>
    </ScrollView>
  );
}

export default withNavigation(DetalhesCarona);
