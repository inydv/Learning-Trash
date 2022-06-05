import React from "react";
import "./Navbar.css";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth/authApiCalls";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    signout(dispatch);
  };

  return (
    <div className="navbar">
      <div className="left">
        <h1 className="title">TLT</h1>
        <p className="name">
          THE<span className="little"> LITTLE </span> THING
        </p>
      </div>
      <div className="center">
        <div className="home">
          <Link to="/">Home</Link>
        </div>
        <div className="shop">
          <div className="name">
            <Link to="/shop">Shop</Link>
          </div>
        </div>
        <div className="about">
          <Link to="/about">About</Link>
        </div>
        <div className="contact">
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="right">
        <div className="user">
          <ExitToAppIcon onClick={handleLogout} className="icon" />
        </div>
        <div className="cart">
          <Link to="/cart">
            <Badge badgeContent={5} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
