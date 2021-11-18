import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
const AddReview = () => {
    const [loginData, setLoginData] = useState({});
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setWrong(false);
    };
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSubmit = (e) => {

        fetch('https://gentle-fortress-91581.herokuapp.com/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setOpen(true);

                } else {
                    setWrong(true);
                }
            }).catch(error => {
                setWrong(true);
            })

        e.preventDefault();
    }
    return (
        <div>
            {open === true && <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}

            >
                <Alert variant="filled" severity="success">Successfully done!</Alert>

            </Snackbar>}
            {
                wrong === true && <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}

                >

                    <Alert severity="error" variant="filled">something Wrong!</Alert>
                </Snackbar>}
            <form className="container" style={{ width: "350px" }} onSubmit={handleSubmit}>
                <input readOnly name="name" type="text" className="form-control" placeholder="Enter name" aria-label="Enter name" onBlur={handleOnChange} value={user?.displayName} />
                <input name="rating" type="text" className="form-control" placeholder="Enter Rating(1 to 5)" aria-label="" onBlur={handleOnChange} />
                <textarea name="message" className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} onBlur={handleOnChange}></textarea>
                <label htmlFor="floatingTextarea2"></label>
                {user?.email ? <Button type="submit" style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold", mt: 2 }} variant="contained" size="small">Submit </Button>
                    :
                    <Link className="text-decoration-none" to="/login"> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold", mt: 2 }} variant="contained" size="small">Login First</Button>
                    </Link>

                }
            </form>
        </div>
    );
};

export default AddReview;