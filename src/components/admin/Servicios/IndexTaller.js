
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { obtenerObjetos } from '../../../redux/objetosDuck';

import { NuevoServicio } from './NuevoServicio';
import { TablaServicios } from './TablaServicios';

export const IndexTaller = () => {

    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(obtenerObjetos());
    }, [dispatch])



    const [tallerState, setTallerState] = useState('')
    return (
        <Fragment>
            {/* Contenido */}
            {
                tallerState === 'nuevoServicio'
                && <NuevoServicio setTallerState={setTallerState} />

            }
            {
                tallerState === ''
                && <TablaServicios setTallerState={setTallerState} />
            }

        </Fragment>
    )
}
