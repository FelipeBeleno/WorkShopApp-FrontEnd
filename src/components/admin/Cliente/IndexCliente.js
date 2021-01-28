import { Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import React, { Fragment, useEffect } from 'react';
import { español } from '../../../helpers/traduccionTabla';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerClientes, crearCliente, eliminarCliente, modificarCliente } from '../../../redux/clientesDuck';


export const IndexCliente = () => {

    const dispatch = useDispatch();

    const usuario = useSelector(state => state.loginReducer);
    const estadoClientes = useSelector(state => state.clientesReducer);
    useEffect(() => {
        dispatch(obtenerClientes())

    }, [dispatch])
    const columnas = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Número Documento', field: 'numDocumento' },
        { title: 'Email', field: 'email' },
        { title: 'Teléfono', field: 'telefono' }
    ];
    return (

        <Fragment>
            <Typography align="center" variant="h3" >
                Gestión de Clientes
	    </Typography>
            {
                usuario.length === 0
                    ? <h1>No tienes permiso</h1>
                    : <Fragment>

                        <MaterialTable
                            style={{
                                marginTop: 50,
                                justifyContent: 'center',

                            }}

                            title='Clientes'
                            columns={columnas}

                            data={estadoClientes.clientes}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise((resolve, reject) => {
                                        dispatch(crearCliente(newData));
                                        resolve();
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {

                                        dispatch(modificarCliente(newData));
                                        console.log(oldData);
                                        resolve();

                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {

                                        dispatch(eliminarCliente(oldData));
                                        resolve();

                                    })
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
                    </Fragment>




            }


        </Fragment>
    )

}
