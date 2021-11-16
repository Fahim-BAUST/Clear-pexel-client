import { Grid, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Font from 'react-font';
import Header from '../Shared/Header/Header';
import Product from './Product/Product';

const Products = () => {
    const [products, setProducts] = useState([])
    const [displayProducts, setDisplayProducts] = useState([]);

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
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
                            key={product?._id}>
                            <Product product={product} key={product._id}></Product>
                        </Grid>)
                    }
                </Grid>
            </Box>

        </div>
    );
};

export default Products;