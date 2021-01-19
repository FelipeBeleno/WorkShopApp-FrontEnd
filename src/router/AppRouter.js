import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import { Index } from "../components/indexPublic";
import { IndexAdmin } from '../components/admin/IndexAdmin';
import { LoginLayout } from '../components/login/Login';
import { ReNewToken } from '../redux/loginDucks';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { _id } = useSelector(state => state.loginReducer)


    useEffect(() => {

        dispatch(ReNewToken())
    }, [dispatch])





    return (
        <div>
            <Router>
                <Switch>

                    <PublicRoute isAuthenticated={!!_id} exact path="/" component={Index} />
                    <PublicRoute isAuthenticated={!!_id} exact path="/login" component={LoginLayout} />
                    <PrivateRoute isAuthenticated={!!_id} path="/admin" component={IndexAdmin} />


                </Switch>
            </Router>
        </div>
    )
}
