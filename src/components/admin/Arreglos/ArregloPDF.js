import { Button } from '@material-ui/core'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Fragment, useState } from 'react';
import { Page, Text, View, Document, PDFDownloadLink, StyleSheet, Image } from '@react-pdf/renderer';
import { DataTableCell, Table, TableBody, TableCell, TableHeader } from '@david.kucsai/react-pdf-table'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import moment from 'moment';


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


export const ArregloPdf = () => {




    const [clickPDF, setClickPDF] = useState(false)


    const { servicios } = useSelector(state => state.serviciosReducer)
    const { nombreApellido } = useSelector(state => state.loginReducer)


    const { clientes } = useSelector(state => state.clientesReducer)


    const clienteF = clientes.filter(elem => {
        return elem._id === servicios.cliente
    })

    const cliente = clienteF[0]

    const Documento = () => {

        return (
            <Document>
                <Page size="A4" style={styles.body}>
                    <View>
                        <Text style={styles.block}></Text>
                        <Image style={styles.image} src="data:image/jpeg;base64,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" />
                        <Text style={styles.titulo}>Factura de Servicio</Text>
                        <Text style={styles.subTitle}> Nombre de la Empresa. LTDA</Text>
                        <Text style={styles.subTitle}>Nit. 999.999.99</Text>
                        <Text style={styles.subTitle}>Telefono : 6855463</Text>
                        <Text style={[styles.subTitle, { marginBottom: 20 }]}> Cra 68 #68 int -68 Bogota D.C - Colombia </Text>
                        <Text style={{ marginTop: 10, marginBottom: 10 }} >_____________________________________________________</Text>
                        <Text style={styles.datosCliente}>Datos Cliente</Text>
                        <Text style={styles.contenidoDatosCliente}> Nombre: {cliente.nombre}</Text>
                        <Text style={styles.contenidoDatosCliente}> Cedula: {cliente.numDocumento || 'no registra'}</Text>
                        <Text style={styles.contenidoDatosCliente}> Email: {cliente.email || 'no registra'} </Text>
                        <Text style={styles.contenidoDatosCliente}> Telefono: {cliente.telefono || 'no registra'}</Text>
                        <Text style={styles.facturaTitulo}> Datos Factura </Text>
                        <Text style={styles.datosFactura}>Numero de Factura:{servicios.numServicio} </Text>
                        <Text style={styles.datosFactura}>Fecha:{moment(servicios.fechaRegistro_iso).format("DD/MM/YYYY")}</Text>
                        <Text style={styles.datosFactura}>Usuario: {nombreApellido} </Text>
                        <Text style={styles.blockTable}></Text>
                        <Text style={{ marginTop: 10, marginBottom: 5 }} >_____________________________________________________</Text>
                        <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 20, textAlign: 'center' }}>Detalle Servicio </Text>
                        <Text style={{ textAlign: "center", marginTop: 5, fontSize: 15 }}>Estado de servicio:  {servicios.procesoServicio}</Text>
                        {
                            servicios.observaciones.map((elemet, index) => {
                                return (
                                    <Text key={index} style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}>{elemet.obj}</Text>
                                )
                            })
                        }
                        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 20 }}>{`TOTAL: ${servicios.precioTotal}`}</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }} >_____________________________________________________</Text>
                        <Text style={[styles.block, { marginTop: 15 }]}></Text>
                    </View>
                </Page>
            </Document >
        )
    }



    const handlePDFGenerate = () => {
        Swal.fire({
            title: 'Cargando',
            text: 'Generando Pdf espere por favor',
            allowOutsideClick: false,
            timer: 1000,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        setTimeout(() => {

            setClickPDF(!clickPDF)
            /*  Swal.fire({
                 title: 'PDF Generado',
                 text: 'Descarga el PDF',
                 icon: 'info'
             }) */
        }, 1000)




    }


    return (
        <Fragment>

            {
                clickPDF
                    ? <PDFDownloadLink document={<Documento />} fileName={`Factura${servicios.numServicio}.pdf`} >
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' :
                            <Button color="secondary" fullWidth variant="contained" endIcon={<GetAppIcon />} >
                                Oprime el boton para descargar el pdf generado
                            </Button>
                        )}
                    </PDFDownloadLink >

                    : <Button endIcon={<PictureAsPdfIcon />} color="secondary" fullWidth variant="contained" onClick={handlePDFGenerate}>
                        GENERAR PDF
                        </Button>

            }

        </Fragment>
    )
}