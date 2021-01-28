import { Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { useEffect } from 'react';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { consultarVentas, eliminarVentaServicio } from '../../../redux/ventasDuck';
import { español } from '../../../helpers/traduccionTabla';
import { cleanService } from '../../../redux/serviciosDucks';
import Swal from 'sweetalert2'




export const TablaVentas = () => {

    const dispatch = useDispatch()
    const { ventas } = useSelector(state => state.ventasReducer)
    useEffect(() => {
        dispatch(cleanService())
        dispatch(consultarVentas())

    }, [dispatch])
    const usuario = useSelector(state => state.loginReducer)


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
            title: 'Id consulta'
        }
    ]
    const eliminarRegistro = (data) => {
        if (usuario.role === 'ADMIN_ROLE') {
            Swal.fire({
                title: 'Confirme la eliminacion del registro',
                text: "Una vez borrado no se podra recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'Cancelar operacion'
            }).then((result) => {
                if (result.isConfirmed) {
                    return dispatch(eliminarVentaServicio(data._id))
                } else {
                    console.log('cancelado')
                }
            })
        } else {
            Swal.fire({
                title: 'Error de permisos',
                text: 'No tienes permisos para borrar una venta'
            })
        }


    }


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
                        return element
                    })}

                    actions={
                        [
                            {
                                icon: 'delete',
                                tooltip: 'Eliminar Registro',
                                onClick: (e, row) => eliminarRegistro(row)
                            }

                        ]
                    }
                    style={{
                        marginTop: 50,
                        justifyContent: 'center',

                    }}
                    options={{
                        actionsColumnIndex: -1,
                        loadingType: "overlay",
                        padding: 'default',
                        headerStyle: {
                            padding: '10px',
                        },
                        exportButton: true
                    }}

                    localization={español}

                />
            </Grid>

        </Grid>
    )
}
