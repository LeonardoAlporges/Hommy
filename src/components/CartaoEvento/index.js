import moment from 'moment';
import 'moment/locale/br';
import React, { useState } from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles, { Container, Data, Icone, Image, Local, Titulo, ViewDataHora, ViewImgaem, ViewInformacoes, ViewLocal, ViewTitulo } from './style';



export function CartaoEvento(props) {
  const [data, setDataViagem] = useState(moment(props.dados.data).format('DD/MM'));
  const [hora, sethoraSaida] = useState(moment(new Date(props.dados.hora)).format('HH:mm'));

  function onClickCard() {
    const dados = props.dados;
    props.navigation.navigate('DetalhesEventos', { dados });
  }

  return (
    <Container underlayColor="#fff" onPress={onClickCard}  >
      <View style={styles.V_cartao}>
        <ViewImgaem>
          <Image source={{ uri: props.dados.imagem1 }} />
        </ViewImgaem>
        <ViewInformacoes>
          <ViewTitulo>
            <Titulo>
              {props.dados.titulo}
            </Titulo>
          </ViewTitulo>
          <ViewDataHora>
            <Icone name="calendar"></Icone>
            <Data>{data} as {hora}</Data>
          </ViewDataHora>
          <ViewLocal>
            <Icone name="pin" ></Icone>
            <Local>Ainda sem</Local>
          </ViewLocal>
        </ViewInformacoes>
      </View>
    </Container>
  );
}

export default withNavigation(CartaoEvento);
