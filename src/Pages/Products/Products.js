import { Grid, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import Header from '../Shared/Header/Header';
import Product from './Product/Product';

const Products = () => {
    const [products, setProducts] = useState([])


    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })

    }, [])
    return (
        <div>
            <Header></Header>
            <Font family="Mochiy Pop One">
                <h1 style={{ textAlign: "center", paddingTop: 3, marginTop: 20, marginBottom: 40, color: "#3F000F", fontSize: "50px" }}>All Products</h1>

            </Font>



            <Box className="container" sx={{ flexGrow: 1, mb: 5 }}>
                <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                    {/* using spinner */}
                    {products.length === 0 ? <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>
                        :
                        products.map(product => <Grid
                            className="grid-responsive" item xs={12} sm={4} md={4} >
                            <Product product={product} key={product._id}></Product>
                        </Grid>)
                    }
                </Grid>
            </Box>

        </div>
    );
};

export default Products;