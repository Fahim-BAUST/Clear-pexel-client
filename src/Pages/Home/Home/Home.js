import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Whirligig from 'react-whirligig'
import './Home.css'
import Font from 'react-font';
import Banner from '../Banner/Banner';
import Header from '../../Shared/Header/Header';
import Review from '../Review/Review';

import CatagoryProduct from '../CatagoryProduct/CatagoryProduct';

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
            }).catch(error => console.log(error))

    }, [])

    useEffect(() => {
        fetch('https://gentle-fortress-91581.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReview(data))
            .catch(error => console.log(error))

    }, [])
    return (

        <div>
            <Header></Header>
            <Banner></Banner>

            {/* catagory wise data shown */}
            <div style={{ paddingTop: "20px", backgroundColor: "#f1f2f4", marginBottom: "15px", paddingBottom: 20 }}>

                <div data-aos="fade-down-right"
                    data-aos-easing="linear"
                    data-aos-duration="1500" className="mt-5 container bg-white p-3 shadow" style={{ borderRadius: "20px" }}>

                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>SONY</h2></Font>

                    <Whirligig
                        visibleSlides={3}
                        gutter="1em"

                        ref={(_whirligigInstance) => { whirligig = _whirligigInstance }}
                    >
                        {
                            sony.map(camera => <CatagoryProduct
                                key={camera?._id}
                                products={camera}
                            ></CatagoryProduct>)

                        }
                    </Whirligig>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-primary btn-sm" onClick={prev}>Prev</button> <button className="btn btn-outline-primary btn-sm" onClick={next}>Next</button>
                    </div>

                </div>


                <div data-aos="fade-down-left"
                    data-aos-duration="3000" className="mt-5 container bg-white p-3 shadow" style={{ borderRadius: "20px" }}>
                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>NIKON</h2></Font>

                    <Whirligig
                        visibleSlides={2.5}
                        gutter="1em"

                    >
                        {
                            nikon.map(camera => <CatagoryProduct
                                key={camera?._id}
                                products={camera}
                            ></CatagoryProduct>)

                        }
                    </Whirligig>

                </div>

                <div data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000" className="mt-5  container bg-white p-3 mb-4 shadow" style={{ borderRadius: "20px" }}>
                    <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>PANASONIC</h2></Font>

                    <Whirligig
                        visibleSlides={2.5}
                        gutter="1em"


                    >
                        {
                            panasonic.map(camera => <CatagoryProduct
                                key={camera?._id}
                                products={camera}
                            ></CatagoryProduct>)

                        }
                    </Whirligig>

                </div>



            </div>

            <Font family="Mochiy Pop P One"><h2 className="mt-5  pb-3 text-center mb-3" style={{ color: "#25383C" }}>Product Images</h2></Font>

            <Font family="Mochiy Pop P One"><h2 className="mt-5 my-4 text-center " style={{ color: "#25383C" }}>Reviews</h2></Font>

            <div className="">
                <div data-aos="fade-up" data-aos-duration="2000" className="mt-5 container bg-white p-3 mb-4 shadow" style={{ borderRadius: "20px" }}>


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