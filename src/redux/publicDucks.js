import moment from 'moment';
// initial state

import { rutasSinToken } from "../helpers/rutas";

const initialState = {
    active: false,
    arregloProceso: [],
    error: []
}

// types 

const types = {
    cargarArreglo: '[Public] cargar arreglo',
    clean: '[Public] limpial arreglo',
}

// reducer

export const publicReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.cargarArreglo:
            if (action.payload.error) {

                state = {
                    active: false,
                    arregloProceso: [],
                    error: [action.payload.error.mensaje]
                }
                return state;

            } else {
                state = {
                    ...state,
                    active: true,
                    arregloProceso: action.payload.servicio,
                    error: []
                }
                return state;
            }

        case types.clean:
            state = {
                active: false,
                arregloProceso: [],
                error: []
            }

            return state


        default:
            return state;
    }
}


//actions
export const obtenerProceso = (Factura) => {



    return async (dispatch) => {

        const numServicio = Number(Factura.numFactura)
        const respuesta = await rutasSinToken(`/servicio/${numServicio}`)
        const body = await respuesta.json();
        if (body?.servicio?.fechaRegistro_iso) {
            body.servicio.fechaRegistro_iso = moment(body.servicio.fechaRegistro_iso).format("DD/MM/YYYY")

        }

        dispatch({
            type: types.cargarArreglo,
            payload: body
        })
    }

}

export const cleanProceso = () => {
    return (dispatch) => {
        dispatch({
            type: types.clean,
        })
    }

}