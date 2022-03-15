import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";
import "../Styles/Shop.css";

function Shop() {
  return (
    <div className="shop">
      <Navbar />
      <h1 className="whichShop">MENS</h1>
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Shop;
