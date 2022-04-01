import React, { useEffect, useState } from "react";
import "../Styles/Cart.css";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Cart() {
  const KEY = process.env.REACT_APP_STRIPE;
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  const ontoken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    console.log("hnn")
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        history.push("/success", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest(); // call makeRequest
  }, [stripeToken, cart.total, history]);

  return (
    <div className="cart">
      <div className="container">
        <h1 className="title">SHOPPING CART</h1>
        <div className="heading">
          <p className="item">ITEM</p>
          <p className="quantity">QUANTITY</p>
          <p className="price">PRICE</p>
        </div>
        <div className="line"></div>
        {cart.products &&
          cart.products.map((item) => (
            <div key={item._id}>
              <div className="itemsContainer">
                <div className="items">
                  <div className="itom">
                    <span className="cross">x</span>
                    <div className="imageContainer">
                      <img src={item.img} alt="" className="image" />
                    </div>
                  </div>
                  <p className="name">{item.title}</p>
                </div>
                <div className="number">
                  <p className="plus">-</p>
                  <p className="qty">{item.quantity}</p>
                  <p className="minus">+</p>
                </div>
                <div className="priceText">
                  <p>{item.price * item.quantity}</p>
                </div>
              </div>
              <div className="line"></div>
            </div>
          ))}
        <div className="bottom">
          <div className="total">
            <p className="subTotal">SUBTOTAL</p>
            <span className="totalSpan">{cart.total}</span>
          </div>
          <StripeCheckout
            name="THE LITTLE THINGS"
            // image=""
            description={`Your Total : $${cart.total}`}
            billingAddress
            shippingAddress
            amount={cart.total * 100} // because equal to dollar
            token={ontoken}
            stripeKey={KEY}
          >
            <div className="button">
              <button className="btn">CHECKOUT</button>
            </div>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}

export default Cart;
