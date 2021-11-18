import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CatagoryProduct from '../CatagoryProduct/CatagoryProduct';

const SliderItem = (props) => {
    const set = props.set
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
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
    return (
        <Slider {...settings}{...set}>
            {
                props?.category.map(camera => <CatagoryProduct
                    key={camera?._id}
                    products={camera}
                    open={props.open} wrong={props.wrong}
                ></CatagoryProduct>)

            }
        </Slider >
    );
};

export default SliderItem;