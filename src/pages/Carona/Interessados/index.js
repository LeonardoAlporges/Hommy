import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import CustomModal from '../../../components/Alert';
import CartaoUser from '../../../components/CartaoUser';
import HeaderBack from '../../../components/CustomHeader';
import EmptyState from '../../../components/EmptyState';
import Loading from '../../../components/Loading';
import ModalAvaliacao from '../../../components/ModalAvaliacao';
import api from '../../../service/api';
import { BarraSeparacao, BotaoAnalise, BotaoConfirmado, BotaoRejeitado, Container, Label, LabelAnalise, LabelConfirmado, LabelRejeitado, Subtitulo, V_Label, V_StatusInteresse, V_Subtitulo } from './styles';




export default function Interessados({ navigation }) {

  const [erro, setErro] = useState(false);
  const [erroVaga, setErroVaga] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [reload, setReload] = useState();
  const [idCarona, setIdCarona] = useState(navigation.state.params.idCarona);
  const [avaliar,setAvaliar] = useState(false);
  const [usuarioAvaliado,setUsuarioAvaliado] = useState('');

  useEffect(() => {
    setUsuarios([]);
    buscarListaInteressado();
  }, [reload]);

  function buscarListaInteressado() {    
    setLoading(true);
    api
      .get(`/carona/confirmar/${idCarona}`)
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        setErro(true);
        setLoading(false);
      });
  }

  function alterarStatusInteressado(number, user) {
    setLoading(true);
    if (number === 1) {
      confirmarInteressado(user);
    } else if (number === 0) {
      recusarInteressado(user);
    }
  }

  function abrirAvaliacao(usuario){
    setAvaliar(true);
    setUsuarioAvaliado(usuario);
  }

  function recusarInteressado(user) {
    const data = {
      email: user,
      status: 'Rejeitado',
    };
    setLoading(true);
    api
      .put(`/carona/confirmar/${idCarona}`, data)
      .then(response => {
        setLoading(false);
        setReload(!reload);
      })
      .catch(error => {
        setLoading(false);
        setErro(true);
      });

  }

  function confirmarInteressado(user) {
    const data = {
      email: user,
      status: 'Confirmado',
    };
    setLoading(true);
    api
      .put(`/carona/confirmar/${idCarona}`, data)
      .then(response => {
        setLoading(false);
        setReload(!reload);
      })
      .catch(error => {
        if (error.response.data.code == 205) {
          setErroVaga(true);
        }
        setLoading(false);
        setErro(true);
      });
  }

  return (
    <Container>
      <HeaderBack title="Solicitações" onNavigation={() => navigation.goBack(null)} />
      {loading && <Loading />}
      {usuarios.length == 0 && (
        <EmptyState
          titulo="Ah não! "
          mensagem="Sua carona ainda não foi solicitada por nenhum usuário. Aguarde, logo você encontrará um parceiro para sua viagem."
        />
      )}
      <ScrollView>
        <V_Subtitulo>
          <Subtitulo >
            Logo abaixo estão listadas as pessoas que demonstraram interesse em viajar com você.
          </Subtitulo>
        </V_Subtitulo>
        <V_Label>
          <Label>Interessados</Label>
          <BarraSeparacao/>
        </V_Label>
          <FlatList
            data={usuarios}
            renderItem={({ item }) => (
              <View>
                <CartaoUser
                  status={item.status}
                  callback={() => setReload()}
                  retornoCarona={(number, user) => alterarStatusInteressado(number, user)}
                  dados={item.user}
                  dadosGerais={item}
                  tipoRetorno="Carona"
                />
                <V_StatusInteresse>
                  {item.status == 'Confirmado' && (
                    <BotaoConfirmado>
                      <LabelConfirmado>Confirmada</LabelConfirmado>
                    </BotaoConfirmado>
                  )}
                  {item.status == 'Análise' && (
                    <BotaoAnalise>
                      <LabelAnalise>Em análise</LabelAnalise>
                    </BotaoAnalise>
                  )}
                  {item.status == 'Rejeitado' && (
                    <BotaoRejeitado>
                      <LabelRejeitado>Rejeitada </LabelRejeitado>
                    </BotaoRejeitado>
                  )}
                  {item.status == 'Finalizado' && (
                    <Finalizado>
                      <LabelFinalizado onPress={()=>{abrirAvaliacao(item.user.email)}}>Avaliar Anunciante</LabelFinalizado>
                    </Finalizado>
                  )}
                  
                </V_StatusInteresse>
              </View>
            )}
            keyExtractor={item => item._id}
          />
      </ScrollView>
      {erro && (
        <CustomModal
          parametro="Erro"
          descricao="Opss! Ocorreu um erro estranho :O"
          callback={() => {
            setErro(false);
          }}
        />
      )}
      {erroVaga && (
        <CustomModal
          parametro="Erro"
          descricao="Não há mais vagas nessa carona!"
          callback={() => {
            setErroVaga(false);
          }}
        />
      )}
        {avaliar && (
        <ModalAvaliacao usuario={usuarioAvaliado}></ModalAvaliacao>
      )}
    </Container>
  );
}
