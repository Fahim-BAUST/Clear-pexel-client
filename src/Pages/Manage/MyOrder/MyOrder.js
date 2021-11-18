import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Paper, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import useAuth from '../../Hooks/useAuth';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MyOrder = () => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setWrong(false);
    };


    useEffect(() => {
        fetch(`https://gentle-fortress-91581.herokuapp.com/allOrders/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            }).catch(error => {
                setWrong(true);
            });;
    }, [user.email]);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = (id) => {
        setOpenModal(true);
        setDeleteId(id);
    };

    const handleDeleteModal = (id) => {

        const url = `https://gentle-fortress-91581.herokuapp.com/allOrders/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    setOpen(true);
                    setOpenModal(false);
                    const remainingOrders = orders.filter((order) => order?._id !== id);
                    setOrders(remainingOrders);
                } else {
                    setOpenModal(false);
                    setWrong(true);
                }
            });

    };
    return (<div>
        <Dialog
            open={openModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseModal}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#98FB98" }}>{"Warning!!!"}</DialogTitle>
            <DialogContent sx={{ backgroundColor: "#98FB98" }}>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#98FB98" }}>
                <Button sx={{ fontWeight: "bold" }} onClick={() => handleDeleteModal(deleteId)}>delete</Button>
                <Button sx={{ fontWeight: "bold" }} onClick={handleCloseModal}>Close</Button>
            </DialogActions>
        </Dialog>


        {open === true && <Snackbar
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}

        >
            <Alert variant="filled" severity="success">Successfully Done</Alert>

        </Snackbar>}
        {
            wrong === true && <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}

            >

                <Alert variant="filled" severity="warning">Something Wrong!</Alert>
            </Snackbar>}
        <TableContainer component={Paper}>
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
                    Your Order
                </Typography>
                <Font family="Mochiy Pop One">
                    <h5 style={{ color: "#3F000F", fontSize: "15px" }}>Orders Found: {orders?.length}</h5>

                </Font>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow sx={{ backgroundColor: "dimgray" }}>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Order Item</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Quantity</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Price</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Status</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}> Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length === 0 ? (
                            <Box sx={{ width: "100%" }}>
                                <LinearProgress color="secondary" />
                            </Box>
                        ) :

                            orders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className="order-cart"
                                >
                                    <TableCell >{order?.name}</TableCell>
                                    <TableCell ><ul>{order?.order?.map(order => <li key={order?._id}> {order?.orderName} </li>)}</ul></TableCell>
                                    <TableCell><ul className="list-unstyled ">{order?.order?.map(order => <li
                                        key={order?._id}> {order?.quantity} </li>)}</ul>
                                    </TableCell>
                                    <TableCell > {order?.totalPrice}$</TableCell>
                                    <TableCell align="center">{order?.orderStatus === "Pending" && (
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
                                        {order?.orderStatus}{" "}</TableCell>
                                    <TableCell align="center">{order?.orderStatus === "Shipped" &&
                                        <p className="text-warning fw-bold">Your product is on the way</p>
                                    }

                                        {order?.orderStatus === "Delivered" &&
                                            <p className="text-success">Thanks for your order.Please give us a wonderful review</p>
                                        }
                                        {(order?.orderStatus === "Pending" || order?.orderStatus === "Approved") && <button
                                            onClick={() => handleOpenModal(order._id)}
                                            className="ms-1 border-0"
                                        >
                                            <i className="fas fa-trash text-danger"></i>
                                        </button>}</TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
            </Font>
        </TableContainer >
    </div>
    );
};

export default MyOrder;