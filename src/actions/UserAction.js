export const editNome = newNome => {
  return {
    type: 'editNome',
    payload: {
      usuario: newNome,
    },
  };
};
export const editEmail = newEmail => {
  return {
    type: 'editEmail',
    payload: {
      email: newEmail,
    },
  };
};
export const editCpf = newCpf => {
  return {
    type: 'editCpf',
    payload: {
      cpf: newCpf,
    },
  };
};
export const editIdUser = newId => {
  return {
    type: 'editIdUser',
    payload: {
      idUser: newId,
    },
  };
};
export const editTelefone = newTell => {
  return {
    type: 'editTelefone',
    payload: {
      telefone: newTell,
    },
  };
};
export const editFoto = newfoto => {
  return {
    type: 'editFoto',
    payload: {
      fotoPerfil: newfoto,
    },
  };
};
export const editLogado = newLogado => {
  return {
    type: 'editLogado',
    payload: {
      logado: newLogado,
    },
  };
};
export const editNota = newNota => {
  return {
    type: 'editNota',
    payload: {
      notaUser: newNota,
    },
  };
};
