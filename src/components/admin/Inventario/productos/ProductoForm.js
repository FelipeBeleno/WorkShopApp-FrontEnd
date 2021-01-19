import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Divider, Grid, FormControl, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { cargarCategorias } from '../../../../redux/categoriaDucks';
import { crearObjeto } from '../../../../redux/objetosDuck';
import { DropzoneArea } from 'material-ui-dropzone';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

export const ProductoForm = ({ open, onClose }) => {
	//============Redux Usuario=======================
	const usuario = useSelector(state => state.loginReducer._id);

	const { register, handleSubmit, errors, control } = useForm({
		defaultValues: { categoria: "", estado: false, usuario: usuario }
	});
	const [file, setFile] = React.useState('');
	const onSubmit = data => {
		dispatch(crearObjeto(data, file))
		onClose()
	};

	//============Redux Categorias====================
	const dispatch = useDispatch();
	const { categorias } = useSelector(state => state.categoriasReducer);

	React.useEffect(() => {
		dispatch(cargarCategorias());
	}, [dispatch])

	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth={'md'}
				fullWidth={true}>
				<DialogTitle>Crear Nuevo Producto</DialogTitle>
				<Divider />
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={3}>
							<Grid item md={12} >
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Nombre"
										name="nombre"
										inputRef={register({
											required: { value: true, message: 'El nombre del producto es obligatorio' },
											minLength: {
												value: 5,
												message: 'El campo debe tener mas de 4 carateres'
											},
											pattern: {
												value: /^[a-zA-Z]/i,
												message: 'no se pueden usar simbolos'
											}
										})}>
									</TextField>
									{errors.nombre && <Alert severity="error">{errors.nombre.message}</Alert>}
								</FormControl>
							</Grid>
							<Grid item md={6}>
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Cantidad"
										name="cantidadDisponible"
										type="number"
										inputRef={register({
											required: { value: true, message: 'es necesario selecionar el stock del producto' },
											pattern: {
												value: /^[0-9]/i,
												message: 'no se pueden usar simbolos o catacteres'
											}
										})}>
									</TextField>
									{errors.cantidadDisponible && <Alert severity="error">{errors.cantidadDisponible.message}</Alert>}
								</FormControl>
							</Grid>
							<Grid item md={6}>
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Precio"
										name="precio"
										type="number"
										inputRef={register({
											required: { value: true, message: 'es necesario selecionar el precio del producto' },
											pattern: {
												value: /^[0-9]/i,
												message: 'no se pueden usar simbolos o catacteres'
											}
										})}>
									</TextField>
									{errors.cantidadDisponible && <Alert severity="error">{errors.cantidadDisponible.message}</Alert>}
								</FormControl>
							</Grid>
							{/* =====================select categorias============== */}

							<Grid item md={12} >
								<FormControl fullWidth>
									<InputLabel >Categoria</InputLabel>
									<Controller
										control={control}
										name="categoria"
										as={
											<Select>
												{categorias.map((categoria, indx) =>
													<MenuItem key={indx} value={categoria._id}>
														{categoria.nombre}
													</MenuItem>
												)}
											</Select>}>
									</Controller>
									{errors.categoria && <Alert severity="error">{errors.categoria.message}</Alert>}
								</FormControl>
							</Grid>
							{/*
	    <Grid item md={12} >
	      <FormControl fullWidth>
		<TextField
		  variant="standard"
                  label="Usuario"
                  name="usuario"
		  inputRef={register({
		    required: { value: true, message: 'El nombre del producto es obligatorio' },
		  })}>
		</TextField>
		  {errors.nombre && <Alert severity="error">{errors.nombre.message}</Alert>}
	      </FormControl>
	    </Grid>*/}
							{/* =====================select Estado============== */}
							<Grid item md={12} >
								<FormControl fullWidth>
									<InputLabel >Estado</InputLabel>
									<Controller
										control={control}
										name="estado"
										as={
											<Select>
												<MenuItem value={true}>
													Activo
		  </MenuItem>
												<MenuItem value={false}>
													Desactivado
		  </MenuItem>
											</Select>}>
									</Controller>
									{errors.estado && <Alert severity="error">{errors.estado.message}</Alert>}
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<DropzoneArea
									dropzoneText='Imagen de producto'
									Icon={PhotoCameraIcon}
									acceptedFiles={['image/*']}
									onChange={(files => setFile(files))}
									filesLimit={1}
									onAlert={(message, variant) => {
										message = 'Tipo de archivo no es permitido, ingresa solo imagenes';
										console.log(`${variant}: ${message}`);
									}} />
							</Grid>
							<Grid item md={6} >
								<FormControl fullWidth>
									<Button variant="contained" color="primary" type="submit">Crear producto</Button>
								</FormControl>
							</Grid>
							<Grid item md={6}>
								<FormControl fullWidth>
									<Button variant="contained" color="secondary" onClick={onClose}>cancelar</Button>
								</FormControl>
							</Grid>
						</Grid>
					</form>
				</DialogContent>

			</Dialog>
		</div>
	)
}
