import { Divider, Typography, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Header from '../../Shared/Header/Header';
import Font from 'react-font';
import CartItem from './CartItem/CartItem';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PlaceOrder = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [prod, setProd] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [hDelete, sethDelete] = useState(false);
    const [home, setHome] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);


    const { user } = useAuth();
    const email = user.email;
    let sum = 0;



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setWrong(false);
    };

    const url = `https://gentle-fortress-91581.herokuapp.com/addToCart/cart/${email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProd(data);
                data.map(p => {
                    sum = sum + (parseInt(p.price) * parseInt(p.quantity));
                })
                const tax = (5 * sum) / 100;
                const shipping = home === true ? 150 : 50;
                setTax(tax);
                setTotal(sum + shipping + tax);

            })

    }, [prod, hDelete]);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = (id) => {
        setOpenModal(true);
        setDeleteId(id);
    };



    const handleDeleteModal = (id) => {
        setOpenModal(false);
        const url = `https://gentle-fortress-91581.herokuapp.com/cart/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    setOpen(true);
                    const remainingOrders = prod.filter((order) => order?._id !== id);
                    setProd(remainingOrders);

                } else {
                    setWrong(true);
                }
            });

    };

    const handleDeleteAll = (email) => {
        setOpenModal(false);

        const url = `https://gentle-fortress-91581.herokuapp.com/cartRemove/${email}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged === true) {
                    setOpen(true);
                    setOpenModal(false);
                    sethDelete(true);
                } else {
                    setWrong(true);
                }
            });

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
                    setOpen(true);
                    reset();
                } else {
                    setWrong(true);
                }
            })
    };

    const handleClickedChange = e => {
        e.target.checked ? setHome(true) : setHome(false);
    }

    return (
        <div>

            <Header></Header>

            <div className="container mt-3">
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
                        <Button sx={{ fontWeight: "bold" }} onClick={() => handleDeleteModal(deleteId)}>Clear one</Button>
                        <Button sx={{ fontWeight: "bold" }} onClick={() => handleDeleteAll(user?.email)}> Clear All</Button>
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
                <div className="row">

                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
                        <Font family="Mochiy Pop One">
                            <Typography className="text-center" sx={{ fontWeight: "bold", color: "#3F000F", marginBottom: 5, fontSize: "2em" }} ><span >Your Orders</span> </Typography>
                        </Font>

                        {prod.map(product => <CartItem
                            product={product}
                            handleCloseModal={handleCloseModal}
                            handleDeleteModal={handleDeleteModal}
                            handleOpenModal={handleOpenModal}
                            openModal={openModal}
                        ></CartItem>
                        )}
                        <br />
                        <Divider></Divider>
                        <div >
                            <div className="row d-flex align-items-center justify-content-around ">

                                <div className="col text-center ">
                                    <p className=" fw-bold mt-3">Home Delivery?</p>
                                </div>
                                <div className="col text-center ">
                                    <input style={{ border: "2px solid tomato" }} onChange={handleClickedChange} className="form-check-input " type="checkbox" />
                                </div>
                            </div>

                            <div className="row d-flex align-items-center justify-content-around">
                                <div className=" text-center  col">
                                    <p className=" fw-bold"> Shipping cost :  </p>
                                </div>
                                <div className=" text-center col">
                                    <p className=" fw-bold">  <span className="text-danger"> {home === true ? 150 : 50}</span> TK </p>
                                </div>

                            </div>
                            <div className="row d-flex align-items-center justify-content-around">
                                <div className=" text-center  col">
                                    <p className=" fw-bold"> Tax (5%) :  </p>
                                </div>
                                <div className=" text-center col">
                                    <p className=" fw-bold">  <span className="text-danger"> {tax}</span> TK </p>
                                </div>

                            </div>
                            <div className="row d-flex align-items-center justify-content-around">
                                <div className=" text-center col">
                                    <Font family="Mochiy Pop One">

                                        <p className="text-center"> ToTall Cost : </p>
                                    </Font>
                                </div>
                                <div className=" text-center col">
                                    <Font family="Mochiy Pop One">

                                        <p className="text-center"><span className="text-danger"> {total}</span> TK </p>
                                    </Font>
                                </div>
                            </div>
                        </div>


                        <Divider></Divider>
                        <br />
                        <Divider></Divider>

                    </div>

                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
                        <Font family="Mochiy Pop One">
                            <Typography className="text-center" sx={{ fontWeight: "bold", color: "#3F000F", marginBottom: 5, fontSize: "2em" }} ><span >Place Order</span> </Typography>
                        </Font>
                        <form className=" mb-5" onSubmit={handleSubmit(onSubmit)}>


                            <input className="form-control" aria-label="Username" aria-describedby="basic-addon1" defaultValue={user.displayName} {...register("name")} />
                            <br />

                            <input readOnly className="form-control" aria-label="Username" aria-describedby="basic-addon1" value={user.email} {...register("email", { required: true })} />
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