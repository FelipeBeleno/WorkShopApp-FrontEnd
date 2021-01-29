import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Step, StepLabel, Stepper, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Button, Box } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TodayIcon from '@material-ui/icons/Today';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

export const ProcesoData = ({ setOption }) => {
    const publicReducer = useSelector(state => state.publicReducer);
    const { cliente } = publicReducer.arregloProceso
    const proceso = publicReducer.arregloProceso
    const pasos = ['RECIBIDO', 'EN PROCESO', 'FINALIZADO', 'VENTA']

    const hanldeBusqueda = () => {
        setOption('')
    }

    return (
        <Fragment>
            {
                publicReducer.active
                    ? <Grid container style={{ background: 'white', textAlign: "center", marginBottom: 60, padding: 20 }}>

                        <Grid item xs={12}>
                            <h1>Estado de proceso</h1>

                            {
                                proceso.procesoServicio === 'RECIBIDO'
                                    ? <Fragment>
                                        <Stepper  >
                                            <Step>
                                                <StepLabel>
                                                    {pasos[0]}
                                                </StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>
                                                    {pasos[1]}
                                                </StepLabel>
                                            </Step>
                                            <Step active={false}>
                                                <StepLabel>
                                                    {pasos[2]}
                                                </StepLabel>
                                            </Step>

                                        </Stepper>
                                        <h1> Estamos trabajando para satisfacerte </h1> <SettingsIcon style={{ color: "orange" }} />
                                    </Fragment>
                                    : proceso.procesoServicio === 'EN PROCESO'
                                        ? <Fragment>
                                            <Stepper  >
                                                <Step>
                                                    <StepLabel>
                                                        {pasos[0]}
                                                    </StepLabel>
                                                </Step>
                                                <Step active={true}>
                                                    <StepLabel>
                                                        {pasos[1]}
                                                    </StepLabel>
                                                </Step>
                                                <Step active={false}>
                                                    <StepLabel>
                                                        {pasos[2]}
                                                    </StepLabel>
                                                </Step>

                                            </Stepper>
                                            <h1> Estamos trabajando para satisfacerte </h1> <SettingsIcon style={{ color: "orange" }} />
                                        </Fragment>
                                        : proceso.procesoServicio === 'FINALIZADO'
                                        && <Fragment><Stepper>
                                            <Step>
                                                <StepLabel>
                                                    {pasos[0]}
                                                </StepLabel>
                                            </Step>
                                            <Step active={true}>
                                                <StepLabel>
                                                    {pasos[1]}
                                                </StepLabel>
                                            </Step>
                                            <Step active={true}>
                                                <StepLabel>
                                                    {pasos[2]}
                                                </StepLabel>
                                            </Step>
                                        </Stepper>
                                            <h1> Listo para recoger</h1> < CheckCircleIcon style={{ color: "#008000" }} />
                                        </Fragment>
                            }

                        </Grid>
                        <Grid item xs={1} md={1} />

                        <Grid item xs={12} md={4}>
                            <h1>Observaciones</h1>
                            {
                                proceso.observaciones.length === 0
                                    ? <h1>Tu proceso no tiene observaciones</h1>
                                    : proceso.observaciones.map((observacion, index) => {
                                        return (<Fragment key={observacion._id}>
                                            <h2>Observacion # {index + 1}</h2>
                                            <p>{observacion.obj}</p>
                                        </Fragment>
                                        )
                                    })
                            }


                        </Grid>
                        <Grid item xs={2} md={2} />
                        <Grid item xs={12} md={4} >
                            <h1>Detalle</h1>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FormatListNumberedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Numero de servicio : {proceso.numServicio}
                                    </ListItemText>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Cliente: {cliente.nombre}
                                    </ListItemText>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Numero: {cliente.telefono}
                                    </ListItemText>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Email: {cliente.email}
                                    </ListItemText>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <ListItemIcon>
                                        <TodayIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Fecha recibido:<br /> {proceso.fechaRegistro_iso}
                                    </ListItemText>
                                </ListItem>
                                <Divider />

                            </List>

                        </Grid>
                        <Grid item xs={1} md={1} />
                        <Grid item md={12}>
                            <h2>Procedimientos ya agregados</h2>
                            <TableContainer>
                                <Table size="small" aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Nombre
                                </TableCell>
                                            <TableCell>
                                                Descripcion
                                </TableCell>
                                            <TableCell align="right">
                                                Precio
                                </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            proceso.procedimientos.map(ele => {
                                                return (
                                                    <TableRow key={ele._id}>
                                                        <TableCell >
                                                            {ele.nombre}
                                                        </TableCell>
                                                        <TableCell >
                                                            {ele.descripcion}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {ele.precio}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        <TableRow>
                                            <TableCell colSpan={0} ></TableCell>
                                            <TableCell align="right"><b>TOTAL:</b></TableCell>
                                            <TableCell align="right"><b>12000</b></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                        <br />

                    </Grid>
                    : <Grid item md={12}>
                        <Box align="center">
                            <h1 style={{ textAlign: 'center' }}>Id invalido, busque nuevamente</h1>
                            <Button color="secondary" variant="contained" onClick={hanldeBusqueda}> Volver a Buscar
                    </Button>
                        </Box>
                    </Grid>


            }

        </Fragment>
    )
}
