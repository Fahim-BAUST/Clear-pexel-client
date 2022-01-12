import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route, useLocation, Navigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, admin } = useAuth();
    let location = useLocation();
    if (isLoading) { return <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box> }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
};
export default AdminRoute;