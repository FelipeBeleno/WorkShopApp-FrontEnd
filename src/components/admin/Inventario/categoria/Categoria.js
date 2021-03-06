import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from 'material-table'
import { español } from '../../../../helpers/traduccionTabla';
import { actualizarCategoria, cargarCategorias, eliminarCategoria, nuevaCategoria } from '../../../../redux/categoriaDucks';

export const Categoria = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cargarCategorias())
    }, [dispatch])

    const { categorias } = useSelector(state => state.categoriasReducer)



    const columnas = [
        {
            title: 'Nombre',
            field: 'nombre'
        },
        {
            title: 'Descripción',
            field: 'descripcion'
        }
    ]

    return (
        <div>
            <MaterialTable
                columns={columnas}
                data={categorias.map(ele => {

                    ele.estado = ele.estado === true ? 'Activo' : 'Inactivo'

                    return ele
                })}

                editable={
                    {
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                dispatch(nuevaCategoria(newData))
                                resolve()
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [categorias];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);

                                    dispatch(eliminarCategoria(oldData._id))
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    const dataUpdate = [categorias];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;

                                    dispatch(actualizarCategoria(dataUpdate[index]))



                                    resolve();
                                }, 1000)
                            }),
                    }
                }

                title='Categorías'
                options={{
                    actionsColumnIndex: -1,
                    loadingType: "overlay",
                    padding: 'default',
                    headerStyle: {
                        padding: '10px',
                    },
                    exportButton: true
                }}
                style={{
                    marginTop: 50,
                    justifyContent: 'center',

                }}
                localization={español}
            />
        </div>
    )
}
