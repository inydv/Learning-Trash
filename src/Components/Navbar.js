import React, { useState } from "react";
import "../Styles/Navbar.css";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Navbar() {

  let hide = true;
  const [box, setBox] = useState({
    display: 'none',
  })

  function boxFunc() {
    if (hide === true) {
      setBox({
        display: 'flex',
      })
      hide = !hide
    } else if (hide === false) {
      setBox({
        display: 'none',
      })
      hide = !hide
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
        <div className="home">Home</div>
        <div className="shop">
          <div className="name" onMouseOver={() => boxFunc()}>Shop</div>
          <div className="shopItems" style={box}>
            <span className="men">Men</span>
            <span className="women">Women</span>
            <span className="sale">Sale</span>
          </div>
        </div>
        <div className="about">About</div>
        <div className="contact">Contact</div>
      </div>
      <div className="right">
        <div className="user">
          <PersonIcon className="icon" />
          Log In
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
