import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages//home/Home";
import Contact from "./Pages/contact/Contact";
import About from "./Pages/about/About";
import Shop from "./Pages/shop/Shop";
import SinglePage from "./Pages/singlePage/SinglePage";
import Auth from "./Pages/auth/Auth";
import Cart from "./Pages/cart/Cart";
import ResetPW from "./Pages/resetPW/ResetPW";
import Order from "./Pages/order/Order";
import PWReset from "./Pages/pwReset/PWReset";
import Navbar from "./Components/navbar/Navbar";
import NewsLetter from "./Components/newsLetter/NewsLetter";
import Footer from "./Components/footer/Footer";
import Account from "./Pages/account/Account";
import UpdateProfile from "./Pages/updateProfile/UpdateProfile";
import UpdatePassword from "./Pages/updatePassword/UpdatePassword";
import Shipping from "./Pages/shipping/Shipping";
import ConfirmOrder from "./Pages/confirmOrder/ConfirmOrder";
import OrderSuccess from "./Pages/orderSuccess/OrderSuccess";
import Wrapper from "./Pages/payment/Payment";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicRequest } from "./requestMethods";

function App() {
  const user = useSelector((state) => state.auth.currentUser);

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await publicRequest.get("/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    getStripeApiKey();
  }, [])

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/shop" element={<Shop />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route exact path="/product/:id" element={<SinglePage />} />

        <Route exact path="/register" element={user ? <Home /> : <Auth />} />
        <Route exact path="/password/forgot" element={<ResetPW />} />
        <Route exact path="/password/reset/:token" element={<PWReset />} />

        {user && <Route exact path="/account" element={<Account />} />}
        {user && <Route exact path="/me/update" element={<UpdateProfile />} />}
        <Route exact path="/password/update" element={<UpdatePassword />} />

        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        {stripeApiKey && (
          <Route exact path="/process/payment" element={<Wrapper stripeApiKey={stripeApiKey} />} />
        )}
        <Route exact path="/success" element={<OrderSuccess />} />
        {user && <Route exact path="/MyOrders" element={<Order />} />}
      </Routes>
      {user ? <NewsLetter /> : ""}
      <Footer />
    </div>
  );
}

export default App;
