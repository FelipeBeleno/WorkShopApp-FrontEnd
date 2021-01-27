import { Box, Button, FormControl, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReactSelectMaterialUi, { MultipleSelect } from "react-select-material-ui";
import { useForm, Controller } from 'react-hook-form';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useDispatch, useSelector } from 'react-redux'
import { obtenerClientes } from '../../../redux/clientesDuck';
import { obtenerObjetos } from '../../../redux/objetosDuck';
import { cleanService, crearServicioVenta } from '../../../redux/serviciosDucks';
import { DescargaPdf } from './DescargaPdf';
import Swal from 'sweetalert2';
import { FormNuevoCliente } from './FormNuevoCliente';
import { pesoColombiano } from '../../../helpers/pesoColombiano';



export const NuevoServicio = ({ setOpenService }) => {


    // hook form 
    const { register, handleSubmit, control } = useForm()

    // estados globales hooks
    const dispatch = useDispatch()
    const { clientes } = useSelector(state => state.clientesReducer)
    const { objetos } = useSelector(state => state.objetosReducer)
    const servicio = useSelector(state => state.serviciosReducer)
    const [open, setOpen] = useState(false)

    // estados propios del componente
    const [productosTabla, setProductosTabla] = useState([])
    const [totalValorFactura, setTotalValorFactura] = useState('')

    useEffect(() => {
        dispatch(obtenerClientes())
        dispatch(obtenerObjetos());
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

    // busqueda de cliente por numero de documento
    const clientesOption = clientes.map(res => {
        return (res.numDocumento)
    });


    //seleccion de productos y manejo de los mismos para mostrar en tabla
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

    // eliminar elemento de la tabla
    const handleDeleteItem = (id) => {
        const result = productosTabla.filter(element => {
            return element._id !== id
        })
        setProductosTabla(result)
    }



    // variable que da los nombres de los productos
    const productosOption = objetos.map(res => {
        return (
            res.nombre
        )
    })


    // Submit
    const onSubmit = (data, e) => {
        e.preventDefault();

        if (data.cliente.length < 3) {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese el campo Cliente',
                icon: 'error'
            })
        } else if (productosTabla.length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese al menos un producto',
                icon: 'error'
            })
        } else {
            dispatch(crearServicioVenta(data, productosTabla))
        }

    }

    // cantidad dinamica en la tabla
    const handleChangeCant = (e) => {

        setProductosTabla(productosTabla.map(elem => {

            elem.cantidad = e?.target?.value
            return elem
        }))
    }

    useEffect(() => {
        productosTabla?.map((element, index) => {
            element.totalCompraItem = (document?.getElementById(`cantidad${index}`)?.value * element.precio) || 0

        })
        let valortotal = [];
        let sum = 0
        for (const i in productosTabla) {
            valortotal.push(productosTabla[i].totalCompraItem)

        }
        valortotal.forEach(elem => {
            sum += elem
        })
        setTotalValorFactura(sum)


    }, [productosTabla])


    const handleCleanService = () => {

        dispatch(cleanService())
        setOpenService(false)

    }

    const onClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            {
                open === true && <FormNuevoCliente open={open} onClose={onClose} />
            }

            {/* Seleccion de tipo de servicio */}
            <Box align="center" mb={1}>
                <Grid container spacing={2} justify="center">

                    <Grid item md={2}  >
                        <IconButton color="primary" onClick={handleCleanService} style={{ background: '#d4d700' }} aria-label="upload picture" component="span">
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h4"> Nuevo Servicio</Typography>
                    </Grid>
                    <Grid item md={2} />



                </Grid>
            </Box>


            <Box align="center">
                <Grid container spacing={0} >

                    <Grid item md={8} >

                        {/* Seleccion de productos */}

                        {
                            servicio.estado === false
                            && <Fragment>
                                <h1>Seleccion de productos </h1>
                                <Grid item xs={12} md={10} style={{ marginTop: 10 }} >
                                    <Fragment >
                                        <label>Productos</label>
                                        <MultipleSelect
                                            fullWidth={true}
                                            options={productosOption}
                                            onChange={values => {
                                                handleSelectProducts(values)

                                            }}
                                            placeholder="Seleccione los productos"
                                            SelectProps={
                                                {
                                                    msgNoOptionsMatchFilter: 'No hay resultados',
                                                }
                                            }
                                        />
                                    </Fragment>
                                </Grid>
                                <br />
                                <br />

                            </Fragment>
                        }

                        {/* Tabla */}

                        {
                            servicio.estado === false
                            && <Fragment><h1>Detalle pedido </h1>

                                <TableContainer component={Paper}>
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
                                                <TableCell>
                                                    Precio unidad
                                            </TableCell>
                                                <TableCell>
                                                    Precio Total
                                            </TableCell>
                                                <TableCell>
                                                    Eliminar Entrada
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
                                                            <TableCell>{pesoColombiano.format(element.precio)}</TableCell>
                                                            <TableCell>{pesoColombiano.format(element.totalCompraItem)}</TableCell>
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

                        }
                        <Grid item md={10} >

                        </Grid>
                    </Grid>


                    {
                        servicio.estado === false
                        && <Fragment>
                            <Grid item xs={12} md={4}>
                                {/* Formulario */}
                                <h1>Datos de la Factura</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <FormControl>
                                        <Grid item xs={12} md={12} style={{ marginBottom: 2 }} >
                                            <Fragment >
                                                <h3>Tipo Servicio</h3>
                                                <Controller
                                                    control={control}
                                                    name="tipoServicio"
                                                    defaultValue={"VENTA"}
                                                    options={['VENTA']}

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
                                        <Grid item xs={12} md={12} style={{ marginBottom: 10 }} >
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
                                            <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(true)} endIcon={<AddCircleIcon />}>
                                                Cliente Nuevo
                                    </Button>
                                        </Grid>

                                        <Grid item md={12}>
                                            <h2><label>Observaciones</label></h2>
                                            <textarea
                                                name="observaciones"
                                                aria-label="empty textarea"
                                                placeholder="Observaciones"
                                                style={{ borderColor: 'black', borderRadius: 5, width: '20vw', height: '15vh', marginBottom: 10 }}
                                                ref={register}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={12}>


                                            <TextField
                                                value={totalValorFactura}
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
                            </Grid>
                        </Fragment>
                    }


                </Grid>
            </Box>
            {
                servicio.estado
                &&
                <Fragment>
                    <br /><br /><br /><br /><br />
                    <Grid item md={12} xs={12}>
                        <DescargaPdf />
                    </Grid>

                </Fragment>
            }

        </Fragment >


    )
}
