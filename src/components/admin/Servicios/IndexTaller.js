
import React, { Fragment, useState } from 'react'

import { NuevoServicio } from './NuevoServicio';
import { TablaServicios } from './TablaServicios';

export const IndexTaller = () => {

    

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
