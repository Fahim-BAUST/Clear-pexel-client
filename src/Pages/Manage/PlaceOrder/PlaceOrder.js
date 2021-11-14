import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Font from 'react-font';

const PlaceOrder = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [prod, setProd] = useState([]);
    const [description, setDescription] = useState([])
    const { user } = useAuth();
    const { id } = useParams();


    const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProd(data);
                const desc = data.details;
                const newdesc = desc.split("=");
                setDescription(newdesc);

            })


    }, [url]);

    const onSubmit = data => {
        data.orderStatus = "Pending";
        data.orderId = prod._id;
        data.orderName = prod.name;
        data.price = prod.cost;
        data.image = prod.image;

        fetch('https://gentle-fortress-91581.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Order processed Successfully');
                    reset();
                }
            })
    };
    return (
        <div>

            <Header></Header>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                        <img className="img-fluid" src={prod.image} alt="" />
                        <h3 className="mt-3">{prod?.name} </h3>
                        <h5 style={{ fontFamily: "cursive" }} className="mt-2">{prod?.cost} TK</h5>
                        <Typography sx={{ fontWeight: 500, color: "#2b2b2b", marginBottom: 5, fontFamily: "initial", fontSize: "20px" }} ><ul>
                            {description.map(description => <li>{description}</li>)}
                        </ul> </Typography>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <Font family="Mochiy Pop One">
                            <Typography sx={{ fontWeight: 500, color: "#3F000F", marginBottom: 5, fontSize: "3em" }} ><span >Place Order</span> </Typography>
                        </Font>
                        <form className="" onSubmit={handleSubmit(onSubmit)}>


                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" defaultValue={user.displayName} {...register("name")} />
                            <br />

                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" defaultValue={user.email} {...register("email", { required: true })} />
                            <br />
                            {errors.email && <span className="error">This field is required</span>}

                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="Address" defaultValue="" {...register("address", { required: true })} />
                            <br />
                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="City" defaultValue="" {...register("city", { required: true })} />
                            <br />
                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="phone number" type="number" defaultValue="" {...register("phone", { required: true })} /> <br />

                            <input className="fw-bold" style={{ borderRadius: "20px", padding: "10px 50px", border: "1px solid #00BFFF", color: "#3F000F", backgroundColor: "#E0FFFF" }} type="submit" />
                        </form>

                    </div>
                </div>
            </div>
        </div >

    );
};

export default PlaceOrder;