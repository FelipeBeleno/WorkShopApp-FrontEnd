import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, FormControl, IconButton, Divider, FormControlLabel, Checkbox } from '@material-ui/core'
import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { DropzoneArea } from 'material-ui-dropzone';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { crearUsuario } from '../../redux/usuariosDuck';
import Alert from '@material-ui/lab/Alert';




export const NuevoUsuarioForm = ({ openRegistro, usuariosReducer }) => {

    //WorkShop nombre cloudinari


    const dispatch = useDispatch();
    // Formulario
    const { errors, register, handleSubmit } = useForm();


    const [open, setOpen] = useState(openRegistro);
    const [visual, setVisual] = useState(false);
    const [file, setFile] = useState('')
    const [errores, setErrores] = useState('')

    const [checkRole, setCheckRole] = useState(false)

    const onSubmit = (data, e) => {
        e.preventDefault()



        const validacion = usuariosReducer.usuarios.filter(res => {
            if (res.documento === data.documento) {
                return true
            } else {
                return false
            }
        })


        if (validacion.length !== 1) {
            if (data.contraseña === data.contraseña2) {

                if (data.role) {
                    data.role = 'ADMIN_ROLE'
                } else {
                    data.role = 'USER_ROLE'
                }

                dispatch(crearUsuario(data, file))

                setOpen(false)

            } else {
                setErrores('contraseña')
            }
        } else {
            setErrores('documento')

        }


    }

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"

                maxWidth="md"
            >

                <DialogTitle id="alert-dialog-title">
                    {'Nuevo Usuario'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Grid container>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="standard"
                                        label="Nombre y Apellido"
                                        name="nombreApellido"
                                        inputRef={register({
                                            required: { value: true, message: 'Nombre y Apellido obligatorio' },
                                            minLength: {
                                                value: 5,
                                                message: 'El campo debe tener mas de 4  carateres'
                                            }
                                        })}
                                    ></TextField>
                                    {errors.nombreApellido && <Alert severity="error">{errors.nombreApellido.message}</Alert>

                                    }
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant="standard"
                                        label="Numero Documento"
                                        name="documento"
                                        inputRef={register({
                                            required: { value: true, message: 'documento obligatorio' },
                                            minLength: {
                                                value: 5,
                                                message: 'El campo debe tener mas de 6  carateres'
                                            },
                                        })}
                                    ></TextField>
                                    {errors.documento && <Alert severity="error">{errors.documento.message}</Alert>}
                                    {errores === 'documento' && <Alert severity="error">{'Documento ya existe en la base de datos'}</Alert>}

                                </FormControl>
                            </Grid>
                            <br /><br />                           <br />
                            <Grid container spacing={1} alignItems="flex-end">

                                <Grid item xs={11}>
                                    <FormControl fullWidth>
                                        <TextField label="Contraseña"
                                            type={visual === false ? 'password' : 'text'}
                                            name="contraseña"
                                            inputRef={register({
                                                required: { value: true, message: 'Nombre y Apellido obligatorio' },
                                                minLength: {
                                                    value: 5,
                                                    message: 'El campo debe tener mas de 6  carateres'
                                                }
                                            })}

                                        ></TextField>
                                        {errors.contraseña && <Alert severity="error">{errors.contraseña.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>

                                    <IconButton style={{ color: 'black' }} size="small" onClick={() => setVisual(!visual)}>
                                        {
                                            visual
                                                ? <VisibilityOffIcon /> : <VisibilityIcon />

                                        }
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <br />  <br /><br />
                                <Grid item xs={11}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Confirmar contraseña"
                                            type={visual === false ? 'password' : 'text'}
                                            name="contraseña2"
                                            inputRef={register({
                                                required: true,

                                            })}

                                        ></TextField>
                                        {errores === 'contraseña' && <Alert severity="error">{'Las constraseñas no coinciden'}</Alert>}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton style={{ color: 'black' }} size="small" onClick={() => setVisual(!visual)}>
                                        {
                                            visual
                                                ? <VisibilityOffIcon /> : <VisibilityIcon />

                                        }

                                    </IconButton>
                                </Grid>

                            </Grid>

                            <Grid item xs={12}>
                                <br /> <br />
                                <DropzoneArea
                                    dropzoneText='Imagen de usuario'
                                    Icon={PhotoCameraIcon}
                                    acceptedFiles={['image/*']}
                                    onChange={(files => setFile(files))}
                                    onAlert={(message, variant) => {
                                        message = 'Tipo de archivo no es permitido, ingresa solo imagenes';
                                        console.log(`${variant}: ${message}`)
                                    }}


                                />
                            </Grid>

                            <br /> <br />  <br /> <br />
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="role"
                                            color="primary"
                                            value={checkRole}
                                            onClick={() => setCheckRole(!checkRole)}
                                        />

                                    }
                                    label="Rol Administrador"
                                    name="role"
                                    inputRef={register}
                                    value={checkRole}

                                />
                                <Alert severity="warning"> El rol por defecto es: usuario</Alert>
                            </Grid>



                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={5}>
                                <Button variant="contained" color="primary" type="submit" fullWidth > Guardar usuario </Button>
                            </Grid>
                            <br /> <br />
                            <Grid item xs={1} />
                            <Grid item xs={5}>
                                <Button variant="contained" color="secondary" type="reset" fullWidth onClick={handleClose}> Cancelar </Button>
                            </Grid>
                        </Grid>
                    </form>

                </DialogContent>

            </Dialog>
        </div >
    )
}
