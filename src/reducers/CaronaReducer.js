const initialState = {
  nome: '',
  saida: '',
  chegada: '',
  data: '',
  valor: '',
  Hsaida: '',
  HChegada: '',
  embarque: '',
  desembarque: '',
  vagas: '',
  imagem: '',
  notaCarona: '',
};

const CaronaReducer = (state = [], action) => {
  if (state.length == 0) {
    return initialState;
  }
  if (action.type == 'editNomeOfertante') {
    return { ...state, nome: action.payload.nome };
  }

  if (action.type == 'editSaida') {
    return { ...state, saida: action.payload.saida };
  }
  if (action.type == 'editChegada') {
    return { ...state, chegada: action.payload.chegada };
  }
  if (action.type == 'editData') {
    return { ...state, data: action.payload.data };
  }
  if (action.type == 'editValor') {
    return { ...state, valor: action.payload.valor };
  }
  if (action.type == 'editHSaida') {
    return { ...state, Hsaida: action.payload.Hsaida };
  }
  if (action.type == 'editHChegada') {
    return { ...state, HChegada: action.payload.HChegada };
  }
  if (action.type == 'editEmbarque') {
    return { ...state, embarque: action.payload.embarque };
  }
  if (action.type == 'editDesembarque') {
    return { ...state, desembarque: action.payload.desembarque };
  }
  if (action.type == 'editVagas') {
    return { ...state, vagas: action.payload.vagas };
  }
  if (action.type == 'editImagem') {
    return { ...state, imagem: action.payload.imagem };
  }
  if (action.type == 'editNotaCarona') {
    return { ...state, notaCarona: action.payload.notaCarona };
  }

  return state;
};

export default CaronaReducer;
