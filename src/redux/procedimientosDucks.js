import { rutasConToken } from "../helpers/rutas";


const initialState = {
    estado: false,
    procedimiento: []
}


const types = {
    obtenerPrecedimientos: '[Procedimientos] cargar procedimientos'
}


export const procedimientosReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.obtenerPrecedimientos:
            state = {
                estado: true,
                procedimiento: action.payload
            }
            return state
        default:
            return state;
    }
}



export const obtenerProcedimientos = () => {
    return async (dispatch) => {
        const respuesta = await rutasConToken('/procedimiento');
        const body = await respuesta.json()
        dispatch({
            type: types.obtenerPrecedimientos,
            payload: body.procedimiento
        })
    }
}


