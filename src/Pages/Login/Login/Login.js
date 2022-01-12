import { Button, Container, Grid, LinearProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Font from 'react-font';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Swal from 'sweetalert2';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, signInWithGoogle } = useAuth();

    const location = useLocation();
    const navigate = useNavigate()

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
    }

    const loginTrue = () => {
        Swal.fire(
            `Success `,
            `Welcome ${user.displayName} `,
            'success'
        )
    }
    return (
        <Box>
            <Header></Header>
            <Container>

                <Grid container >
                    <Grid className="text-center d-flex align-items-center justify-content-center" item xs={12} md={6}>
                        <div >
                            <Font family="Mochiy Pop One">
                                <h1 style={{ textAlign: "center", paddingTop: 3, marginTop: 20, marginBottom: 40, color: "#3F000F", fontSize: "30px" }}>Please login</h1>

                            </Font>
                            {isLoading && <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>}

                            <form onSubmit={handleLoginSubmit}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-envelope-open fs-5 mt-3 me-2"></i> <TextField id="standard-basic" type="email" label="email" variant="standard" name="email" onBlur={handleOnChange} />
                                </div>
                                <br />

                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-key fs-5 mt-3 me-2"></i>  <TextField id="standard-basic" type="password" label="password" variant="standard" name="password" onBlur={handleOnChange} />
                                </div>


                                {user?.email && loginTrue()}

                                <Button sx={{ mt: 2 }} type="submit" variant="contained">Login</Button>
                                <p className="mt-2" style={{ fontSize: "15px" }}>NewUser? <NavLink className="text-decoration-none fw-bold" to="/register">Register</NavLink></p>

                            </form>
                            <button onClick={handleGoogleSignIn} className="btn btn-outline-success" type="submit">Google Sign In</button>

                        </div>


                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img className="img-fluid" src="https://i.ibb.co/brQqBV0/4957136.jpg" alt="" />

                    </Grid>

                </Grid>

            </Container>
        </Box>
    );
};

export default Login;