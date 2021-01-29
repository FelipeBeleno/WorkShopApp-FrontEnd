import { Button, Grid, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { NuevoServicio } from './NuevoServicio';
import { TablaVentas } from './TablaVentas'
import { obtenerObjetos } from '../../../redux/objetosDuck';
import { useDispatch } from 'react-redux';


export const IndexServicios = () => {

    const [openService, setOpenService] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(obtenerObjetos());
    }, [dispatch])


    return (

        <Fragment>
            {
                !openService
                && <Fragment>
                    <Typography variant="h3" align="center" style={{ margin: 40 }}>Gestión Ventas </Typography>
                    <Grid container spacing={3}>
                        <Grid item md={3} />
                        <Grid item xs={12} md={6}>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={() => setOpenService(true)}
                                endIcon={<AttachMoneyIcon />}
                                fullWidth
                            >
                                Registrar Venta
                        </Button>
                        </Grid>
                        <Grid item md={3} />
                    </Grid>
                </Fragment>
            }

            {
                openService
                    ? <NuevoServicio setOpenService={setOpenService} />
                    : <TablaVentas />

            }

        </Fragment>


    )
}
