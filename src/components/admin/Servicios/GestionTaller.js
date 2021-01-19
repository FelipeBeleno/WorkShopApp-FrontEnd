import { Grid, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react'

export const GestionTaller = ({ setTallerState }) => {
    return (
        <div>
            <Grid item md={2}  >
                <IconButton color="primary" onClick={() => setTallerState('')} style={{ background: '#d4d700' }} aria-label="upload picture" component="span">
                    <ArrowBackIcon />
                </IconButton>
            </Grid>

            <h1>Gestion Taller</h1>

        </div>
    )
}
