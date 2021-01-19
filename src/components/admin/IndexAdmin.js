import { Button, Divider, makeStyles, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { inicioCierreSesion } from '../../redux/loginDucks';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BuildIcon from '@material-ui/icons/Build';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Usuarios } from './Usuarios';
import { IndexInventario } from './Inventario/IndexInventario';
import { IndexCliente } from './Cliente/IndexCliente';
import { IndexServicios } from './Ventas/IndexServicios';
import { IndexTaller } from './Servicios/IndexTaller';
import { cleanService } from '../../redux/serviciosDucks'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'black'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: '#d4d700'
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },

        background: '#d4d700'

    },
    title: {
        flexGrow: 1,
    },
    titleBar: {
        flexGrow: 1,
        textAlign: 'center'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}));





export const IndexAdmin = () => {

    //Funcionalidad
    const dispatch = useDispatch()
    const { loginReducer } = useSelector(state => state)

    const { nombreApellido } = loginReducer;



    // Diseño
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        dispatch(cleanService())
    };

    const handleDrawerClose = () => {
        setOpen(false);
        dispatch(cleanService())

    };

    const handleClickLogout = () => {
        dispatch(inicioCierreSesion())


    }
    const [estadoPage, setEstadoPage] = useState(localStorage.getItem('pagina'));


    const handleRedirect = (estado) => {
        setEstadoPage(estado)
        localStorage.setItem('pagina', estado)
    }



    return (
        <div>

            <div className={classes.root}>
                <CssBaseline />

                {/* Menu de Arriba */}
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            Gestion
                        </Typography>
                        <Button onClick={handleClickLogout} variant="contained" color="secondary"> Cerrar Sesion </Button>

                    </Toolbar>
                </AppBar>

                {/* Menu Lateral */}
                <Drawer

                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,

                        })
                    }}

                >
                    <div className={classes.toolbar}>

                        <Typography className={classes.titleBar} variant="h6" >{nombreApellido}</Typography>

                        <IconButton onClick={handleDrawerClose} style={{ color: 'black' }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>

                    </div>

                    <List style={{ color: 'black' }}>
                        <Divider />

                        <ListItem button onClick={() => handleRedirect('Usuario')}>

                            <ListItemIcon style={{ color: 'black' }}><SupervisorAccountIcon /> </ListItemIcon>
                            <ListItemText > Usuarios </ListItemText>

                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => handleRedirect('Inventario')}>
                            <ListItemIcon style={{ color: 'black' }}><InsertChartIcon /> </ListItemIcon>
                            <ListItemText  >Inventario</ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem button onClick={() => handleRedirect('Cliente')}>
                            <ListItemIcon style={{ color: 'black' }}><ContactPhoneIcon /> </ListItemIcon>
                            <ListItemText  >Clientes</ListItemText>
                        </ListItem>
                        <Divider />

                        <ListItem button onClick={() => handleRedirect('Venta')}>
                            <ListItemIcon style={{ color: 'black' }}><AttachMoneyIcon /> </ListItemIcon>
                            <ListItemText  >Ventas / Servicios</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={() => handleRedirect('Taller')}>
                            <ListItemIcon style={{ color: 'black' }}><BuildIcon /> </ListItemIcon>
                            <ListItemText  >Taller</ListItemText>
                        </ListItem>
                        <Divider />
                    </List>

                </Drawer>

                {/* Contenido de la aplicacion  */}
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    {
                        estadoPage === 'Usuario'
                            ? <Usuarios />
                            : estadoPage === 'Inventario'
                                ? <IndexInventario />
                                : estadoPage === 'Cliente'
                                    ? <IndexCliente />
                                    : estadoPage === 'Venta'
                                        ? <IndexServicios />
                                        : estadoPage === 'Taller'
                                        && <IndexTaller />
                    }
                </main>
            </div>
        </div>
    )
}
