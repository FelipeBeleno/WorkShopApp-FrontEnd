import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { CircularProgress, Grid, TextField, Button } from '@material-ui/core'
import { ProcesoData } from './ProcesoData';
import { obtenerProceso } from '../../../redux/publicDucks';
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';


export const Proceso = ({ setOption }) => {

    const { errors, register, handleSubmit } = useForm()
    const [formActive, setFormActive] = useState(true)
    const [dataReceived, setDataReceived] = useState(false)
    const dispatch = useDispatch()


    const onSubmit = (data, e) => {

        if (Number.isNaN(data.numFactura)) {
            return Swal.fire({
                title: 'Error',
                text: 'Campo ingresado no es valido',
                icon: 'error'
            })
        } else {
            e.preventDefault()
            setFormActive(false)
            setDataReceived(true)
            dispatch(obtenerProceso(data))
        }

    }


    return (
        <Grid container alignItems="center" justify="center">
            <Grid item>
                {
                    formActive
                        ? <Grid container >
                            <Grid item md={12} xs={12}>
                                <form
                                    style={{ margin: 50, textAlign: 'center' }}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <h1>Ingresa el numero de id</h1>
                                    <TextField name='numFactura' variant="outlined" fullWidth inputRef={register({
                                        required: { value: true, message: 'El campo es obligatorio' },
                                        maxLength: { value: 30, message: 'El campo debe tener maximo 6 carateres' },
                                        valueAsNumber: { value: true, message: 'El campo debe ser numerico' },

                                    })} placeholder="ID Factura" />
                                    {errors.numFactura && <Alert severity="error">{errors.numFactura.message}</Alert>}
                                    <Button style={{ marginTop: 5 }} variant="contained" color="primary" type="submit" endIcon={<SearchIcon />} size="large">
                                        consultar
                                </Button>
                                </form>
                            </Grid>
                        </Grid>
                        : dataReceived === false
                            ? <Fragment><CircularProgress color="primary" /> </Fragment>
                            : dataReceived === true
                            && <ProcesoData setOption={setOption} />
                }


            </Grid>

        </Grid>
    )
}
