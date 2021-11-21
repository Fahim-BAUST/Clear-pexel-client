import React from 'react';
import Font from 'react-font'

const Banner = () => {
    return (
        <div className="mt-5">
            <Font family="Indie Flower">
                <h1 className="mt-5 pt-4 mb-5 fw-bold text-center site-name " style={{
                    color: "white", fontSize: "75px", position: "absolute",
                    left: "50%", transform: "translate(-50%)"
                }}>CLEAR PIXEL</h1></Font>
            <img className="img-fluid w-100 " src="https://i.ibb.co/0DTX07F/top-view-ph.jpg" alt="" />

        </div>
    );
};

export default Banner;