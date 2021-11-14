import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import MyOrder from '../../Manage/MyOrder/MyOrder';
import ManageAllOrder from '../../Manage/ManageAllOrder/ManageAllOrder';
import MakeAdmin from '../../Manage/MakeAdmin/MakeAdmin';
import useAuth from '../../Hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import AddReview from '../../Manage/AddReview/AddReview';
import Payment from '../../Manage/Payment/Payment';
import AddProduct from '../../Manage/AddProduct/AddProduct';
import ManageProduct from '../../Manage/ManageProduct/ManageProduct';


const drawerWidth = 200;

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin, logout } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="text-center">
            <Toolbar />
            <Divider />

            <Link style={{ textDecoration: "none" }} to="/home"><Button style={{ color: "#3F000F", backgroundColor: "#E0FFFF" }} sx={{ my: 1, fontWeight: "bold" }} variant="contained" >Home</Button></Link>
            <Divider />
            {!admin ? <Box>
                <Link style={{ textDecoration: "none" }} to={`${url}`}><Button sx={{ fontWeight: "bold" }} color="secondary">My Order</Button></Link>
                <Divider />

                <Link style={{ textDecoration: "none" }} to={`${url}/addReview`}><Button sx={{ fontWeight: "bold" }} color="secondary">Add Review</Button></Link>
                <Divider />
                <Link style={{ textDecoration: "none" }} to={`${url}/payment`}><Button sx={{ fontWeight: "bold" }} color="secondary">Pay</Button></Link>
                <Divider />
            </Box>
                :
                <Box>
                    <Link style={{ textDecoration: "none" }} to={`${url}/allOrder`}><Button sx={{ fontWeight: "bold" }} color="inherit">Manage All Order</Button></Link>
                    <Divider />
                    <Link style={{ textDecoration: "none" }} to={`${url}/addProduct`}><Button sx={{ fontWeight: "bold" }} color="inherit">Add Product</Button></Link>
                    <Divider />
                    <Link style={{ textDecoration: "none" }} to={`${url}/manageProduct`}><Button sx={{ fontWeight: "bold" }} color="inherit">Manage Product</Button></Link>
                    <Divider />
                    <Link style={{ textDecoration: "none" }} to={`${url}/makeAdmin`}><Button sx={{ fontWeight: "bold" }} color="inherit">Make Admin</Button></Link>
                </Box>}
            <Divider />
            <Button sx={{ my: 1 }} variant="contained" onClick={logout} color="error">Log Out</Button>

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box >

            <Box sx={{ display: 'flex', zIndex: 1 }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: "100%",
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'block' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                        <div className="">

                            <NavLink
                                className=" text-light  text-decoration-none fs-5"
                                to="/placeOrder"

                                activeStyle={{
                                    fontWeight: "bolder"

                                }}
                            >
                                Cart<i className="fas fa-cart-arrow-down text-warning fw-bold ms-2"></i>
                            </NavLink>
                        </div>

                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}

                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}

                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}

                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />

                    <Switch>
                        {admin ? <AdminRoute exact path={path}>
                            <ManageAllOrder></ManageAllOrder>
                        </AdminRoute > :
                            <Route exact path={path}>
                                <MyOrder></MyOrder>
                            </Route>
                        }
                        <Route path={`${path}/addReview`}>
                            <AddReview></AddReview>
                        </Route>
                        <Route path={`${path}/payment`}>
                            <Payment></Payment>
                        </Route>
                        <AdminRoute path={`${path}/allOrder`}>
                            <ManageAllOrder></ManageAllOrder>
                        </AdminRoute>
                        <AdminRoute path={`${path}/makeAdmin`}>
                            <MakeAdmin></MakeAdmin>
                        </AdminRoute >
                        <AdminRoute path={`${path}/addProduct`}>
                            <AddProduct></AddProduct>
                        </AdminRoute >
                        <AdminRoute path={`${path}/manageProduct`}>
                            <ManageProduct></ManageProduct>
                        </AdminRoute >


                    </Switch>
                </Box>
            </Box>
        </Box>

    );
}

Dashboard.propTypes = {

    window: PropTypes.func,
};

export default Dashboard;