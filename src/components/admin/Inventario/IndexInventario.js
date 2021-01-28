import { Box, Button, Grid, Typography } from '@material-ui/core'
import CategoryIcon from '@material-ui/icons/Category';
import StoreIcon from '@material-ui/icons/Store';
import React, { Fragment, useState } from 'react';
import { Categoria } from './categoria/Categoria';
import { Productos } from './productos/Productos';

export const IndexInventario = () => {

    const [option, setOption] = useState('')
    return (
        <Fragment>
            <Box m={3}>
                <Typography variant="h3" align="center" style={{ marginTop: 40, marginBottom: 20 }}>Selección Inventario</Typography>
                <Grid container>
                    <Grid item xs={1} md={1} />
                    
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                        <Button
                            variant="contained"
                            endIcon={<CategoryIcon />}
                            color="primary"
                            fullWidth
                            onClick={() => setOption('categoria')}
                        >
                            Categorias
                        </Button>
                    </Grid>
                    <Grid item xs={1} md={1} />
                  

                    <Grid item xs={12} md={4} lg={4} xl={4}>

                        <Button
                            variant="contained"
                            endIcon={<StoreIcon />}
                            color="secondary"
                            fullWidth
                            onClick={() => setOption('producto')}
                        >
                            Productos
                        </Button>
                    </Grid>
                    <Grid item xs={1} md={1} />
                </Grid>

                {
                    option === 'categoria'
                        ? <Categoria />
                        : option === 'producto'
                        && <Productos />

                }
            </Box>
        </Fragment>
    )
}
