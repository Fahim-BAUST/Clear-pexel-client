import { Button, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Product = (props) => {
    const { image, name, rating, details, offfer, cost, _id } = props.product

    const desc = details?.split("=");
    return (
        <div>
            <Card className="service-card" style={{ border: "3px solid #E0FFFF" }}>
                {offfer && <Typography style={{ position: "absolute", padding: "2px 30px 2px 0 ", marginTop: 15, color: "white", backgroundColor: "#c29d59" }} gutterBottom variant="h5" component="div">
                    {offfer}% OFF
                </Typography>}

                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>

                    <Typography className="mt-2 mb-3" variant="body2" color="text.secondary">
                        <ul>
                            {desc?.map(description => <li>{description}</li>)}
                        </ul>

                    </Typography>
                    <Rating name="read-only" value={rating} readOnly />
                </CardContent>

                <div className="d-flex justify-content-between container">
                    <Typography
                        style={{ fontFamily: "cursive" }}
                        className="fw-bold " variant="h5" >
                        <span className="fw-bold mt-3">{cost} TK </span>
                    </Typography>
                    <NavLink className="text-decoration-none" to={`/placeOrder/${_id}`}>
                        <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ paddingX: 2, marginLeft: 2, marginBottom: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> Buy Now </Button>
                    </NavLink>

                </div>


            </Card>

        </div>
    );
};

export default Product;