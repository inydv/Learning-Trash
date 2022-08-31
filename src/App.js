import React, { useEffect, useState } from "react";
import "./App.css";
import { axiosJWT, publicRequest } from "./requestMethods";
import Home from "./Pages/staticPages/home/Home";
import Contact from "./Pages/staticPages/contact/Contact";
import About from "./Pages/staticPages/about/About";
import Shop from "./Pages/forProducts/shop/Shop";
import SinglePage from "./Pages/forProducts/singlePage/SinglePage";
import Auth from "./Pages/userAuth/auth/Auth";
import ResetPW from "./Pages/userAuth/resetPW/ResetPW";
import PWReset from "./Pages/userAuth/pwReset/PWReset";
import Account from "./Pages/userUpdate/account/Account";
import UpdateProfile from "./Pages/userUpdate/updateProfile/UpdateProfile";
import UpdatePassword from "./Pages/userUpdate/updatePassword/UpdatePassword";
import Cart from "./Pages/makingOrders/cart/Cart";
import Shipping from "./Pages/makingOrders/shipping/Shipping";
import ConfirmOrder from "./Pages/makingOrders/confirmOrder/ConfirmOrder";
import Wrapper from "./Pages/makingOrders/payment/Payment";
import OrderSuccess from "./Pages/makingOrders/orderSuccess/OrderSuccess";
import Order from "./Pages/makingOrders/order/Order";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "./Pages/makingOrders/orderDetails/OrderDetails";
import { LOAD_USER } from "./redux/user/userApiCall";
import Dashboard from "./Pages/admin/dashboard/Dashboard";
import ProductList from "./Pages/admin/productList/ProductList";
import NewProduct from "./Pages/admin/newProduct/NewProduct";
import UpdateProduct from "./Pages/admin/updateProduct/UpdateProduct";
import OrderList from "./Pages/admin/orderList/OrderList";
import ProcessOrder from "./Pages/admin/processOrder/ProcessOrder";
import UsersList from "./Pages/admin/usersList/UsersList";
import UpdateUser from "./Pages/admin/updateUser/UpdateUser";
import ProductReviews from "./Pages/admin/productReviews/ProductReviews";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date(Date.now());
      if (localStorage.getItem("time") <= currentDate.getTime()) {
        const res = await publicRequest.post("/refresh");
        localStorage.setItem("time", res.data.TokenDate);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axiosJWT.get("/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    dispatch(LOAD_USER());
  }, [dispatch])

  useEffect(() => {
    if (user) {
      getStripeApiKey();
    }
  }, [user])

  return (
    <div className="app">
      <Routes>

        <Route exact path="/register" element={<Auth />} />
        <Route exact path="/password/forgot" element={<ResetPW />} />
        <Route exact path="/password/reset/:token" element={<PWReset />} />

        <Route exact path="/" element={<Home />} />

        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/shop" element={<Shop />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route exact path="/product/:id" element={<SinglePage />} />

        <Route exact path="/account" element={<Account />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassword />} />

        <Route exact path="/MyOrders" element={<Order />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />

        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        {stripeApiKey && (
          <Route exact path="/process/payment" element={<Wrapper stripeApiKey={stripeApiKey} />} />
        )}
        <Route exact path="/success" element={<OrderSuccess />} />

        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/products" element={<ProductList />} />
        <Route exact path="/admin/product" element={<NewProduct />} />
        <Route exact path="//admin/product/:id" element={<UpdateProduct />} />
        <Route exact path="/admin/orders" element={<OrderList />} />
        <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
        <Route exact path="/admin/users" element={<UsersList />} />
        <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        <Route exact path="/admin/reviews" element={<ProductReviews />} />

      </Routes>
    </div>
  );
}

export default App;
