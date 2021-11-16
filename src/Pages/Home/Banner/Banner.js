import React from 'react';
import Font from 'react-font'

const Banner = () => {
    return (
        <div >
            <Font family="Dancing Script">
                <h1 className="mt-4 pt-4 mb-5 fw-bold text-center site-name " style={{
                    color: "#3F000F", fontSize: "60px", position: "absolute",
                    left: "50%", transform: "translate(-50%)"
                }}>CLEAR PIXEL</h1></Font>
            <img className="img-fluid w-100 " src="https://i.ibb.co/5xN9Qrk/Vector-realistic-clipart-with-two-camera-lenses-photo-objectives-with-zoom-isolated-on-background-Op.jpg" alt="" />

        </div>
    );
};

export default Banner;