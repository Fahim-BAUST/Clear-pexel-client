import { Rating } from '@mui/material';
import React from 'react';
import Font from 'react-font';

const Review = (props) => {
    const { name, message, rating } = props.review;
    return (
        <div className="card  text-center">
            <div className="card-body">
                <p className="fw-bold mt-2 fs-5">{name}</p>
                <Font family="Genos">
                    <p className="card-text fs-6 fw-bold mt-3">{message?.slice(0, 150)}... </p>
                </Font>
                <Rating className="rating" name="half-rating-read rating" value={rating} precision={0.5} readOnly />

            </div>
        </div>
    );
};

export default Review;