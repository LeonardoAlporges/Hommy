import React, { useState } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import {
  editNomeRepublica,
  editValorAluguel,
  editBairro,
  editPessoas,
  editDescricao,
  editAnimal,
  editAcomodacaoQuarto,
  editAcomodacaoRepublica,
  editValorConta,
  editObservacao,
  editImg1,
  editImg2,
  editImg3,
  editGenero,
  editNumVagas,
  editRepresentante,
  editRua,
  editNumeroCasa,
  editTipoImovel,
  edituserEmail,
  editIdRepublica,
} from '../../actions/AuthActions';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import styles from './styles';

export function Cartao({navigation, data}){
  const [usuarioLogado, setUsuarioLogado] = useState();

  async function preencherUserLogado() {
    await AsyncStorage.getItem('user').then(value => {
      setUsuarioLogado(JSON.parse(value));
    });
  }

  async function onClickCard(){
    await preencherUserLogado();
    const dados = data;
    var desativarBotaoAgenda = false;
    if (dados.userEmail == usuarioLogado.email) {
      desativarBotaoAgenda = true;
    }
    navigation.navigate('Detalhes', {
      dadosRepublica: dados,
      desativarBotaoAgenda,
    });
  };

    return (
      <TouchableHighlight
        underlayColor="#fff"
        onPress={() => onClickCard()}
        style={styles.touch_card}
      >
        <View style={styles.V_cartao}>
          <View style={styles.V_imagem}>
            <Image source={{ uri: data.imagem1 }} style={styles.V_imagem} />
          </View>
          <View style={styles.V_TituloDesc}>
            <View style={styles.V_titulo}>
              <Text numberOfLines={1} style={styles.txtTitulo}>
                {data.nomeRepublica}
              </Text>
            </View>
            <View style={styles.V_obs}>
              <Text numberOfLines={2}>{data.descricao}</Text>
            </View>
            <View style={styles.V_desc}>
              <View style={styles.V_valor}>
                <Icon2 style={styles.txtIcon} name="dollar-sign" />
                <Text style={styles.txtDesc}>R$ {data.valorAluguel}</Text>
              </View>
              <View style={styles.V_vagas}>
                <Icon style={styles.txtIcon} name="people" />
                <Text style={styles.txtDesc}>{data.numVagas} Vaga(s)</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
export default withNavigation(Cartao);
