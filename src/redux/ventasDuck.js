import { rutasConToken } from "../helpers/rutas"


const initialState = {

    estado: false,
    ventas: []

}

const types = {

    consultarVentas: '[Servicio] Consultar servicios solo de ventas',

}

export const ventasReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.consultarVentas:

            state = {
                estado: true,
                ventas: action.payload
            }
            return state

            

        default:
            return state
    }
}


export const consultarVentas = () => {

    return async (dispatch) => {
        const respuesta = await rutasConToken('/servicios/ventas/consultas')
        const body = await respuesta.json()

        dispatch({
            type: types.consultarVentas,
            payload: body.ventas
        })
    }
}
