import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Divider, Grid, FormControl, TextField, } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { crearCliente } from '../../../redux/clientesDuck';

export const FormNuevoCliente = ({ open, onClose }) => {
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		dispatch(crearCliente(data));
		onClose()

	}
	return (
		<div>
			<Dialog
				open={open}
				onClose={onClose}
				maxWidth={'sm'}
				fullWidth={true}>
				<DialogTitle>Crear Nuevo cliente</DialogTitle>
				<Divider />
				<DialogContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Grid container spacing={3}>
							<Grid item md={6}>
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Nombre"
										name="nombre"
										inputRef={register({
											required: { value: true, message: 'El nombre del cliente es obligatorio' },
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
										label="Email"
										name="email"
										inputRef={register({
											required: { value: true, message: 'El nombre del email es obligatorio' }
										})}>
									</TextField>
									{errors.email && <Alert severity="error">{errors.email.message}</Alert>}
								</FormControl>
							</Grid>
							<Grid item md={6}>
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Telefono"
										name="telefono"
										type="number"
										inputRef={register({
											required: { value: true, message: 'es necesario selecionar el telefono del cliente' },
											pattern: {
												value: /^[0-9]/i,
												message: 'no se pueden usar simbolos o catacteres'
											}
										})}>
									</TextField>
									{errors.telefono && <Alert severity="error">{errors.telefono.message}</Alert>}
								</FormControl>

							</Grid>
							<Grid item md={6}>
								<FormControl fullWidth>
									<TextField
										variant="standard"
										label="Identificacion"
										name="numDocumento"
										type="number"
										inputRef={register({
											required: { value: true, message: 'es necesario poner un numero de identificacion' },
											pattern: {
												value: /^[0-9]/i,
												message: 'no se pueden usar simbolos o catacteres'
											}
										})}>
									</TextField>
									{errors.numDocumento && <Alert severity="error">{errors.numDocumento.message}</Alert>}
								</FormControl>
							</Grid>
							<Grid item md={6} >
								<FormControl fullWidth>
									<Button variant="contained" color="primary" type="submit">Crear cliente</Button>
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
