// initial state

import Swal from "sweetalert2";
import { rutasConToken } from "../helpers/rutas";


const initialState = {
    estado: false,
    servicios: '',

}


// Types

const types = {
    crearServicioVenta: '[Servicio] Crear servicio de venta',
    consultarVentas: '[Servicio] Consultar servicios solo de ventas',
    consultaClientePDF: '[Servicio] consulta servicio Cliente PDF',
    limpiarServicio: '[Servicio] limpiar Servicio'
}


//Reducer

export const serviciosReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.crearServicioVenta:


            state = {
                ...state,
                estado: true,
                servicios: action.payload.servicio
            }
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Servicio registrado',
                showConfirmButton: false,
                timer: 3000
            })

            return state;
        case types.consultaClientePDF:
            state = {
                estado: true,
                servicios: action.payload
            }
            return state;
        case types.limpiarServicio:
            state = initialState;

            return state

        default:
            return state;
    }

}

//Actions

export const crearServicioVenta = (datos, productos) => {


    return async (dispatch) => {

        // hay que hacer una consulta al cliente por cedula
        const respuesta = await rutasConToken(`/cliente/cedula/${datos.cliente}`)
        const body = await respuesta.json();


        if (datos.tipoServicio === 'VENTA') {


            const resultadoFiltradoProd = productos.map(element => {

                return ({ "producto": element._id, "cantidad": Number(element.cantidad), "precioUnidad": element.precio, "totalCompraItem": element.totalCompraItem, "nombreObjeto": element.nombre })
            })

            const observaciones = {
                obj: datos.observaciones
            }


            const dataVenta = {
                tipoServicio: datos.tipoServicio,
                precioTotal: datos.precioTotal,
                cliente: body.cliente._id,
                objetos: resultadoFiltradoProd,
                observaciones: observaciones,
                numConsulta: datos.cliente,
                procedimientos: productos
            }


            const envioDatosServicioVenta = await rutasConToken('/servicio', dataVenta, 'POST')
            const bodyServicio = await envioDatosServicioVenta.json()

            dispatch({
                type: types.crearServicioVenta,
                payload: bodyServicio
            })


        } else if (datos.tipoServicio === 'ARREGLO') {

            const resultadoProcedimientos = productos.map(ele => {
                return ({ "procedimientos": ele._id, "nombre": ele.nombre, "descripcion": ele.descripcion, "precio": ele.precio })
            })

            let observaciones;
            if (datos.observaciones) {

                observaciones = {
                    obj: datos.observaciones
                }
            }
            const dataServicio = {
                tipoServicio: datos.tipoServicio,
                precioTotal: datos.precioTotal,
                cliente: body.cliente._id,
                objetos: [],
                observaciones: observaciones || [],
                numConsulta: datos.cliente,
                procedimientos: resultadoProcedimientos,
                procesoServicio: datos.procesoServicio
            }
            const envioDatosServicioVenta = await rutasConToken('/servicio', dataServicio, 'POST')
            const bodyServicio = await envioDatosServicioVenta.json()
            dispatch({
                type: types.crearServicioVenta,
                payload: bodyServicio
            })



        }




    }
}
export const consultarFacturaCliente = (id) => {

    return async (dispatch) => {
        const respuesta = await rutasConToken(`/servicios/clientes/ventas/${id}`)
        const body = await respuesta.json()

        if (body.ok === false) {
            Swal.fire({
                title: 'Error',
                text: 'Id invalido',
                icon: 'error'
            })
        } else {
            dispatch({
                type: types.consultaClientePDF,
                payload: body.venta
            })
        }
    }
}

export const cleanService = () => {
    return (dispatch) => {
        dispatch({
            type: types.limpiarServicio,
            payload: []
        })
    }
}