import { Fragment, cloneElement, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Button, Container, Grid, makeStyles } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { NavLink } from 'react-router-dom'
import { Cards } from './Cards';
import { Footer } from './Footer';
import { Proceso } from './proceso/Proceso';
import { IndexFactura } from './factura/IndexFactura';


function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


const useStyles = makeStyles((theme) => ({
    toolbarTitle: {
        flexGrow: 1,

    },
    link: {
        margin: theme.spacing(1, 1.5),
    },

    cardHeader: {
        backgroundColor: 'primary'
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    contenedorPrincipal: {

        background: '#f0f4c3'
    }



}))

export const Index = () => {

    const classes = useStyles();

    const [option, setOption] = useState(false)

    return (
        <Fragment >
            <CssBaseline />
            <ElevationScroll >
                <AppBar position="static" color="secondary" >
                    <Toolbar >
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            TALLER VENTAS SAS
                         </Typography>
                        <nav>

                        </nav>
                        <NavLink to="/login" style={{ color: "white", textDecoration: 'none' }}>
                            <Button color="primary" variant="contained" className={classes.link}>
                                Login
                        </Button>
                        </NavLink>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <main style={{ padding: 30 }}>
                <div style={{ padding: 50 }}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            TALLER Y VENTAS SAS
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Consulta el estado en el que esta tu proceso de una manera rápida y fácil.
                         </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<SettingsIcon />}
                                        onClick={() => setOption("proceso")}
                                    >
                                        Consulta tu proceso
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        endIcon={<PictureAsPdfIcon />}
                                        onClick={() => setOption("factura")}
                                    >
                                        Imprime tu Factura
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" style={{ background: '#075e54', color: "white" }} href="https://wa.me/573114476203" target="_blank" endIcon={<WhatsAppIcon />}  /* style={{ background: '#075e54', color: 'white', border: 'none' }} */>
                                        Contactanos
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>

                </div>
                {
                    option === "proceso"
                        ? <Proceso />
                        : option === "factura" && <IndexFactura />
                }
                <br />
                <Container m={5}>
                    <Cards />
                </Container>
            </main>
            <br />
            <footer>
                <Footer />
            </footer>
        </Fragment>

    );
}
