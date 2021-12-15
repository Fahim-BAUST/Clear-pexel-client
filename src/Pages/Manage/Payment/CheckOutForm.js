import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './chech.css'

const CheckOutForm = ({ paymentProduct }) => {
    const { totalPrice, name, email, _id, order } = paymentProduct;

    const stripe = useStripe();
    const elements = useElements();

    const [process, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://gentle-fortress-91581.herokuapp.com/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [totalPrice]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        setProcessing(true)
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setProcessing(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`,
            })
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );
        if (intentError) {
            setProcessing(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${intentError.message}`,
            })
        } else {
            Swal.fire(
                `Success `,
                `${name} your payment processed successfully `,
                'success'
            )
            setProcessing(false);
            setSuccess(true);

            const url = `https://gentle-fortress-91581.herokuapp.com/allOrders/paymentStatus/${_id}`
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice("_secret")[0]
            }
            fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment)
            })
                .then((res) => res.json())
                .then((data) => console.log(data));


        }

    }
    return (
        <div className=' container '>

            <div className='container'>
                <div className="card mx-auto col-md-5 col-8 mt-3 p-0"> <img className='mx-auto pic' src="https://image.freepik.com/free-vector/concept-landing-page-credit-card-payment_23-2148298751.jpg" alt='' />

                    <div className="card-title d-flex px-4">
                        <p className="item text-muted"> Customer Name:</p>
                        <p>{name}</p>
                    </div>
                    <div className="card-title1 d-flex px-4">
                        <p className="item text-muted">Totall Price </p>
                        <p>{totalPrice} $</p>
                    </div>


                    <form className='input-item w-100 text-center card-body' onSubmit={handleSubmit}>

                        <p className="text-muted">Your payment details</p>

                        <CardElement
                            className="numbr mb-3"
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },

                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />

                        <div className="footer text-center p-0">
                            <div className="col-lg-12 col-12 p-0">
                                {process ? <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box> : <button className="order btn btn-outline-dark mb-2" type="submit" disabled={!stripe || success}>
                                    Pay$ {totalPrice}
                                </button>}
                            </div>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    );
};

export default CheckOutForm;