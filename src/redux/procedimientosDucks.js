import { rutasConToken } from "../helpers/rutas";
import Swal from 'sweetalert2'

const initialState = {
    estado: false,
    procedimiento: []
}

const types = {
    obtenerPrecedimientos: '[Procedimientos] cargar procedimientos',
    crearProcedimientos: '[Procedimientos] crear procedimiento',
    actualizarProcedimientos: '[Procedimientos] actualizar procedimiento',
    eliminarProcedimientos: '[Procedimientos] eliminar procedimiento'

}

export const procedimientosReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.obtenerPrecedimientos:
            state = {
                estado: true,
                procedimiento: action.payload
            }
            return state


        case types.crearProcedimientos:
            state = {
                ...state,
                procedimiento: [...state.procedimiento, action.payload]
            }
            return state;

        case types.actualizarProcedimientos:
            const res = state.procedimiento.filter(elem => {
                return elem._id !== action.payload._id
            })
            res.push(action.payload)
            state = {
                ...state,
                procedimiento: res
            }
            return state

        case types.eliminarProcedimientos:
            const resD = state.procedimiento.filter(ele => {
                return ele._id !== action.payload._id
            })
            state = {
                ...state,
                procedimiento: resD
            }
            return state;

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

export const crearProcedimientos = (data) => {


    return async (dispatch) => {
        const respuesta = await rutasConToken('/procedimiento', data, 'POST')
        const body = await respuesta.json()

        if (body.error?.errors?.precio) {
            return Swal.fire({
                title: 'Error',
                text: 'El campo PRECIO debe ser numerico',
                icon: 'error'
            })
        } else {

            dispatch({
                type: types.crearProcedimientos,
                payload: body.procedimiento
            })
        }

    }
}



export const actualizarProcedimientos = (data) => {

    return async (dispatch) => {
        const respuesta = await rutasConToken(`/procedimiento/${data._id}`, data, 'PUT')
        const body = await respuesta.json()


        try {

            dispatch({
                type: types.actualizarProcedimientos,
                payload: body.procedimiento
            })
        } catch (error) {
            return Swal.fire({
                title: 'Error',
                text: ' Valida el campo precio debe ser numerico',
                icon: 'error'
            })
        }
    }
}

export const eliminarProcedimiento = (data) => {
    console.log(data)
    return async (dispatch) => {
        const respuesta = await rutasConToken(`/procedimiento/${data._id}`, data, 'DELETE')
        const body = await respuesta.json()

        dispatch({
            type: types.eliminarProcedimientos,
            payload: body.documentoElimindo
        })
    }
}
