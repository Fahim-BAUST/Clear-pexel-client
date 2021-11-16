import { Button, Card, CardContent, CardMedia, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

import '../../Home/Home/Home.css'

const Product = (props) => {
    const { image, name, rating, details, offfer, cost, _id } = props.product
    const { user } = useAuth();

    const [quantity, setQuantity] = useState(1);

    const desc = details?.split("=");


    const handleAddToCart = () => {
        const data = {};
        data.product = _id;
        data.orderName = name;
        data.price = cost;
        data.image = image;
        data.email = user?.email;
        data.quantity = quantity;

        fetch('https://gentle-fortress-91581.herokuapp.com/addToCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Product added to cart Successfully');
                }
            })

    }

    const quantityManage = (value) => {

        if (value === true) {
            const values = quantity + 1;
            setQuantity(values);
        }
        else {
            if (quantity > 1) {
                const values = quantity - 1;
                setQuantity(values);
            }
        }


    }
    return (
        <div>
            <Card className="service-card" style={{ border: "3px solid #E0FFFF" }}>
                {offfer && <Typography style={{ position: "absolute", padding: "2px 30px 2px 0 ", marginTop: 15, color: "white", backgroundColor: "#c29d59" }} gutterBottom variant="h5" component="div">
                    {offfer}% OFF
                </Typography>}

                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>

                    <Typography className="mt-2 mb-1" variant="body2" color="text.secondary">
                        <ul>
                            {desc?.map(description => <li>{description}</li>)}
                        </ul>

                    </Typography>
                    <Rating name="read-only" value={rating} readOnly />

                </CardContent>
                <div className="d-flex justify-content-between container mb-2 align-items-center">

                    <Typography
                        style={{ fontFamily: "cursive" }}
                        className="fw-bold " variant="h5" >
                        <span className="fw-bold ">{cost} TK </span>
                    </Typography>
                    <div className="input-group-sm w-50 d-flex justify-content-end ">
                        <button onClick={() => quantityManage(false)} className="btn btn-default"><i className="fas fa-minus"></i></button>
                        <input className="text-center fw-bold rounded-pill" disabled type="number" style={{ width: "30%", border: "2px solid tomato" }} value={quantity} />
                        <button onClick={() => quantityManage(true)} className="btn btn-default"><i className="fas fa-plus"></i></button>
                    </div>
                </div>


                <div className="d-flex justify-content-between container">

                    <Link className="text-decoration-none" to={`/productDetails/${_id}`}>   <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginLeft: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> details </Button></Link>

                    {user?.email ? <Button onClick={handleAddToCart} style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> addToCart </Button>
                        :

                        <Link className="text-decoration-none" to="/login"> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> login first </Button>
                        </Link>}

                </div>

            </Card>

        </div>
    );
};

export default Product;