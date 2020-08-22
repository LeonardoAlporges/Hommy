import React, { Component, useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, Linking } from 'react-native';
import { Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import HeaderBack from '../../../components/CustomHeader';

import { connect } from 'react-redux';

import estilo from './style';
import ViewPager from '@react-native-community/viewpager';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Ionicons';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';

export default function DetalhesAnuncio({ navigation }) {
  const [usuarioJaInteressado, setUsuarioJaInteressado] = useState(navigation.state.params.interessado);
  const [ocutarBotaoAgendamento, setOcutarBotaoAgendamento] = useState(navigation.state.params.desativarBotaoAgenda);
  const [republica, setRepublica] = useState(navigation.state.params.dadosRepublica);
  const [contadorImagem, setContadorImagem] = useState(0);

  function irParaAgendamento() {
    navigation.navigate('Agendar', {
      data: republica,
    });
  }

  useEffect(() => {
    if (republica.imagem1 != '' && republica.imagem1 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    if (republica.imagem2 != '' && republica.imagem2 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    if (republica.imagem3 != '' && republica.imagem3 != null) {
      setContadorImagem(contadorImagem => contadorImagem +1);
    }
    console.log(contadorImagem);
  },[]);
  
  function renderDotIndicator() {
    return (
      <PagerDotIndicator
        dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        selectedDotStyle={{ width: 10, height: 10, borderRadius: 10 }}
        pageCount={contadorImagem}
      />
    );
  }

  return (
    <ScrollView>
      <HeaderBack ajuda title={republica.nomeRepublica} onNavigation={() => navigation.goBack(null)} />
      <IndicatorViewPager style={{ height: 300 }} indicator={renderDotIndicator()} >
        {(republica.imagem1 != '' && republica.imagem1 != null) && (
          <View key="1">
            <Image source={{ uri: republica.imagem1 }} style={estilo.image} />
          </View>
        )}
        {(republica.imagem2 != '' && republica.imagem2 != null) && (
          <View key="2">
            <Image source={{ uri: republica.imagem2 }} style={estilo.image} />
          </View>
        )}
        {(republica.imagem3 != '' && republica.imagem3 != null) && (
          <View key="3">
            <Image source={{ uri: republica.imagem3 }} style={estilo.image} />
          </View>
        )}
      </IndicatorViewPager>

      <View style={estilo.V_titulo}>
        <Text style={estilo.titulo}>{republica.nomeRepublica}</Text>
      </View>

      <View style={estilo.V_descricao}>
        <Text style={estilo.descricao}>{republica.descricao}</Text>
      </View>
      <View style={estilo.barra} />

      <View style={estilo.V_caracteristicaTitle}>
        <Text style={estilo.caracteristicaTitle}>Características</Text>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Tipo</Text>
      </View>
      <View style={estilo.V_caracteristicaItens}>
        <View style={estilo.item2}>
          <Icon name="home" style={estilo.icone} />
          <Text style={estilo.txtlabelGenero}>{republica.imovel}</Text>
        </View>
        <View style={estilo.item2}>
          <Icon name="people" style={estilo.icone} />
          <Text style={estilo.txtlabelGenero}>{republica.genero}</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Mobília do quarto</Text>
      </View>
      <View style={estilo.V_caracteristicaAcomodacao}>
        <View style={estilo.itemAcomodacao}>
          <Icon name="drawer" style={estilo.icone} />
          <Text style={estilo.txtlabel}>{republica.acomodacaoQuarto}</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Mobília e eletrodomésticos</Text>
      </View>
      <View style={estilo.V_caracteristicaAcomodacao}>
        <View style={estilo.itemAcomodacao}>
          <Icon name="screen-desktop" style={estilo.icone} />
          <Text style={estilo.txtlabel}>{republica.acomodacaoRepublica}</Text>
        </View>
      </View>

      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Disponibilidade</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon name="user-follow" style={estilo.icone} />
          <Text style={estilo.txtlabel}>{republica.numVagas} Vaga(s)</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Endereço</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon name="location-pin" style={estilo.icone} />
          <Text style={estilo.txtlabel}>
            {republica.rua}, {republica.bairro}, Nº
            {republica.numeroCasa}
          </Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Representante</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon name="user" style={estilo.icone} />
          <Text style={estilo.txtlabel}>{republica.representante}</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Valor médio das contas</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon name="chart" style={estilo.icone} />
          <Text style={estilo.txtlabel}>R$ {republica.valorContas}</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Valor Aluguel</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon2 name="dollar-sign" style={estilo.icone} />
          <Text style={estilo.txtlabel}>R$ {republica.valorAluguel}</Text>
        </View>
      </View>
      <View style={estilo.V_tipo}>
        <Text style={estilo.tipo}>Aceita animais?</Text>
      </View>
      <View style={estilo.V_vagas}>
        <View style={estilo.vagas}>
          <Icon4 name="md-paw" style={estilo.iconeAnimal} />
          <Text style={estilo.txtlabel}>{republica.animal}</Text>
        </View>
      </View>
      {!usuarioJaInteressado && !ocutarBotaoAgendamento ? (
        <View style={estilo.V_botao}>
          <Button
            style={estilo.botao}
            onPress={() => {
              irParaAgendamento();
            }}
          >
            <Text style={estilo.txtWhatsapp}>Agendar uma visita</Text>
          </Button>
        </View>
      ) : (
        <View style={{ height: 30 }} />
      )}
    </ScrollView>
  );
}
