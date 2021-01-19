import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import { español } from '../../../../helpers/traduccionTabla';
import { obtenerObjetos } from '../../../../redux/objetosDuck';
import { ProductoForm } from './ProductoForm';

export const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerObjetos());
  }, [dispatch])

  let { objetos } = useSelector(state => state.objetosReducer)
  var productos = objetos.map((prod) => {
    if (prod.categoria === undefined) {
      var producto = prod.data;
      producto.category = prod.data.categoria.nombre ? prod.data.categoria.nombre : prod.data.categoria;
      producto.user = prod.data.usuario.nombreApellido ? prod.data.usuario.nombreApellido : prod.data.usuario;
      return producto;
    }
    prod.category = prod.categoria.nombre ? prod.categoria.nombre : prod.categoria;
    prod.user = prod.usuario.nombreApellido ? prod.usuario.nombreApellido : prod.usuario;
    return prod;
  })



  const columns = [
    { title: 'Nombre', field: 'nombre' },
    { title: 'Cantidad', field: 'cantidadDisponible' },
    { title: 'Precio', field: 'precio' },
    { title: 'Categoria', field: 'category' },
    { title: 'Usuario', field: 'user' },
    { title: 'Estado', field: 'estado' },
    {
      field: 'img',
      title: 'Avatar',
      render: rowData =>
        <img
          src={rowData.img}
          alt="Img producto"
          style={{ width: 55, height: 55, borderRadius: 10 }} />
    },
  ]

  const [dialog, setDialog] = useState(false);

  const onCloseDialog = () => {
    setDialog(false);
  }

  return (
    <div>
      <div style={{ marginTop: 30 }}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => setDialog(true)}
        >Crear Producto</Button>
        <ProductoForm open={dialog} onClose={onCloseDialog} />
      </div>
      <MaterialTable
        style={{
          marginTop: 50,
          justifyContent: 'center',

        }}

        columns={columns}
        data={productos.map(element => {
          element.estado = element.estado === true ? 'Activo' : 'Inactivo'
          return element
        })}
        title='Objetos'
        options={{
          actionsColumnIndex: -1,
          loadingType: "overlay",
          padding: 'default',
          headerStyle: {
            padding: '10px',
          },
          exportButton: true
        }}
        localization={español}
      />
    </div>
  )

}
