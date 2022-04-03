import React from "react";
import "./App.css";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import Shop from "./Pages/Shop";
import SinglePage from "./Pages/SinglePage";
import Signup from "./Pages/signup";
import Order from "./Pages/Order";
import AfterSubmitForm from "./Components/AfterSubmitForm";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  if (user !== null) {
    console.log(user);
    <Redirect to="/" />;
  } else {
    console.log(user);
    <Redirect to="/signin" />;
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/contact" component={() => <Contact />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/singlepage/:id" component={() => <SinglePage />} />
        <Route exact path="/shop/:category" component={() => <Shop />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/order" component={() => <Order />} />
        <Route
          exact
          path="/formsubmitted"
          component={() => <AfterSubmitForm />}
        />
        <Route exact path="/signin">
          {user ? <Redirect to="/" /> : <LogIn />}
        </Route>

        <Route exact path="/signup">
          {user ? <Redirect to="/" /> : <Signup />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
