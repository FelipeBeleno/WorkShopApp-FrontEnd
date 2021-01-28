import { Button, Grid, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table';
import { eliminarUsuario, obtenerUsuarios } from '../../../redux/usuariosDuck';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { NuevoUsuarioForm } from './NuevoUsuarioForm';
import { español } from '../../../helpers/traduccionTabla';

export const Usuarios = () => {

    const dispatch = useDispatch();


    const usuariosReducer = useSelector(state => state.usuariosReducer)
    //Replantear el nombre de esa variable es el estado global no una funcion reductora
    const usuario = useSelector(state => state.loginReducer)

    const [openRegistro, setOpenRegistro] = useState(false)


    let columnas = [
        {
            field: 'img',
            title: 'Avatar',
            render: rowData => <img src={rowData.img} alt="foto de perfil" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        },
        { title: 'Nombre Apellido', field: 'nombreApellido' },
        { title: 'Documento', field: 'documento' },
        { title: 'Rol', field: 'role' }
    ]


    useEffect(() => {

        dispatch(obtenerUsuarios())


    }, [dispatch]);

    const handleClickAddUser = (e) => {
        e.preventDefault();
        setOpenRegistro(!openRegistro)

    }

    return (
        <Fragment>
            <Typography align="center" variant="h3" >

                Gestión de usuarios
            </Typography>


            {
                usuario.length === 0 || usuario.role !== 'ADMIN_ROLE'
                    ? <h1>No tienes permiso</h1>
                    : <Fragment>

                        <Grid container >

                            <Grid item xs={12} md={8} >

                            </Grid>

                            <Grid item xs={12} md={4} style={{ marginTop: 30, marginBottom: 0 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    endIcon={<ControlPointIcon />}
                                    onClick={handleClickAddUser}
                                >
                                    Agregar Usuario
                                </Button>
                            </Grid>
                        </Grid>
                        {
                            openRegistro && <NuevoUsuarioForm usuariosReducer={usuariosReducer} openRegistro={openRegistro} />
                        }


                        <MaterialTable
                            style={{
                                marginTop: 50,
                                justifyContent: 'center',

                            }}
                            columns={columnas}

                            data={usuariosReducer.usuarios}

                            editable={
                                {
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const dataDelete = [...usuariosReducer.usuarios];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                dispatch(eliminarUsuario(oldData))

                                                resolve()
                                            }, 1000)
                                        }),
                                }
                            }

                            title='Usuarios'
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
