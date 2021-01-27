import { Box, Typography } from '@material-ui/core';
import React from 'react'
import Chart from "react-google-charts";


export const Estadisticas = ({ reporteTresMeses }) => {


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
        ['MESES', 'Ventas'],
        [reporteTresMeses.tercerMes.nombre, tercerMes],
        [reporteTresMeses.segundoMes.nombre, segundoMes],
        [reporteTresMeses.mesAtras.nombre, primerMes],
        [reporteTresMeses.mesActual.nombre, mesActual],

    ]
    return (
        <Box align="center" mt={5}>
            <Typography variant="h3" style={{marginBottom:15}}>Reportes de ultimos tres meses</Typography>
            <Chart
                width={800}
                height={600}
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
                legendToggle={true}
            />
        </Box>


    )
}
