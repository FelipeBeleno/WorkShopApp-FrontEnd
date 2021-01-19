// initial state

const initialState = {
    page: false
}


const types = {
    paginaInicial: '[pagina] Pagina inicial',
    Actualizacion: '[pagina] Seleccion de pagina',
    refrescarPagina: '[pagina] Actualizacion de pagina'
}




// Reducer
export const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.Actualizacion:

            state.page = action.payload
            return state;

        case types.refrescarPagina:

            if (action.payload === null) {
                state = initialState;
                return state
            }


            state.page = action.payload
            return state;

        default:
            return state;

    }
}

export const actualizacionPagina = (estado) => {

    return async (dispatch) => {
        await localStorage.setItem('pagina', estado)

        dispatch({
            type: types.Actualizacion,
            payload: estado
        })
    }

}

export const refrescarPagina = () => {

    return async (dispatch) => {
        const pagina = await localStorage.getItem('pagina')
        dispatch({
            type: types.refrescarPagina,
            payload: pagina
        })
    }
}