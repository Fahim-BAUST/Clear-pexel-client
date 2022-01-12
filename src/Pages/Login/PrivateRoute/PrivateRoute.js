import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import {
    useLocation,
    Navigate

} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) { return <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box> }

    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;

};

export default PrivateRoute;