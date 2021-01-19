import { rutasSinToken, rutasConToken } from "../helpers/rutas"

import Swal from 'sweetalert2'


//const data inicial 


const initialState = {
    checkUsuario: true
}

//TYPES
const types = {

    validacionFinalState: `[sesion] Checking final validacion`,
    validacionFinalToken: `[sesion] Checking false Token`,
    validacionStartLogin: `[sesion] Checking sesion state`,
    validacionTokenNew: `[sesion] Crear nuevo Token`,
    logout: `[sesion] Finalizacion de sesion`

}

// Reducer
export const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.validacionStartLogin:
            state = {
                ...state,
                ...action.payload,
                checkUsuario: false
            }
            return state;


        case types.validacionFinalToken:
            state = {
                ...state,
                checkUsuario: false
            }
            return state;

        case types.logout:
            state = {
                checkUsuario: true
            }

            return state;

        default:
            return state;
    }

}

// actions !!!
export const validacionStartLogin = (data) => {

    return async (dispatch) => {
        const respuesta = await rutasSinToken('/login', data, 'POST');
        const body = await respuesta.json();

        if (body.ok) {

            localStorage.setItem('token', body.token)

            dispatch({
                type: types.validacionStartLogin,
                payload: body.Usuario
            })


        } else {
            return Swal.fire({
                title: 'Error',
                text: body.mensaje,
                icon: 'error'
            })
        }


    }
}

export const ReNewToken = () => {
    return async (dispatch) => {

        const respuesta = await rutasConToken('/login');
        const body = await respuesta.json();
        if (body.ok) {

            localStorage.setItem('token', body.token)

            dispatch({
                type: types.validacionStartLogin,
                payload: body.Usuario
            })

        } else {
            dispatch({
                type: types.validacionFinalState
            })
        }


    }
}

export const inicioCierreSesion = () => {

    return (dispatch) => {
        localStorage.clear();

        dispatch({
            type: types.logout
        })
    }
}