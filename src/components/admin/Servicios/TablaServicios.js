import MaterialTable from 'material-table'
import { Button, Grid, Typography } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import HistoryIcon from '@material-ui/icons/History';
import React, { Fragment, useEffect, useState } from 'react'
import { español } from '../../../helpers/traduccionTabla';
import { useDispatch, useSelector } from 'react-redux';
import { consultarArreglos } from '../../../redux/ventasDuck';
import moment from 'moment'
import { GestionTaller } from './GestionTaller';
import { cleanService } from '../../../redux/serviciosDucks';

export const TablaServicios = ({ setTallerState }) => {

    const [gestion, setGestion] = useState(false)
    const [dataEdit, setDataEdit] = useState({})
    const servicios = useSelector(state => state.ventasReducer.ventas)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(consultarArreglos())
        dispatch(cleanService())

    }, [dispatch])


    const gestionProceso = (e, data) => {
        e.preventDefault()
        setGestion(true)
        setDataEdit(data)

    }

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
            title: 'Valor Procedimiento'
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

        <Fragment>
            {
                gestion === false
                    ? <Fragment>
                        <Fragment> {/* Menu con botones */}
                            <Grid container style={{ margin: 15 }} spacing={2}>
                                <Grid item md={12} xs={12} style={{ textAlign: 'center' }}>
                                    <Typography variant="h3">Gestion de procesos</Typography>
                                </Grid>


                                <Grid item md={12} xs={12} style={{ marginTop: 20 }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={() => setTallerState('nuevoServicio')}
                                        endIcon={<AddCircleOutline />}>
                                        Registrar nuevo servicio
                                </Button>
                                </Grid>
                            </Grid>
                        </Fragment>


                        <Grid container style={{ margin: 15 }}>


                            <Grid item md={12} xs={12} style={{ marginTop: 20 }}>
                                <Button variant="contained" color="primary" fullWidth endIcon={<HistoryIcon />} >Historial</Button>
                            </Grid>


                        </Grid>
                        <MaterialTable
                            title="Servicios Activos"
                            columns={columnas}
                            localization={español}
                            data={servicios.map(ele => {
                                ele.nombreCliente = ele.cliente.nombre || 'no registra'
                                ele.fechaRegistro_iso = moment(ele.fechaRegistro_iso, true).format("DD-MM-YYYY");
                                ele.Colaborador = ele.usuario.nombreApellido
                                ele.precioTotal = ele.precioTotal || 0
                                ele.numConsulta = ele.numConsulta || 'no registra'
                                return ele
                            })}
                            options={{ actionsColumnIndex: -1 }}
                            actions={
                                [
                                    {
                                        icon: 'speed',
                                        tooltip: 'Gestionar',
                                        onClick: (e, row) => gestionProceso(e, row)
                                    }
                                ]
                            }
                        />
                    </Fragment>
                    : <GestionTaller setGestion={setGestion} dataEdit={dataEdit} />
            }
        </Fragment>
    )
}
