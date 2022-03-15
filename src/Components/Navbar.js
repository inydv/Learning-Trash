import React, { useState } from "react";
import "../Styles/Navbar.css";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

function Navbar() {
  const [TF, setTF] = useState(true);
  const [box, setBox] = useState({
    display: "none",
  });

  function boxFunc() {
    if (TF === true) {
      setBox({
        display: "flex",
      });
      setTF(false);
    } else if (TF === false) {
      setBox({
        display: "none",
      });
      setTF(true);
    }
  }

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
          <Link exact to="/">
            Home
          </Link>
        </div>
        <div className="shop">
          <div className="name" onClick={() => boxFunc()}>
            Shop
          </div>
          <div className="shopItems" style={box}>
            <span className="men">
              <Link exact to="/shop">
                Men
              </Link>
            </span>
            <span className="women">
              <Link exact to="/shop">
                Women
              </Link>
            </span>
            <span className="sale">
              <Link exact to="/shop">
                Sale
              </Link>
            </span>
          </div>
        </div>
        <div className="about">
          <Link exact to="/about">
            About
          </Link>
        </div>
        <div className="contact">
          <Link exact to="/contact">
            Contact
          </Link>
        </div>
      </div>
      <div className="right">
        <div className="user">
          <Link exact to="/login">
            <PersonIcon className="icon" />
          </Link>
          <Link exact to="/login">
            LogIn
          </Link>
        </div>
        <div className="cart">
          <Link exact to="/cart">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
