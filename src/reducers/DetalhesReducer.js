import dados from '../Data/dado.json';

const initalState = {
    
}

const DetalhesReducer = (state = [], action) => {
    if (action.type == 'selecionarItem') {
        return { ...state, dado_selecionado: action.payload.dado_selecionado };
    }
    return state;
};

export default DetalhesReducer;