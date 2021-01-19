import { Button, Grid, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { NuevoServicio } from './NuevoServicio';
import { TablaVentas } from './TablaVentas'





export const IndexServicios = () => {

    const [openService, setOpenService] = useState(false)

    return (

        <Fragment>
            {
                !openService
                && <Fragment>
                    <Typography variant="h4" align="center" style={{ margin: 40 }}>Modulo Ventas </Typography>
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
