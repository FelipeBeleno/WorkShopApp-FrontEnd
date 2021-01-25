import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerDatosDashboard } from '../../redux/dasboardDuck';

export const Dashboard = () => {


    const dispatch = useDispatch()
    const dashboardReducer = useSelector(state => state.dashboardReducer)

    useEffect(() => {
        dispatch(obtenerDatosDashboard())
    }, [dispatch])

    console.log(dashboardReducer)
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item md={4} >
                    <Card style={{ background: '#28a745', color: 'white' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item md={12}>
                                    <Typography variant="h3" align="center"> {dashboardReducer.numVentas} </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="h5" align="center"> Ventas realizadas este mes</Typography>
                                </Grid>

                                <Grid item md={12} align="center">
                                    <LocalMallIcon align="center" style={{ fontSize: 70 }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item md={4}>
                    <Card style={{ background: '#ffc107', color: 'black' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item md={12}>
                                    <Typography variant="h3" align="center">{dashboardReducer.numArreglos}</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="h5" align="center"> Arreglos pendientes por gestion</Typography>
                                </Grid>

                                <Grid item md={12} align="center">
                                    <SettingsIcon align="center" style={{ fontSize: 70 }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>



                <Grid item md={4}>
                    <Card style={{ background: '#dc3545', color: 'white' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item md={12}>
                                    <Typography variant="h3" align="center">$ {dashboardReducer.totalRecaudadoVentas} </Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography variant="h5" align="center"> Total Recaudado mes ventas</Typography>
                                </Grid>

                                <Grid item md={12} align="center">
                                    <MonetizationOnIcon align="center" style={{ fontSize: 70 }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>

            </Grid>
        </Fragment>
    )
}
