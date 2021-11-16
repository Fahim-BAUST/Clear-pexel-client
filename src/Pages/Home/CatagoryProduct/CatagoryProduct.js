import { Button, Divider, Rating } from '@mui/material';
import React, { useState } from 'react';
import Font from 'react-font';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const CatagoryProduct = (props) => {
    const { image, name, rating, cost, _id } = props.products
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);


    const handleAddToCart = (id, name, cost, image) => {
        const data = {};
        data.product = id;
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
            <div className="card  text-center">
                <div className="card-body">
                    <img src={image} className="
                                     img-fluid text-center" alt="..." />
                    <p className="fw-bold mt-2">{name}</p>

                    <Rating className="rating" name="half-rating-read" value={rating} precision={0.5} readOnly />

                    <Font family="Henny Penny">
                        <p className="card-text fw-bold mt-3 mb-2">{cost} TK</p>
                    </Font>
                    <Divider></Divider>
                    <div className="input-group-sm  input-item d-flex text-center mx-auto justify-content-center mt-2">
                        <button onClick={() => quantityManage(false)} className="btn btn-default"><i className="fas fa-minus"></i></button>
                        <input className="text-center fw-bold rounded-pill" disabled type="number" style={{ width: "50%", border: "2px solid tomato" }} value={quantity} />
                        <button onClick={() => quantityManage(true)} className="btn btn-default"><i className="fas fa-plus"></i></button>
                    </div>
                    {user?.email ? <Button onClick={() => handleAddToCart(_id, name, cost, image)} style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ marginTop: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> Cart? </Button>
                        :

                        <Link class="text-decoration-none" to="/login"> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ marginTop: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> login first </Button>
                        </Link>}

                </div>
            </div>
        </div>
    );
};

export default CatagoryProduct;