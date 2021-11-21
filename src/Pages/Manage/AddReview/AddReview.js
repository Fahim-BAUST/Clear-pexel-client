import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2'

const AddReview = () => {
    const [loginData, setLoginData] = useState({});
    const { user } = useAuth();


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSubmit = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to submit?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {

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
                            Swal.fire(
                                'Review Placed!',
                                'Your review  has been placed.',
                                'success'
                            )

                        } else {
                            Swal.fire(
                                'Cancelled',
                                'Your review is canceled',
                                'error'
                            )
                        }
                    })

            }
        })

        e.preventDefault();
    }
    return (
        <div>

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