import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  background-color: #f8f8f8;
`;

export const ViewBotao = styled.View`
  margin-top: 20;
  margin-bottom: 20;
  height: 60;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const ViewDetalhes = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ViewDate = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ViewClock = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextoClock = styled.Text`
  font-family: WorkSans;
  font-weight: bold;
  font-size: 16;
  color: #142850;
  margin-right: 10;
`;

export const TextoClockPlace = styled.Text`
  font-family: WorkSans-Bold;

  font-size: 16;
  color: #989898;
  margin-right: 10;
`;

export const TextoAgendamento = styled.Text`
  color: #ffffff;
  margin-left: 15;
`;

export const ViewDescricao = styled.View`
  width: 100%;
  min-height: 100;
  padding: 0 20px 0px 20px;
  margin-top: 10;
`;

export const TextoDescricao = styled.Text`
  font-family: WorkSans;
  font-size: 14;
  color: #687368;
  margin-bottom: 25;
`;

export const ViewInputs = styled.View`
  margin-top: 20;
  width: 90%;
  height: 100;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  border-radius: 10;
  background-color: #fff;
`;

export const ViewBotaoCalendario = styled.View`
  height: 50;
  width: 50;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
`;

const style = StyleSheet.create({
  botao: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyledate: {
    paddingTop: 15,
    textAlign: 'center',
    height: 50,
    fontSize: 16,
    color: '#142850',
    fontWeight: 'bold',
    fontFamily: 'WorkSans'
  },
  botaoCalendar: {
    backgroundColor: '#142850',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  IconCaledar: {
    color: '#FFFFFF',
    fontSize: 22
  },
  IconCaledarA: {
    color: '#142850',
    fontSize: 22
  }
});
export default style;
