import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';


import { validacionStartLogin } from '../../redux/loginDucks';



export const LoginLayout = () => {

    const { errors, handleSubmit, register } = useForm();

    const dispatch = useDispatch()


    const formSubmit = (data, e) => {

        e.preventDefault()



        dispatch(validacionStartLogin(data))

    }


    return (


        <div style={{ background: '#d4d700', width: '100vw', height: '100vh' }} >
            <Grid container justify="center" >

                <Grid item xs={12} md={5}  >
                    <Box bgcolor="grey.100" borderColor="grey.200" borderRadius={10} border={2} p={2} m={10}>

                        <form onSubmit={handleSubmit(formSubmit)}>
                            <Typography variant="h4" align="center" >Work Soft</Typography>
                            <br />
                            <br />

                            <Grid container >
                                <Grid item xs={12} align="center">
                                    <TextField
                                        name="documento"
                                        id="outlined-basic"
                                        fullWidth
                                        label="Documento"
                                        variant="outlined"
                                        inputRef={register({
                                            required: { value: true, message: 'Numero de documento obligatorio' },
                                            minLength: {
                                                value: 5,
                                                message: 'El campo debe tener mas de 4  carateres'
                                            }
                                        })}
                                    />

                                </Grid>
                            </Grid>
                            {errors.documento && <Alert justify="center" severity="error" > {errors.documento.message}</Alert>

                            }
                            <br />
                            <br />
                            <Grid container >
                                <Grid item xs={12} align="center">
                                    <TextField
                                        name="contraseña"
                                        fullWidth
                                        label="Contraseña"
                                        variant="outlined"
                                        type="password"
                                        inputRef={register({
                                            required: { value: true, message: ' Debe de ingresar una contraseña' },
                                            minLength: { value: 6, message: 'El campo debe tener minimo 6 caracteres' }
                                        })}
                                    />
                                </Grid>
                            </Grid>
                            {errors.contraseña && <Alert justify="center" severity="error" > {errors.contraseña.message}</Alert>

                            }
                            <br />
                            <br />
                            <Button fullWidth color="primary" variant="contained" type={errors?.documento?.message ? 'button' : 'submit'} > Ingresa </Button>
                        </form>
                    </Box>
                </Grid>


            </Grid>



        </div >


    )
}