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
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
            button: "Buy now",
            image: "https://i.ibb.co/RQcfTZn/21-Z-2103-w026-n002-240-B-p1-240.jpg",
            link: "/products"

        },
        {
            title: "Choose Your best Camera With Best Price",
            description:
                "Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
            button: "Read More",
            image: "https://i.ibb.co/HYCJJjf/15-Z-2104-w026-n002-380-B-p1-380.jpg",
            link: "/products"
        },
        {
            title: "One Of The Best Camera Selling Website",
            description:
                "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis  purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
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