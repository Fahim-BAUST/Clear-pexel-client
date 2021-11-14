import React, { useEffect, useState } from 'react';
import Coverflow from 'react-coverflow';

const ImageFlow = () => {
    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })

    }, [])
    return (
        <Coverflow
            width={900}
            height={480}
            displayQuantityOfSide={2}
            navigation={false}
            enableHeading={false}
            media={{
                '@media (max-width: 900px)': {
                    width: '600px',
                    height: '300px'
                },
                '@media (min-width: 900px)': {
                    width: '960px',
                    height: '600px'
                },
                '@media (max-width: 500px)': {
                    width: '350px',
                    height: '150px'
                }
            }}
        >
            <div
                role="menuitem"
                tabIndex="0"
            >
                <img
                    src={products[3]?.image}
                    alt='title or description'
                    style={{ display: 'block', width: '100%' }}
                />

            </div>

            {products.map(products => <img src={products?.image} alt="" />)}


        </Coverflow>
    );
};

export default ImageFlow;