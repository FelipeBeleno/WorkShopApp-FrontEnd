import { rutasConToken } from "../helpers/rutas";

const initialState = {
    numArreglos: 0,
    numVentas: 0,
    totalRecaudadoVentas: 0
}

const types = {
    obtenerDatos: '[Obtener Datos] consulta de datos Dashboard'
}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.obtenerDatos:
            console.log(action.payload)
            state = {
                numArreglos: action.payload.pendientes,
                numVentas: action.payload.numeroVentasMes,
                totalRecaudadoVentas: action.payload.totalVendidoMes
            }

            return state

        default:
            return state;
    }
}


export const obtenerDatosDashboard = () => {


    return async (dispatch) => {
        const respuesta = await rutasConToken('/servicios/dec')
        const respuestaArr = await rutasConToken('/servicios/arr')
        const bodyArr = await respuestaArr.json()
        let body = await respuesta.json()

        body = {
            ...body,
            pendientes: bodyArr.arreglospendientes
        }
        dispatch({
            type: types.obtenerDatos,
            payload: body
        })
    }
}