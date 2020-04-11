export const editNomeRepublica = (newNomeRepublica) => {
    return{
        type:'editNomeRepublica',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            nomeRepublica:newNomeRepublica
        }
    };
};

export const editValor = ( newValorAluguel ) =>{
    return{
        type:'editValorAluguel',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            valorAluguel:newValorAluguel
        }
    }
};

export const editBairro = ( newBairro ) =>{
    return{
        type:'editBairro',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            bairro:newBairro
        }
    }
};
export const editPessoas = ( newPessoas ) =>{
    return{
        type:'editPessoas',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            pessoas:newPessoas
        }
    }
};
export const editDescricao = ( newDescricao ) =>{
    return{
        type:'editDescricao',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            descricao:newDescricao
        }
    }
};
export const editAnimal = ( newAnimal ) =>{
    return{
        type:'editAnimal',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            animal:newAnimal
        }
    }
};
export const editAcomodacaoQuarto = ( newAcomodacaoQuarto ) =>{
    return{
        type:'editAcomodacaoQuarto',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            acomodacaoQuarto:newAcomodacaoQuarto
        }
    }
};
export const editAcomodacaoRepublica = ( newAcomodacaoRepublica) =>{
    return{
        type:'editAcomodacaoRepublica',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            acomodacaoRepublica:newAcomodacaoRepublica
        }
    }
};
export const editValorConta = ( newContaR ) =>{
    return{
        type:'editValorConta',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            valorContas:newContaR
        }
    }
};
export const editObservacao = ( newObs ) =>{
    return{
        type:'editObservacao',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            observacao:newObs
        }
    }
};
export const selecionarItem = ( item,b ) => {
    return {
        type:'selecionarItem',
        payload:{
            titulo: item.titulo,
            valor: item.valor,
            

        }
    }
};
export const editImg1 = ( newImg1 ) =>{
    return{
        type:'editImg1',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            imagem1:newImg1
        }
    }
};
export const editImg2 = ( newImg2 ) =>{
    return{
        type:'editImg2',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            imagem2:newImg2
        }
    }
};
export const editImg3 = ( newImg3 ) =>{
    return{
        type:'editImg3',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            imagem3:newImg3
        }
    }
};



export const editGenero = ( newGenero ) =>{
    return{
        type:'editGenero',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            genero:newGenero
        }
    }
};

export const editNumVagas = ( newVagas ) =>{
    return{
        type:'editNumVagas',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            numVagas:newVagas
        }
    }
};
export const editRepresentante = ( newRepresentante ) =>{
    return{
        type:'editRepresentante',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            representante:newRepresentante
        }
    }
};

export const editRua = ( newRua ) =>{
    return{
        type:'editRua',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            rua:newRua
        }
    }
};

export const editNumeroCasa = ( newNumhouse ) =>{
    return{
        type:'editNumeroCasa',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            numeroCasa:newNumhouse
        }
    }
};





