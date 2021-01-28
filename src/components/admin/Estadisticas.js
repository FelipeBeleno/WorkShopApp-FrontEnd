import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { consultaAlertaObjetos } from '../../redux/objetosDuck';
import DatePicker from 'react-date-picker';
import { reporteDiaCalendar } from '../../redux/dasboardDuck';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { pesoColombiano } from '../../helpers/pesoColombiano';



export const Estadisticas = ({ reporteTresMeses }) => {

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(consultaAlertaObjetos())


    }, [dispatch])

    const { objetosPorAcabar } = useSelector(state => state.objetosReducer)
    const { reporteDia } = useSelector(state => state.dashboardReducer)
    console.log(reporteDia)

    useEffect(() => {
        if (objetosPorAcabar.length !== 0) {
            Swal.fire({
                title: 'Precaucion',

                html: `<style type="text/css">
                   h3{
                    text-align: center
                   } 
                   table{
                    text-align: center;
                    margin-left: 130px;
                    word-spacing: 10px;
                    display: block
                   }
                </style>
                <h3>Estos son los productos que estan por acabar</h3>
                <table>
                  <tr margin="100px">
                    <td><b>Nombre</b></td>
                    <td><b>Cantidad</b></td>
                  </tr>
                  ${objetosPorAcabar.map(ele => {
                    return (`<tr>
                        <td>
                            ${ele.nombre}
                        </td>
                        <td>
                            ${ele.stock}
                        </td>
                    </tr>`)
                })}
                </table>
                `,
                icon: 'warning'
            })
        }

    }, [objetosPorAcabar])

    const tercerMes = reporteTresMeses?.tercerMes?.data.reduce((cont, ele) => {
        cont += ele.precioTotal
        return cont
    }, 0)
    const segundoMes = reporteTresMeses?.segundoMes?.data.reduce((cont, ele) => {
        cont += ele.precioTotal
        return cont
    }, 0)

    const primerMes = reporteTresMeses?.mesAtras?.data.reduce((cont, ele) => {
        cont += ele.precioTotal
        return cont
    }, 0)
    const mesActual = reporteTresMeses?.mesActual?.data.reduce((cont, ele) => {
        cont += ele.precioTotal
        return cont
    }, 0)

    const datos = [
        ['MESES', 'Ventas', { role: 'style' }],
        [reporteTresMeses.tercerMes.nombre, tercerMes, '#ff0000'],
        [reporteTresMeses.segundoMes.nombre, segundoMes, '#006600'],
        [reporteTresMeses.mesAtras.nombre, primerMes, '#ff9900'],
        [reporteTresMeses.mesActual.nombre, mesActual, '#003399'],

    ]

    const [fecha, setFecha] = useState(new Date())

    const handleChangeFecha = (fechaSeleccionada) => {


        if (fechaSeleccionada !== null) {
            setFecha(fechaSeleccionada)
            dispatch(reporteDiaCalendar(fechaSeleccionada))
        }

    }

    return (
        <Box align="center" mt={5}>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Typography variant="h3" style={{ marginBottom: 15 }}>Resumen del dia</Typography>
                    <h3>Selecciona el dia a consultar</h3>

                    <DatePicker
                        onChange={handleChangeFecha}
                        value={fecha}
                        maxDate={new Date()}
                        locale="es-CO"
                        defaultValue="dd-m-yyyy"
                    />
                    {
                        reporteDia.fechaConsulta
                        &&
                        <List >
                            <ListItem>
                                <ListItemIcon >
                                    <EventAvailableIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Fecha: {reporteDia.fechaConsulta}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon >
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Numero Ventas: {reporteDia.numVentas}
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon >
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Numero Arreglos: {reporteDia.numeroArreglos}
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon >
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Ingreso Total Ventas: {pesoColombiano.format(reporteDia.totalVentas)}
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon >
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Ingreso Total Arreglos: {pesoColombiano.format(reporteDia.totalArreglos)}
                                </ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon >
                                    <AttachMoneyIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    Ingreso dia: {pesoColombiano.format(reporteDia.ingresosDia)}
                                </ListItemText>
                            </ListItem>
                        </List>


                    }
                </Grid>

                <Grid item md={8} xs={12}>
                    <Typography variant="h3" style={{ marginBottom: 15 }}>Reportes de ultimos tres meses</Typography>
                    <Chart
                        width={500}
                        height={400}
                        chartType='ColumnChart'
                        data={datos}
                        options={
                            {
                                hAxis: {
                                    title: 'Meses'
                                },
                                vAxis: {
                                    title: 'Ventas'
                                }
                            }
                        }
                        legendToggle={false}
                    />

                </Grid>
            </Grid>

        </Box >


    )
}
