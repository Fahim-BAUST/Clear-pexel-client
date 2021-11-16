import { Button, Rating, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import AddReview from '../../Manage/AddReview/AddReview';
import Header from '../../Shared/Header/Header';

const ProductsDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [description, setDescription] = useState([]);

    const [quantity, setQuantity] = useState(1)
    const [products, setProducts] = useState([]);
    const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);

                const desc = data?.details?.split("=");
                setDescription(desc)
            })

    }, [url])



    const handleAddToCart = () => {
        const data = {};
        data.product = products._id;
        data.orderName = products.name;
        data.price = products.cost;
        data.image = products.image;
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
            <Header></Header>

            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col">
                        <img className="img-fluid w-100" src={products.image} alt="" />
                    </div>
                    <div className="col">
                        <Typography gutterBottom variant="h3" component="div" style={{ color: "#3F000F" }}>
                            {products.name}
                        </Typography>

                        <Typography
                            variant="h6" >
                            <span className=" mt-3">Key Features </span>
                        </Typography>

                        <Typography className="mt-2 mb-3" variant="body2" color="text.secondary">
                            <ul>
                                {description?.map(description => <li key={description}>{description}</li>)}
                            </ul>

                        </Typography>
                        <Rating name="read-only" value={parseInt(products?.rating)} readOnly />

                        <div className="d-flex justify-content-between container mb-2 align-items-center">

                            <Typography
                                style={{ fontFamily: "cursive" }}
                                className="fw-bold " variant="h5" >
                                <span className="fw-bold ">{products.cost} TK </span>
                            </Typography>
                            <div className="input-group-sm w-50 d-flex justify-content-start ">
                                <button onClick={() => quantityManage(false)} className="btn btn-default"><i className="fas fa-minus"></i></button>

                                <input className="text-center fw-bold rounded-pill" disabled type="number" style={{ width: "30%", border: "2px solid tomato" }} value={quantity} />


                                <button onClick={() => quantityManage(true)} className="btn btn-default"><i className="fas fa-plus"></i></button>
                            </div>
                        </div>

                        {user?.email ? <Button onClick={handleAddToCart} style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> addToCart </Button>
                            :

                            <Link className="text-decoration-none" to="/login"> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> login first </Button>
                            </Link>}

                    </div>

                </div>
                <div className="row">

                    <div className="col">
                        <h2 style={{ color: "#3F000F" }}>Description</h2>
                        <Typography
                            style={{ marginBottom: "15px" }}
                            sx={{ fontFamily: 'default' }}
                            variant="body1" >
                            {products?.moreDetails}

                        </Typography>
                    </div>
                </div>

                <div className="row">

                    <div className="col d-flex justify-content-start">
                        <div>
                            <h2 className="mb-3" style={{ color: "#3F000F" }}>Add Review</h2>
                            <AddReview ></AddReview>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default ProductsDetails;