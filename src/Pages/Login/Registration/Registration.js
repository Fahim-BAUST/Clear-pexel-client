import React, { useState } from 'react';
import { Button, Container, Grid, LinearProgress, TextField } from '@mui/material';
import Font from 'react-font';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { Box } from '@mui/system';
import Header from '../../Shared/Header/Header';
import Swal from 'sweetalert2';

const Registration = () => {
    const { user, registerUser, isLoading, } = useAuth();
    const [loginData, setLoginData] = useState({});
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData?.email, loginData?.password, loginData?.name, history);
        e.preventDefault();
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
                                <h1 style={{ textAlign: "center", paddingTop: 3, marginTop: 20, marginBottom: 40, color: "#3F000F", fontSize: "30px" }}>Please Register</h1>

                            </Font>
                            {isLoading && <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>}

                            <form onSubmit={handleLoginSubmit}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-user-circle fs-5 mt-3 me-2"></i> <TextField id="standard-basic" type="name" label="Name" variant="standard" name="name" onBlur={handleOnBlur} />
                                </div>
                                <br />
                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-envelope-open fs-5 mt-3 me-2"></i> <TextField id="standard-basic" type="email" label="email" variant="standard" name="email" onBlur={handleOnBlur} />
                                </div>
                                <br />

                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-key fs-5 mt-3 me-2"></i> <TextField id="standard-basic" type="password" label="password" variant="standard" name="password" onBlur={handleOnBlur} />
                                </div> <br />
                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="fas fa-key fs-5 mt-3 me-2"></i> <TextField id="standard-basic" type="password" label="repeat password" variant="standard" name="password2" onBlur={handleOnBlur} />
                                </div>


                                {user?.email && loginTrue()}

                                <Button sx={{ mt: 2 }} type="submit" variant="contained">Register</Button>
                                <p className="mt-2" style={{ fontSize: "15px" }}>already registered? <NavLink className="text-decoration-none fw-bold" to="/login">login</NavLink></p>

                            </form>

                        </div>


                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img className="img-fluid" src="https://i.ibb.co/brQqBV0/4957136.jpg" alt="" />

                    </Grid>

                </Grid >

            </Container >
        </Box>
    );
};

export default Registration;