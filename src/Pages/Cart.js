import React from "react";
import "../Styles/Cart.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";

function Cart() {
  return (
    <div className="cart">
      <Navbar />
      <div className="container">
        <h1 className="title">SHOPPING CART</h1>
        <div className="heading">
          <p className="item">ITEM</p>
          <p className="quantity">QUANTITY</p>
          <p className="price">PRICE</p>
        </div>
        <div className="line"></div>
        <div className="itemsContainer">
          <div className="items">
            <span className="cross">x</span>
            <div className="imageContainer">
              <img
                src="https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png"
                alt=""
                className="image"
              />
            </div>
            <p className="name">Name</p>
          </div>
          <div className="number">
            <input type="number" min='1' max='5' className="numberInput" />
          </div>
          <div className="priceText">
            <p>$200.00</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="bottom">
          <div className="total">
            <p className="subTotal">SUBTOTAL</p>
            <span className="totalSpan">$400.00</span>
          </div>
          <div className="button">
            <button className="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Cart;
