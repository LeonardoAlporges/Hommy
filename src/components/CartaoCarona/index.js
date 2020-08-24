import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import 'moment/locale/br';

import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Estilos from './style';
import { Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  ViewImgaem,
  ViewSuperior,
  ViewAvaliacao,
  ViewDestinos,
  ViewAvaliacaoDestinos,
  LabelLocalSaida,
  LabelLocalChegada,
  ViewInferior,
  CardsInfeirores,
  Label,
  Informacao,
  Separador
} from './style';
export function CartaoCarona({ navigation, dados }) {
  const [usuarioLogado, setUsuarioLogado] = useState();
  const [dataViagem, setDataViagem] = useState(moment(dados.data).format('DD/MM'));
  const [horaSaida, sethoraSaida] = useState(moment(new Date(dados.horaSaida)).format('HH:mm'));
  const [horaChegada, sethoraChegada] = useState(
    moment(new Date(dados.horaChegada)).format('HH:mm')
  );

  async function preencherUserLogado() {
    await AsyncStorage.getItem('user').then(value => {
      setUsuarioLogado(JSON.parse(value));
    });
  }

  async function navegarParaDetalhes() {
    try {
      await preencherUserLogado();
      var desativarBotaoInteresse = false;
      console.log(usuarioLogado);
      if (dados.userEmail == usuarioLogado.email) {
        desativarBotaoInteresse = true;
      }
      navigation.navigate('DetalhesCarona', { dados, desativarBotaoInteresse });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container transparent underlayColor="#f2f2f2" onPress={() => navegarParaDetalhes()}>
      <View style={Estilos.V_cartao}>
        <ViewSuperior>
          <ViewImgaem>
            <Image source={{ uri: dados.imagem }} style={Estilos.imagem} />
          </ViewImgaem>
          <ViewAvaliacaoDestinos>
            <ViewAvaliacao>
              <Icon name="star" color="#ffd700" size={16}></Icon>
              <Icon name="star" color="#ffd700" size={16}></Icon>
              <Icon name="star" color="#ffd700" size={16}></Icon>
              <Icon name="star" color="#ffd700" size={16}></Icon>
              <Icon name="star-half" color="#ffd700" size={16}></Icon>
            </ViewAvaliacao>
            <ViewDestinos>
              <LabelLocalSaida numberOfLines={1}>{dados.localSaida} X </LabelLocalSaida>
              <LabelLocalChegada numberOfLines={1}>{dados.localChegada}</LabelLocalChegada>
            </ViewDestinos>
          </ViewAvaliacaoDestinos>
        </ViewSuperior>
        <ViewInferior>
          <CardsInfeirores>
            <Label>Saida</Label>
            <Informacao>{horaSaida}</Informacao>
          </CardsInfeirores>
          <Separador></Separador>
          <CardsInfeirores>
            <Label>Chegada</Label>
            <Informacao>{horaSaida}</Informacao>
          </CardsInfeirores>
          <Separador></Separador>
          <CardsInfeirores>
            <Label>Valor</Label>
            <Informacao>R$ {dados.valor}</Informacao>
          </CardsInfeirores>
          <Separador></Separador>
          <CardsInfeirores>
            <Label>Data</Label>
            <Informacao>{dataViagem}</Informacao>
          </CardsInfeirores>
        </ViewInferior>
      </View>
    </Container>
  );
}

export default withNavigation(CartaoCarona);
