import React from 'react';

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#081621" }}>
            <div className="mx-4" >
                <div className="row">
                    <div className="col">
                        <p className="text-white fs-5 fw-bold mt-3">SUPPORT</p>
                        <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }} className=" d-flex align-items-center rounded-pill justify-content-evenly">
                            <div>
                                <i className="fas fa-phone fs-3 text-light"></i>
                            </div>
                            <div className="ps-4 py-2 " style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.1)" }} >
                                <p className="text-secondary">9AM-8PM</p>
                                <p style={{ color: "#ef4a23", fontSize: "20px" }}>0923536354</p>
                            </div>
                        </div>

                        <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }} className=" d-flex align-items-center rounded-pill justify-content-evenly mt-2">
                            <div>
                                <i className="fas fa-map-marker-alt fs-3 text-light ps-3 me-4"></i>
                            </div>
                            <div className="ps-4 py-2 " style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.1)" }} >
                                <p className="text-secondary">Store Locator</p>
                                <p style={{ color: "#ef4a23", fontSize: "20px" }}>Find Our Store</p>
                            </div>
                        </div>
                    </div>
                    <div className="col ">

                        <p className="text-white fs-5 fw-bold mt-3">ABOUT US</p>
                        <div className="">
                            <p className="text-secondary">Emi Terms</p>
                            <p className="text-secondary">Privacy Policy</p>
                            <p className="text-secondary">Career</p>
                            <p className="text-secondary">Blog</p>
                        </div>

                    </div>
                    <div className="col ">

                        <p className="text-white fs-5 fw-bold mt-3">Payment System</p>
                        <div className="">
                            <p className="text-secondary">Bank</p>
                            <p className="text-secondary">Mobile Bank</p>
                            <p className="text-secondary">Payoner</p>
                            <p className="text-secondary">Skrill</p>
                            <img className="img-fluid w-50" src="https://html.geekcodelab.com/holiday-planners/assets/images/payment-companies-logo.png" alt="" />
                        </div>

                    </div>
                    <div className="col ">

                        <p className="text-white fs-5 fw-bold mt-3">STAY CONNECTED</p>
                        <div className="">
                            <p className="text-light">Clear Pixel Ltd</p>
                            <p className="text-secondary">6th floor, 28 Kazi Nazrul Islam Ave,Navana</p>
                            <p className="text-secondary">Zohura Square, Dhaka 1000</p>
                            <p className="text-secondary">Email:</p>
                            <p style={{ color: "#ef4a23" }}>info.webteam@clearpixel.com</p>
                        </div>

                    </div>

                </div>




                <div className="row mt-3" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>

                    <div className="col mt-4 mb-4 text-center">
                        <i style={{ color: "#4267B2" }} className="fab fa-facebook me-3 fs-1 "></i>
                        <i style={{ color: "red" }} className="fab fa-instagram me-3 fs-1"></i>
                        <i style={{ color: "#00acee" }} className="fab fa-twitter-square me-3 fs-1"></i> <br />
                        <p className="text-secondary mt-2">© 2021 Clear Pixel Ltd | All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;