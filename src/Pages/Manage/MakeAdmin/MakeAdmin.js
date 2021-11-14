import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [done, setDone] = useState(false);

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://gentle-fortress-91581.herokuapp.com/user/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    console.log(data);
                    setDone(true);
                }
            })

        e.preventDefault()
    }
    return (
        <div className="text-center">
            <h2 className="">Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{ width: '50%', mb: 2 }}
                    id="outlined-basic"
                    label="Type email"
                    variant="outlined"
                    type="email"
                    onBlur={handleOnBlur}
                    required
                />
                <br />
                <Button type="submit" color="success" variant="contained">Set Admin</Button>
            </form>
            {done && <Alert severity="success">Made Admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;