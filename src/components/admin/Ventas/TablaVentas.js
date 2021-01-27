import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { consultarVentas } from '../../../redux/ventasDuck';
import { español } from '../../../helpers/traduccionTabla';
import { pesoColombiano } from '../../../helpers/pesoColombiano';
import { cleanService } from '../../../redux/serviciosDucks';




export const TablaVentas = () => {

    const dispatch = useDispatch()
    const { ventas } = useSelector(state => state.ventasReducer)
    useEffect(() => {
        dispatch(cleanService())


        dispatch(consultarVentas())

    }, [dispatch])

    const columnas = [
        {
            field: 'numServicio',
            title: '# Registro'
        },
        {
            field: 'fechaRegistro_iso',
            title: 'Fecha'
        },
        {
            field: 'nombreCliente',
            title: 'Cliente'
        },
        {
            field: 'precioTotal',
            title: 'Valor Venta'
        },
        {
            field: 'Colaborador',
            title: 'Colaborador'
        },
        {
            field: 'numConsulta',
            title: 'id consulta'
        }
    ]

    return (
        <Grid container spacing={3} >
            <Grid item md={12}>

                <MaterialTable
                    title="Registro de ventas"
                    columns={columnas}
                    data={ventas.length === 0 ? [] : ventas.map(element => {

                        element.nombreCliente = element.cliente.nombre || 'no registra'
                        element.fechaRegistro_iso = moment(element.fechaRegistro_iso, "YYYY-MM-DD").format("YYYY-MM-DD")
                        element.Colaborador = element.usuario.nombreApellido
                        element.precioTotal = pesoColombiano.format(element.precioTotal)

                        return element
                    })}


                    options={
                        {
                            actionsColumnIndex: -1
                        }
                    }

                    localization={español}

                />
            </Grid>

        </Grid>
    )
}
