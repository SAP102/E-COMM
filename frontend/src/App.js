import './App.css';
import Header from './components/layout/header/Header';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Footer from './components/layout/footer/Footer';
import Home from './components/home/Home';
import Singleproduct from './components/Product/Singleproduct';
import AllProducts from './components/Product/AllProducts';
import Registeruser from './components/User/Registeruser';
import Login from './components/User/Login';
import Account from './components/User/Account';
import store from './store';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import StripeContainer from './components/cart/StripeContainer';
import OrderSuccess from './components/cart/OrderSuccess';
import MyOrders from './components/Orders/MyOrders';
import About from './components/about/About';
import Dashbord from './components/admin/Dashbord';
import User from './components/admin/User';
import ProductList from './components/admin/product/ProductList';
import Order from './components/admin/Order';
import CreateProduct from './components/admin/product/CreateProduct';
import Category from './components/category/Category';
import Loading from './components/layout/loadingscreen'
import Protected from './components/router/Protectedroute';
import Alert from './components/page/Alert';

function App() {

  const loading = useSelector((state) => state.user.loading)
  const [searchField, setSearchField] = useState("")
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 8000);
  }

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <BrowserRouter>
      <Header setSearchField={setSearchField} />
      <Alert alert={alert} />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<Singleproduct />} />
        <Route exact path='/products' element={<AllProducts searchField={searchField} />} />
        <Route exact path='/ctaegory' element={<Category />} />

        <Route exact path='/signup' element={<Registeruser />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/login' element={<Login showAlert={showAlert} />} />

        <Route exact path='/account' element={<Protected Component={Account} />} />

        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/order/Shipping' element={<Protected Component={Shipping} />} />
        <Route exact path='/order/confirmorder' element={<Protected Component={ConfirmOrder} />} />
        <Route exact path='/process/payment' element={<Protected Component={StripeContainer} />} />
        <Route exact path='/success' element={<OrderSuccess />} />
        <Route exact path='/orders' element={<Protected Component={MyOrders} />} />
        <Route exact path='/about' element={<About />} />

        <Route exact path='/admin/dashbord' element={<Protected Component={Dashbord} />} />
        <Route exact path='/admin/user' element={<Protected Component={User} />} />
        <Route exact path='/admin/allproducts' element={<ProductList />} />
        <Route exact path='/admin/Orders' element={<Order />} />
        <Route exact path='/admin/createproduct' element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
