import { Alert, Grid, LinearProgress, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import Swal from 'sweetalert2';
import Header from '../Shared/Header/Header';
import Product from './Product/Product';

const Products = () => {
    const [products, setProducts] = useState([])
    const [displayProducts, setDisplayProducts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setWrong(false);
    };

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })

    }, [])


    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    return (
        <div>
            <Header></Header>
            <Font family="Mochiy Pop One">
                <h1 style={{ textAlign: "center", paddingTop: 3, marginTop: 20, marginBottom: 40, color: "#3F000F", fontSize: "50px" }}>All Products</h1>

            </Font>

            <div className="input-group mb-4 container search-item ">
                <input type="text" className="form-control shadow-lg text-center" onChange={handleSearch}
                    placeholder="Search Product" aria-label="Recipient's username" aria-describedby="basic-addon2" style={{ border: "1px solid #3F000F" }} />
            </div>
            {open === true && <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}

            >
                <Alert variant="filled" severity="success">Successfully done!</Alert>

            </Snackbar>}
            {
                wrong === true && <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}

                >

                    <Alert severity="error" variant="filled">something Wrong!</Alert>
                </Snackbar>}

            <Box className="container" sx={{ flexGrow: 1, mb: 5 }}>
                <Font family="Mochiy Pop One">
                    <h5 style={{ color: "#3F000F", fontSize: "15px" }}>Products Found: {displayProducts?.length}</h5>

                </Font>
                <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                    {/* using spinner */}
                    {displayProducts.length === 0 ? <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>
                        :
                        displayProducts.map(product => <Grid
                            className="grid-responsive" item xs={12} sm={4} md={4}
                            key={product?._id}
                            setWrong={setWrong}>
                            <Product product={product} key={product._id} open={setOpen} wrong={setWrong}></Product>
                        </Grid>)
                    }
                </Grid>
            </Box>

        </div >
    );
};

export default Products;