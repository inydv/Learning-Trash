import React, { useEffect, useState } from "react";
import "./Cart.css";
// import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import logo from "../../Images/logo.jpg";
import { Link } from "react-router-dom";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const KEY = process.env.REACT_APP_STRIPE;
  const [stripeToken, setStripeToken] = useState(null);

  const user = useSelector((state) => state.user.currentUser.others._id);
  const cart = useSelector((state) => state.cart.products);

  let total = 0;
  cart.forEach((ele) => {
    total += ele.products.price;
  });

  // const ontoken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       window.location.replace("/order")
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && makeRequest(); // call makeRequest
  // }, [stripeToken, total]);

  return (
    <div className="cart">
      {cart.length > 0 ? (
        <div className="container">
          <h1 className="title">SHOPPING CART</h1>
          <div className="heading">
            <p className="item">ITEM</p>
            <p className="quantity">QUANTITY</p>
            <p className="price">PRICE</p>
          </div>
          <div className="line"></div>
          {cart.map((item) => (
            <div key={item._id}>
              <div className="itemsContainer">
                <div className="items">
                  <div className="itom">
                    <span className="cross">x</span>
                    <div className="imageContainer">
                      <Link to={`/singlepage/${item.products.productId}`}>
                        <img src={item.products.img} alt="" className="image" />
                      </Link>
                    </div>
                  </div>
                  <p className="name">{item.products.title}</p>
                </div>
                <div className="number">
                  <p className="qty">{item.products.quantity}</p>
                </div>
                <div className="priceText">
                  <p>${item.products.price}</p>
                </div>
              </div>
              <div className="line"></div>
            </div>
          ))}
          <div className="bottom">
            <div className="total">
              <p className="subTotal">TOTAL</p>
              <span className="totalSpan">${total}</span>
            </div>
            {/* <StripeCheckout
              name="THE LITTLE THINGS"
              image={logo}
              description={`Your Total : $${total}`}
              billingAddress
              shippingAddress
              amount={cart.total * 100} // because equal to dollar
              token={ontoken}
              stripeKey={KEY}
            >
              <div className="button">
                <button className="btn">CHECKOUT</button>
              </div>
            </StripeCheckout> */}
          </div>
        </div>
      ) : (
        <h1 className="emptyCart">Cart is Empty... </h1>
      )}
    </div>
  );
}

export default Cart;
