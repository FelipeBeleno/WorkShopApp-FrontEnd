import { rutasConToken } from "../helpers/rutas"


const initialState = {

    estado: false,
    ventas: []

}

const types = {

    consultarVentas: '[VENTAS/SERVICIOS$] Consultar servicios solo de ventas',
    consultaInactivo: '[VENTAS/SERVICIOS$] Consultar servicios solo de ventas',
    eliminarVentas: '[VENTAS/SERVICIOS$] eliminar venta o servicio',
}

export const ventasReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.consultarVentas:

            state = {
                estado: true,
                ventas: action.payload
            }
            return state

        case types.eliminarVentas:

            const resultado = state.ventas.filter(ele => {
                return ele._id !== action.payload._id
            })

            state = {
                ...state,
                ventas: resultado
            }
            return state;

        case types.consultaInactivo:

            state = {
                ...state,
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

export const consultarArreglos = () => {
    return async (dispatch) => {
        const respuesta = await rutasConToken(`/servicio/arreglo/activo`)
        const body = await respuesta.json()

        dispatch({
            type: types.consultarVentas,
            payload: body.servicios
        })
    }
}
export const consultarArreglosInactivos = () => {
    return async (dispatch) => {
        const respuesta = await rutasConToken('/servicio/arreglo/inactivo')
        const body = await respuesta.json()

        dispatch({
            type: types.consultaInactivo,
            payload: body.servicios
        })
    }
}

export const eliminarVentaServicio = (id) => {
    return async (dispatch) => {

        const respuesta = await rutasConToken(`/servicio/borrar/${id}`, {}, 'DELETE')
        const body = await respuesta.json()
        dispatch({
            type: types.eliminarVentas,
            payload: body.servicio
        })
    }
}
