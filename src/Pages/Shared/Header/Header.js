import React from 'react';
import { NavLink } from 'react-router-dom';
import Font from 'react-font';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="sticky-top shadow ">
            <Font family="Zen Antique">

                <nav style={{ backgroundColor: "#E0FFFF" }} className="navbar bg-opacity-10 navbar-expand-lg navbar-light animate_animated animate__fadeInDown ">
                    <div className="container-fluid">
                        <NavLink
                            className="navbar-brand "
                            to="/home"
                        >
                            <img style={{ width: "130px", height: "40px", borderRadius: "20px" }} className="img-fluid" src="https://cdn.steemitimages.com/DQmQ82HXGhdsnFb2MCXvcP1Vaf8Z4YoX72wZxnZdwKNuCaK/image.png" alt="" />
                        </NavLink>
                        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link "
                                        to="/home"
                                        activeStyle={{
                                            fontWeight: "bolder"
                                        }}
                                    >
                                        <i className="fas fa-home"></i>   Home
                                    </NavLink>

                                </li>
                                <li className="nav-item">

                                    <NavLink
                                        className="nav-link "
                                        to="/products"

                                        activeStyle={{
                                            fontWeight: "bolder"

                                        }}
                                    >
                                        <i className="fas fa-camera"></i>   More Camera
                                    </NavLink>
                                </li>


                            </ul>
                            <form className="d-flex align-items-center">
                                {user?.email && <NavLink
                                    className="nav-link text-dark fw-bold"
                                    to="/dashboard"


                                    activeStyle={{
                                        fontWeight: "bolder"

                                    }}
                                >
                                    <i className="fas fa-viruses"></i> Dashboard
                                </NavLink>}

                                {user?.email && <NavLink
                                    className="nav-link text-dark fw-bold"
                                    to="/placeOrder"

                                    activeStyle={{
                                        fontWeight: "bolder"

                                    }}
                                >
                                    Cart<i className="fas fa-cart-arrow-down text-warning fw-bold"></i>
                                </NavLink>}



                                {user?.photoURL && <img style={{ width: "35px" }} className="img-fluid rounded-circle me-3  text-white" src={user.photoURL} alt="" />}

                                {user?.email ?
                                    <button onClick={logout} className="btn btn-outline-danger" type="submit"><i className="fas fa-sign-in-alt"></i> Logout</button> :

                                    <NavLink to="/login"><button className="btn btn-outline-success" type="submit"><i className="fas fa-sign-in-alt"></i> Login</button></NavLink>}
                            </form>
                        </div>
                    </div>
                </nav>
            </Font>
        </div>
    );
};

export default Header;