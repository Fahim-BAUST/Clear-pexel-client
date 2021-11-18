import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Home.css'
import Font from 'react-font';
import Banner from '../Banner/Banner';
import Header from '../../Shared/Header/Header';
import Review from '../Review/Review';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SliderItem from '../Slider/SliderItem';
import { Alert, Snackbar } from '@mui/material';
import SocialMedia from './SocialMedia/SocialMedia';


const Home = () => {
    const [sony, setSony] = useState([]);
    const [nikon, setNikon] = useState([]);
    const [panasonic, setPanasonic] = useState([]);
    const [review, setReview] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const set = { rtl: true };
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 15000,
        autoplaySpeed: 15000,
        cssEase: "linear",
        initialSlide: 0,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };

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
            }).catch(error => setWrong(true));

    }, [])

    useEffect(() => {
        fetch('https://gentle-fortress-91581.herokuapp.com/review')
            .then(res => res.json())
            .then(data => setReview(data))
            .catch(error => setWrong(true));

    }, [])
    return (

        <div>
            <Header></Header>
            <Banner></Banner>
            {open === true && <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}

            >
                <Alert severity="success" variant="filled">Successfully added!</Alert>

            </Snackbar>}
            {
                wrong === true && <Snackbar
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}

                >

                    <Alert severity="error" variant="filled">something Wrong!</Alert>
                </Snackbar>}

            <div data-aos="fade-down-right"
                data-aos-easing="linear"
                data-aos-duration="1500" className="mt-5 container bg-white p-4 shadow " style={{ borderRadius: "20px" }}>
                <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>Sony</h2></Font>
                <SliderItem category={sony} open={setOpen} wrong={setWrong}></SliderItem>


            </div>

            <div data-aos="fade-down-left"
                data-aos-duration="3000" data-aos-easing="linear" className="mt-5 container bg-white p-4 shadow " style={{ borderRadius: "20px" }}>
                <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>Nikon</h2></Font>
                <SliderItem category={nikon} set={set} open={setOpen} wrong={setWrong}></SliderItem>


            </div>
            <div data-aos="fade-up-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000" className="mt-5 container bg-white p-4 shadow " style={{ borderRadius: "20px" }}>
                <Font family="Griffy"><h2 className="mx-3 my-4" style={{ color: "#3F000F" }}>Panasonic</h2></Font>
                <SliderItem category={panasonic} open={setOpen} wrong={setWrong}></SliderItem>


            </div>


            <Font family="Mochiy Pop P One"><h2 className="mt-5 my-4 text-center " style={{ color: "#25383C" }}>Reviews</h2></Font>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear" className="mt-5  bg-white p-4 mb-4 shadow  container" style={{ borderRadius: "20px" }}>
                <Slider {...settings}{...set}>
                    {
                        review.map(review => <Review
                            review={review} key={review?._id}
                        ></Review>

                        )

                    }
                </Slider >
            </div>

            <SocialMedia></SocialMedia>

        </div >



    );
};

export default Home;