import { Button, Grid, Typography } from '@material-ui/core'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import React, { Fragment, useState } from 'react'
import { GestionTaller } from './GestionTaller';
import { NuevoServicio } from './NuevoServicio';
import { TablaServicios } from './TablaServicios';

export const IndexTaller = () => {


    const [tallerState, setTallerState] = useState('')
    return (
        <Fragment>

            {/* Contenido */}

            {
                tallerState === ''
                    ? <Fragment> {/* Menu con botones */}
                        <Grid container spacing={3} style={{ margin: 15 }}>
                            <Grid item md={12} style={{ textAlign: 'center' }}>
                                <Typography variant="h3">Gestion de procesos</Typography>
                            </Grid>
                            <Grid item md={2} />
                            <Grid item md={4} style={{ marginTop: 20 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => setTallerState('nuevoServicio')}
                                    endIcon={<AddCircleOutline />}>
                                    Registrar nuevo servicio
                                </Button>
                            </Grid>
                            <Grid item md={4} style={{ marginTop: 20 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => setTallerState('gestionServicio')}
                                    endIcon={<AutorenewIcon />}>
                                    gestionar servicio
                                </Button>
                            </Grid>
                            <Grid item md={2} />
                        </Grid>
                        <TablaServicios />
                    </Fragment>
                    : tallerState === 'nuevoServicio'
                        ? <NuevoServicio setTallerState={setTallerState} />
                        : tallerState === 'gestionServicio'
                        && <GestionTaller setTallerState={setTallerState} />
            }


        </Fragment>
    )
}
