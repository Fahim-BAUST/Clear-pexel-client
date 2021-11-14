import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Registration from './Pages/Login/Registration/Registration';
import PlaceOrder from './Pages/Manage/PlaceOrder/PlaceOrder';
import NotFound from './Pages/NotFound/NotFound';
import Products from './Pages/Products/Products';
import Footer from './Pages/Shared/Footer/Footer';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>

          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/products">
            <Products></Products>

          </Route>

          <Route path="/login">
            <Login></Login>

          </Route>
          <Route path="/register">
            <Registration></Registration>
          </Route>
          <PrivateRoute path="/placeOrder/:id">
            <PlaceOrder></PlaceOrder>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>

          <Route exact path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </AuthProvider>

  );
}

export default App;
