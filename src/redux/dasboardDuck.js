import { rutasConToken } from "../helpers/rutas";
import moment from 'moment';
import 'moment/locale/es-mx';

moment.locale('es-mx')

const initialState = {
    numArreglos: 0,
    numVentas: 0,
    totalRecaudadoVentas: 0,
    reporteTresMeses: undefined
}

const types = {
    obtenerDatos: '[Obtener Datos] consulta de datos Dashboard',
    tresMeses: '[Obtener Datos tres meses atras] datos tres meses'
}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.obtenerDatos:
            state = {
                numArreglos: action.payload.pendientes,
                numVentas: action.payload.numeroVentasMes,
                totalRecaudadoVentas: action.payload.totalVendidoMes,
                reporteTresMeses: action.payload.tresMeses
            }


            return state;

        default:
            return state;
    }
}


export const obtenerDatosDashboard = () => {


    return async (dispatch) => {
        const respuesta = await rutasConToken('/servicios/dec')
        const respuestaArr = await rutasConToken('/servicios/arr')
        const bodyArr = await respuestaArr.json()

        const respuestaReport = await rutasConToken('/servicios/tercerMes')
        const bodyReport = await respuestaReport.json()


        const tercerMesNombre = moment(new Date()).subtract(3, 'month').date(1).format('MMMM')
        const segundoMesNombre = moment(new Date()).subtract(2, 'month').date(1).format('MMMM')
        const primerMesNomnre = moment(new Date()).subtract(1, 'month').date(1).format('MMMM')
        const mesActualNombre = moment(new Date()).date(1).format('MMMM')


        let body = await respuesta.json()


        const data = {
            tercerMes: {
                nombre: tercerMesNombre,
                data: bodyReport.tercerMes
            },
            segundoMes: {
                nombre: segundoMesNombre,
                data: bodyReport.segundoMes
            },
            mesAtras: {
                nombre: primerMesNomnre,
                data: bodyReport.mesAtras,
            },
            mesActual: {
                nombre: mesActualNombre,
                data: bodyReport.mesActual
            }
        }

        body = {
            ...body,
            pendientes: bodyArr.arreglospendientes,
            tresMeses: data
        }
        dispatch({
            type: types.obtenerDatos,
            payload: body
        })
    }
}

