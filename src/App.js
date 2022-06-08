import React from "react";
import "./App.css";
import About from "./Pages/about/About";
import Cart from "./Pages/cart/Cart";
import Contact from "./Pages/contact/Contact";
import Home from "./Pages//home/Home";
import LogIn from "./Pages/login/LogIn";
import Shop from "./Pages/shop/Shop";
import SinglePage from "./Pages/singlePage/SinglePage";
import Signup from "./Pages/signup/signup";
import ResetPW from "./Pages/resetPW/ResetPW";
import Order from "./Pages/order/Order";
import PWReset from "./Pages/pwReset/PWReset";
import Navbar from "./Components/navbar/Navbar";
import NewsLetter from "./Components/newsLetter/NewsLetter";
import Footer from "./Components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

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
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/signin" element={user ? <Home /> : <LogIn />} />
        <Route exact path="/signup" element={user ? <Home /> : <Signup />} />
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
