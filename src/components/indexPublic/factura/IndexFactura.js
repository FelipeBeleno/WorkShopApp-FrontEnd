import { Grid, TextField, CircularProgress, Button, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { Fragment, useState } from 'react';
import { Page, Text, View, Document, PDFDownloadLink, StyleSheet, Image } from '@react-pdf/renderer';
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from '@david.kucsai/react-pdf-table'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { consultarFacturaCliente } from '../../../redux/serviciosDucks';
import moment from 'moment'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';



const styles = StyleSheet.create({
    contenidoDatosCliente: {
        fontSize: 12,
        marginTop: 5

    },
    titulo: {
        marginTop: 10,
        textAlign: 'center',
    },
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    image: {
        marginVertical: 10,
        marginHorizontal: 230,
        width: '80opx',
        height: '80px',
    },
    subTitle: {
        fontSize: 12,
        textAlign: 'center',

    },
    grid: {
        display: 'grid',

    },
    block: {
        backgroundColor: 'red',
        height: '20px',
        width: '88vw',
        marginBottom: '10px'
    },
    blockTable: {

        height: '20px',
        width: '88vw',
        marginBottom: '10px'
    },
    datosCliente: {
        marginTop: '10px',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '900'
    },
    facturaTitulo: {
        display: 'flex',
        fontSize: 18,
        marginTop: -90,
        marginLeft: 400
    },
    datosFactura: {
        textAlign: 'right',
        fontSize: 12,
        marginTop: 5
    }
})

export const IndexFactura = () => {

    const { errors, register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const { servicios } = useSelector(state => state.serviciosReducer)
    const [pdgGenerate, setPdgGenerate] = useState(false)

    const onSubmit = (data, e) => {
        e.preventDefault()
        dispatch(consultarFacturaCliente(data.id))
    }

    const Documento = () => {

        return (
            <Document>
                <Page size="A4" style={styles.body}>
                    <View>
                        <Text style={styles.block}></Text>
                        <Image style={styles.image} src="data:image/jpeg;base64,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" />
                        <Text style={styles.titulo}>Factura de venta</Text>

                        <Text style={styles.subTitle}> Nombre de la Empresa. LTDA</Text>
                        <Text style={styles.subTitle}>Nit. 999.999.99</Text>
                        <Text style={styles.subTitle}>Telefono : 6855463</Text>
                        <Text style={[styles.subTitle, { marginBottom: 20 }]}> Cra 68 #68 int -68 Bogota D.C - Colombia </Text>
                        <Text style={{ marginTop: 10, marginBottom: 10 }} >_____________________________________________________</Text>
                        <Text style={styles.datosCliente}>Datos Cliente</Text>
                        <Text style={styles.contenidoDatosCliente}> Nombre: {servicios[0].cliente.nombre}</Text>
                        <Text style={styles.contenidoDatosCliente}> Cedula: {servicios[0].cliente.numDocumento || 'no registra'}</Text>
                        <Text style={styles.contenidoDatosCliente}> Email: {servicios[0].cliente.email || 'no registra'} </Text>
                        <Text style={styles.contenidoDatosCliente}> Telefono: {servicios[0].cliente.telefono || 'no registra'}</Text>
                        <Text style={styles.facturaTitulo}> Datos Factura </Text>
                        <Text style={styles.datosFactura}>Numero de Factura:{servicios[0].numServicio} </Text>
                        <Text style={styles.datosFactura}>Fecha:{moment(servicios[0].fechaRegistro_iso).format("DD/MM/YYYY")}</Text>
                        <Text style={styles.datosFactura}>Usuario: {servicios[0].usuario.nombreApellido} </Text>
                        <Text style={styles.blockTable}></Text>
                        <Text style={{ marginTop: 10, marginBottom: 5 }} >_____________________________________________________</Text>
                        <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 20, textAlign: 'center' }}>Detalle Venta </Text>


                        {servicios[0].tipoServicio === "VENTA"
                            &&
                            <Table
                                data={servicios[0].objetos}
                            >
                                <TableHeader>
                                    <TableCell>
                                        Nombre Articulo
                                </TableCell>
                                    <TableCell>
                                        Precio Unidad
                                </TableCell>
                                    <TableCell>
                                        Cantidad
                                </TableCell>
                                    <TableCell>
                                        Total Articulos
                                </TableCell>
                                </TableHeader>
                                {
                                    servicios[0].objetos.map((element, index) => {
                                        return (
                                            <TableBody key={index}>
                                                <DataTableCell getContent={(element) => element.nombreObjeto} />
                                                <DataTableCell getContent={(element) => element.precioUnidad} />
                                                <DataTableCell getContent={(element) => element.cantidad} />
                                                <DataTableCell getContent={(element) => element.totalCompraItem} />
                                            </TableBody>
                                        )
                                    })
                                }
                            </Table>

                        }



                        <Text style={{ textAlign: 'right', fontSize: 15, marginRight: 80 }}>{`TOTAL: ${servicios[0].precioTotal}`}</Text>


                        <Text style={{ marginTop: 5, marginBottom: 5 }} >_____________________________________________________</Text>

                        {
                            servicios[0].observaciones[0].obj.length > 0
                            && <Text style={{ textAlign: 'center', fontSize: 20 }}>Observaciones: </Text>

                        }

                        {servicios[0].observaciones.length > 0 &&
                            servicios[0].observaciones.map((elemet, index) => {
                                return (
                                    <Text key={index} style={{ textAlign: 'center', fontSize: 12, marginTop: 10 }}>{elemet.obj}</Text>
                                )
                            })
                        }
                        {servicios[0].observaciones[0].obj.length > 0 &&
                            <Text style={{ marginTop: 5, marginBottom: 5 }} >_____________________________________________________</Text>
                        }
                        <Text style={[styles.block, { marginTop: 15 }]}></Text>
                    </View>
                </Page>
            </Document >
        )
    }


    return (
        <Grid container >
            {/* Formulario */}
            {
                servicios.length > 0
                    ? <Fragment>
                        <Grid item md={4} />
                        <Box align="center">

                            <Grid item md={4}>
                                <Button style={{ marginBottom: 20 }} onClick={() => setPdgGenerate(true)} fullWidth color="secondary" variant="contained">Generar PDF</Button>
                                {
                                    pdgGenerate
                                    && <PDFDownloadLink fileName={`${servicios[0].numServicio}.pdf`} document={<Documento />}>
                                        {({ blob, url, loading, error }) => (loading ? <CircularProgress /> :
                                            <Button style={{ background: 'red', color: 'white', textDecoration: 'none' }} className="bottonURL" id={url} fullWidth variant="contained" endIcon={<PictureAsPdfIcon />} >
                                                Descargar PDF
                            </Button>)}
                                    </PDFDownloadLink>
                                }
                            </Grid>
                        </Box>

                        <Grid item md={4} />

                    </Fragment>
                    : <Grid item md={12} >
                        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
                            <h1>Ingresa el codigo enviado a tu WhatsApp</h1>
                            {errors.id && <Alert style={{ justifyContent: 'center', marginRight: 150, marginLeft: 150 }} severity="error">{errors.id.message}</Alert>}
                            <br />
                            <TextField
                                name="id"
                                placeholder="Identificacion mas numero de factura"
                                variant="outlined"
                                inputRef={register({
                                    required: { value: true, message: 'Campo requerido' },
                                    minLength: { value: 4, message: 'El campo minimo es de 4 carateres' }
                                })}
                            />
                        </form>

                    </Grid>
            }

        </Grid >

    )
}
