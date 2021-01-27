import React, { Fragment, useEffect, useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, FormControl, Grid, IconButton, Paper, Table, TextField, InputAdornment, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import ReactSelectMaterialUi, { MultipleSelect } from 'react-select-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { obtenerProcedimientos } from '../../../redux/procedimientosDucks';
import { obtenerClientes } from '../../../redux/clientesDuck';
import { FormNuevoCliente } from '../Ventas/FormNuevoCliente'
import Swal from 'sweetalert2';
import { crearServicioVenta } from '../../../redux/serviciosDucks';
import { DescargaPdf } from '../Ventas/DescargaPdf';
import { pesoColombiano } from '../../../helpers/pesoColombiano';


export const NuevoServicio = ({ setTallerState }) => {

    const { handleSubmit, control, register } = useForm()
    const [productosTabla, setProductosTabla] = useState([])
    const [observaciones, setObservaciones] = useState(false)
    const [open, setOpen] = useState(false)
    const servicio = useSelector(state => state.serviciosReducer)

    const dispatch = useDispatch()
    const { clientes } = useSelector(state => state.clientesReducer)
    const { procedimiento } = useSelector(state => state.procedimientosReducer)

    useEffect(() => {
        dispatch(obtenerClientes())
        dispatch(obtenerProcedimientos())
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


    //seleccion de productos y manejo de los mismos para mostrar en tabla
    const handleSelectProducts = (values) => {

        let arrays = values
        let arraysDataFinal = []

        for (const j in procedimiento) {
            for (const i in arrays) {
                if (procedimiento[j]?.nombre === arrays[i]) {
                    arraysDataFinal.push(procedimiento[j])
                }
            }
        }
        setProductosTabla(arraysDataFinal)
    }

    const handleDeleteItem = (id) => {
        const result = productosTabla.filter(element => {
            return element._id !== id
        })
        setProductosTabla(result)
    }

    const clientesOption = clientes.map(res => {
        return (res.numDocumento)
    });

    const onSubmit = (data, e) => {
        e.preventDefault()

        if (data.cliente.length === 0) {
            return Swal.fire({
                title: 'Error',
                text: 'El campo cliente debe estar lleno con un capo valido',
                icon: 'warning'
            })
        } else if (productosTabla.length === 0) {
            return Swal.fire({
                title: 'Error',
                text: 'Ingrese por lo menos un procedimiento',
                icon: 'warning'
            })
        } else {

            dispatch(crearServicioVenta(data, productosTabla))
        }

    }
    const onClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            {
                open === true && <FormNuevoCliente open={open} onClose={onClose} />
            }

            <Grid container>
                <Grid item md={2} xs={12}  >
                    <Box align="center">
                        <IconButton color="primary" onClick={() => setTallerState('')} style={{ background: '#d4d700' }} aria-label="upload picture" component="span">
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item md={8} xs={12}>

                    <h1 style={{ textAlign: 'center' }}>Agregar Nuevo Servicio</h1>

                </Grid>
            </Grid>
            {
                servicio.estado === false
                && <Grid container spacing={2}>
                    <Grid item md={8} xs={12}>

                        <Fragment>
                            <h1 style={{ textAlign: 'center' }}>Seleccion Servicios </h1>
                            <Fragment>
                                <Box align="center">
                                    <Grid item xs={12} md={8} style={{ marginTop: 5 }} >


                                        <MultipleSelect
                                            fullWidth={true}
                                            options={procedimiento.map(ele => {
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

                                    </Grid>
                                </Box>
                                <br />
                                <br />

                            </Fragment>

                            <TableContainer component={Paper}>
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
                                            <TableCell>
                                                Eliminar Entrada
                                        </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productosTabla.length > 0
                                            && productosTabla.map((element, index) => {
                                                //element.cantidad = document?.getElementById(`cantidad${index}`)?.value || 0
                                                return (
                                                    <TableRow key={element._id}>
                                                        <TableCell>{element.nombre}</TableCell>
                                                        <TableCell>{element.descripcion}</TableCell>
                                                        <TableCell>{pesoColombiano.format(element.precio)}</TableCell>
                                                        <TableCell><IconButton onClick={() => handleDeleteItem(element._id)}><DeleteForeverIcon style={{ color: 'red' }} /></IconButton></TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                        </Fragment>
                    </Grid>

                    <Fragment>
                        <Grid item xs={12} md={4}>
                            {/* Formulario */}
                            <Box align="center">
                                <h1>Datos de la Factura</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormControl>
                                        <Grid item xs={12} md={12}  >
                                            <Fragment >
                                                <h3>Tipo Servicio</h3>
                                                <Controller
                                                    control={control}
                                                    name="tipoServicio"
                                                    defaultValue={"ARREGLO"}
                                                    options={['ARREGLO']}

                                                    as={
                                                        <ReactSelectMaterialUi
                                                            fullWidth={true}
                                                            placeholder="Selecciona"
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
                                        <Grid item xs={12} md={12}  >
                                            <Fragment >
                                                <h3>Estado de servicio</h3>
                                                <Controller
                                                    control={control}
                                                    name="procesoServicio"
                                                    defaultValue="RECIBIDO"

                                                    as={
                                                        <ReactSelectMaterialUi
                                                            inputRef={
                                                                register({
                                                                    required: true,
                                                                    minLength: 3
                                                                })

                                                            }
                                                            fullWidth={true}
                                                            options={['RECIBIDO', 'EN PROCESO', 'FINALIZADO']}
                                                            placeholder="Selecciona el estado del servicio"
                                                            SelectProps={
                                                                {

                                                                    msgNoOptionsMatchFilter: 'No hay resultados, verifica o crea un cliente',

                                                                }
                                                            }
                                                        />
                                                    }
                                                />
                                            </Fragment>
                                        </Grid>

                                        <Grid item xs={12} md={12} style={{ marginBottom: 5 }} >
                                            <Fragment >
                                                <h3>Selecciona el Cliente</h3>
                                                <Controller
                                                    control={control}
                                                    name="cliente"
                                                    defaultValue=""

                                                    as={
                                                        <ReactSelectMaterialUi
                                                            inputRef={
                                                                register({
                                                                    required: true,
                                                                    minLength: 3
                                                                })

                                                            }
                                                            fullWidth={true}
                                                            options={clientesOption}
                                                            placeholder="Busca por identificacion"
                                                            SelectProps={
                                                                {

                                                                    msgNoOptionsMatchFilter: 'No hay resultados, verifica o crea un cliente',

                                                                }
                                                            }
                                                        />
                                                    }
                                                />
                                            </Fragment>
                                        </Grid>



                                        <Grid item xs={12} md={12} style={{ marginTop: 1 }}>
                                            <Button variant="contained" color="primary" onClick={() => setOpen(true)} fullWidth endIcon={<AddCircleIcon />}>
                                                Cliente Nuevo
                                    </Button>
                                        </Grid>
                                        <Grid item xs={12} md={12} style={{ marginTop: 5, marginBottom: 10 }}>
                                            <Button variant="contained" onClick={() => setObservaciones(!observaciones)} color="secondary" fullWidth endIcon={<AssignmentIcon />}>
                                                Agregar Observacion
                                    </Button>
                                        </Grid>
                                        {
                                            observaciones
                                            && <Grid item md={12}>
                                                <h2><label>Observaciones</label></h2>
                                                <textarea
                                                    name="observaciones"
                                                    aria-label="empty textarea"
                                                    placeholder="Observaciones"
                                                    style={{ borderColor: 'black', borderRadius: 5, width: '15vw', height: '15vh', }}
                                                    ref={register}
                                                />
                                            </Grid>
                                        }


                                        <Grid item xs={12} md={12}>


                                            <TextField
                                                value={productosTabla.reduce((acc, prod) => {
                                                    return acc + prod.precio
                                                }, 0)}
                                                variant="standard"
                                                name="precioTotal"
                                                fullWidth
                                                placeholder='TOTAL'
                                                inputRef={register}
                                                InputProps={
                                                    {
                                                        startAdornment: <InputAdornment position="start"><AttachMoneyIcon /> </InputAdornment>
                                                    }
                                                }
                                            />
                                        </Grid>
                                        <br />
                                        <Grid item xs={12} md={12} >
                                            <Button variant="contained" type="submit" color="primary" fullWidth>
                                                Guardar
                                            </Button>
                                        </Grid>
                                    </FormControl>
                                </form>
                            </Box>
                        </Grid>
                    </Fragment>
                </Grid>


            }


            {
                servicio.estado
                && <Fragment>
                    <br /><br /><br /><br /><br />
                    <Grid item md={12} xs={12}>
                        <DescargaPdf />
                    </Grid>

                </Fragment>

            }
        </Fragment>

    )
}
