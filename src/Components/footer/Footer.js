import React from "react";
import "./Footer.css";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
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
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/order">My Account</Link>
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
          826 Kapashera New Delhi, 110037 <br /> im.nydv@gmail.com <br /> Tel:
          7303405787
        </p>
        <div className="icons">
          <div className="facebook">
            <a href="https://www.facebook.com/Nitin9900"
              target="_blank"
              rel="noreferrer">
              <Facebook />
            </a>
          </div>
          <div className="instagram">
            <a
              href="https://instagram.com/i_nydv?igshid=YmMyMTA2M2Y="
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
          </div>
          <div className="twitter">
            <a
              href="https://www.linkedin.com/in/lokesh-yadav-31318a225/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedIn />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
