import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ManageProduct = () => {

    const [products, setProducts] = useState([])


    const [openModal, setOpenModal] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);


    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleOpenModal = (id) => {
        setOpenModal(true);
        setDeleteId(id);
    };

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })

    }, [])

    const handleDeleteModal = (id) => {

        const url = `https://gentle-fortress-91581.herokuapp.com/products/${id}`;
        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    setOpenModal(false);
                    const remainingOrders = products.filter((order) => order?._id !== id);
                    setProducts(remainingOrders);
                } else {
                    setOpenModal(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })

    };
    return (
        <div>
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
                        className="row d-flex align-items-center "
                        key={product._id}>
                        <div className=" text-center col">
                            <img className="img-fluid w-50" src={product.image} alt="" />
                        </div>
                        <div className=" text-center col">
                            <p>{product.name}</p>
                        </div>
                        <div className=" text-center col">
                            <button
                                onClick={() => handleOpenModal(product._id)}
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