
const { rutasConToken } = require("../helpers/rutas");

// initial state
const initialState = {
    data: false,
    categorias: []
}

//const types
const types = {

    cargarCategorias: '[Categorias] Cargar Categorias',
    crearCategorias: '[Categorias] Crear Categoria',
    eliminarCategorias: '[Categorias] Eliminar Categorias',
    actualizarCategorias: '[Categorias] Actualizar Categorias'
}



export const categoriasReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.cargarCategorias:
            state = {
                data: true,
                categorias: action.payload
            }
            return state;

        case types.crearCategorias:

            let dataNew = action.payload.categoria
            if (dataNew.estado === true) {
                dataNew.estado = 'Activo'
            }
            else {
                dataNew.estado = 'Inactivo'
            }
            state = {
                ...state,
                data: true,
                categorias: [...state.categorias, dataNew],
            }

            return state;

        case types.eliminarCategorias:
            let dataEliminda = state.categorias.filter(res => {
                return res._id !== action.payload._id
            })

            state = {
                ...state,
                categorias: dataEliminda
            }
            return state

        case types.actualizarCategorias:

            let dataEdit = state.categorias.map(dat => {
                if (dat._id === action.payload.categoria._id) {
                    dat = action.payload.categoria;
                    dat.estado = 'Activo';
                    return dat
                }
                return dat;
            })
            state = {
                ...state,
                categorias: dataEdit
            }

            return state;
        default:
            return state;
    }
}


// actions

// Crear Categorias
export const nuevaCategoria = (data) => {

    return async (dispatch) => {
        const resultado = await rutasConToken('/categoria', data, 'POST');
        const body = await resultado.json();
        dispatch({
            type: types.crearCategorias,
            payload: body
        })
    }
}

//Cargar datos de categorias
export const cargarCategorias = () => {
    return async (dispatch) => {
        const respuesta = await rutasConToken('/categoria');
        const body = await respuesta.json()

        dispatch({
            type: types.cargarCategorias,
            payload: body.categoria
        })
    }
}

// eliminar categoria
export const eliminarCategoria = (id) => {
    return async (dispatch) => {
        const respuesta = await rutasConToken(`/categoria/${id}`, {}, 'DELETE')
        const body = await respuesta.json();

        dispatch({
            type: types.eliminarCategorias,
            payload: body.categoriaEliminada
        })
    }
}

//Actualizar Categorias
export const actualizarCategoria = (data) => {

    delete data.estado

    return async (dispatch) => {
        const respuesta = await rutasConToken(`/categoria/${data._id}`, data, 'PUT')
        const body = await respuesta.json();


        dispatch({
            type: types.actualizarCategorias,
            payload: body
        })
    }
}
