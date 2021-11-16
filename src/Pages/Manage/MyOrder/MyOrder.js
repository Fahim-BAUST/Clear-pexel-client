import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import useAuth from '../../Hooks/useAuth';

const MyOrder = () => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://gentle-fortress-91581.herokuapp.com/allOrders/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            });
    }, [user.email]);

    const handleDeleteclick = (id) => {
        const proceed = window.confirm("Are you sure, You want to delete?");
        if (proceed) {
            const url = `https://gentle-fortress-91581.herokuapp.com/allOrders/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount === 1) {
                        alert("Successfully deleted ");
                        const remainingOrders = orders.filter((order) => order?._id !== id);
                        setOrders(remainingOrders);
                    } else {
                        alert("No documents matched the query. Deleted 0 documents.");
                    }
                });
        }
    };
    return (
        <div className="table-responsive">
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
                    My Orders
                </Typography>

                <table className="table container table-warning  table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name:</th>
                            <th scope="col">Ordered:</th>
                            <th scope="col">Quantity:</th>
                            <th scope="col">Price:</th>

                            <th scope="col">Status:</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <Box sx={{ width: "100%" }}>
                                <LinearProgress color="secondary" />
                            </Box>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order?._id}
                                >
                                    <th scope="row">*</th>
                                    <td>{order?.name}</td>
                                    <td><ul>{order?.order?.map(order => <li key={order?._id}> {order?.orderName} </li>)}</ul></td>
                                    <td><ul className="list-unstyled ">{order?.order?.map(order => <li
                                        key={order?._id}> {order?.quantity} </li>)}</ul></td>
                                    <td>{order?.totalPrice}$</td>

                                    <td>
                                        {order?.orderStatus === "Pending" && (
                                            <i className="me-1 fas fa-spinner text-warning fw-bolder fs-6"></i>
                                        )}
                                        {order?.orderStatus === "Shipped" && (
                                            <i className="me-1 fas fa-truck text-info fs-6"></i>
                                        )}
                                        {order?.orderStatus === "Delivered" && (
                                            <i className="me-1 fas fa-smile-wink fs-5 text-warning"></i>
                                        )}
                                        {order?.orderStatus === "Approved" && (
                                            <i className="me-1 fas fa-check-circle fs-5 text-success"></i>
                                        )}
                                        {order?.orderStatus}{" "}
                                    </td>
                                    <td>
                                        {order?.orderStatus === "Shipped" &&
                                            <p className="text-warning fw-bold">Your product is on the way</p>
                                        }

                                        {order?.orderStatus === "Delivered" &&
                                            <p className="text-success">Thanks for your order. Please give us a wonderful review</p>
                                        }
                                        {(order?.orderStatus === "Pending" || order?.orderStatus === "Approved") && <button
                                            onClick={() => handleDeleteclick(order._id)}
                                            className="ms-1 border-0"
                                        >
                                            <i className="fas fa-trash text-danger"></i>
                                        </button>}

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Font>
        </div>
    );
};

export default MyOrder;