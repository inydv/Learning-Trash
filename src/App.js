import React from "react";
import "./App.css";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Shop from "./Pages/Shop";
import SinglePage from "./Pages/SinglePage";
import Navbar from "./Components/Navbar";
import NewsLetter from "./Components/NewsLetter";
import Footer from "./Components/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/contact" component={() => <Contact />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/singlepage/:id" component={() => <SinglePage />} />
        <Route exact path="/shop/:category" component={() => <Shop />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/success" component={() => <Success />} />
        {user ? (
          <Redirect to="/" />
        ) : (
          <Route exact path="/login" component={LogIn} />
        )}
      </Switch>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default App;
