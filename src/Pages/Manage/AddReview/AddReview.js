import { Button } from '@mui/material';
import React, { useState } from 'react';
const AddReview = () => {
    const [loginData, setLoginData] = useState({});
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
                    alert('Review added Successfully');
                }
            })

        e.preventDefault();
    }
    return (
        <div>
            <form className="container" style={{ width: "350px" }} onSubmit={handleSubmit}>
                <input name="name" type="text" className="form-control" placeholder="Enter name" aria-label="Enter name" onBlur={handleOnChange} />
                <input name="rating" type="text" className="form-control" placeholder="Enter Rating(1 to 5)" aria-label="" onBlur={handleOnChange} />
                <textarea name="message" className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} onBlur={handleOnChange}></textarea>
                <label for="floatingTextarea2"></label>
                <Button type="submit" style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginLeft: 2, marginBottom: 2, fontWeight: "bold", mt: 2 }} variant="contained" size="small">Submit </Button>
            </form>
        </div>
    );
};

export default AddReview;