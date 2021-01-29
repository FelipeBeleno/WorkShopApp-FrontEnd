import React, { Fragment, useEffect } from 'react';
import MaterialTable from 'material-table';
import { español } from '../../../helpers/traduccionTabla';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarProcedimientos, crearProcedimientos, eliminarProcedimiento, obtenerProcedimientos } from '../../../redux/procedimientosDucks'
import { Typography } from '@material-ui/core';

export const IndexProcedimientos = () => {

    const dispatch = useDispatch()
    const { procedimiento } = useSelector(state => state.procedimientosReducer)

    useEffect(() => {
        dispatch(obtenerProcedimientos())
    }, [dispatch])

    const columnas = [
        { field: 'nombre', title: 'Nombre' },
        { field: 'descripcion', title: 'Descripción' },
        { field: 'precio', title: 'Precio' }
    ]



    return (
        <Fragment>
            <Typography align="center" variant="h3" >
                Gestión de Procedimientos
            </Typography>
            <MaterialTable
                title='Gestión Procedimientos'
                columns={columnas}
                localization={español}
                data={procedimiento.map(ele => {
                    return ele
                })}
                editable={
                    {
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {

                                dispatch(crearProcedimientos(newData))
                                resolve();
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {

                                dispatch(actualizarProcedimientos(newData))
                                resolve();

                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                dispatch(eliminarProcedimiento(oldData))

                                resolve()

                            }),
                    }
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


            />
        </Fragment>
    )
}
