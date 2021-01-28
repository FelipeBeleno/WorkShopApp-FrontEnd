import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, InputAdornment, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { Fragment, useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import TodayIcon from '@material-ui/icons/Today';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReactSelectMaterialUi, { MultipleSelect } from 'react-select-material-ui';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProcedimientos } from '../../../redux/procedimientosDucks';
import { obtenerObjetos } from '../../../redux/objetosDuck';
import { cleanService, editarServicio } from '../../../redux/serviciosDucks';
import { consultarArreglos } from '../../../redux/ventasDuck';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Swal from 'sweetalert2';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const GestionTaller = ({ setGestion, dataEdit }) => {

    let envProced;
    const { procedimiento } = useSelector(state => state.procedimientosReducer)
    const { objetos } = useSelector(state => state.objetosReducer)
    const servicioActual = useSelector(state => state.serviciosReducer)
    const dispatch = useDispatch()

    const [procedimientosTabla, setProcedimientosTabla] = useState([])
    const [productosTabla, setProductosTabla] = useState([])
    const [observaciones, setObservaciones] = useState(false)
    const [errorTabla, setErrorTabla] = useState(false)
    const { register, handleSubmit, control } = useForm()

    useEffect(() => {
        dispatch(obtenerProcedimientos())
        dispatch(obtenerObjetos());


    }, [dispatch])

    const { objetosPorAcabar } = useSelector(state => state.objetosReducer)


    console.log(procedimientosTabla)
    console.log(errorTabla)
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



    // cantidad dinamica en la tabla
    const handleChangeCant = (e) => {

        setProductosTabla(productosTabla.map(elem => {

            elem.cantidad = e?.target?.value
            return elem
        }))
    }

    const handleSelectProcedimientos = (values) => {

        setErrorTabla(false)
        if (values?.length !== 0 || values !== null) {
            dataEdit.procedimientos.forEach(ele => {
                values?.forEach(el => {
                    if (el === ele.nombre) {
                        setErrorTabla(true)
                        return Swal.fire({
                            title: 'Error',
                            text: `Elimina de la lista ${ele.nombre.toUpperCase()}, ya se encuenta dentro de los procedimientos`,
                            icon: 'warning'
                        })

                    }
                })
            })
        }
        let arrays = values
        let arraysDataFinal = []


        for (const j in procedimiento) {
            for (const i in arrays) {
                if (procedimiento[j]?.nombre === arrays[i]) {
                    arraysDataFinal.push(procedimiento[j])
                }
            }
        }
        setProcedimientosTabla(arraysDataFinal)

    }

    const handleSelectProducts = (values) => {
        let arrays = values
        let arraysDataFinal = []

        for (const j in objetos) {
            for (const i in arrays) {
                if (objetos[j]?.nombre === arrays[i]) {
                    arraysDataFinal.push(objetos[j])
                }
            }
        }
        setProductosTabla(arraysDataFinal)
    }

    const onSubmit = (data, e) => {
        e.preventDefault()

        if (errorTabla) {
            return Swal.fire({
                title: 'Error',
                text: `hay campos repetidos en la tabla procedimientos`,
                icon: 'warning'
            })
        } else {
            envProced = [...dataEdit.procedimientos, ...procedimientosTabla];

            return dispatch(editarServicio(dataEdit._id, data, envProced, productosTabla))
        }



    }
    const handleBack = () => {
        dispatch(consultarArreglos())
        dispatch(cleanService())
        setGestion(false)
    }
    const hanldeFinish = () => {
        dispatch(consultarArreglos())
        dispatch(cleanService())
        setGestion(false)
    }


    return (
        <Fragment>
            <Grid item md={2} style={{ margin: 20 }} >
                <IconButton color="primary" onClick={handleBack} style={{ background: '#d4d700' }} aria-label="upload picture" component="span">
                    <ArrowBackIcon />
                </IconButton>
            </Grid>
            <h1 style={{ textAlign: 'center' }}> Gestor de procesos </h1>
            <h2>Detalle de proceso</h2>

            <Grid container spacing={5}>
                {/* Datos Cliente */}
                <Grid item md={6}>
                    <List>
                        <ListItem>
                            <ListItemIcon >
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Nombre: {dataEdit.cliente.nombre}
                            </ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Numero: {dataEdit.cliente.telefono}
                            </ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Email: {dataEdit.cliente.email}
                            </ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemIcon>
                                <    BrandingWatermarkIcon
                                />
                            </ListItemIcon>
                            <ListItemText>
                                Identificacion: {dataEdit.cliente.numDocumento}
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </List>

                </Grid>


                <Grid item md={6}>

                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FormatListNumberedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Numero de servicio : {dataEdit.numServicio}
                            </ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <TodayIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Fecha recibido: {dataEdit.fechaRegistro_iso}
                            </ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <FindInPageIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Numero consulta: {dataEdit.numConsulta}
                            </ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem>
                            <ListItemIcon>
                                <HourglassEmptyIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Estado servicio: {dataEdit.procesoServicio || 'No registra'}
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>

            </Grid>

            <br />
            <Grid item md={12}>
                <h2>Procedimientos ya agregados</h2>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    Descripcion
                                </TableCell>
                                <TableCell>
                                    Precio
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataEdit.procedimientos.map(ele => {
                                    return (
                                        <TableRow key={ele._id}>
                                            <TableCell>
                                                {ele.nombre}
                                            </TableCell>
                                            <TableCell>
                                                {ele.descripcion}
                                            </TableCell>
                                            <TableCell>
                                                {ele.precio}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <br />
            <h2>Edicion de proceso</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Fragment>
                            <label>Selecciona estado de servicio</label>
                            <Controller
                                control={control}
                                name="procesoServicio"
                                defaultValue="EN PROCESO"
                                as={
                                    <ReactSelectMaterialUi
                                        fullWidth={true}
                                        inputRef={register}
                                        placeholder="Selecciona el estado del proceso"
                                        options={['EN PROCESO', 'FINALIZADO']}
                                        SelectProps={
                                            {
                                                msgNoOptionsMatchFilter: 'No hay resultados',
                                            }
                                        }
                                    />
                                }
                            />

                        </Fragment>
                    </Grid>
                    <Grid item md={6}>
                        <Box align="center">
                            <Button fullWidth color="secondary" variant="contained" onClick={() => setObservaciones(!observaciones)}>
                                Agregar Observaciones
                            </Button>
                            {
                                observaciones
                                && <Fragment>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Observacion"
                                        name="observaciones"
                                        multiline
                                        inputRef={register}
                                        rows={4}
                                        style={{ marginTop: 10, marginBottom: 5, justifyContent: 'center' }}
                                        variant="outlined"
                                    />
                                </Fragment>
                            }
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Fragment>
                            <Box align="center">

                                <label>Seleccione los servicios a adicionar</label>
                                <MultipleSelect
                                    name="procedimientos"
                                    inputRef={register}
                                    fullWidth={true}
                                    options={procedimiento.map(ele => {
                                        return ele.nombre
                                    })}
                                    onChange={values => {
                                        handleSelectProcedimientos(values)

                                    }}
                                    placeholder="Seleccione los procedimientos"

                                    SelectProps={
                                        {
                                            msgNoOptionsMatchFilter: 'No hay resultados',
                                        }
                                    }
                                />

                            </Box>
                            <br />
                            <br />
                            {
                                procedimientosTabla.length > 0
                                && <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Servicio
                                        </TableCell>
                                                <TableCell>
                                                    Descripcion
                                        </TableCell>
                                                <TableCell>
                                                    Precio
                                        </TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {procedimientosTabla.length > 0
                                                && procedimientosTabla.map((element, index) => {
                                                    //element.cantidad = document?.getElementById(`cantidad${index}`)?.value || 0
                                                    return (
                                                        <TableRow key={element._id}>
                                                            <TableCell>{element.nombre}</TableCell>
                                                            <TableCell>{element.descripcion}</TableCell>
                                                            <TableCell>{element.precio}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            }
                        </Fragment>

                    </Grid>

                    <Grid item md={6}>
                        <Fragment>
                            <Box align="center">

                                <label>Seleccione los productos que se usan</label>
                                <MultipleSelect
                                    name="objetos"
                                    inputRef={register}
                                    fullWidth={true}
                                    options={objetos.map(ele => {
                                        return ele.nombre
                                    })}
                                    onChange={values => {
                                        handleSelectProducts(values)

                                    }}
                                    placeholder="Seleccione los servicios"
                                    SelectProps={
                                        {
                                            msgNoOptionsMatchFilter: 'No hay resultados',
                                        }
                                    }
                                />
                            </Box>
                            <br />
                            <br />
                            {
                                productosTabla.length > 0
                                && <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Producto
                                        </TableCell>
                                                <TableCell>
                                                    Stock
                                        </TableCell>
                                                <TableCell>
                                                    Cantidad
                                        </TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                productosTabla.map((element, index) => {
                                                    element.cantidad = document?.getElementById(`cantidad${index}`)?.value || 0
                                                    return (

                                                        <TableRow key={element._id}>
                                                            <TableCell>{element.nombre}</TableCell>
                                                            <TableCell>{element.cantidadDisponible}</TableCell>
                                                            <TableCell><TextField onChange={handleChangeCant} type="number" id={`cantidad${index}`} defaultValue={element.cantidad} variant="standard"></TextField></TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            }
                        </Fragment>

                    </Grid>
                    <Grid item md={12}>
                        <Box align="center">

                            <TextField

                                name="precioTotal"
                                value={procedimientosTabla.length > 0 ?
                                    procedimientosTabla.reduce((acc, prod) => {
                                        return acc + prod.precio
                                    }, dataEdit.precioTotal) : dataEdit.precioTotal}
                                inputRef={register}
                                variant="standard"
                                placeholder='TOTAL'
                                InputProps={
                                    {
                                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /> </InputAdornment>
                                    }
                                }


                            />

                        </Box>
                    </Grid>
                    {
                        servicioActual.estado
                        && <Grid container spacing={2}>
                            <Grid item md={6}>
                                <a
                                    style={{ color: 'white', textDecoration: 'none', width: '100vh' }}
                                    rel="noreferrer"
                                    href={`https://api.whatsapp.com/send?phone=57${servicioActual.servicioProceso.cliente.telefono}&text=Hola%20${servicioActual.servicioProceso.cliente.nombre},%20el%20estado%20de%20tu%20proceso%20cambio%20a%20${servicioActual.servicioProceso.procesoServicio}%20consulta%20toda%20la%20info%20aqui%20${process.env.REACT_APP_FRONT_END_URL}%20código%20único%20de%20tu%20proceso%20es%20tu%20numero%20de%20identificacion%20mas%20el%20numero%20de%20tu%20factura%20${servicioActual.servicioProceso.numServicio}%20codigo:%20${servicioActual.servicioProceso.cliente.numDocumento}${servicioActual.servicioProceso.numServicio}%20recuerda%20que%20si%20el%20estado%20de%20tu%20factura%20es%20FINALIZADO%20debes%20consultar%20por%20generar%20factura.`}
                                    target="_blank">
                                    <Button
                                        variant="contained"
                                        endIcon={<WhatsAppIcon />}
                                        style={{ background: '#075e54', marginTop: 12, color: "white", marginBottom: 10 }}
                                        fullWidth

                                    >
                                        Informa al cliente
                                    </Button>
                                </a>
                            </Grid>
                            <Grid item md={6}>
                                <Button
                                    variant="contained"
                                    endIcon={<ExitToAppIcon />}
                                    color="secondary"
                                    style={{ marginTop: 12, marginBottom: 10 }}
                                    fullWidth
                                    onClick={hanldeFinish}
                                >
                                    Finalizar
                                    </Button>
                            </Grid>
                        </Grid>
                    }
                    <Button type="submit" fullWidth color="primary" variant="contained">actualizar </Button>
                </Grid>
            </form>


        </Fragment>
    )
}
