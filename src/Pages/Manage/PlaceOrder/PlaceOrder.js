import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Font from 'react-font';

const PlaceOrder = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [prod, setProd] = useState([]);
    const [total, setTotal] = useState(null);
    const [hDelete, sethDelete] = useState(false);
    const [description, setDescription] = useState([])
    const { user } = useAuth();
    const email = user.email;
    let sum = 0;

    const url = `https://gentle-fortress-91581.herokuapp.com/addToCart/cart/${email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProd(data);
                data.map(p => {
                    sum = sum + p.price;
                })
                setTotal(sum);

            })

    }, [prod, hDelete]);

    const handleDeleteclick = (id) => {
        const proceed = window.confirm("Are you sure, You want to delete?");
        if (proceed) {
            const url = `https://gentle-fortress-91581.herokuapp.com/cart/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount === 1) {
                        alert("Successfully deleted ");
                        const remainingOrders = prod.filter((order) => order?._id !== id);
                        setProd(remainingOrders);
                    } else {
                        alert("No documents matched the query. Deleted 0 documents.");
                    }
                });
        }
    };

    const handleDeleteAll = (email) => {
        const proceed = window.confirm("Are you sure, You want to delete?");
        if (proceed) {
            const url = `https://gentle-fortress-91581.herokuapp.com/cartRemove/${email}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged === true) {
                        alert("Successfully deleted ");
                        sethDelete(true);
                    } else {
                        alert("No documents matched the query. Deleted 0 documents.");
                    }
                });
        }
    };

    const onSubmit = data => {
        data.order = prod;
        data.orderStatus = "Pending";
        data.totalPrice = total;

        fetch('https://gentle-fortress-91581.herokuapp.com/cartToOrders', {
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

                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
                        <Font family="Mochiy Pop One">
                            <Typography className="text-center" sx={{ fontWeight: "bold", color: "#3F000F", marginBottom: 5, fontSize: "2em" }} ><span >Your Orders</span> </Typography>
                        </Font>
                        <div className="text-end">

                            <button onClick={() => handleDeleteAll(user?.email)} type="button" className="btn btn-danger fw-bold"><i className="fas fa-broom"></i>Clear?</button>
                        </div>

                        {prod.map(product => <div
                            className="row d-flex align-items-center ">
                            <div className=" text-center col">
                                <img className="img-fluid w-50" src={product?.image} alt="" />
                            </div>
                            <div className=" text-center col">
                                <p>{product?.orderName}</p>
                            </div>
                            <div className=" text-center col">
                                <p>{product?.price}</p>
                            </div>

                            <div className=" text-center col">
                                <button
                                    onClick={() => handleDeleteclick(product?._id)}
                                    className="ms-1 border-0"
                                >
                                    <i className="fas fa-trash text-danger"></i>
                                </button>
                            </div>
                            <Divider></Divider>


                        </div>)}
                        <br />
                        <Divider></Divider>

                        <Font family="Mochiy Pop One">
                            <p className="text-center"> ToTall Cost: <span> {total}</span> TK </p>
                        </Font>
                        <Divider></Divider>
                        <br />
                        <Divider></Divider>

                    </div>

                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
                        <Font family="Mochiy Pop One">
                            <Typography className="text-center" sx={{ fontWeight: "bold", color: "#3F000F", marginBottom: 5, fontSize: "2em" }} ><span >Place Order</span> </Typography>
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