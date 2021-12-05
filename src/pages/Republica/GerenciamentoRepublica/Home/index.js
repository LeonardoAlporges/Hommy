import { Input, Item } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderBack from '../../../../components/CustomHeader';
import Loading from '../../../../components/Loading';
import api from '../../../../service/api';
import {
  Apresentacao, Botao, BotaoView, CadastroView,
  Container, DadosView, EntraCodigoView, FieldSetLarge, Icone, IconeView, LabelBotao, LabelFielSet, LabelView, Linha, Separador, SubTitulo,
  Titulo
} from './styles';


export default function GerenciamentoRepublica({ navigation }) {
  const emailUser = useSelector(state => state.user.email);
  const [erro, setErro] = useState(false);
  const [nomeRepublica, setNomeRepublica] = useState('');
  const [codigoRepublica, setCodigoRepublica] = useState('');
  const [loading, setLoading] = useState(true);
  const [existeRepublica, setJaExiteRepublica] = useState(false);


  function goBackScreen() {
    navigation.goBack(null);
  }

  useEffect(() => {
    verificarSeJaCadastrou();
    if (existeRepublica) {
      navigation.navigate('MenuLateral');
    }
    setLoading(false);
  }, []);

  function entrarComCodigo() {
    const data = {
      email: emailUser
    };
    api
      .put(`/gerenciaRepublica/membros/${codigoRepublica}`, data)
      .then(response => {
        const idRepublica = response.data._id
        navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      })
  }

  function verificarSeJaCadastrou() {
    api
      .get(`/gerenciaRepublica/${emailUser}`)
      .then(response => {
        if (response.data != null) {
          setJaExiteRepublica(true);
          const idRepublica = response.data._id;
          navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
        }
        setLoading(false);
        console.log("CABOU ?")
      })
      .catch(error => {
        setErro(true);
        setLoading(false);
      })

  }

  async function cadastrarNovaRepublica() {
    setLoading(true);
    const data = {
      email: emailUser,
      nomeRepublica: nomeRepublica
    };
    await api
      .post(`/gerenciaRepublica`, data)
      .then(response => {
        console.log("Republica:", response);
        let idRepublica = response.data._id
        navigation.navigate('Gerenciamento', { idRepublica: idRepublica, codigoRepublica: response.data.numeroRepublica, nomeRepublica: response.data.republica, membros: response.data.membros });
        setLoading(false);
      })
      .catch(error => {
        setErro(true);
        setLoading(false);
      })
  }

  return (
    <Container>
      <HeaderBack title="Gerenciamento de republica" onNavigation={() => goBackScreen()} />
      {loading && <Loading />}
      <Separador>
        <CadastroView>
          <Apresentacao>
            <IconeView>
              <Icone name="home" />
            </IconeView>
            <LabelView>
              <Titulo> Não tenho uma Republica Cadastrada. </Titulo>
              <SubTitulo> Quero Cadastrar agora mesmo. </SubTitulo>
            </LabelView>
          </Apresentacao>
          <DadosView>
            <Linha>
              <FieldSetLarge>
                <LabelFielSet>Nome da república</LabelFielSet>
                <Item style={{ borderColor: 'transparent' }}>
                  <Input onChangeText={text => setNomeRepublica(text)} />
                </Item>
              </FieldSetLarge>
            </Linha>
            <BotaoView>
              <Botao onPress={() => { cadastrarNovaRepublica() }}><LabelBotao>CADASTRAR</LabelBotao></Botao>
            </BotaoView>
          </DadosView>
        </CadastroView>
        <EntraCodigoView>
          <Apresentacao>
            <IconeView>
              <Icone name="login" />
            </IconeView>
            <LabelView>
              <Titulo>Já tenho uma republica cadastrada </Titulo>
              <SubTitulo>Entrar com código de convite!</SubTitulo>
            </LabelView>
          </Apresentacao>
          <DadosView>
            <Linha>
              <FieldSetLarge>
                <LabelFielSet>Código da república</LabelFielSet>
                <Item style={{ borderColor: 'transparent' }}>
                  <Input
                    onChangeText={text => setCodigoRepublica(text)}
                  />
                </Item>
              </FieldSetLarge>
            </Linha>
            <BotaoView>
              <Botao onPress={() => entrarComCodigo()}>
                <LabelBotao>ENTRAR</LabelBotao>
              </Botao>
            </BotaoView>
          </DadosView>
        </EntraCodigoView>
      </Separador>
    </Container>
  )
}