import MaterialTable from 'material-table'
import { Button, Grid } from '@material-ui/core'
import HistoryIcon from '@material-ui/icons/History';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { Fragment } from 'react'
import { español } from '../../../helpers/traduccionTabla';

export const TablaServicios = () => {
    return (
        <Fragment>
            <Grid container spacing={3} style={{ margin: 15 }}>
                <Grid item md={2} />
                <Grid item md={4} style={{ marginTop: 20 }}>
                    <Button variant="contained" color="secondary" fullWidth endIcon={<NotificationsIcon />} >Servicios Activos</Button>
                </Grid>
                <Grid item md={4} style={{ marginTop: 20 }}>
                    <Button variant="contained" color="primary" fullWidth endIcon={<HistoryIcon />} >Servicios Inactivos</Button>
                </Grid>
                <Grid item md={2} />
            </Grid>
            <MaterialTable
                title="Servicios"
                localization={español}
            />
        </Fragment>
    )
}
