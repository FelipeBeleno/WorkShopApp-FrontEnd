import { rutasConToken } from "../helpers/rutas";
import moment from 'moment';
import 'moment/locale/es-mx';

moment.locale('es-mx')

const initialState = {
    numArreglos: 0,
    numVentas: 0,
    totalRecaudadoVentas: 0,
    reporteTresMeses: undefined,
    reporteDia: {}
}

const types = {
    obtenerDatos: '[Dasboard] consulta de datos Dashboard',
    tresMeses: '[Dasboard] datos tres meses',
    reporteDia: '[Dasboard] obtener datos de un dia en especifico'
}

export const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.obtenerDatos:
            state = {
                ...state,
                numArreglos: action.payload.pendientes,
                numVentas: action.payload.numeroVentasMes,
                totalRecaudadoVentas: action.payload.totalVendidoMes,
                reporteTresMeses: action.payload.tresMeses,
                reporteDia: {}
            }
            return state;

        case types.reporteDia:

            state = {
                ...state,
                reporteDia: action.payload
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

export const reporteDiaCalendar = (fecha = new Date()) => {
    return async (dispatch) => {
        const fechaFinal = moment(fecha).format('YYYY-MM-DD')
        const respuesta = await rutasConToken(`/servicios/total/${fechaFinal}`)
        const body = await respuesta.json()

        const numeroArreglos = body.servicios.reduce((count, ele) => {
            if (ele.tipoServicio === 'ARREGLO') {
                count += 1
            }
            return count
        }, 0);

        const numVentas = body.servicios.reduce((count, ele) => {
            if (ele.tipoServicio === 'VENTA') {
                count += 1
            }
            return count
        }, 0);

        const ingresosDia = body.servicios.reduce((count, ele) => {
            count += ele.precioTotal
            return count
        }, 0);

        const fechaConsulta = fechaFinal;

        const totalVentas = body.servicios.reduce((count, ele) => {
            if (ele.tipoServicio === 'VENTA') {
                count += ele.precioTotal
            }
            return count
        }, 0);

        const totalArreglos = body.servicios.reduce((count, ele) => {
            if (ele.tipoServicio === 'ARREGLO') {
                count += ele.precioTotal
            }
            return count
        }, 0);

        const data = {
            numeroArreglos,
            numVentas,
            fechaConsulta,
            totalVentas,
            totalArreglos,
            ingresosDia
        }

        dispatch({
            type: types.reporteDia,
            payload: data
        })

    }
}