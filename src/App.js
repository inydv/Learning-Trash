import React from "react";
import "./App.css";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Shop from "./Pages/Shop";
import SinglePage from "./Pages/SinglePage";
import Success from "./Pages/Success";
import Signup from "./Pages/signup";
import AfterSubmitForm from "./Components/AfterSubmitForm";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/contact" component={() => <Contact />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/singlepage/:id" component={() => <SinglePage />} />
        <Route exact path="/shop/:category" component={() => <Shop />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/success" component={() => <Success />} />
        <Route
          exact
          path="/formsubmitted"
          component={() => <AfterSubmitForm />}
        />
        <Route exact path="/signup" component={() => <Signup />} />
        <Route exact path="/signin" component={LogIn} />
        {user ? <Redirect to="/" /> : <Redirect to="/signin" />}
      </Switch>
    </div>
  );
}

export default App;
