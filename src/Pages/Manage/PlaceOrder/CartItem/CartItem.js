import { Divider } from '@mui/material';
import React from 'react';


const CartItem = (props) => {
    const { _id, image, orderName, quantity, price } = props.product
    return (
        <div>
            <div data-aos="zoom-out-up"
                data-aos-duration="1200"
                className="row d-flex align-items-center product-cart"

            >
                <div className=" text-center col">
                    <img className="img-fluid w-50" src={image} alt="" />
                </div>
                <div className=" text-center col">
                    <p>{orderName}</p>
                </div>

                <div className=" text-center col">
                    <p>{quantity}</p>
                </div>

                <div className=" text-center col">
                    <p>{(quantity) * (price)}</p>
                </div>


                <div className=" text-center col">
                    <button
                        onClick={() => props.handleOpenModal(_id)}
                        className="ms-1 border-0"
                    >
                        <i className="fas fa-trash text-danger"></i>
                    </button>
                </div>
                <Divider></Divider>


            </div></div>
    );
};

export default CartItem;