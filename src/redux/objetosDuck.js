import { rutasConToken } from "../helpers/rutas";

import Swal from 'sweetalert2'

//initial State
const initialState = {
    data: false,
    objetos: [],
    objetosPorAcabar: []
}


//types
const types = {
    obtenerObjetos: '[Objetos] obtener todos los objetos',
    eliminarObjetos: '[Objetos] Eliminar objeto',
    crearObjeto: '[Objetos] Crear objeto',
    consultaObjetosCant: '[Objetos] cantidad de objetos',
    editarObjeto: '[Objetos] editar objeto'

}


// reducer
export const objetosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.obtenerObjetos:
            state = { ...state, objetos: [...action.payload.objeto], data: true }
            return state;

        case types.eliminarObjetos:

            const dataresult = state.objetos.filter(dat => {
                return dat._id !== action.payload._id
            })

            state = {
                ...state, objetos: [...dataresult], data: true
            }
            return state;

        case types.crearObjeto:

            state = {
                ...state,
                objetos: [...state.objetos, action.payload.objeto], data: true
            }
            return state;


        case types.editarObjeto:

            const arrEdit = state.objetos.filter(ele => {
                return ele._id !== action.payload._id
            })
            arrEdit.push(action.payload)

            state = {
                ...state,
                objetos: arrEdit
            }

            return state;

        case types.consultaObjetosCant:

            let objetosAcabar = []

            state.objetos.forEach(ele => {

                if (ele.cantidadDisponible <= 5) {
                    objetosAcabar.push({ nombre: ele.nombre, stock: ele.cantidadDisponible })
                }

            })

            state = {
                ...state,
                objetosPorAcabar: objetosAcabar
            }

            return state;

        default:
            return state;
    }

}


export const editaObjeto = (data) => {

    return async (dispatch) => {

        delete data.estado
        const respuesta = await rutasConToken(`/objeto/${data._id}`, data, 'PUT')
        const body = await respuesta.json()
        if (body.ok) {
            dispatch({
                type: types.editarObjeto,
                payload: body.objeto
            })
        } else {

            return Swal.fire({
                title: 'Error',
                text: 'El campo cantidad y/o precio deben ser numericos',
                icon: "error"
            })
        }
    }
}

// obtener objetos
export const obtenerObjetos = () => {

    return async (dispatch) => {
        const respuestaDatos = await rutasConToken('/objeto');
        let body = await respuestaDatos.json()

        if (body.mensaje) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: body.mensaje
            })
        } else {
            dispatch({
                type: types.obtenerObjetos,
                payload: body
            })
        }


    }
}

// eliminar objeto
export const eliminarObjeto = (data) => {
    return async (dispatch) => {

        const respuestaDatos = await rutasConToken(`/objeto/${data._id}`, {}, 'DELETE')
        const body = await respuestaDatos.json()
        dispatch({
            type: types.eliminarObjetos,
            payload: body.objetoActualizado
        })
    }
}

//Crear Objeto
export const crearObjeto = (data, imagen) => {

    return async (dispatch) => {
        if (imagen.length !== 0) {
            try {

                Swal.fire({
                    title: 'Guardando',
                    text: 'Espere por favor',
                    willOpen: () => {
                        Swal.showLoading();
                    }
                })
                const urlImg = `https://api.cloudinary.com/v1_1/du8b9axwm/upload`
                const formData = new FormData();
                formData.append('upload_preset', 'WorkShop')
                formData.append('file', imagen[0])

                const resp = await fetch(urlImg, {
                    method: 'POST',
                    body: formData
                })

                if (resp.ok) {
                    const cloudRes = await resp.json();


                    data.img = cloudRes.secure_url

                    delete data.contraseña2


                    const dataFinal = await rutasConToken('/objeto', data, 'POST')
                    const resultado = await dataFinal.json()


                    dispatch({
                        type: types.crearObjeto,
                        payload: resultado
                    }
                    )

                    Swal.close()
                    Swal.fire({
                        title: 'producto creado exitosamente',
                        icon: 'success'
                    })

                } else {
                    console.log(resp.json())
                    throw await resp.json()

                }
            } catch (error) {
                Swal.fire({
                    title: 'producto creado exitosamente',
                    icon: 'success',
                    text: error
                })
            }
        }
        // si la imagen no viene
        else {
            try {

                Swal.fire({
                    title: 'Guardando',
                    text: 'Espere por favor',
                    willOpen: () => {
                        Swal.showLoading();
                    }
                })

                data.img = 'https://res.cloudinary.com/du8b9axwm/image/upload/v1607645626/mykft9tfjobdbu3orgyu.png'

                const dataFinal = await rutasConToken('/objeto', data, 'POST')
                const resultado = await dataFinal.json()


                dispatch({
                    type: types.crearObjeto,
                    payload: resultado
                }
                )
                Swal.close()
                Swal.fire({
                    title: 'producto creado exitosamente',
                    icon: 'success'
                })

            } catch (error) {
                return alert(error)

            }
        }

    }
}


export const consultaAlertaObjetos = () => {
    return (dispatch) => {
        dispatch({
            type: types.consultaObjetosCant
        })
    }
}