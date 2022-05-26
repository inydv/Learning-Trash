import React, { useEffect, useState } from "react";
import "./Cart.css";
import Navbar from "../../Components/navbar/Navbar";
import NewsLetter from "../../Components/newsLetter/NewsLetter";
import Footer from "../../Components/footer/Footer";
import StripeCheckout from "react-stripe-checkout";
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
  // const history = useHistory();

  const cart = 0;

  const user = useSelector((state) => state.user.currentUser.others._id);

  const ontoken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/cart/${user}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        // history.push("/order", { stripeData: res.data, products: cart });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest(); // call makeRequest
  }, [
    stripeToken,
    cart.total,
    // ,history
  ]);

  return (
    <div className="cart">
      <Navbar />
      {cart.total > 0 ? (
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
                        <Link to={`/singlepage/${item._id}`}>
                          <img src={item.img} alt="" className="image" />
                        </Link>
                      </div>
                    </div>
                    <p className="name">{item.title}</p>
                  </div>
                  <div className="number">
                    <p className="qty">{item.quantity}</p>
                  </div>
                  <div className="priceText">
                    <p>${item.price * item.quantity}</p>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            ))}
          <div className="bottom">
            <div className="total">
              <p className="subTotal">SUBTOTAL</p>
              <span className="totalSpan">${cart.total}</span>
            </div>
            <StripeCheckout
              name="THE LITTLE THINGS"
              image={logo}
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
      ) : (
        <h1 className="emptyCart">Cart is Empty... </h1>
      )}

      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Cart;
