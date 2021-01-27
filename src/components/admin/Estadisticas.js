import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import Chart from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { consultaAlertaObjetos } from '../../redux/objetosDuck';


export const Estadisticas = ({ reporteTresMeses }) => {

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(consultaAlertaObjetos())

    }, [dispatch])

    const { objetosPorAcabar } = useSelector(state => state.objetosReducer)


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
    return (
        <Box align="center" mt={5}>
            <Grid container>
                <Grid item md={12}>
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

        </Box>


    )
}
