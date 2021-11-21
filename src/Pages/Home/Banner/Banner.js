import React from 'react';
import Font from 'react-font'

const Banner = () => {
    return (
        <div >
            <Font family="Indie Flower">
                <h1 className="mt-4 pt-4 mb-5 fw-bold text-center site-name " style={{
                    color: "white", fontSize: "75px", position: "absolute",
                    left: "50%", transform: "translate(-50%)"
                }}>CLEAR PIXEL</h1></Font>
            <img className="img-fluid w-100 " src="https://i.ibb.co/tKgGMk5/top-view-photography-accesories-with-copy-space-1-1.jpg" alt="" />

        </div>
    );
};

export default Banner;