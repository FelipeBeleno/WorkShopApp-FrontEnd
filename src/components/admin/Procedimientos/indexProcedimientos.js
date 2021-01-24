import React, { Fragment, useEffect } from 'react';
import MaterialTable from 'material-table';
import { español } from '../../../helpers/traduccionTabla';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarProcedimientos, crearProcedimientos, eliminarProcedimiento, obtenerProcedimientos } from '../../../redux/procedimientosDucks'

export const IndexProcedimientos = () => {

    const dispatch = useDispatch()
    const { procedimiento } = useSelector(state => state.procedimientosReducer)

    useEffect(() => {
        dispatch(obtenerProcedimientos())
    }, [dispatch])

    const columnas = [
        { field: 'nombre', title: 'Nombre' },
        { field: 'descripcion', title: 'Descripcion' },
        { field: 'precio', title: 'Precio' }
    ]



    return (
        <Fragment>
            <h1 style={{ textAlign: 'center' }}>Procedimientos para servicios</h1>
            <MaterialTable
                title='Gestion Procedimientos'
                columns={columnas}
                localization={español}
                data={procedimiento}
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
                options={
                    {
                        actionsColumnIndex: -1
                    }
                }


            />
        </Fragment>
    )
}
