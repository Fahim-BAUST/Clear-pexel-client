import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';

const ManageProduct = () => {

    const [products, setProducts] = useState([])


    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })

    }, [])

    const handleDeleteclick = (id) => {
        const proceed = window.confirm("Are you sure, You want to delete?");
        if (proceed) {
            const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount === 1) {
                        alert("Successfully deleted ");
                        const remainingOrders = products.filter((order) => order?._id !== id);
                        setProducts(remainingOrders);
                    } else {
                        alert("No documents matched the query. Deleted 0 documents.");
                    }
                });
        }
    };
    return (
        <div>
            <div className="container">
                <Font family="Yuji Syuku">
                    <Typography
                        sx={{
                            textAlign: "center",
                            pt: 3,
                            fontWeight: 800,
                            marginTop: 2,
                            marginBottom: 5,
                            color: "#3F000F",
                            fontSize: "40px",
                        }}
                        variant="h3"
                    >
                        Manage Products
                    </Typography>

                    {products.map(product => <div
                        className="row d-flex align-items-center ">
                        <div className=" text-center col">
                            <img className="img-fluid w-50" src={product.image} alt="" />
                        </div>
                        <div className=" text-center col">
                            <p>{product.name}</p>
                        </div>
                        <div className=" text-center col">
                            <button
                                onClick={() => handleDeleteclick(product._id)}
                                className="ms-1 border-0"
                            >
                                <i className="fas fa-trash text-danger"></i>
                            </button>
                        </div>
                        <Divider></Divider>
                    </div>)

                    }
                </Font>
            </div>

        </div >
    );
};

export default ManageProduct;