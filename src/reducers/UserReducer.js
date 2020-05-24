const initialState = {
  usuario: 'Padrao ?',
  email: '',
  cpf: '',
  idUser: '',
  telefone: '',
  fotoPerfil: '',
  logado: '',
  notaUser: '5.0',
};

const UserReducer = (state = [], action) => {
  if (state.length == 0) {
    return initialState;
  }
  if (action.type == 'editNome') {
    return { ...state, usuario: action.payload.usuario };
  }
  if (action.type == 'editEmail') {
    return { ...state, email: action.payload.email };
  }
  if (action.type == 'editCpf') {
    return { ...state, cpf: action.payload.cpf };
  }
  if (action.type == 'editIdUser') {
    return { ...state, idUser: action.payload.idUser };
  }
  if (action.type == 'editTelefone') {
    return { ...state, telefone: action.payload.telefone };
  }
  if (action.type == 'editFoto') {
    return { ...state, fotoPerfil: action.payload.fotoPerfil };
  }
  if (action.type == 'editLogado') {
    return { ...state, logado: action.payload.logado };
  }
  if (action.type == 'editNota') {
    return { ...state, notaUser: action.payload.notaUser };
  }

  return state;
};

export default UserReducer;
