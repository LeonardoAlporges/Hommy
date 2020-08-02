import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import 'moment/locale/br';

import moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Estilos from './style';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export function CartaoCarona({ navigation, dados }) {
  useEffect(() => {
    preencherUserLogado();
  }, [usuarioLogado]);

  const [usuarioLogado, setUsuarioLogado] = useState();
  const [dataViagem, setDataViagem] = useState(moment(dados.data).format('DD/MM'));
  const [horaSaida, sethoraSaida] = useState(moment(new Date(dados.horaSaida)).format('HH:mm'));
  const [horaChegada, sethoraChegada] = useState(moment(new Date(dados.horaChegada)).format('HH:mm'));

  async function preencherUserLogado() {
    await AsyncStorage.getItem('user').then(value => {
      setUsuarioLogado(JSON.parse(value));
    });
  }

  function navegarParaDetalhes() {
    var desativarBotaoInteresse = false;
    console.log(dados);
    console.log(usuarioLogado);
    if (dados.userEmail == usuarioLogado.email) {
      desativarBotaoInteresse = true;
    }
    navigation.navigate('DetalhesCarona', { dados: dados, desativarBotaoInteresse });
  }

  return (
    <Button transparent underlayColor="#fff" onPress={() => navegarParaDetalhes()} style={Estilos.touch_card}>
      <View style={Estilos.V_cartao}>
        <View style={Estilos.V_ImgNome}>
          <View style={Estilos.V_imagem}>
            <Image source={{ uri: dados.imagem }} style={Estilos.imagem} />
          </View>
          <Text style={Estilos.txtnome}>{dados.nome}</Text>
          <View style={Estilos.V_nota}>
            <Text> {dados.nota} </Text>
            <Icon name="star" style={Estilos.icon} />
          </View>
        </View>
        <View style={Estilos.V_local}>
          <View style={Estilos.V_LocLabel}>
            <Text style={Estilos.txtdeslcSaHora}>{horaSaida}</Text>
            <Icon name="action-redo" style={Estilos.txtIcon} />
            <View style={Estilos.V_TxtSaida}>
              <Text numberOfLines={2} style={Estilos.txtdeslcSa}>
                {dados.localSaida}
              </Text>
            </View>
          </View>
          <View style={Estilos.V_LocLabel}>
            <Text style={Estilos.txtdeslcChHora}>{horaChegada}</Text>
            <Icon name="flag" style={Estilos.txtIcon} />
            <Text style={Estilos.txtdeslcCh}>{dados.localChegada}</Text>
          </View>
        </View>
        <View style={Estilos.V_DataVal}>
          <View style={Estilos.Data}>
            <Icon style={Estilos.txtIcon} name="event" />
            <Text style={Estilos.txtData}>{dataViagem}</Text>
          </View>
          <View style={Estilos.Valor}>
            <Icon2 style={Estilos.txtIcon} name="dollar-sign" />
            <Text style={Estilos.txtvalor}>R$ {dados.valor}</Text>
          </View>
        </View>
      </View>
    </Button>
  );
}

export default withNavigation(CartaoCarona);
