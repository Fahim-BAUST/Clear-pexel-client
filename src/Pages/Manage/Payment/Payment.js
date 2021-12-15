import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51JypbOAGDt5ordsCYdrLJuiGD6kBwwg7nyoZSFz6hVSyKKjNCkrIyIHDgXIqFWvX8W7YtNYwkIMmh55mooiccpP100QZBQ8gt5');
const Payment = () => {
    const { orderId } = useParams();
    const [paymentProduct, setPaymentProduct] = useState([])



    useEffect(() => {

        fetch(`https://gentle-fortress-91581.herokuapp.com/allOrders/payment/${orderId}`)
            .then(res => res.json())
            .then(data => setPaymentProduct(data))
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message === "Failed to fetch" ? "No network connection" : error.message}`,
                })
            })

    }, [orderId])


    return (
        <div>

            {paymentProduct.totalPrice && <Elements stripe={stripePromise}>
                <CheckOutForm
                    paymentProduct={paymentProduct}

                />
            </Elements>
            }
        </div>
    );
};

export default Payment;