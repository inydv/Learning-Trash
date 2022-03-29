import React, { useEffect, useState } from "react";
import "../Styles/Cart.css";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

function Cart() {
  const KEY =
    "pk_test_51KiFjwSAuqXbyMkWgId8oftRCtEzWBU3CSrIOP9L34PvtVAUlqvPUrclGqJHHkq8Zmnbf4zn3vQfgOBOUBLL56bt004YUEROEP";
  const [stripeToken, setStripeToken] = useState(null);

  const ontoken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest()  // call makeRequest
  }, [stripeToken]);

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
        {/* {props.cart.line_items &&
          props.cart.line_items.map((item) => (
            <div key={item.id}>
              <div className="itemsContainer">
                <div className="items">
                  <div className="itom">
                    <span
                      className="cross"
                      onClick={() => props.handleRemoveFromCart(item.id)}
                    >
                      x
                    </span>
                    <div className="imageContainer">
                      <img src={item.image.url} alt="" className="image" />
                    </div>
                  </div>
                  <p className="name">{item.name}</p>
                </div>
                <div className="number">
                  <p
                    className="plus"
                    onClick={() =>
                      props.handleUpdateCartQty(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </p>
                  <p className="qty">{item.quantity}</p>
                  <p
                    className="minus"
                    onClick={() =>
                      props.handleUpdateCartQty(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </p>
                </div>
                <div className="priceText">
                  <p>{item.price.formatted_with_symbol}</p>
                </div>
              </div>
              <div className="line"></div>
            </div>
          ))} */}
        <div className="bottom">
          <div className="total">
            <p className="subTotal">SUBTOTAL</p>
            <span className="totalSpan">500</span>
          </div>
          <StripeCheckout
            name="THE LITTLE THINGS"
            // image=""
            // description=""
            billingAddress
            shippingAddress
            amount={500}
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
