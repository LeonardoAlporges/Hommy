import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CadastroUsuario from './pages/Acesso/CadastroUsuario';
import EsqueciSenha from './pages/Acesso/EsqueciSenha';
import Login from './pages/Acesso/Login';
import ValidarCodigo from './pages/Acesso/ValidarCodigo';
import CadastroCaronas from './pages/Carona/CadastroCarona';
import Caronas from './pages/Carona/Caronas';
import DetalhesCarona from './pages/Carona/DetalhesCarona';
import Interessados from './pages/Carona/Interessados';
import Viagens from './pages/Carona/Viagens';
import Anuncios from './pages/Geral/Anuncios';
import TabsHeader from './pages/Geral/Home';
import MenuLateral from './pages/Geral/Menu';
import Perfil from './pages/Geral/Perfil';
import RenderApp from './pages/Geral/RenderApp/RenderApp';
import SplashScreen from './pages/Geral/SplashScreen';
import TelefoneUteis from './pages/Geral/TelefoneUteis';
import Agendamentos from './pages/Republica/Agendamentos';
import AgendamentoUser from './pages/Republica/AgendamentosUser';
import Agendar from './pages/Republica/Agendar';
import Cadastro from './pages/Republica/Cadastro/index';
import DetalhesAnuncio from './pages/Republica/DetalhesAnuncio';
import CadastroEvento from './pages/Republica/Eventos/CadastroEvento/CadastroEvento';
import DetalhesEventos from './pages/Republica/Eventos/DetalhesEventos';
import Gerenciamento from './pages/Republica/GerenciamentoRepublica/Gerenciamento';
import AgendarVisitaProduto from './pages/Republica/Produtos/AgendarVisita';
import CadastroProduto from './pages/Republica/Produtos/CadastroProdutos/CadastroProduto';
import DetalhesProduto from './pages/Republica/Produtos/DetalhesProduto';
import InteressadosProduto from './pages/Republica/Produtos/Interessados';
import Republica from './pages/Republica/Republica';
import AgendarVisitaServico from './pages/Servicos/AgendarVisita';
import CadastroServico from './pages/Servicos/Cadastro';
import DetalhesServicos from './pages/Servicos/DetalhesServico';
import InteressadosServico from './pages/Servicos/Interessados';
import Servicos from './pages/Servicos/Servicos';
import GerenciamentoRepublica from './pages/Republica/GerenciamentoRepublica/Home'

const Navegação = createStackNavigator(
  {
    RenderApp: {
      screen: TabsHeader,
      navigationOptions: {
        headerLeft: null
      }
    },
    TabsHeader: {
      screen: TabsHeader,
      navigationOptions: {
        headerLeft: null
      }
    },

    DetalhesServicos: DetalhesServicos,
    Detalhes: DetalhesAnuncio,
    DetalhesEventos,
    Login: Login,
    CadastroUsuario: CadastroUsuario,
    ValidarCodigo,
    TelefoneUteis,
    AgendamentoUser,
    Agendamentos,
    Agendar,
    EsqueciSenha,
    Perfil,
    Viagens,
    Anuncios,
    Interessados,
    CadastroCaronas,
    DetalhesCarona,
    Caronas,
    Anuncios,
    Gerenciamento,
    Republica,
    Servicos,
    Cadastro,
    SplashScreen,
    CadastroEvento,
    CadastroProduto,
    CadastroServico,
    DetalhesProduto,
    MenuLateral,
    AgendarVisitaProduto,
    AgendarVisitaServico,
    InteressadosProduto,
    InteressadosServico,
    GerenciamentoRepublica,
  },
  {
    initialRouteName: 'RenderApp',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(Navegação);
