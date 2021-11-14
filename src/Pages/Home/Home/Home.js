import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Whirligig from 'react-whirligig'
import './Home.css'
import Font from 'react-font';
import { Button, Divider, Rating } from '@mui/material';
import Banner from '../Banner/Banner';
import Header from '../../Shared/Header/Header';
import Review from '../Review/Review';
import ImageFlow from '../ImageFlow/ImageFlow';
import { NavLink } from 'react-router-dom';


const Home = () => {
    const [sony, setSony] = useState([]);
    const [nikon, setNikon] = useState([]);
    const [panasonic, setPanasonic] = useState([]);
    const [review, setReview] = useState([]);

    let whirligig;
    const next = () => whirligig.next();
    const prev = () => whirligig.prev();

    const url = 'https://gentle-fortress-91581.herokuapp.com/products';
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const sony = data.filter(data => data?.category === 'sony')
                setSony(sony);
                const nikon = data.filter(data => data?.category === 'nikon')
                setNikon(nikon);
                const panasonic = data.filter(data => data?.category === 'panasonic')
                setPanasonic(panasonic);
            })

    }, [])

    useEffect(() => {
        fetch('https://gentle-fortress-91581.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReview(data))

    }, [])



    return (

        <div>
            <Header></Header>
            <Banner></Banner>

            {/* catagory wise data shown */}
            <div style={{ paddingTop: "20px", backgroundColor: "#f1f2f4", marginBottom: "15px", paddingBottom: 20 }}>

                <div className="mt-5 container bg-white p-3 shadow" style={{ borderRadius: "20px" }}>

                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>SONY</h2></Font>

                    <Whirligig
                        visibleSlides={3}
                        gutter="1em"

                        ref={(_whirligigInstance) => { whirligig = _whirligigInstance }}
                    >
                        {
                            sony.map(camera => <div>
                                <div className="card  text-center">
                                    <div className="card-body">
                                        <img src={camera?.image} className="
                                     img-fluid text-center" alt="..." />
                                        <p className="fw-bold mt-2">{camera?.name}</p>

                                        <Rating className="rating" name="half-rating-read" value={camera?.rating} precision={0.5} readOnly />

                                        <Font family="Henny Penny">
                                            <p className="card-text fw-bold mt-3">{camera?.cost} TK</p>
                                        </Font>
                                        <Divider></Divider>
                                        <NavLink className="text-decoration-none" to={`/placeOrder/${camera?._id}`}> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ marginTop: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> Buy Now </Button></NavLink> <br />
                                    </div>
                                </div>
                            </div>)

                        }
                    </Whirligig>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-primary btn-sm" onClick={prev}>Prev</button> <button className="btn btn-outline-primary btn-sm" onClick={next}>Next</button>
                    </div>

                </div>


                <div className="mt-5 container bg-white p-3 shadow" style={{ borderRadius: "20px" }}>
                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>NIKON</h2></Font>

                    <Whirligig
                        visibleSlides={2.5}
                        gutter="1em"

                    >
                        {
                            nikon.map(camera => <div>
                                <div className="card  text-center">
                                    <div className="card-body">
                                        <img src={camera?.image} className="
                                     img-fluid text-center" alt="..." />
                                        <p className="fw-bold mt-2">{camera?.name}</p>
                                        <Rating className="rating" name="half-rating-read rating" value={camera?.rating} precision={0.5} readOnly />

                                        <Font family="Henny Penny">
                                            <p className="card-text fw-bold mt-3">{camera?.cost} TK</p>
                                        </Font>
                                        <Divider></Divider>
                                        <NavLink className="text-decoration-none" to={`/placeOrder/${camera?._id}`}> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ marginTop: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> Buy Now </Button></NavLink> <br />


                                    </div>
                                </div>
                            </div>)

                        }
                    </Whirligig>

                </div>

                <div className="mt-5  container bg-white p-3 mb-4 shadow" style={{ borderRadius: "20px" }}>
                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>PANASONIC</h2></Font>

                    <Whirligig
                        visibleSlides={2.5}
                        gutter="1em"


                    >
                        {
                            panasonic.map(camera => <div>
                                <div className="card  text-center">
                                    <div className="card-body">
                                        <img src={camera?.image} className="
                                     img-fluid text-center" alt="..." />
                                        <p className="fw-bold mt-2">{camera?.name}</p>
                                        <Rating className="rating" name="half-rating-read rating" value={camera?.rating} precision={0.5} readOnly />

                                        <Font family="Henny Penny">
                                            <p className="card-text fw-bold mt-3">{camera?.cost} TK</p>
                                        </Font>
                                        <Divider></Divider>
                                        <NavLink className="text-decoration-none" to={`/placeOrder/${camera?._id}`}> <Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ marginTop: 2, fontWeight: "bold" }} variant="contained" size="small"><i className="fas fa-luggage-cart me-2"></i> Buy Now </Button></NavLink> <br />


                                    </div>
                                </div>
                            </div>)

                        }
                    </Whirligig>

                </div>



            </div>

            <Font family="Mochiy Pop P One"><h2 className="mt-5  pb-3 text-center mb-3" style={{ color: "#25383C" }}>Product Images</h2></Font>
            <ImageFlow></ImageFlow>

            <Font family="Mochiy Pop P One"><h2 className="mt-5 my-4 text-center " style={{ color: "#25383C" }}>Reviews</h2></Font>

            <div className="">
                <div className="mt-5 container bg-white p-3 mb-4 shadow" style={{ borderRadius: "20px" }}>


                    <Whirligig
                        visibleSlides={2.5}
                        gutter="1em"

                    >
                        {
                            review.map(review => <Review
                                review={review} key={review?._id}
                            ></Review>

                            )

                        }
                    </Whirligig>
                </div>

            </div>
        </div>



    );
};

export default Home;