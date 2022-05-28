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
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PWReset from "./Pages/pwReset/PWReset";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <LogIn />} />
        <Route exact path="/contact" element={user ? <Contact /> : <LogIn />} />
        <Route exact path="/about" element={user ? <About /> : <LogIn />} />
        <Route
          exact
          path="/singlepage/:id"
          element={user ? <SinglePage /> : <LogIn />}
        />
        <Route
          exact
          path="/shop/:category"
          element={user ? <Shop /> : <LogIn />}
        />
        <Route exact path="/cart" element={user ? <Cart /> : <LogIn />} />
        <Route exact path="/order" element={user ? <Order /> : <LogIn />} />
        <Route exact path="/signin" element={user ? <Home /> : <LogIn />} />
        <Route exact path="/reset-password" element={user ? <Home /> : <ResetPW /> } />
        <Route exact path="/signup" element={user ? <Home /> : <Signup />} />
        <Route exact path="/password-reset/:id/:token" element={user ? <Home /> : <PWReset />} />
      </Routes>
    </div>
  );
}

export default App;
