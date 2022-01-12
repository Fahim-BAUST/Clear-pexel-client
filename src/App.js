import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Home from './Pages/Home/Home/Home';

import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Registration from './Pages/Login/Registration/Registration';
import AddProduct from './Pages/Manage/AddProduct/AddProduct';
import AddReview from './Pages/Manage/AddReview/AddReview';
import MakeAdmin from './Pages/Manage/MakeAdmin/MakeAdmin';
import ManageAllOrder from './Pages/Manage/ManageAllOrder/ManageAllOrder';
import ManageProduct from './Pages/Manage/ManageProduct/ManageProduct';
import MyOrder from './Pages/Manage/MyOrder/MyOrder';
import Payment from './Pages/Manage/Payment/Payment';
import PlaceOrder from './Pages/Manage/PlaceOrder/PlaceOrder';
import NotFound from './Pages/NotFound/NotFound';
import ProductsDetails from './Pages/Products/ProductDetails/ProductsDetails';
import Products from './Pages/Products/Products';
import Footer from './Pages/Shared/Footer/Footer';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/productDetails/:id" element={<PrivateRoute><ProductsDetails /></PrivateRoute>} />
          <Route path="/placeOrder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />


          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/dashboard" element={<MyOrder />} />

            <Route path="/dashboard/myOrder" element={<MyOrder />} />
            <Route path="/dashboard/addReview" element={<AddReview />} />
            <Route path="/dashboard/payment/:orderId" element={<Payment />} />

            <Route path="/dashboard/allOrder" element={<AdminRoute><ManageAllOrder /></AdminRoute>} />
            <Route path="/dashboard/makeAdmin" element={<AdminRoute><MakeAdmin /></AdminRoute>} />
            <Route path="/dashboard/addProduct" element={<AdminRoute><AddProduct /></AdminRoute>} />
            <Route path="/dashboard/manageProduct" element={<AdminRoute><ManageProduct /></AdminRoute>} />

          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer></Footer>
      </Router>
    </AuthProvider>

  );
}

export default App;
