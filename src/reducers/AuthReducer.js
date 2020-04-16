const initialState = {
  nomeRepublica: 'Republica lan house',
  valorAluguel: '270,00',
  genero: 'Mista',
  numVagas: '3',
  representante: 'Leonardo Alporges',
  bairro: 'Centro',
  rua: 'Rua Jose Almeida',
  numeroCasa: '32',
  pessoas: '1',
  descricao: 'Ambiente Tranquilo',
  animal: 'Nao',
  acomodacaoQuarto: 'Cama,Ventilador,pscina',
  acomodacaoRepublica: 'Fogao,Sofa ,Geladeira',
  valorContas: '80,00R$',
  observacao: 'Sem Observaçoes',
  imagem1: '',
  imagem2: '',
  imagem3: '',
};

const AuthReducer = (state = [], action) => {
  if (state.length == 0) {
    return initialState;
  }
  if (action.type == 'editLogado') {
    return { ...state, logado: action.payload.logado };
    // . . .State pega as informaçoes do state e substitui por aquilo que esta depois da virgula
  }
  //Recebe a acion do parametro e verifica se é a mesma
  if (action.type == 'editNomeRepublica') {
    return { ...state, nomeRepublica: action.payload.nomeRepublica };
    // . . .State pega as informaçoes do state e substitui por aquilo que esta depois da virgula
  }
  if (action.type == 'editValorAluguel') {
    return { ...state, valorAluguel: action.payload.valorAluguel };
  }
  if (action.type == 'editBairro') {
    return { ...state, bairro: action.payload.bairro };
  }
  if (action.type == 'editPessoas') {
    return { ...state, pessoas: action.payload.pessoas };
  }
  if (action.type == 'editDescricao') {
    return { ...state, descricao: action.payload.descricao };
  }
  if (action.type == 'editAnimal') {
    return { ...state, animal: action.payload.animal };
  }
  if (action.type == 'editAcomodacaoQuarto') {
    return { ...state, acomodacaoQuarto: action.payload.acomodacaoQuarto };
  }
  if (action.type == 'editAcomodacaoRepublica') {
    return {
      ...state,
      acomodacaoRepublica: action.payload.acomodacaoRepublica,
    };
  }
  if (action.type == 'editValorConta') {
    return { ...state, valorContas: action.payload.valorContas };
  }
  if (action.type == 'editObservacao') {
    return { ...state, observacao: action.payload.observacao };
  }
  if (action.type == 'editImg1') {
    return { ...state, imagem1: action.payload.imagem1 };
  }
  if (action.type == 'editImg2') {
    return { ...state, imagem2: action.payload.imagem2 };
  }
  if (action.type == 'editImg3') {
    return { ...state, imagem3: action.payload.imagem3 };
  }
  if (action.type == 'editGenero') {
    return { ...state, genero: action.payload.genero };
  }
  if (action.type == 'editNumVagas') {
    return { ...state, numVagas: action.payload.numVagas };
  }
  if (action.type == 'editRepresentante') {
    return { ...state, representante: action.payload.representante };
  }
  if (action.type == 'editRua') {
    return { ...state, rua: action.payload.rua };
  }
  if (action.type == 'editNumero') {
    return { ...state, numeroCasa: action.payload.numeroCasa };
  }

  return state;
};

export default AuthReducer;
