import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import style from './styles';
import { Icon, Button } from 'native-base';
import HeaderBack from '../../../components/CustomHeader';
import CustomModal from '../../../components/Alert';

export default function Perfil({ navigation }) {
  navigationOptions = { header: null };
  const [dados, setDados] = useState(navigation.state.params.dados);
  const [update, setUpdate] = useState(navigation.state.params.update);
  const [modal, setModal] = useState(false);
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View style={style.V_header}>
        <HeaderBack title="Meus Anuncios" onNavigation={() => navigation.goBack(null)} />
        <Text style={style.title}>Perfil</Text>
      </View>
      <View style={style.V_profile}>
        <View style={style.V_imagem}>
          <Image
            style={style.V_imagem}
            source={{
              uri: dados.fotoPerfil,
            }}
          />
        </View>
      </View>
      <View style={style.V_Title}>
        <View style={style.V_nome}>
          <Text style={style.nome}>{dados.nome}</Text>
        </View>
        <View style={style.V_nota}>
          <Icon name="star" style={style.iconHeader} />
          <Text style={style.nota}>{dados.nota}</Text>
        </View>
      </View>

      <Text style={style.label}>Entre em contato</Text>
      <View style={style.barra} />
      <View style={style.V_contatos}>
        <Button style={style.botoes}>
          <Text style={style.labelbotao}>Ligar</Text>
        </Button>
        <Button
          style={style.botoes}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text style={style.labelbotao}>Enviar mensagem</Text>
        </Button>
      </View>
      {update && (
        <View style={style.V_botaoEditar}>
          <Button style={style.botoes}>
            <Text style={style.labelbotao}>Editar perfil</Text>
          </Button>
        </View>
      )}
      {modal && (
        <CustomModal
          parametro="Custom"
          titulo="Código incorreto"
          descricao="Por favor, insira o código válido"
          botao="Voltar"
          callback={() => {
            setModal(false);
          }}
        />
      )}
    </View>
  );
}
