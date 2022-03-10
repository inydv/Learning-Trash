import React from "react";
import "../Styles/Navbar.css";
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <h1 className="title">TLT</h1>
        <p className="name">THE<span className="little"> LITTLE </span> THING</p>
      </div>
      <div className="center">
        <div className="home">Home</div>
        <div className="shop">Shop</div>
        <div className="about">About</div>
        <div className="contact">Contact</div>
      </div>
      <div className="right">
        <div className="user">
          <PersonIcon className="icon" />Log In
        </div>
        <div className="cart">
          <Badge badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
