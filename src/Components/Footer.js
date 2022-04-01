import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import "../Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="left">
        <h1 className="logo">TLT</h1>
        <p className="desc">
          Who said good and cool t-shirts have to expensive? We bring newer,
          cooler and more youth oriented designs everyday. Yes! Everyday you get
          a new design to explore and buy.
        </p>
      </div>
      <div className="center">
        <h4 className="usefulLinks">USEFUL LINKS</h4>
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop/men">Men</Link>
          </li>
          <li>
            <Link to="/shop/women">Women</Link>
          </li>
          <li>
            <Link to="/shop/sale">Sale</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <a href="#">My Account</a>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        <h4 className="address">ADDRESS</h4>
        <p className="addressDetail">
          826 Kapashera New Delhi, 110037 <br /> info@mysite.com <br /> Tel:
          123-456-7890
        </p>
        <div className="icons">
          <div className="facebook">
            <Facebook />
          </div>
          <div className="instagram">
            <Instagram />
          </div>
          <div className="twitter">
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
