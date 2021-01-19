import { Grid, Link, Typography } from '@material-ui/core'
import React from 'react'

export const Footer = () => {
    return (
        <Grid container color="secondary" style={{ background: '#2a2a72', textAlign: 'center' }} justify="center">
            <Grid item style={{ padding: 20 }} >
                <Typography variant="h6" style={{ color: 'white' }}>
                    TALLER Y VENTAS SAS
                </Typography>
                <br />
                <Link href="https://www.facebook.com/Coffe-Labs-102077817884725" target="_blank" style={{ color: 'white' }}>
                    Copyright © Coffe Labs. 2020
                </Link>

            </Grid>
        </Grid>
    )
}
