import React from "react";
import "./App.css";
import About from "./Pages/about/About";
import Cart from "./Pages/cart/Cart";
import Contact from "./Pages/contact/Contact";
import Home from "./Pages//home/Home";
import Shop from "./Pages/shop/Shop";
import SinglePage from "./Pages/singlePage/SinglePage";
import Auth from "./Pages/auth/Auth";
import ResetPW from "./Pages/resetPW/ResetPW";
import Order from "./Pages/order/Order";
import PWReset from "./Pages/pwReset/PWReset";
import Navbar from "./Components/navbar/Navbar";
import NewsLetter from "./Components/newsLetter/NewsLetter";
import Footer from "./Components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Account from "./Pages/account/Account";
import UpdateProfile from "./Pages/updateProfile/UpdateProfile";

function App() {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/product/:id" element={<SinglePage />} />
        <Route path="/shop/:keyword" element={<Shop />} />
        <Route exact path="/cart" element={<Cart />} />
        {user && <Route exact path="/MyOrders" element={<Order />} />}
        <Route exact path="/register" element={user ? <Home /> : <Auth />} />
        {user && <Route exact path="/account" element={<Account />} />}
        {user && <Route exact path="/me/update" element={<UpdateProfile />} />}
        <Route
          exact
          path="/reset-password"
          element={user ? <Home /> : <ResetPW />}
        />
        <Route
          exact
          path="/password-reset/:id/:token"
          element={user ? <Home /> : <PWReset />}
        />
      </Routes>
      {user ? <NewsLetter /> : ""}
      <Footer />
    </div>
  );
}

export default App;
