export const editTitulo = (newTitulo) => {
    return{
        type:'editTitulo',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            titulo:newTitulo
        }
    };
};

export const editValor = ( newValor ) =>{
    return{
        type:'editValor',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            valor:newValor
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
export const editDesc = ( newDesc ) =>{
    return{
        type:'editDesc',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            desc:newDesc
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
export const editMovelQuarto = ( newMovelQ ) =>{
    return{
        type:'editMovelQuarto',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            movelQuarto:newMovelQ
        }
    }
};
export const editMovelComun = ( newMovelC ) =>{
    return{
        type:'editMovelComun',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            moveisComun:newMovelC
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
export const editImg = ( newImg ) =>{
    return{
        type:'editImg',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            imagem:newImg
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
export const editRedeSocial = ( newRede ) =>{
    return{
        type:'editRedeSocial',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            redeSocial:newRede
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

export const editNumero = ( newNumhouse ) =>{
    return{
        type:'editNumero',//nome da açao
        payload:{//Aqui é as informaçoes que vc ta enviando no caso aqui é so email
            numero:newNumhouse
        }
    }
};





