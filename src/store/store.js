import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { loginReducer } from '../redux/loginDucks';
import { usuariosReducer } from '../redux/usuariosDuck';
import { clientesReducer } from '../redux/clientesDuck';
import { categoriasReducer } from '../redux/categoriaDucks';
import { objetosReducer } from '../redux/objetosDuck';
import { publicReducer } from '../redux/publicDucks';
import { serviciosReducer } from '../redux/serviciosDucks';
import { ventasReducer } from '../redux/ventasDuck';
import { procedimientosReducer } from '../redux/procedimientosDucks'
import { dashboardReducer } from '../redux/dasboardDuck'


import thunk from 'redux-thunk'


const reducersCombine = combineReducers({
    loginReducer,
    usuariosReducer,
    clientesReducer,
    categoriasReducer,
    objetosReducer,
    publicReducer,
    serviciosReducer,
    ventasReducer,
    procedimientosReducer,
    dashboardReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducersCombine, composeEnhancers(applyMiddleware(thunk)));
