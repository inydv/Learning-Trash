import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import React from "react";
import "../Styles/Footer.css";

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
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">Sale</a>
          </li>
          <li>
            <a href="#">Cart</a>
          </li>
          <li>
            <a href="#">My Account</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
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
