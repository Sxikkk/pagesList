import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route => (
                    <Route
                        element={<route.element/>}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Route path="/*" element={<Navigate to="/posts" replace />} />)
                <Route path="" element={<Navigate to="/posts" replace />} />)
            </Routes>
            : <Routes>
                {publicRoutes.map(route => (
                    <Route
                        element={<route.element/>}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Route path="/*" element={<Navigate to="/login" replace />} />)
            </Routes>
    );
};

export default AppRouter;
