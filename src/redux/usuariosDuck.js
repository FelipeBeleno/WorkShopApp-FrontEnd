import { rutasConToken } from "../helpers/rutas";

import Swal from 'sweetalert2'

//initial State
const initialState = {
    data: false,
    usuarios: []
}


//types
const types = {
    obtenerUsuarios: '[Usuarios] obtener todos los usuarios',
    eliminarUsuarios: '[Usuarios] Eliminar usuario',
    crearUsuario: '[Usuarios] Crear usuario'
}


// reducer
export const usuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.obtenerUsuarios:
            state = { ...state, usuarios: [...action.payload.datos.docs], data: true }
            return state;

        case types.eliminarUsuarios:
            const dataresult = state.usuarios.filter(dat => {
                return dat._id !== action.payload.usuarioEliminado._id
            })

            state = {
                ...state, usuarios: [...dataresult], data: true
            }
            return state;

        case types.crearUsuario:

            state = {
                ...state,
                usuarios: [...state.usuarios, action.payload.nuevoUsuario], data: true
            }
            return state;

        default:
            return state;
    }

}

// obtener usuarios
export const obtenerUsuarios = () => {

    return async (dispatch) => {
        const respuestaDatos = await rutasConToken('/usuario');
        let body = await respuestaDatos.json()

        if (body.mensaje) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: body.mensaje
            })
        } else {
            dispatch({
                type: types.obtenerUsuarios,
                payload: body
            })
        }


    }
}

// eliminar usuario
export const eliminarUsuario = (data) => {
    return async (dispatch) => {
        const respuestaDatos = await rutasConToken(`/usuario/${data._id}`, {}, 'DELETE')
        const body = await respuestaDatos.json()
        dispatch({
            type: types.eliminarUsuarios,
            payload: body
        })
    }
}

//Crear Usuario
export const crearUsuario = (data, imagen) => {

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


                    const dataFinal = await rutasConToken('/usuario', data, 'POST')
                    const resultado = await dataFinal.json()


                    dispatch({
                        type: types.crearUsuario,
                        payload: resultado
                    }
                    )

                    Swal.close()
                    Swal.fire({
                        title: 'Usuario creado exitosamente',
                        icon: 'success'
                    })

                } else {
                    console.log(resp.json())
                    throw await resp.json()

                }
            } catch (error) {
                Swal.fire({
                    title: 'Usuario creado exitosamente',
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
                delete data.contraseña2

                const dataFinal = await rutasConToken('/usuario', data, 'POST')
                const resultado = await dataFinal.json()


                dispatch({
                    type: types.crearUsuario,
                    payload: resultado
                }
                )
                Swal.close()
                Swal.fire({
                    title: 'Usuario creado exitosamente',
                    icon: 'success'
                })

            } catch (error) {
                return alert(error)

            }

        }

    }
}
