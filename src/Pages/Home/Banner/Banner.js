import React from 'react';
import Font from 'react-font'
import './banner.css'
import './slider-animations.css'
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import { Link, useNavigate } from 'react-router-dom';

const Banner = () => {

    const navigate = useNavigate();

    const content = [


        {
            title: "Best Trusted E-commerce Website",
            description:
                "We are the world’s only full-service destination for photo, video and electronics.We’re more than a camera store—we offer the best selection and prices on professional photography and video gear",
            button: "Buy now",
            image: "https://i.ibb.co/RQcfTZn/21-Z-2103-w026-n002-240-B-p1-240.jpg",
            link: "/products"

        },
        {
            title: "Choose Your best Camera With Best Price",
            description:
                "Equip your creativity with the best & newest Mirrorless, Point & Shoot, and DSLR photography equipment from brands like Sony, Canon and Nikon, or shop for the latest in smart tech, gaming, drones, musical instruments and recording studio gear .",
            button: "Read More",
            image: "https://i.ibb.co/HYCJJjf/15-Z-2104-w026-n002-380-B-p1-380.jpg",
            link: "/products"
        },
        {
            title: "Exclusive Savings All Year Long",
            description:
                "For savings you won't find anywhere else and for weekly trending deals on top products from industry leading brands, browse Deals, Used, Deal Of The Day, only at clear Pixels.",
            button: "Discover",
            image: "https://i.imgur.com/DCdBXcq.jpg",
            link: "/products"
        }
    ];
    return (
        // <div className="mt-5">
        //     <Font family="Indie Flower">
        //         <h1 className="mt-5 pt-4 mb-5 fw-bold text-center site-name " style={{
        //             color: "white", fontSize: "75px", position: "absolute",
        //             left: "50%", transform: "translate(-50%)"
        //         }}>CLEAR PIXEL</h1></Font>
        //     <img className="img-fluid w-100 " src="https://i.ibb.co/0DTX07F/top-view-ph.jpg" alt="" />

        // </div>

        <Slider className="slider-wrapper " autoplay={1000}>
            {content.map((item, index) => (
                <div
                    key={index}
                    className="slider-content "
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                >
                    <div className="inner">
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>

                    </div>

                </div>
            ))}
        </Slider>



    );
};

export default Banner;