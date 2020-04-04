export const selecionarItem = (item) => {
    return {
        type: 'selecionarItem',
        payload:{
            dado_selecionado: item
        }
    };
};