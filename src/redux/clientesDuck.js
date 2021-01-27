import { rutasConToken } from "../helpers/rutas";

import Swal from 'sweetalert2'

//initial State
const initialState = {
    data: false,
    clientes: []
}


//types
const types = {
    obtenerClientes: '[Clientes] obtener todos los Clientes',
    modificarCliente: '[Clientes] modificar un cliente',
    eliminarCliente: '[Clientes] Eliminar un cliente',
    crearCliente: '[Clientes] Crear cliente',
    obtenerUnCliente: '[Clientes] Solo un cliente',
}


// reducer
export const clientesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.obtenerClientes:
            state = { ...state, clientes: [...action.payload.cliente.docs], data: true }
            return state;

        case types.modificarCliente:
            const modifidedClientes = state.clientes.map(cli => {
                return cli._id === action.payload.cliente._id ?
                    action.payload.cliente
                    : cli
            });
            return { ...state, clientes: modifidedClientes, data: true };

        case types.eliminarCliente:
            const withoutDeleted = state.clientes.filter(cli => {
                return cli._id !== action.payload.clienteActualizado._id
            });
            return { ...state, clientes: withoutDeleted, data: true };

        case types.crearCliente:

            state = {
                ...state,
                clientes: [...state.clientes, action.payload.cliente], data: true
            }
            return state;

        case types.obtenerUnCliente:

            state = {
                data: true,
                clientes: [action.payload]
            }

            return state;

        default:
            return state;
    }

}

// obtener clientes
export const obtenerClientes = () => {

    return async (dispatch) => {
        const respuestaDatos = await rutasConToken('/cliente');
        let body = await respuestaDatos.json()
        if (body.mensaje) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: body.mensaje
            })
        } else {
            dispatch({
                type: types.obtenerClientes,
                payload: body
            })
        }


    }
}

// eliminar cliente
export const eliminarCliente = (data) => {
    return async (dispatch) => {
        const respuestaDatos = await rutasConToken(`/cliente/${data._id}`, {}, 'DELETE')
        const body = await respuestaDatos.json()
        dispatch({
            type: types.eliminarCliente,
            payload: body
        })
    }
}

export const modificarCliente = (data) => {
    return async (dispatch) => {
        const respuestaDatos = await rutasConToken(`/cliente/${data._id}`, { data }, 'PUT')
        const body = await respuestaDatos.json()
        console.log(body)
        dispatch({
            type: types.modificarCliente,
            payload: body
        })
    }
}



//Crear Usuario
export const crearCliente = (data) => {
    return async (dispatch) => {
        const response = await rutasConToken('/cliente', data, 'POST');
        const body = await response.json();

        if (body.ok) {
            dispatch({
                type: types.crearCliente,
                payload: body
            })

            Swal.fire({
                title: 'Exitoso',
                text: 'Cliente guardado',
                icon: 'success'
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verifique que el numero de documento no este registrado'
            })
        }
    }
}

export const soloUnCliente = (id) => {

    return async (dispatch) => {

        const respuesta = await rutasConToken(`/cliente/${id}`)
        const body = await respuesta.json();

        dispatch({
            type: types.obtenerUnCliente,
            payload: body.cliente
        })

    }

}