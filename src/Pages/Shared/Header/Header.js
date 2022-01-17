import React from 'react';
import { NavLink } from 'react-router-dom';
import Font from 'react-font';
import useAuth from '../../Hooks/useAuth';
import { color } from '@mui/system';

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <div className="sticky-top shadow ">
            <Font family="Zen Antique">
                <nav style={{ backgroundColor: 'white' }} className="navbar bg-opacity-10 navbar-expand-lg navbar-light animate_animated animate__fadeInDown ">
                    <div className="container-fluid">
                        <NavLink
                            className="navbar-brand "
                            to="/home"
                        >
                            <Font family='Neonderthaw'> <span style={{ fontWeight: 'bold', fontSize: '30px' }}>Clear Pixels</span> </Font>
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
                                        <i className="fas fa-camera"></i>    Camera details
                                    </NavLink>
                                </li>
                                <li className="nav-item">

                                    {user?.email && <NavLink
                                        className="nav-link "
                                        to="/dashboard"

                                        activeStyle={{
                                            fontWeight: "bolder"

                                        }}
                                    >
                                        <i className="fas fa-viruses"></i> Dashboard
                                    </NavLink>}
                                </li>
                                <li className="nav-item">

                                    {user?.email && <NavLink
                                        className="nav-link "
                                        to="/placeOrder"

                                        activeStyle={{
                                            fontWeight: "bolder",
                                            color: "dark"

                                        }}
                                    >
                                        Cart<i className="fas fa-cart-arrow-down text-warning fw-bold"></i>
                                    </NavLink>}
                                </li>


                            </ul>
                            <form className="d-flex align-items-center">

                                {user?.photoURL && <img style={{ width: "35px" }} className="img-fluid rounded-circle   text-white" src={user.photoURL} alt="" />}

                                {user?.email && <span className="ms-2 me-2">{user.displayName}</span>}

                                {user?.email ?
                                    <button onClick={logout} className="btn btn-outline-danger ms-2" type="submit"><i className="fas fa-sign-in-alt"></i> Logout</button> :

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